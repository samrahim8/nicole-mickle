import { defineQuery } from "next-sanity";

// Count of published posts (for pagination).
export const postsCountQuery = defineQuery(`
  count(*[_type == "post" && defined(slug.current) && defined(publishedAt)])
`);

// Paginated list for the blog index.
// $start and $end are inclusive/exclusive slice bounds.
export const postsListQuery = defineQuery(`
  *[_type == "post" && defined(slug.current) && defined(publishedAt)]
    | order(publishedAt desc) [$start...$end] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      coverImage {
        ...,
        "alt": coalesce(alt, "")
      },
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }
`);

// All slugs — used for generateStaticParams.
export const postSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);

// Full post for the detail page.
export const postBySlugQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage {
      ...,
      "alt": coalesce(alt, "")
    },
    body,
    "author": author->{
      _id,
      name,
      role,
      image,
      bio
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    },
    legacyWordpressUrl
  }
`);

// Related posts — same category, excluding current post, newest first.
export const relatedPostsQuery = defineQuery(`
  *[
    _type == "post"
    && _id != $currentId
    && count((categories[]->_id)[@ in $categoryIds]) > 0
    && defined(slug.current)
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    coverImage {
      ...,
      "alt": coalesce(alt, "")
    }
  }
`);
