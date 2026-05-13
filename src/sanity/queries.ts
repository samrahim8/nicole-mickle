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

// All slugs – used for generateStaticParams.
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

// Related posts – same category, excluding current post, newest first.
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

// -------------------- Pages --------------------

export const aboutPageQuery = defineQuery(`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroParagraphs,
    heroImage {
      ...,
      "alt": coalesce(alt, "")
    },
    journeyEyebrow,
    journeyHeadline,
    milestones[]{ period, title, description },
    credentialsEyebrow,
    credentialsHeadline,
    credentialItems,
    discretionEyebrow,
    discretionHeadline,
    discretionParagraphs,
    seoTitle,
    seoDescription
  }
`);

export const quizPageQuery = defineQuery(`
  *[_type == "quizPage" && _id == "quizPage"][0] {
    introEyebrow,
    introHeadingLine1,
    introHeadingLine2,
    introBody,
    startButtonLabel,
    resultsEyebrow,
    resultsHeading,
    resultsBody,
    emailHeading,
    emailBody,
    emailPlaceholder,
    successHeading,
    successBody,
    seoTitle,
    seoDescription
  }
`);

export const contactPageQuery = defineQuery(`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroBody,
    interestOptions,
    submitLabel,
    successHeading,
    successBody,
    phoneNumber,
    phoneDisplay,
    email,
    officeName,
    locationEyebrow,
    locationHeadline,
    locationBody,
    seoTitle,
    seoDescription
  }
`);

export const newConstructionPageQuery = defineQuery(`
  *[_type == "newConstructionPage" && _id == "newConstructionPage"][0] {
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroBody,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    heroStats[]{ number, label },
    photoBand[]{
      ...,
      "alt": coalesce(alt, "")
    },
    whyAgentEyebrow,
    whyAgentHeadline,
    whyAgentItems[]{ title, description },
    processEyebrow,
    processHeadline,
    processSteps[]{ number, title, description },
    buildersEyebrow,
    buildersHeadline,
    builders,
    areasEyebrow,
    areasHeadline,
    infillEyebrow,
    infillBody,
    faqEyebrow,
    faqHeadline,
    faq[]{ question, answer },
    ctaHeadline,
    ctaBody,
    ctaButtonLabel,
    ctaSideEyebrow,
    ctaSideHeadline,
    ctaSideBody,
    ctaSideButtonLabel,
    seoTitle,
    seoDescription
  }
`);

export const relocatingPageQuery = defineQuery(`
  *[_type == "relocatingPage" && _id == "relocatingPage"][0] {
    heroEyebrow,
    heroHeadlineLine1,
    heroHeadlineLine2,
    heroBody,
    heroCtaLabel,
    heroStats[]{ number, label },
    trustedByEyebrow,
    trustedByHeadline,
    trustedByBody,
    employers,
    processEyebrow,
    processHeadline,
    processSteps[]{ number, title, description },
    whyEyebrow,
    whyHeadline,
    whyItems[]{ title, description },
    faqEyebrow,
    faqHeadline,
    faq[]{ question, answer },
    neighborhoodsEyebrow,
    neighborhoodsHeadline,
    neighborhoodsBody,
    neighborhoodsCtaLabel,
    neighborhoodsQuizEyebrow,
    neighborhoodsQuizHeadline,
    neighborhoodsQuizBody,
    neighborhoodsQuizCtaLabel,
    finalCtaHeadline,
    finalCtaBody,
    finalCtaLabel,
    seoTitle,
    seoDescription
  }
`);
