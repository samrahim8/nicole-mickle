import type { FaqEntry } from "@/components/faq-accordion";

/**
 * Content for the builders hub (/new-construction/builders) and the individual
 * builder pages beneath it, from 201 Creative's August 2026 Builder Pages
 * Implementation Sheet + the six HTML mockups that shipped with it.
 *
 * Everything user-facing lives here so the page components stay presentational
 * and the FAQ copy has a single source of truth (the accordion and the FAQPage
 * JSON-LD both read the same array, so they can never drift apart).
 *
 * The "My take" leads and lists are condensed from Nicole's own builder reviews
 * in /blog/home-builders-in-orlando. Lennar is the exception: she does not cover
 * it in that post, so its page uses her relationship framing (model visits,
 * sales-staff contact) and links to the post as general "more builder reviews"
 * rather than claiming a review that does not exist.
 */

export interface BuilderLink {
  href: string;
  label: string;
  /** External links (iorlandorealestate.com) open in a new tab. */
  external?: boolean;
}

export interface BuilderStat {
  value: string;
  label: string;
}

export interface BuilderTakeList {
  title: string;
  items: string[];
}

export interface BuilderArea {
  name: string;
  body: string;
  links: BuilderLink[];
}

export interface BuilderPageContent {
  slug: string;
  /** Display name, e.g. "Del Webb". Used in the eyebrow, breadcrumb and schema. */
  name: string;
  /** Complete <title>, no brand suffix appended. */
  seoTitle: string;
  metaDescription: string;
  /** H1, split so the builder name stays visually dominant. Together they read
   *  as the full target phrase ("Del Webb Homes in Orlando"). */
  h1Lead: string;
  h1Display: string;
  intro: string;
  /** Hero link beside "Discuss your build". Points at the builder blog post. */
  secondaryCta: BuilderLink;
  stats: BuilderStat[];
  takeHeadline: string;
  takeLead: string;
  takeLists: BuilderTakeList[];
  whereHeadline: string;
  areas: BuilderArea[];
  representationHeadline: string;
  /** First dark-band card. The second is the same on every page (see
   *  REPRESENTATION_CARD in the client) because the claim itself is fixed. */
  representationBody: string;
  faqHeadline: string;
  faq: FaqEntry[];
  ctaHeadline: string;
}

const NEW_CONSTRUCTION_LINK: BuilderLink = {
  href: "/new-construction",
  label: "new construction homes in Orlando",
};

/** Shared by every builder page's second representation card. */
export const REPRESENTATION_CARD = {
  title: "Representation is built in",
  bodyBefore:
    "Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. See how I handle ",
  link: NEW_CONSTRUCTION_LINK,
  bodyAfter: " from contract to closing.",
};

/* ------------------------------------------------------------------ */
/* Hub                                                                 */
/* ------------------------------------------------------------------ */

export interface BuilderTypeGroup {
  title: string;
  description: string;
  /** Builder names. A `href` turns the listing into a link to its own page;
   *  the sheet's rule is that every other name stays plain text until its page
   *  ships. */
  builders: { name: string; href?: string }[];
}

