-- ProofLayer AI - Complete Database Schema

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================
-- 1. Profiles (extends auth.users)
-- ============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  plan text not null default 'starter' check (plan in ('starter', 'pro', 'growth', 'enterprise')),
  monthly_scan_limit integer not null default 500,
  current_month_scans integer not null default 0,
  byok_monthly_scan_limit integer not null default 2500,
  current_month_byok_scans integer not null default 0,
  byok_enabled boolean not null default false,
  trial_ends_at timestamptz,
  paddle_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 2. Scans (verification history)
-- ============================================
create table public.scans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_type text not null check (content_type in ('image', 'audio', 'video', 'text')),
  content_hash text,
  file_name text,
  file_size integer,
  trust_score numeric(5,2) not null check (trust_score >= 0 and trust_score <= 100),
  ai_probability numeric(5,2) not null check (ai_probability >= 0 and ai_probability <= 100),
  is_ai_generated boolean not null default false,
  model_fingerprint text,
  manipulation_type text,
  detailed_analysis jsonb not null default '{}'::jsonb,
  provider_used text not null check (provider_used in ('openai', 'anthropic', 'gemini')),
  is_byok boolean not null default false,
  processing_time_ms integer,
  created_at timestamptz not null default now()
);

-- ============================================
-- 3. API Keys (platform API keys for developers)
-- ============================================
create table public.api_keys (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  key_hash text not null unique,
  key_prefix text not null,
  label text not null default 'Default',
  scopes text[] not null default array['verify'],
  is_active boolean not null default true,
  last_used_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================
-- 4. User Provider Keys (BYOK encrypted keys)
-- ============================================
create table public.user_provider_keys (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  provider text not null check (provider in ('openai', 'anthropic', 'gemini')),
  encrypted_key text not null,
  key_label text not null default 'Default',
  is_active boolean not null default true,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(user_id, provider, key_label)
);

-- ============================================
-- 5. Subscriptions (Paddle)
-- ============================================
create table public.subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  paddle_subscription_id text unique not null,
  paddle_customer_id text,
  plan text not null check (plan in ('starter', 'pro', 'growth', 'enterprise')),
  status text not null default 'active' check (status in ('active', 'trialing', 'past_due', 'paused', 'canceled')),
  billing_cycle text not null default 'monthly' check (billing_cycle in ('monthly', 'annual')),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 6. Donations (Paddle transactions)
-- ============================================
create table public.donations (
  id uuid primary key default uuid_generate_v4(),
  paddle_transaction_id text unique,
  paddle_subscription_id text,
  user_id uuid references public.profiles(id) on delete set null,
  amount numeric(10,2) not null,
  currency text not null default 'USD',
  frequency text not null default 'one_time' check (frequency in ('one_time', 'monthly')),
  donor_name text,
  donor_email text,
  is_anonymous boolean not null default false,
  message text,
  status text not null default 'completed' check (status in ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz not null default now()
);

-- ============================================
-- 7. Donor Wall (public-safe projection)
-- ============================================
create table public.donor_wall (
  id uuid primary key default uuid_generate_v4(),
  donation_id uuid references public.donations(id) on delete cascade,
  display_name text not null default 'Anonymous',
  amount numeric(10,2) not null,
  tier text not null check (tier in ('supporter', 'champion', 'guardian', 'patron')),
  message text,
  created_at timestamptz not null default now()
);

-- ============================================
-- 8. Funding Goals
-- ============================================
create table public.funding_goals (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  target_amount numeric(10,2) not null,
  current_amount numeric(10,2) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 9. Usage Logs
-- ============================================
create table public.usage_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  api_key_id uuid references public.api_keys(id) on delete set null,
  endpoint text not null,
  method text not null,
  content_type text,
  provider_used text,
  is_byok boolean not null default false,
  processing_time_ms integer,
  status_code integer,
  created_at timestamptz not null default now()
);

-- ============================================
-- Indexes
-- ============================================
create index idx_scans_user_id on public.scans(user_id);
create index idx_scans_created_at on public.scans(created_at desc);
create index idx_scans_content_hash on public.scans(content_hash);
create index idx_api_keys_user_id on public.api_keys(user_id);
create index idx_api_keys_key_hash on public.api_keys(key_hash);
create index idx_user_provider_keys_user_id on public.user_provider_keys(user_id);
create index idx_subscriptions_user_id on public.subscriptions(user_id);
create index idx_subscriptions_paddle_id on public.subscriptions(paddle_subscription_id);
create index idx_donations_created_at on public.donations(created_at desc);
create index idx_donor_wall_created_at on public.donor_wall(created_at desc);
create index idx_usage_logs_user_id on public.usage_logs(user_id);
create index idx_usage_logs_created_at on public.usage_logs(created_at desc);

-- ============================================
-- RLS Policies
-- ============================================

-- Profiles
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Scans
alter table public.scans enable row level security;
create policy "Users can view own scans" on public.scans for select using (auth.uid() = user_id);
create policy "Users can insert own scans" on public.scans for insert with check (auth.uid() = user_id);

-- API Keys
alter table public.api_keys enable row level security;
create policy "Users can view own API keys" on public.api_keys for select using (auth.uid() = user_id);
create policy "Users can insert own API keys" on public.api_keys for insert with check (auth.uid() = user_id);
create policy "Users can update own API keys" on public.api_keys for update using (auth.uid() = user_id);
create policy "Users can delete own API keys" on public.api_keys for delete using (auth.uid() = user_id);

-- User Provider Keys (BYOK)
alter table public.user_provider_keys enable row level security;
create policy "Users can view own provider keys" on public.user_provider_keys for select using (auth.uid() = user_id);
create policy "Users can insert own provider keys" on public.user_provider_keys for insert with check (auth.uid() = user_id);
create policy "Users can update own provider keys" on public.user_provider_keys for update using (auth.uid() = user_id);
create policy "Users can delete own provider keys" on public.user_provider_keys for delete using (auth.uid() = user_id);

-- Subscriptions
alter table public.subscriptions enable row level security;
create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);

-- Donations
alter table public.donations enable row level security;
create policy "Users can view own donations" on public.donations for select using (auth.uid() = user_id);

-- Donor Wall (publicly readable)
alter table public.donor_wall enable row level security;
create policy "Anyone can view donor wall" on public.donor_wall for select using (true);

-- Funding Goals (publicly readable)
alter table public.funding_goals enable row level security;
create policy "Anyone can view funding goals" on public.funding_goals for select using (true);

-- Usage Logs
alter table public.usage_logs enable row level security;
create policy "Users can view own usage logs" on public.usage_logs for select using (auth.uid() = user_id);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, trial_ends_at)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    coalesce(new.raw_user_meta_data->>'avatar_url', ''),
    now() + interval '7 days'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Increment scan count
