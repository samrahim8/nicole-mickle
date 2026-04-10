import type { PortableTextBlock } from "next-sanity";
import type { Image } from "sanity";

export type SanityImageWithAlt = Image & {
  alt?: string | null;
};

export type PostCategory = {
  _id: string;
  title: string;
  slug: string;
};

export type PostAuthor = {
  _id: string;
  name: string;
  role?: string | null;
  image?: Image | null;
  bio?: string | null;
};

export type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt: string;
  coverImage?: SanityImageWithAlt | null;
  categories?: PostCategory[] | null;
};

export type PostDetail = PostListItem & {
  body?: PortableTextBlock[] | null;
  author?: PostAuthor | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: Image | null;
  } | null;
  legacyWordpressUrl?: string | null;
};