export const buildersHub = {
  seoTitle: "Orlando New Construction Home Builders | Nicole Mickle",
  metaDescription:
    "Compare Orlando new construction home builders with 30-year expert Nicole Mickle. Custom, semi-custom, and production builders by area, plus who I trust.",
  h1Lead: "Orlando New Construction",
  h1Display: "Home Builders",
  intro:
    "Every builder worth knowing in Orlando: custom, semi-custom, and production, organized by type and by where they're actually building. The builder's sales rep works for the builder. I work for you.",
  stats: [
    { value: "30+", label: "Active builders" },
    { value: "3", label: "Builder types" },
    { value: "6–12 mo", label: "Typical build time" },
  ] satisfies BuilderStat[],
  typesEyebrow: "Builders by Type",
  typesHeadline: "Custom, semi-custom, or production?",
  typesLead:
    "The right builder depends on how much you want to change. Here's how Orlando's new construction market breaks down, and who I'd put in each camp.",
  types: [
    {
      title: "Custom",
      description:
        "Designed around you from the lot up. Expect a premium and a longer timeline, and a home nobody else has.",
      builders: [
        { name: "Arthur Rutenberg Homes" },
        { name: "Davila Custom Homes" },
        { name: "M. Lahr Homes" },
        { name: "Element Home Builders" },
        { name: "J and J Builders" },
      ],
    },
    {
      title: "Semi-Custom",
      description:
        "You start from the builder's plans but can modify layouts, elevations, and structural options. The sweet spot for most buyers who want a say without a full custom budget.",
      builders: [
        { name: "David Weekley Homes" },
        { name: "Ashton Woods" },
        { name: "Toll Brothers", href: "/new-construction/builders/toll-brothers" },
        { name: "ABD Development" },
      ],
    },
    {
      title: "Production",
      description:
        "Fixed floor plans built at volume. The most home for the money, the fastest timelines, and the least flexibility, which is exactly where knowing what's negotiable matters most.",
      builders: [
        { name: "Taylor Morrison" },
        { name: "Meritage Homes" },
        { name: "Pulte Homes", href: "/new-construction/builders/pulte-homes" },
        { name: "Lennar", href: "/new-construction/builders/lennar" },
        { name: "M/I Homes" },
        { name: "Dream Finders Homes" },
        { name: "K. Hovnanian Homes" },
        { name: "Mattamy Homes", href: "/new-construction/builders/mattamy-homes" },
        { name: "DR Horton" },
        { name: "Del Webb", href: "/new-construction/builders/del-webb" },
        { name: "Beazer Homes" },
        { name: "Ryan Homes" },
        { name: "Stanley Martin Homes" },
        { name: "Cardel Homes" },
        { name: "Craft Homes" },
        { name: "Park Square Homes" },
        { name: "Rockwell Homes" },
      ],
    },
  ] satisfies BuilderTypeGroup[],
  submarketsEyebrow: "Builders by Submarket",
  submarketsHeadline: "Who's building where",
  submarketsLead:
    "Builder quality varies by community, not just by brand. These are the names most active in each corridor right now.",
  submarkets: [
    {
      name: "College Park / Winter Park",
      body: "Davila Custom Homes · M. Lahr Homes",
      links: [
        { href: "/neighborhoods/winter-park", label: "Homes for sale in Winter Park" },
      ],
    },
    {
      name: "Horizon West / Winter Garden",
      body: "Highland Homes · Hanover Family Builders · Cardel Homes · Jones Homes USA",
      links: [
        { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
        { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
      ],
    },
    {
      name: "Lake Nona / SE Orlando / St. Cloud",
      body: "Beazer Homes · Jones Homes USA · Stanley Martin Homes · Hanover Family Builders · Cardel Homes",
      links: [
        { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
      ],
    },
  ] satisfies BuilderArea[],
  whyEyebrow: "Why It Matters",
  whyHeadline: "Picked your builder? Now get your own advocate.",
  whyCard: {
    title: "I know these builders",
    body: "I've walked buyers through most of the names on this page. I know whose timelines slip, whose incentives have room, and which floor-plan options are worth the money.",
  },
  faqHeadline: "Orlando builder questions answered",
  faq: [
    {
      question:
        "What is the difference between custom, semi-custom, and production builders?",
      answer:
        "Production builders like Lennar or Pulte build fixed floor plans at volume, which keeps prices down but limits changes. Custom builders design the home around you at a premium. Semi-custom builders such as David Weekley or Toll Brothers sit in between: you start from their plans but can modify layouts, elevations, and structural options.",
    },
    {
      question: "Do I need my own agent to buy from an Orlando builder?",
      answer:
        "Yes. The builder's on-site sales rep represents the builder. Your own agent guides the contract, advises on decisions, and negotiates incentives like closing cost credits, upgrades, and lot considerations. Compensation is arranged with the builder, in line with customary practice.",
    },
    {
      question: "Which builders are active in Horizon West and Lake Nona?",
      answer:
        "Horizon West and Winter Garden are Orlando's busiest corridor, with Highland Homes, Hanover Family Builders, Cardel Homes, and Jones Homes USA among the most active. In Lake Nona and southeast Orlando, look for Beazer Homes, Stanley Martin Homes, Jones Homes USA, Hanover, and Cardel.",
    },
    {
      question: "Does working with Nicole cost more on new construction?",
      answer:
        "No. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. The difference is whether anyone at the table is negotiating for you.",
    },
  ] satisfies FaqEntry[],
  ctaHeadline: "Tell me which builder you're considering",
  ctaBody:
    "I'll tell you what I know about their communities, their contracts, and where the room is. No pressure, just a straight answer before you sign anything.",
};

/** Every builder listed on the hub, in the order the ItemList schema expects. */
export const hubBuilderNames: string[] = buildersHub.types.flatMap((group) =>
  group.builders.map((b) => b.name),
);

/* ------------------------------------------------------------------ */
/* Individual builder pages                                            */
/* ------------------------------------------------------------------ */

const BUILDER_BLOG_PATH = "/blog/home-builders-in-orlando";

export const builderPages: BuilderPageContent[] = [
  {
    slug: "del-webb",
    name: "Del Webb",
    seoTitle: "Del Webb Homes in Orlando, FL | Buyer's Agent Nicole Mickle",
    metaDescription:
      "Considering a Del Webb 55+ community near Orlando? 30-year expert Nicole Mickle compares Minneola and Clermont communities, floor plans, and incentives.",
    h1Lead: "Del Webb",
    h1Display: "Homes in Orlando",
    intro:
      "Del Webb built its name on 55+ living, and the Orlando area is now one of its strongest markets. If you're weighing Del Webb's Orlando-area communities, I'll help you compare floor plans, lot premiums, HOA structures, and incentives. The on-site sales rep works for the builder. I work for you.",
    secondaryCta: { href: BUILDER_BLOG_PATH, label: "Read my full Del Webb review" },
    stats: [
      { value: "55+", label: "Community focus" },
      { value: "Low $400s", label: "Typical entry" },
      { value: "2", label: "Lake County communities" },
    ],
    takeHeadline: "What I tell buyers about Del Webb",
    takeLead:
      "Del Webb is one of my favorite recommendations for buyers looking to enjoy retirement without giving up convenience or an active lifestyle. From my full builder reviews.",
    takeLists: [
      {
        title: "Best for",
        items: [
          "Active adults 55 and older",
          "Relocation buyers planning retirement",
          "Empty nesters simplifying their lifestyle",
          "Buyers who want low-maintenance ownership and a full social calendar",
        ],
      },
      {
        title: "What they do well",
        items: [
          "Exceptional master-planned 55+ communities",
          "Thoughtfully designed single-story floor plans",
          "Resort-style amenities and year-round activities",
          "Locations near shopping, healthcare, and recreation",
        ],
      },
      {
        title: "What to consider",
        items: [
          "HOA fees run higher because of the amenity load",
          "Most communities are age-restricted",
          "Popular floor plans sell quickly",
        ],
      },
    ],
    whereHeadline: "Where Del Webb is building",
    areas: [
      {
        name: "Minneola",
        body: "Del Webb Minneola, near Sugarloaf Mountain, homes from the low $400s.",
        links: [
          { href: "/neighborhoods/minneola", label: "New construction in Minneola" },
        ],
      },
      {
        name: "Clermont / Wellness Way",
        body: "Del Webb Wellness Way, 14 floor plans from the low $400s.",
        links: [{ href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" }],
      },
      {
        name: "Groveland / Lake County corridor",
        body: "The center of gravity for Orlando-area active-adult building.",
        links: [
          { href: "/neighborhoods/groveland", label: "Homes for sale in Groveland" },
        ],
      },
    ],
    representationHeadline: "The sales office works for Del Webb. I work for you.",
    representationBody:
      "I visit Del Webb models across Central Florida, and I know their sales teams, popular floor plans, and off-market inventory. That's what I bring to your side of the table.",
    faqHeadline: "Del Webb questions answered",
    faq: [
      {
        question: "Where are Del Webb communities in the Orlando area?",
        answer:
          "Del Webb's Orlando-area activity centers on Lake County. Del Webb Minneola sits near Sugarloaf Mountain with homes from the low $400s, and Del Webb Wellness Way in Clermont offers 14 floor plans, also from the low $400s. Both keep you within reach of Orlando at a quieter pace.",
      },
      {
        question: "Are all Del Webb communities age-restricted?",
        answer:
          "Most Del Webb communities are 55+, though rules on younger residents and guests vary by community. I confirm the specific restrictions, HOA fees, and amenity structure for any community you're considering before you commit.",
      },
      {
        question: "What do Del Webb HOA fees cover?",
        answer:
          "Fees run higher than a typical neighborhood because they fund resort-style amenities, activity programming, and often exterior maintenance. The value is real if you'll use it. I help buyers weigh the fee against the lifestyle they actually want.",
      },
      {
        question: "Do I need my own agent to buy a Del Webb home?",
        answer:
          "Yes. The on-site sales rep represents the builder, part of the Pulte Group. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. I negotiate incentives, lot premiums, and options on your side.",
      },
    ],
    ctaHeadline: "Considering Del Webb? Talk to me first.",
  },

  {
    slug: "pulte-homes",
    name: "Pulte Homes",
    seoTitle: "Pulte Homes in Orlando, FL | Buyer's Agent Nicole Mickle",
    metaDescription:
      "Buying a Pulte home in Orlando? 30-year expert Nicole Mickle knows their communities, floor plans, and where incentives have room. Your advocate, built in.",
    h1Lead: "Pulte Homes",
    h1Display: "in Orlando",
    intro:
      "Pulte Homes is one of the most active production builders in Orlando, and one I feel confident recommending, especially for relocation buyers. If you're looking at a Pulte community, I'll help you compare floor plans and negotiate incentives. The on-site sales rep works for Pulte. I work for you.",
    secondaryCta: { href: BUILDER_BLOG_PATH, label: "Read my full Pulte Homes review" },
    stats: [
      { value: "Production", label: "Builder type" },
      { value: "Horizon West", label: "Key corridor" },
      { value: "Del Webb", label: "Their 55+ brand" },
    ],
    takeHeadline: "What I tell buyers about Pulte",
    takeLead:
      "Pulte is one of the builders I feel confident recommending, especially for relocation buyers. I've had consistently positive experiences with their sales teams and construction staff.",
    takeLists: [
      {
        title: "Best for",
        items: [
          "Relocation buyers",
          "Families who want functional floor plans",
          "First-time and move-up buyers",
          "Buyers prioritizing long-term resale value",
        ],
      },
      {
        title: "What they do well",
        items: [
          "Community locations with growth potential",
          "Functional floor plans for everyday living",
          "Wide variety of collections and price points",
          "Consistently strong resale appeal",
        ],
      },
      {
        title: "What to consider",
        items: [
          "Design studio options vary by community",
          "Limited inventory in popular communities",
          "Floor plans differ between neighborhoods",
        ],
      },
    ],
    whereHeadline: "Where Pulte Homes is building",
    areas: [
      {
        name: "Horizon West",
        body: "Orlando's busiest new construction corridor and Pulte's most active area.",
        links: [
          { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
        ],
      },
      {
        name: "Winter Garden",
        body: "Established west-side communities with strong resale track records.",
        links: [
          { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
        ],
      },
    ],
    representationHeadline: "The sales office works for Pulte Homes. I work for you.",
    representationBody:
      "I visit Pulte Homes models across Central Florida, and I know their sales teams, popular floor plans, and off-market inventory. That's what I bring to your side of the table.",
    faqHeadline: "Pulte Homes questions answered",
    faq: [
      {
        question: "Where is Pulte building in Orlando?",
        answer:
          "Pulte's most active corridor is Horizon West and Winter Garden, the busiest new construction area in Orlando. Availability shifts community by community, and popular neighborhoods carry limited inventory, so timing matters.",
      },
      {
        question: "Are Pulte homes good quality?",
        answer:
          "In my experience, Pulte is one of the builders I feel confident recommending, especially for relocation buyers: functional floor plans, strong community locations, and consistently strong resale appeal. Included features vary by community, which is where a walkthrough with someone who knows their product helps.",
      },
      {
        question: "What's the difference between Pulte and Del Webb?",
        answer:
          "Del Webb is Pulte Group's 55+ active-adult brand. Same construction company, different lifestyle: Del Webb communities are age-restricted with resort amenities, while Pulte communities serve first-time, family, and move-up buyers.",
      },
      {
        question: "Do I need my own agent to buy a Pulte home?",
        answer:
          "Yes. The on-site sales rep represents the builder. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. I negotiate incentives, floor-plan options, and lot decisions on your side.",
      },
    ],
    ctaHeadline: "Considering Pulte Homes? Talk to me first.",
  },

  {
    slug: "toll-brothers",
    name: "Toll Brothers",
    seoTitle: "Toll Brothers Homes in Orlando | Buyer's Agent Nicole Mickle",
    metaDescription:
      "Buying a Toll Brothers home in Orlando? 30-year expert Nicole Mickle guides design studio decisions, structural options, and incentives on your side.",
    h1Lead: "Toll Brothers",
    h1Display: "Homes in Orlando",
    intro:
      "Toll Brothers is Orlando's benchmark semi-custom builder: you start from their plans and personalize from there, and the choices add up fast. I help buyers decide which structural options and design studio upgrades hold their value. The on-site sales rep works for Toll Brothers. I work for you.",
    secondaryCta: {
      href: BUILDER_BLOG_PATH,
      label: "Read my full Toll Brothers review",
    },
    stats: [
      { value: "Semi-custom", label: "Builder type" },
      { value: "$400K–$2.4M+", label: "Price range" },
      { value: "7+", label: "Orlando-area communities" },
    ],
    takeHeadline: "What I tell buyers about Toll Brothers",
    takeLead:
      "Toll Brothers consistently raises the bar for design, architecture, and customer experience, and they anticipate what buyers will want next. From my full builder reviews.",
    takeLists: [
      {
        title: "Best for",
        items: [
          "Luxury and move-up buyers",
          "Relocation buyers seeking premium communities",
          "Buyers who want a semi-custom experience",
          "Buyers who value architecture and personalization",
        ],
      },
      {
        title: "What they do well",
        items: [
          "Exceptional architectural design and curb appeal",
          "Extensive design studio and personalization options",
          "Beautifully planned communities and amenities",
          "Consistent quality before and after closing",
        ],
      },
      {
        title: "What to consider",
        items: [
          "Personalization can move the final price well past base",
          "Limited homesites in the most desirable communities",
          "Included features vary by community",
        ],
      },
    ],
    whereHeadline: "Where Toll Brothers is building",
    areas: [
      {
        name: "Horizon West",
        body: "Lakeshore is the flagship in Orlando's busiest corridor.",
        links: [
          { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
        ],
      },
      {
        name: "Lake Nona",
        body: "Premium communities in southeast Orlando's master-planned hub.",
        links: [
          { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
        ],
      },
      {
        name: "Winter Garden and beyond",
        body: "Communities from Windermere and Winter Garden out to Montverde, Sanford, Apopka, and St. Cloud.",
        links: [
          { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
          { href: "/neighborhoods/windermere", label: "Homes for sale in Windermere" },
        ],
      },
    ],
    representationHeadline: "The sales office works for Toll Brothers. I work for you.",
    representationBody:
      "I visit Toll Brothers models across Central Florida, and I know their sales teams, popular floor plans, and off-market inventory. That's what I bring to your side of the table.",
    faqHeadline: "Toll Brothers questions answered",
    faq: [
      {
        question: "Is Toll Brothers a custom builder?",
        answer:
          "Toll Brothers is semi-custom: you start from their floor plans and personalize through structural options and their design studio. It's the middle ground between production pricing and full custom, but personalization adds up fast, which is where independent advice pays for itself.",
      },
      {
        question: "Where does Toll Brothers build in the Orlando area?",
        answer:
          "Lakeshore in Horizon West is the flagship, with communities across the region including Lake Nona, Winter Garden, Windermere, and out to Montverde, Sanford, Apopka, and St. Cloud. Entry points start around $400K in select communities, with estate homes running $900K to $2.4M and up.",
      },
      {
        question: "What should I budget beyond the base price?",
        answer:
          "Design studio and structural options can move the final number well past the base price. I help buyers separate the options that hold value at resale from the ones that only look good in the model.",
      },
      {
        question: "Do I need my own agent to buy a Toll Brothers home?",
        answer:
          "Yes. The on-site sales rep represents the builder. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. I negotiate incentives, floor-plan options, and lot decisions on your side.",
      },
    ],
    ctaHeadline: "Considering Toll Brothers? Talk to me first.",
  },

  {
    slug: "lennar",
    name: "Lennar",
    seoTitle: "Lennar Homes in Orlando, FL | Buyer's Agent Nicole Mickle",
    metaDescription:
      "Buying a Lennar home in Orlando? 30-year expert Nicole Mickle helps you compare communities and floor plans, and negotiates incentives on your side.",
    h1Lead: "Lennar",
    h1Display: "Homes in Orlando",
    intro:
      "Lennar builds at volume across Orlando's new construction corridors, which keeps pricing sharp and timelines fast. The trade-off is flexibility, so the win is in lot choice, quick move-in inventory, and incentives. That's where I focus. The on-site sales rep works for Lennar. I work for you.",
    secondaryCta: { href: BUILDER_BLOG_PATH, label: "More builder reviews" },
    stats: [
      { value: "Production", label: "Builder type" },
      { value: "Horizon West", label: "Key corridor" },
      { value: "6–12 mo", label: "Typical build time" },
    ],
    takeHeadline: "What I tell buyers about Lennar",
    takeLead:
      "I visit Lennar model homes across Central Florida and meet their sales staff regularly, so I know which plans are popular, where the quick move-in inventory sits, and what's negotiable.",
    takeLists: [
      {
        title: "Best for",
        items: [
          "First-time and value-focused buyers",
          "Buyers who want the most home for the money",
          "Buyers on a timeline who need quick move-in inventory",
        ],
      },
      {
        title: "What they do well",
        items: [
          "Volume pricing across Orlando's main corridors",
          "Popular features packaged into the base price",
          "Fast, predictable build timelines",
          "Deep quick move-in inventory",
        ],
      },
      {
        title: "What to consider",
        items: [
          "Floor plans are fixed, with limited structural changes",
          "Included features and incentives vary by community",
          "The negotiating room is in incentives and inventory, not the plan",
        ],
      },
    ],
    whereHeadline: "Where Lennar is building",
    areas: [
      {
        name: "Horizon West",
        body: "The busiest corridor in Orlando new construction, and Lennar's biggest footprint.",
        links: [
          { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
        ],
      },
      {
        name: "Orlando's growth corridors",
        body: "Active communities across the metro's main new construction areas.",
        links: [
          { href: "/new-construction", label: "New construction homes in Orlando" },
        ],
      },
    ],
    representationHeadline: "The sales office works for Lennar. I work for you.",
    representationBody:
      "I visit Lennar models across Central Florida, and I know their sales teams, popular floor plans, and off-market inventory. That's what I bring to your side of the table.",
    faqHeadline: "Lennar questions answered",
    faq: [
      {
        question: "Where is Lennar building in Orlando?",
        answer:
          "Lennar is active across Orlando's main new construction corridors, with Horizon West the busiest. Inventory moves quickly, and quick move-in homes are often where the best incentives sit.",
      },
      {
        question: "Can I customize a Lennar home?",
        answer:
          "Lennar is a production builder: floor plans are fixed and most features come packaged into the base price. That keeps pricing sharp and timelines fast. The flexibility is in lot selection, quick move-in inventory, and incentives, which is where I focus.",
      },
      {
        question: "Are Lennar incentives negotiable?",
        answer:
          "Often, yes. Closing cost credits, rate buydowns, and pricing on standing inventory all have room at different points in the year. The on-site rep won't lead with that. Having your own agent means someone at the table is asking.",
      },
      {
        question: "Do I need my own agent to buy a Lennar home?",
        answer:
          "Yes. The on-site sales rep represents the builder. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. I negotiate incentives, floor-plan options, and lot decisions on your side.",
      },
    ],
    ctaHeadline: "Considering Lennar? Talk to me first.",
  },

  {
    slug: "mattamy-homes",
    name: "Mattamy Homes",
    seoTitle: "Mattamy Homes in Orlando, FL | Buyer's Agent Nicole Mickle",
    metaDescription:
      "Buying a Mattamy home in Orlando? 30-year expert Nicole Mickle compares their Lake Nona, Celebration, and Horizon West communities and negotiates for you.",
    h1Lead: "Mattamy Homes",
    h1Display: "in Orlando",
    intro:
      "Mattamy Homes covers more ground than almost any builder in Orlando, from low-maintenance villas to estate-style homes across Lake Nona, Celebration, and Horizon West. I'll help you find the right community and floor plan, then negotiate it. The on-site sales rep works for Mattamy. I work for you.",
    secondaryCta: {
      href: BUILDER_BLOG_PATH,
      label: "Read my full Mattamy Homes review",
    },
    stats: [
      { value: "Production", label: "Builder type" },
      { value: "3", label: "Key corridors" },
      { value: "Villas–estates", label: "Product range" },
    ],
    takeHeadline: "What I tell buyers about Mattamy",
    takeLead:
      "Mattamy has something for almost every type of buyer. Their wide range of communities, floor plans, and price points makes them especially appealing for relocation buyers. From my full builder reviews.",
    takeLists: [
      {
        title: "Best for",
        items: [
          "First-time and move-up buyers",
          "Relocation buyers who want variety",
          "Buyers wanting personalization with move-in-ready options",
          "Buyers seeking low-maintenance villas or estate homes",
        ],
      },
      {
        title: "What they do well",
        items: [
          "Wide variety of floor plans, collections, and price points",
          "Communities throughout Orlando and Central Florida",
          "Strong selection of quick move-in homes",
          "Energy-efficient construction and modern designs",
        ],
      },
      {
        title: "What to consider",
        items: [
          "Design studio availability varies by community and construction stage",
          "Included features differ between neighborhoods",
          "Inventory changes quickly in popular locations",
        ],
      },
    ],
    whereHeadline: "Where Mattamy Homes is building",
    areas: [
      {
        name: "Lake Nona",
        body: "One of Mattamy's strongest Orlando footprints in the master-planned southeast.",
        links: [
          { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
        ],
      },
      {
        name: "Celebration",
        body: "Established, walkable, and rarely available for long.",
        links: [
          { href: "/neighborhoods/celebration", label: "Homes for sale in Celebration" },
        ],
      },
      {
        name: "Horizon West",
        body: "Active communities in Orlando's busiest new construction corridor.",
        links: [
          { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
        ],
      },
    ],
    representationHeadline: "The sales office works for Mattamy Homes. I work for you.",
    representationBody:
      "I visit Mattamy Homes models across Central Florida, and I know their sales teams, popular floor plans, and off-market inventory. That's what I bring to your side of the table.",
    faqHeadline: "Mattamy Homes questions answered",
    faq: [
      {
        question: "Where does Mattamy build in Orlando?",
        answer:
          "Mattamy's Orlando footprint runs through Lake Nona, Celebration, and Horizon West, with product ranging from low-maintenance villas to estate-style homes. It's one of the widest ranges of floor plans and price points in the market.",
      },
      {
        question: "Who is a Mattamy home best for?",
        answer:
          "Almost every type of buyer: first-time, move-up, and especially relocation buyers, because the range of communities and price points means you can compare real options without changing builders.",
      },
      {
        question: "What should I consider before buying a Mattamy home?",
        answer:
          "Design studio availability varies by community and construction stage, included features differ between neighborhoods, and inventory changes quickly in popular locations. I track what's actually available before you fall in love with a plan.",
      },
      {
        question: "Do I need my own agent to buy a Mattamy home?",
        answer:
          "Yes. The on-site sales rep represents the builder. Builder pricing is designed to include buyer representation, so having your own advocate does not raise your price. I negotiate incentives, floor-plan options, and lot decisions on your side.",
      },
    ],
    ctaHeadline: "Considering Mattamy Homes? Talk to me first.",
  },
];

export function getBuilderPage(slug: string): BuilderPageContent | undefined {
  return builderPages.find((b) => b.slug === slug);
}

/** Paths for the sitemap and the Page SEO seed script. */
export const builderPaths: string[] = [
  "/new-construction/builders",
  ...builderPages.map((b) => `/new-construction/builders/${b.slug}`),
];
