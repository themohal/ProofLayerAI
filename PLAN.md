# Plan: Blog Admin + Site Content Migration to Supabase

## Overview
1. Create a new migration adding `is_admin` to profiles + `site_content` table for all CMS-managed content
2. Add admin-only RLS policies for blog_posts and site_content
3. Build Blog Admin panel in dashboard (CRUD for blog posts)
4. Build Content Admin panel in dashboard (manage testimonials, features, FAQs, stats, etc.)
5. Update all frontend components to fetch from Supabase — no hardcoded content

---

## Step 1: Migration `00003_site_content.sql`
- Add `is_admin boolean default false` column to `profiles`
- Create `site_content` table with columns: `id`, `section` (enum-like text), `sort_order`, `data` (jsonb), `is_active`, `created_at`, `updated_at`
- Sections: `feature`, `how_it_works`, `testimonial`, `platform_stat`, `pricing_faq`, `pricing_comparison`, `donation_faq`, `donation_impact`
- RLS: public SELECT for active items, INSERT/UPDATE/DELETE only for admin users
- Add admin RLS policies to `blog_posts` too (INSERT/UPDATE/DELETE for admin users)
- Seed all existing hardcoded content into the table

## Step 2: Dashboard Nav — add Blog + Content links
- File: `src/components/dashboard/dashboard-nav.tsx`
- Add: `{ href: "/dashboard/blog", label: "Blog", icon: FileText }`
- Add: `{ href: "/dashboard/content", label: "Content", icon: PanelTop }`

## Step 3: Blog Admin — List Page
- File: `src/app/(dashboard)/dashboard/blog/page.tsx`
- Client component with full CRUD
- Lists all blog posts (published + drafts) with status badges
- Create new post button opens editor page
- Delete with confirmation
- Quick publish/unpublish toggle

## Step 4: Blog Admin — Editor Page
- File: `src/app/(dashboard)/dashboard/blog/[id]/page.tsx`
- Form: title, slug (auto-generated from title), excerpt, content (textarea), category, read_time, cover_image URL, is_published
- Save as draft or publish
- Uses admin client for write operations via API route

## Step 5: Blog Admin — New Post Page
- File: `src/app/(dashboard)/dashboard/blog/new/page.tsx`
- Same form as editor but for creating new posts

## Step 6: Blog API Routes
- File: `src/app/api/admin/blog/route.ts` — GET all posts, POST new post
- File: `src/app/api/admin/blog/[id]/route.ts` — GET/PATCH/DELETE single post
- All routes check `is_admin` on the user's profile before allowing writes

## Step 7: Content Admin — Page with Tabs
- File: `src/app/(dashboard)/dashboard/content/page.tsx`
- Tabbed interface for each content section
- Each tab shows list of items with edit/delete/reorder
- Add new item button per section
- Uses Dialog modals for create/edit (different fields per section type)

## Step 8: Content API Routes
- File: `src/app/api/admin/content/route.ts` — GET/POST site content
- File: `src/app/api/admin/content/[id]/route.ts` — PATCH/DELETE single item
- Admin-only access

## Step 9: Update Frontend Components
- `features-section.tsx` → fetch from site_content where section='feature'
- `how-it-works-section.tsx` → fetch from site_content where section='how_it_works'
- `testimonials-section.tsx` → fetch from site_content where section='testimonial'
- `stats-banner.tsx` → fetch from site_content where section='platform_stat'
- `pricing-faq.tsx` → fetch from site_content where section='pricing_faq'
- `pricing-comparison.tsx` → fetch from site_content where section='pricing_comparison'
- `donation-faq.tsx` → fetch from site_content where section='donation_faq'
- `impact-stats.tsx` → fetch from site_content where section='donation_impact'
- All: async server components fetching via Supabase, with empty states

## Step 10: Blog Pages (already partially done)
- `src/app/(marketing)/blog/page.tsx` — already updated to fetch from Supabase
- `src/app/(marketing)/blog/[slug]/page.tsx` — already updated to fetch from Supabase
