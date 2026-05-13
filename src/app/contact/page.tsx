import { ContactClient, type ContactPageData } from "@/components/contact-client";
import { sanityFetch } from "@/sanity/live";
import { contactPageQuery } from "@/sanity/queries";
import { contactFallback } from "@/lib/contact-fallback";

export const revalidate = 60;

type SanityContact = Partial<ContactPageData>;

async function getContactPage(): Promise<ContactPageData> {
  try {
    const { data } = await sanityFetch({ query: contactPageQuery });
    const doc = data as SanityContact | null;
    if (!doc) return contactFallback;
    return {
      heroEyebrow: doc.heroEyebrow ?? contactFallback.heroEyebrow,
      heroHeadlineLine1: doc.heroHeadlineLine1 ?? contactFallback.heroHeadlineLine1,
      heroHeadlineLine2: doc.heroHeadlineLine2 ?? contactFallback.heroHeadlineLine2,
      heroBody: doc.heroBody ?? contactFallback.heroBody,
      interestOptions: doc.interestOptions?.length
        ? doc.interestOptions
        : contactFallback.interestOptions,
      submitLabel: doc.submitLabel ?? contactFallback.submitLabel,
      successHeading: doc.successHeading ?? contactFallback.successHeading,
      successBody: doc.successBody ?? contactFallback.successBody,
      phoneNumber: doc.phoneNumber ?? contactFallback.phoneNumber,
      phoneDisplay: doc.phoneDisplay ?? contactFallback.phoneDisplay,
      email: doc.email ?? contactFallback.email,
      officeName: doc.officeName ?? contactFallback.officeName,
      locationEyebrow: doc.locationEyebrow ?? contactFallback.locationEyebrow,
      locationHeadline: doc.locationHeadline ?? contactFallback.locationHeadline,
      locationBody: doc.locationBody ?? contactFallback.locationBody,
    };
  } catch {
    return contactFallback;
  }
}

export default async function ContactPage() {
  const data = await getContactPage();
  return <ContactClient data={data} />;
}
