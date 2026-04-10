# Blog — Sanity CMS

The Nicole Mickle blog is powered by [Sanity](https://www.sanity.io) as a
headless CMS. Nicole writes and edits posts in the Sanity Studio embedded at
`/studio`; the public site reads published posts from Sanity at request time
with ISR caching.

## Quick reference

| Thing | Where |
| --- | --- |
| Sanity project ID | `bb9x05wq` |
| Dataset | `production` |
| Studio (local) | http://localhost:3000/studio |
| Studio (prod) | https://nicolemickle.com/studio |
| Sanity dashboard | https://www.sanity.io/manage/personal/project/bb9x05wq |
| Blog index | `/blog` |
| Blog post | `/blog/[slug]` |
| RSS feed | `/blog/rss.xml` |

## Environment variables

Add these to `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=bb9x05wq
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-04-01
SANITY_API_WRITE_TOKEN=   # only needed for the import script
```

The write token is generated in the Sanity dashboard under **API → Tokens**
(Editor role). It is **not** required for reads — the public site uses the
CDN-backed read client with no token.

On Vercel, the first three vars need to be added to the project's environment
variables (production + preview). The write token stays local — it never needs
to be deployed.

## First-time Sanity setup (already done for this project)

If you're ever setting this up from scratch again, the one-time steps are:

1. Create the project at https://www.sanity.io/manage
2. Add CORS origins at **API → CORS Origins**:
   - `http://localhost:3000` (Allow credentials: yes)
   - `https://nicole-mickle.vercel.app` (Allow credentials: yes)
   - `https://nicolemickle.com` (Allow credentials: yes) once DNS is cut over
3. Invite Nicole as a member so she can log into Studio under her own email

## How Nicole uses it (plain English)

1. Go to `nicolemickle.com/studio` and sign in
2. Click **Blog Post** → **Create new**
3. Fill in:
   - **Title** — the headline
   - **Slug** — auto-generated from the title, tweak if needed
   - **Excerpt** — the 1–2 sentence preview that shows on the index and in
     search results
   - **Cover image** — the hero image; alt text is required for accessibility
   - **Body** — the post itself. Supports headings, lists, links, inline images
     (with captions), pull quotes, bold/italic
   - **Author** — usually Nicole
   - **Categories** — optional tagging
   - **Published at** — defaults to now; back-date older posts here
   - **SEO** tab — optional overrides for meta title, meta description, social
     share image. Falls back to the title + excerpt + cover image if left blank
4. Click **Publish**. Changes appear on the live site within ~1 minute (ISR
   revalidation).

Drafts are saved automatically as you type.

## How the code is organized

```
src/
  sanity/
    env.ts              # validates and exports env vars
    client.ts           # read-only Sanity client (CDN, published perspective)
    image.ts            # image URL builder with hotspot/crop support
    queries.ts          # GROQ queries for posts, slugs, related
    types.ts            # TS types for fetched post shapes
    schemas/
      index.ts          # schema registry
      post.ts           # post document schema
      author.ts         # author document schema
      category.ts       # category document schema
      blocks/
        portableText.ts # rich text block schema (headings, lists, images, pull quotes)
  app/
    studio/[[...tool]]/ # Studio mount point
    blog/
      page.tsx          # paginated index
      [slug]/page.tsx   # post detail
      rss.xml/route.ts  # RSS 2.0 feed
    sitemap.ts          # includes published posts
    robots.ts
  components/
    portable-text.tsx   # custom Portable Text renderer matching the design system
    site-chrome.tsx     # hides site Navbar/Footer on /studio routes

sanity.config.ts        # Studio config (plugins, schemas, basePath)
scripts/
  import-wordpress.ts   # WXR → Sanity migration script (see below)
```

Caching strategy:
- Blog index: `revalidate = 60` — refreshes every minute
- Blog post: `revalidate = 60` + `dynamicParams = true` — new slugs render on
  demand, existing ones revalidate in the background
- Sitemap / RSS: `revalidate = 600` — refreshes every 10 minutes
- All reads use Sanity's CDN (`useCdn: true`) for global edge caching

## Importing from WordPress

The one-shot migration script pulls every post from a WordPress WXR export
(XML) into Sanity, downloads images, converts HTML → Portable Text, and
auto-drafts probable junk for manual review.

### Getting the WXR file from Nicole

Nicole exports it from her WordPress admin:

1. Log in to `wp-admin`
2. **Tools → Export**
3. Select **All content**
4. Click **Download Export File**
5. Send the `.xml` file to Sam

### Running the import

```bash
# 1. Make sure the write token is set in .env.local
SANITY_API_WRITE_TOKEN=sk... # Editor-role token from the Sanity dashboard

# 2. Dry run — parses everything, downloads nothing, writes nothing
npm run import:wordpress -- ./nicole-wxr.xml --dry

# 3. Smoke test on the first 5 posts (real writes)
npm run import:wordpress -- ./nicole-wxr.xml --limit 5

# 4. Full import
npm run import:wordpress -- ./nicole-wxr.xml

# Re-importing? The script dedupes by legacyWordpressId. To force
# overwrite existing docs, pass --force:
npm run import:wordpress -- ./nicole-wxr.xml --force
```

### What the script does

For each published WP post:

1. **Parses** the WXR XML (handles CDATA-wrapped fields via a `getText()`
   normalizer, filters to `post_type=post` and `status=publish`)
2. **Downloads every image** referenced in the HTML body, uploads each to
   Sanity as an asset, caches by source URL so repeated images upload once
3. **Converts HTML → Portable Text** using `@sanity/block-tools` with a
   compiled block content type that mirrors `src/sanity/schemas/blocks/portableText.ts`
4. **Sets a cover image** using the first `<img>` in the post body
5. **Creates author and category documents** as needed
   (`createIfNotExists` — safe to re-run)
6. **Flags junk as drafts** via curation rules in `JUNK_TITLE_PATTERNS`:
   - `/^SOLD:/i` — sold property announcements
   - `/^For Sale:/i` — active listings
   - Titles that look like single-property street addresses
     (e.g. "884 Klondike St")
   - Social media / marketing tip posts
     (e.g. "Instagram Stories for Real Estate Agents")
   Drafted posts still land in Studio for Nicole to review and publish if she
   wants; they just don't go straight onto the live blog.
7. **Writes to Sanity** with `legacyWordpressId` and `legacyWordpressUrl` so
   repeat runs don't duplicate docs

Expected summary output:

```
—— Summary ——
Created:  92
Updated:  0
Skipped:  0
Failed:   0
Drafted:  31 (curation rules: sold listings, social-media tips)
Images uploaded: 247
```

### If something goes wrong

- **CORS error when logging into Studio** → add the origin in the Sanity
  dashboard under API → CORS Origins
- **Missing write token** → the script will refuse to run without it (unless
  `--dry`). Generate one at API → Tokens → Editor role
- **Images failing to upload** → check the source WordPress URL is publicly
  accessible. Private or expired image URLs will be logged as warnings and
  skipped rather than crashing the whole import
- **Slugs collide with existing routes** → the script uses WordPress's
  `post_name` which is typically unique per WP install, but if it somehow
  collides with an existing Sanity post, adjust the slug in Studio after
  import
- **Want to change which posts get drafted** → edit `JUNK_TITLE_PATTERNS` in
  `scripts/import-wordpress.ts` and re-run with `--force`

## Post-migration launch checklist

Once the import runs successfully:

1. Spot-check a handful of posts in Studio:
   - Oldest post (image handling, old HTML formatting)
   - Newest post (April 2026)
   - A post with lots of images
   - A post with embedded video or social embeds (these may need manual
     fixing — block-tools doesn't know about every WordPress plugin shortcode)
2. Review the drafted posts — publish the ones worth keeping, delete the rest
3. Audit imported slugs against the live WordPress URLs. If any changed,
   add a 301 redirect in `next.config.ts`:
   ```ts
   async redirects() {
     return [
       { source: "/old-wp-slug", destination: "/blog/new-slug", permanent: true },
     ];
   }
   ```
4. **Flip the navbar blog link** — change `src/components/navbar.tsx` line 13
   from the external `https://nicolemickle.com/blog` link to an internal
   `/blog` link. This is the final cutover.
5. Update DNS so `nicolemickle.com/blog` hits the new Vercel deployment
6. Submit the new `sitemap.xml` to Google Search Console
7. Verify the top-ranking old WP posts still render correctly at their
   preserved slugs

## Future improvements (not built yet)

- Category archive pages at `/blog/category/[slug]`
- Author archive pages at `/blog/author/[slug]`
- Related posts scoring by tag overlap (currently just "same category")
- Search / filtering on the blog index
- Newsletter signup on the post footer
- Scheduled publishing (Sanity supports this via `publishedAt` in the future)