create or replace function public.increment_scan_count(p_user_id uuid, p_is_byok boolean default false)
returns void as $$
begin
  if p_is_byok then
    update public.profiles
    set current_month_byok_scans = current_month_byok_scans + 1,
        updated_at = now()
    where id = p_user_id;
  else
    update public.profiles
    set current_month_scans = current_month_scans + 1,
        updated_at = now()
    where id = p_user_id;
  end if;
end;
$$ language plpgsql security definer;

-- Check if user has remaining scans
create or replace function public.has_remaining_scans(p_user_id uuid, p_is_byok boolean default false)
returns boolean as $$
declare
  v_profile public.profiles;
begin
  select * into v_profile from public.profiles where id = p_user_id;

  if not found then
    return false;
  end if;

  if p_is_byok then
    -- Enterprise has unlimited BYOK scans
    if v_profile.plan = 'enterprise' then
      return true;
    end if;
    return v_profile.current_month_byok_scans < v_profile.byok_monthly_scan_limit;
  else
    return v_profile.current_month_scans < v_profile.monthly_scan_limit;
  end if;
end;
$$ language plpgsql security definer;

-- Update funding goal when donation completes
create or replace function public.update_funding_goal()
returns trigger as $$
begin
  if new.status = 'completed' then
    update public.funding_goals
    set current_amount = current_amount + new.amount,
        updated_at = now()
    where is_active = true;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_donation_completed
  after insert or update on public.donations
  for each row
  when (new.status = 'completed')
  execute function public.update_funding_goal();

-- Reset monthly scan counts (to be called by cron)
create or replace function public.reset_monthly_scan_counts()
returns void as $$
begin
  update public.profiles
  set current_month_scans = 0,
      current_month_byok_scans = 0,
      updated_at = now();
end;
$$ language plpgsql security definer;

-- Updated_at trigger function
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.update_updated_at();
create trigger subscriptions_updated_at before update on public.subscriptions
  for each row execute function public.update_updated_at();
create trigger user_provider_keys_updated_at before update on public.user_provider_keys
  for each row execute function public.update_updated_at();
create trigger funding_goals_updated_at before update on public.funding_goals
  for each row execute function public.update_updated_at();

-- Insert initial funding goal
insert into public.funding_goals (title, description, target_amount)
values ('Launch Fund', 'Help us reach our launch goal to support free verifications for journalists and educators.', 50000);
