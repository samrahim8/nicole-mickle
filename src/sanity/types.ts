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

export type CategoryDetail = {
  _id: string;
  title: string;
  slug: string;
  description?: string | null;
  postCount: number;
};

export type FaqItem = {
  question: string;
  answer: string;
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
  updatedAt?: string | null;
  body?: PortableTextBlock[] | null;
  author?: PostAuthor | null;
  faq?: FaqItem[] | null;
  seo?: {
    metaTitle?: string | null;
    metaDescription?: string | null;
    ogImage?: Image | null;
  } | null;
  legacyWordpressUrl?: string | null;
};

export type LandStatus = "available" | "pending" | "sold";

export type LandListingCard = {
  _id: string;
  title: string;
  slug: string;
  status: LandStatus;
  price?: number | null;
  acreage?: number | null;
  city: string;
  county?: string | null;
  community?: string | null;
  photos?: SanityImageWithAlt | null;
};

export type LandListingDetail = Omit<LandListingCard, "photos"> & {
  address?: string | null;
  summary?: string | null;
  features?: string[] | null;
  builderRequirement?: string | null;
  photos?: SanityImageWithAlt[] | null;
  listingUrl?: string | null;
  listedAt?: string | null;
};
