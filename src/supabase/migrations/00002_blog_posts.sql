-- Blog Posts table
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  content text not null,
  category text not null default 'General',
  read_time text not null default '5 min',
  cover_image text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Indexes
create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_blog_posts_published on public.blog_posts(is_published, published_at desc);

-- RLS: anyone can read published posts
alter table public.blog_posts enable row level security;
create policy "Anyone can read published posts" on public.blog_posts
  for select using (is_published = true);

-- Updated_at trigger
create trigger blog_posts_updated_at before update on public.blog_posts
  for each row execute function public.update_updated_at();

-- Seed the 3 initial blog posts
insert into public.blog_posts (slug, title, excerpt, content, category, read_time, is_published, published_at) values
(
  'what-is-ai-generated-content',
  'What is AI-Generated Content?',
  'Understanding the different types of AI-generated content, from text and images to audio and video deepfakes.',
  'AI-generated content refers to any media — text, images, audio, or video — created wholly or partially by artificial intelligence systems.

## Types of AI-Generated Content

### Text
Large language models (LLMs) like GPT-4, Claude, and Gemini can produce human-like text that is increasingly difficult to distinguish from human writing. These models generate everything from articles and emails to code and poetry.

### Images
Image generation models like DALL-E 3, Midjourney, and Stable Diffusion create photorealistic images from text descriptions. These can range from artistic illustrations to convincing photographs of people who don''t exist.

### Audio
Voice synthesis tools like ElevenLabs can clone voices with just seconds of sample audio, creating speech that sounds identical to real people. Music generation AI can create original compositions in any style.

### Video
Deepfake technology can swap faces, manipulate lip movements, and generate entirely synthetic video footage that appears authentic.

## Why Detection Matters

As these technologies advance, the ability to verify content authenticity becomes critical for:
- **Journalism**: Verifying sources and images before publication
- **Legal**: Authenticating digital evidence
- **Social Media**: Combating misinformation
- **Business**: Protecting brand integrity

## How ProofLayer Helps

ProofLayer AI provides a universal API that detects AI-generated content across all media types. Our multi-model pipeline analyzes content using advanced detection algorithms and returns a trust score, model fingerprint, and detailed analysis.

[Start verifying content today](/signup) with our 7-day free trial.',
  'Education',
  '5 min',
  true,
  '2026-02-10T00:00:00Z'
),
(
  'why-ai-verification-matters',
  'Why AI Verification Matters in 2026',
  'As AI-generated content becomes indistinguishable from human-created content, verification tools are more critical than ever.',
  'The year 2026 marks a turning point in the AI content landscape. Generated content has reached a level of sophistication where human perception alone is no longer sufficient for detection.

## The Scale of the Problem

Research indicates that by 2026:
- Over 90% of online content will be AI-generated or AI-assisted
- Deepfake videos have increased 900% year-over-year
- AI-generated phishing emails are 60% more effective than human-written ones
- 73% of people cannot distinguish AI-generated images from photographs

## The Trust Crisis

This explosion of synthetic content has created a fundamental trust crisis. When any image, video, or text could be AI-generated, how do you know what''s real?

## Building Digital Trust Infrastructure

Just as SSL certificates created trust for web transactions, AI verification creates trust for digital content. ProofLayer AI serves as this trust layer — a universal API that anyone can use to verify content authenticity.

### Key Components of AI Trust
1. **Detection Accuracy**: Multi-model approach for higher accuracy
2. **Model Fingerprinting**: Identifying which AI created the content
3. **Trust Scores**: Quantified confidence levels
4. **Transparency**: Open methodology and detailed analysis

## The BYOK Advantage

ProofLayer''s Bring Your Own Key (BYOK) model makes verification accessible at scale. Organizations can use their existing AI provider keys while leveraging our proprietary scoring algorithm.

[Learn more about our approach](/docs) or [start your free trial](/signup).',
  'Industry',
  '7 min',
  true,
  '2026-02-05T00:00:00Z'
),
(
  'how-prooflayer-works',
  'How ProofLayer Works: Under the Hood',
  'A technical deep-dive into our multi-model AI detection pipeline, trust scoring algorithm, and model fingerprinting.',
  'A technical deep-dive into ProofLayer AI''s multi-model detection pipeline.

## Architecture Overview

ProofLayer uses a multi-provider architecture where content is analyzed using advanced AI models from OpenAI, Anthropic, and Google. Our proprietary scoring algorithm combines these analyses into a unified trust score.

## The Verification Pipeline

### 1. Content Ingestion
When content is submitted via our API, it goes through:
- File validation (type, size, format)
- Content hashing (SHA-256) for deduplication
- Cache lookup for previously analyzed identical content

### 2. Provider Selection
The system selects the optimal AI provider based on:
- Content type (audio → OpenAI Whisper, images → GPT-4o Vision, etc.)
- User preference (BYOK provider selection)
- Provider availability and response times

### 3. AI Analysis
Each provider runs specialized detection prompts that analyze:
- **Text**: Linguistic patterns, statistical distributions, AI-isms
- **Images**: Texture artifacts, lighting consistency, hand/finger anomalies
- **Audio**: Prosody patterns, spectral analysis, breath sounds

### 4. Trust Score Calculation
Our proprietary algorithm converts raw analysis into a 0-100 trust score:
- Raw AI probability is inverse-mapped to trust (100 = fully authentic)
- Confidence weighting pushes uncertain results toward 50
- Provider agreement increases confidence when multiple signals align

### 5. Model Fingerprinting
We maintain a database of model signatures — unique patterns left by different AI generators. This allows us to identify not just IF content is AI-generated, but WHICH model created it.

## BYOK Architecture

BYOK keys are encrypted at rest using AES-256-GCM. When a scan is initiated:
1. The system checks if the user has a BYOK key for the selected provider
2. If yes, the key is decrypted in memory and used for the API call
3. Only the platform fee is charged (not counted against the standard scan quota)
4. The key is never logged or stored in plaintext

## API Performance

Typical processing times:
- Text analysis: 1-3 seconds
- Image analysis: 2-5 seconds
- Audio analysis: 3-10 seconds (includes transcription)

[Explore our API documentation](/docs) or [try it yourself](/verify).',
  'Technical',
  '10 min',
  true,
  '2026-01-28T00:00:00Z'
);
