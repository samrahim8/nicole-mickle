import type { FaqEntry } from "@/components/faq-accordion";

/**
 * Per-page SEO + content overrides for the neighborhood guides, supplied by
 * Nicole's SEO contractor (201 Creative) in the July 2026 Page Implementation
 * Sheet.
 *
 * Only the 13 neighborhoods covered by that sheet have entries here. Any
 * neighborhood without one keeps its original hero, metadata and "Other
 * neighborhoods" block — the detail page treats every field as optional, so
 * Dr. Phillips, Baldwin Park, Oakland and Montverde render exactly as before.
 *
 * H1s are split into a lead-in and a display line so the hero can keep the
 * neighborhood name visually dominant while the <h1> still reads as the full
 * target phrase ("Homes for Sale in Clermont, FL"). The sheet explicitly
 * allows this.
 */
export interface NeighborhoodLink {
  href: string;
  label: string;
}

export interface NeighborhoodPageContent {
  /** Complete <title>, no brand suffix appended. */
  seoTitle: string;
  metaDescription: string;
  /** Small eyebrow line, e.g. "Homes for Sale in". */
  h1Lead: string;
  /** Dominant display line, e.g. "Clermont, FL". */
  h1Display: string;
  /** Added below the hero, above the existing lifestyle content. */
  intro: string;
  /** Replaces the auto-computed related list, with exact anchor text. */
  relatedLinks: NeighborhoodLink[];
  faq: FaqEntry[];
}

export const neighborhoodPageContent: Record<string, NeighborhoodPageContent> = {
  clermont: {
    seoTitle: "Homes for Sale in Clermont, FL | Nicole Mickle",
    metaDescription:
      "Browse homes for sale in Clermont, FL with 30-year local expert Nicole Mickle. New construction, lakefront living, schools, and neighborhood insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Clermont, FL",
    intro:
      "Looking for homes for sale in Clermont, FL? You are looking at one of Central Florida's most active outdoor communities: rolling hills, the Clermont Chain of Lakes, and one of the hottest new construction markets in the region along the Wellness Way corridor. It is a place still becoming what it is going to be, and buyers who get in now are betting on that trajectory. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/minneola", label: "New construction in Minneola" },
      { href: "/neighborhoods/groveland", label: "Homes for sale in Groveland" },
      { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Clermont, FL cost?",
        answer:
          "Homes run from about $350K for townhomes and smaller single-family homes in newer communities up to $1M+ for lakefront properties and premium new construction. Most newer single-family homes fall in the $450K to $700K range.",
      },
      {
        question: "Is Clermont a good area for new construction?",
        answer:
          "Yes. Clermont is one of the hottest new construction markets in Central Florida, with over 200 active communities and national builders like Lennar, Pulte, D.R. Horton, and Meritage active along the Wellness Way corridor in communities like Wellness Ridge, Olympus, and Del Webb Lakehaven.",
      },
      {
        question: "What is it like living in Clermont, Orlando?",
        answer:
          "Clermont offers an active outdoor lifestyle: rolling hills for biking, the Clermont Chain of Lakes for kayaking, Lake Louisa State Park, and a triathlon training culture, with a revitalizing downtown and most daily errands along Highway 27.",
      },
      {
        question: "How far is Clermont from downtown Orlando and Disney?",
        answer:
          "Clermont is about 35 to 45 minutes from downtown Orlando, 25 to 30 minutes from Disney, and 40 to 50 minutes from Orlando International Airport.",
      },
    ],
  },

  "winter-garden": {
    seoTitle: "Homes for Sale in Winter Garden, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Winter Garden, FL from 30-year Orlando expert Nicole Mickle. New construction, historic downtown, schools, and lifestyle insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Winter Garden, FL",
    intro:
      "Looking for homes for sale in Winter Garden, FL? You are looking at one of Orlando's most sought-after places to live: a genuine historic downtown, the West Orange Trail at your doorstep, and a strong mix of new construction and established neighborhoods. After 30 years selling in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
      { href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" },
      { href: "/neighborhoods/ocoee", label: "Homes for sale in Ocoee" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Winter Garden, FL cost?",
        answer:
          "Homes run from about $350K for townhomes and smaller homes in newer communities up to $2M+ for custom and estate properties. Most single-family homes fall in the $550K to $1M range.",
      },
      {
        question: "Is Winter Garden a good area for new construction?",
        answer:
          "Yes. Winter Garden has a strong mix of new construction in the communities surrounding the historic downtown, with national builders like Toll Brothers, Taylor Morrison, Pulte, and D.R. Horton active in Waterleigh, Oakland Park, and Harvest at Ovation.",
      },
      {
        question: "What is it like living in Winter Garden, Orlando?",
        answer:
          "Winter Garden offers genuine small-town character: a walkable historic downtown on Plant Street, the 22-mile West Orange Trail, a Saturday farmers market, and the restored Garden Theatre, all within reach of Orlando and Disney.",
      },
      {
        question: "How far is Winter Garden from downtown Orlando and Disney?",
        answer:
          "Winter Garden is about 25 to 35 minutes from downtown Orlando, 15 to 25 minutes from Disney, and 35 to 45 minutes from Orlando International Airport.",
      },
    ],
  },

  "winter-park": {
    seoTitle: "Homes for Sale in Winter Park, FL | Nicole Mickle",
    metaDescription:
      "Explore homes for sale in Winter Park, FL with 30-year local expert Nicole Mickle. Historic, walkable, lakefront living plus schools and market insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Winter Park, FL",
    intro:
      "Looking for homes for sale in Winter Park, FL? You are looking at one of Orlando's most refined places to live: a walkable Park Avenue shopping and dining district, a historic chain of lakes, and Rollins College anchoring a genuine cultural scene. Just 10 to 15 minutes from downtown Orlando, it blends tree-lined charm with top-rated schools. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/lake-mary", label: "Homes for sale in Lake Mary" },
      { href: "/neighborhoods/windermere", label: "Homes for sale in Windermere" },
      { href: "/neighborhoods/celebration", label: "Homes for sale in Celebration" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Winter Park, FL cost?",
        answer:
          "Homes run from about $450K for condos, townhomes, and smaller single-family homes up to $3M+ for lakefront estates, historic homes, and custom builds. Most updated 3-4 bedroom homes in established neighborhoods fall in the $650K to $1.2M range.",
      },
      {
        question: "Is Winter Park a good area for new construction?",
        answer:
          "Winter Park is mostly established and luxury, so new construction is limited. Most new builds are custom homes on infill lots or tear-down rebuilds from builders like Phil Kean Design Group, David Weekley Homes, and Surrey Homes, with some new townhomes in adjacent Winter Park Village and Maitland.",
      },
      {
        question: "What is it like living in Winter Park, Orlando?",
        answer:
          "Winter Park offers tree-lined charm and cultural sophistication: a walkable Park Avenue shopping and dining district, a Saturday farmer's market, the Rollins College campus, and a scenic chain of lakes, all just minutes from downtown Orlando.",
      },
      {
        question: "How far is Winter Park from downtown Orlando and Disney?",
        answer:
          "Winter Park is about 10 to 15 minutes from downtown Orlando, 30 to 40 minutes from Disney, and 25 to 30 minutes from Orlando International Airport.",
      },
    ],
  },

  celebration: {
    seoTitle: "Homes for Sale in Celebration, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Celebration, FL with 30-year Orlando expert Nicole Mickle. Walkable, master-planned town living, condos, schools, and market insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Celebration, FL",
    intro:
      "Looking for homes for sale in Celebration, FL? This is a walkable, master-planned town where you stroll to dinner downtown and kids ride bikes to the park. The architecture is intentionally varied, from Coastal to Classical to Victorian to Colonial, giving it real character that most planned communities lack. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
      { href: "/neighborhoods/windermere", label: "Homes for sale in Windermere" },
      { href: "/neighborhoods/winter-park", label: "Homes for sale in Winter Park" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Celebration, FL cost?",
        answer:
          "Homes run from about $350K for condos, townhomes, and smaller homes in the outer neighborhoods up to $1.2M+ for lakefront and premium lot homes. Most single-family homes in established neighborhoods fall in the $550K to $850K range.",
      },
      {
        question: "Is Celebration a good area for new construction?",
        answer:
          "Celebration is a mostly established master-planned town with limited new construction. Original Celebration is largely built out, but Mattamy Homes is active in Celebration-adjacent communities like Island Village, which add newer inventory at competitive price points.",
      },
      {
        question: "What is it like living in Celebration, Orlando?",
        answer:
          "Celebration is a walkable town designed for community. You walk to dinner downtown, kids ride bikes to the park, and there are events nearly every weekend, with intentionally varied architecture from Coastal to Classical, Victorian, and Colonial styles.",
      },
      {
        question: "How far is Celebration from downtown Orlando and Disney?",
        answer:
          "Celebration is about 25 to 35 minutes from downtown Orlando, 5 to 15 minutes from Disney, and 20 to 30 minutes from Orlando International Airport.",
      },
    ],
  },

  windermere: {
    seoTitle: "Homes for Sale in Windermere, FL | Nicole Mickle",
    metaDescription:
      "Luxury homes for sale in Windermere, FL with 30-year local expert Nicole Mickle. Lakefront, gated communities, new construction, and market insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Windermere, FL",
    intro:
      "Looking for homes for sale in Windermere, FL? You are looking at one of Orlando's premier lakefront communities, built around the pristine Butler Chain of Lakes with gated neighborhoods, large lots, and top-rated schools. It is quieter than most of Orlando's popular areas, with a charming old-Florida downtown and easy access to Disney. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
      { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
      { href: "/neighborhoods/celebration", label: "Homes for sale in Celebration" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Windermere, FL cost?",
        answer:
          "Homes run from about $650K for properties in communities adjacent to Windermere up to $5M+ for lakefront estates on the Butler Chain. Most gated-community homes fall in the $900K to $1.5M range, with premium custom builds and direct lakefront properties in Isleworth and Bay Hill above that.",
      },
      {
        question: "Is Windermere a good area for new construction?",
        answer:
          "Yes, though the core of Windermere is established, so new construction is primarily custom builds on remaining lots plus a few newer communities like Saddlecrest at Windermere and Palms at Windermere. Builders such as Toll Brothers, Dream Finders, and Ryan Homes are active, and adjacent Horizon West offers extensive new construction with Windermere mailing addresses.",
      },
      {
        question: "What is it like living in Windermere, Orlando?",
        answer:
          "Windermere is space and water: weekend mornings on the boat, kids playing in big backyards, and sunsets over the lake. It's quieter than most of Orlando's popular neighborhoods, with a charming old-Florida downtown of small shops and restaurants and easy access to Disney.",
      },
      {
        question: "How far is Windermere from downtown Orlando and Disney?",
        answer:
          "Windermere is about 20 to 35 minutes from downtown Orlando, 10 to 15 minutes from Disney, and 25 to 35 minutes from Orlando International Airport.",
      },
    ],
  },

  sanford: {
    seoTitle: "Homes for Sale in Sanford, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Sanford, FL with 30-year Orlando expert Nicole Mickle. Historic lakefront city, new construction, value buys, and neighborhood insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Sanford, FL",
    intro:
      "Looking for homes for sale in Sanford, FL? You are looking at a historic lakefront city with a walkable downtown core, a 4.5-mile RiverWalk along Lake Monroe, and a food and arts scene that punches well above its weight. It is one of the few places where you can get Seminole County schools at lower price points than Lake Mary. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/lake-mary", label: "Homes for sale in Lake Mary" },
      { href: "/neighborhoods/apopka", label: "Homes for sale in Apopka" },
      { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Sanford, FL cost?",
        answer:
          "Homes run from about $250K for older single-family homes, historic bungalows, and townhomes up to $650K+ for waterfront properties on Lake Monroe and renovated historic homes. Most updated and newer-construction homes fall in the $375K to $500K range.",
      },
      {
        question: "Is Sanford a good area for new construction?",
        answer:
          "Yes. Sanford has a moderate but growing new construction market with builders like M/I Homes, Beazer, D.R. Horton, Lennar, and Pulte active in communities such as Estates at Lake Jesup and Bradbury Estates, at lower price points than Lake Mary while still offering Seminole County schools.",
      },
      {
        question: "What is it like living in Sanford, Orlando?",
        answer:
          "Sanford offers a distinct lifestyle: a walkable 4-5 block historic downtown with award-winning restaurants, a 4.5-mile RiverWalk along Lake Monroe, a Saturday farmers market, and a monthly Art Walk, all with direct St. Johns River boating access.",
      },
      {
        question: "How far is Sanford from downtown Orlando and Disney?",
        answer:
          "Sanford is about 30 to 35 minutes from downtown Orlando, 55 to 65 minutes from Disney, and 35 to 40 minutes from Orlando International Airport. The SunRail station also offers car-free access to downtown Orlando.",
      },
    ],
  },

  "lake-mary": {
    seoTitle: "Homes for Sale in Lake Mary, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Lake Mary, FL with 30-year local expert Nicole Mickle. Top-rated schools, corporate-hub convenience, new construction, market insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Lake Mary, FL",
    intro:
      "Looking for homes for sale in Lake Mary, FL? You are looking at Seminole County's polished suburban hub, home to one of the top-rated school districts in Florida and corporate headquarters like AAA. Weekends center on Colonial TownPark with its Saturday farmers market, while the Cross Seminole and Seminole Wekiva Trails make it easy to bike or walk without ever hitting a major road. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/sanford", label: "Homes for sale in Sanford" },
      { href: "/neighborhoods/winter-park", label: "Homes for sale in Winter Park" },
      { href: "/neighborhoods/lake-nona", label: "New construction in Lake Nona" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Lake Mary, FL cost?",
        answer:
          "Homes run from about $350K for townhomes and older resale single-family homes up to $1M+ for Heathrow gated properties, lakefront homes, and luxury new construction. Most newer single-family homes fall in the $475K to $700K range.",
      },
      {
        question: "Is Lake Mary a good area for new construction?",
        answer:
          "New construction is limited. Lake Mary is largely built out, so most new builds are custom infill from builders like David Weekley Homes and Holland Builders Co. Strong school demand keeps resale values high, but raw land for new communities is scarce.",
      },
      {
        question: "What is it like living in Lake Mary, Orlando?",
        answer:
          "Lake Mary is a polished suburban hub with top-rated Seminole County schools, corporate offices like AAA, walkable shopping and dining at Colonial TownPark, a Saturday farmers market, and an extensive trail system for biking and walking.",
      },
      {
        question: "How far is Lake Mary from downtown Orlando and Disney?",
        answer:
          "Lake Mary is about 25 to 30 minutes from downtown Orlando, 35 to 40 minutes from Orlando International Airport, and 40 to 55 minutes from Disney.",
      },
    ],
  },

  "lake-nona": {
    seoTitle: "New Construction Homes in Lake Nona, FL | Nicole Mickle",
    metaDescription:
      "New construction & homes for sale in Lake Nona, FL with 30-year expert Nicole Mickle. Master-planned living, Laureate Park, schools, and builder insight.",
    h1Lead: "New Construction Homes in",
    h1Display: "Lake Nona",
    intro:
      "Looking for new construction homes in Lake Nona, FL? This is Orlando's master-planned community of the future, built around Medical City, the USTA National Campus, and a walkable town center designed for the way people live today. Laureate Park anchors it all with new everything and the best community events calendar in Orlando. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/celebration", label: "Homes for sale in Celebration" },
      { href: "/neighborhoods/lake-mary", label: "Homes for sale in Lake Mary" },
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
    ],
    faq: [
      {
        question: "How much do new construction homes in Lake Nona cost?",
        answer:
          "New construction runs from about $400K for townhomes in Laureate Park up to $2M+ for luxury homes in Lake Nona Golf & Country Club and custom builds. Most single-family homes fall in the $600K to $1M range.",
      },
      {
        question: "Which builders are active in Lake Nona?",
        answer:
          "Tavistock Development continues to expand the community, and national builders are active across Laureate Park, Storey Park, Alora, and Nona Sound, including Toll Brothers, Pulte, Ashton Woods, David Weekley, Dream Finders, M/I Homes, ICI Homes, Del Webb, and Craft Homes.",
      },
      {
        question: "What is it like living in Lake Nona, Orlando?",
        answer:
          "Lake Nona is a master-planned community built for the way people live today, with autonomous shuttles, a performance club, the USTA National Campus, and a walkable town center. It attracts a younger, professional demographic of medical professionals, tech workers, and families who want new everything, and the community programming is excellent.",
      },
      {
        question: "How far is Lake Nona from downtown Orlando and the airport?",
        answer:
          "Lake Nona is about 10 to 15 minutes from Orlando International Airport, 25 to 35 minutes from downtown Orlando, and 25 to 35 minutes from Disney.",
      },
    ],
  },

  "horizon-west": {
    seoTitle: "New Construction Homes in Horizon West, FL | Nicole Mickle",
    metaDescription:
      "New construction homes in Horizon West, FL with 30-year expert Nicole Mickle. Hamlin, Lakeside & Ovation villages, builders, schools, and market insight.",
    h1Lead: "New Construction Homes in",
    h1Display: "Horizon West",
    intro:
      "Looking for new construction homes in Horizon West, FL? You are looking at Central Florida's largest concentration of new construction: six master-planned villages, brand-new schools, and nearly every national builder active at once. After 30 years in this market, I help buyers pick the right village and builder, negotiate floor plans and upgrades, and time incentives. Here is everything you need to know.",
    relatedLinks: [
      { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
      { href: "/neighborhoods/windermere", label: "Homes for sale in Windermere" },
      { href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" },
    ],
    faq: [
      {
        question: "How much do new construction homes in Horizon West cost?",
        answer:
          "New construction runs from about $350K for townhomes in Bridgewater and Lakeside up to $1.5M+ for larger custom homes in Windermere Sound and Overlook at Hamlin. Most single-family homes fall in the $500K to $800K range.",
      },
      {
        question: "Which builders are active in Horizon West?",
        answer:
          "Nearly every national builder is active here, including Toll Brothers, Lennar, Pulte, Taylor Morrison, M/I Homes, Meritage, Ashton Woods, Dream Finders, and D.R. Horton, spread across the villages.",
      },
      {
        question: "What are the villages in Horizon West?",
        answer:
          "Horizon West is organized into villages, each with its own town center: Bridgewater, Lakeside, Hamlin, Ovation, Hickory Nut, and Seidel. Hamlin is the social hub with the most dining and retail.",
      },
      {
        question: "How far is Horizon West from Disney and downtown Orlando?",
        answer:
          "Horizon West is about 10 to 20 minutes from Disney, 25 to 35 minutes from downtown Orlando, and 30 to 40 minutes from Orlando International Airport.",
      },
    ],
  },

  apopka: {
    seoTitle: "Homes for Sale in Apopka, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Apopka, FL with 30-year Orlando expert Nicole Mickle. New construction, natural springs, value buys, schools, and neighborhood insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Apopka, FL",
    intro:
      "Looking for homes for sale in Apopka, FL? You are looking at one of Orlando's most active new construction markets, with 27+ communities, Wekiwa Springs State Park at your doorstep, and more house for your money than closer-in suburbs. The Wekiva Parkway has dramatically improved connectivity, putting downtown Orlando and the theme parks within easy reach. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/sanford", label: "Homes for sale in Sanford" },
      { href: "/neighborhoods/lake-mary", label: "Homes for sale in Lake Mary" },
      { href: "/neighborhoods/ocoee", label: "Homes for sale in Ocoee" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Apopka, FL cost?",
        answer:
          "Homes run from about $310K for new construction townhomes and smaller single-family homes up to $700K+ for Toll Brothers and larger custom homes. Most single-family homes fall in the $400K to $550K range.",
      },
      {
        question: "Is Apopka a good area for new construction?",
        answer:
          "Yes. Apopka is one of the most active new construction markets in the Orlando metro, with 27+ communities and national builders like Toll Brothers, KB Home, Lennar, and D.R. Horton building in The Oaks at Kelly Park, Laurel Oaks, and Bronson's Ridge.",
      },
      {
        question: "What is it like living in Apopka, Orlando?",
        answer:
          "Daily life in Apopka revolves around the outdoors: kayaking the Wekiva River, hiking Wekiwa Springs State Park, and evenings at the Hall's On 5th food hall in a revitalizing downtown, all with easy access to Orlando and the theme parks via the Wekiva Parkway.",
      },
      {
        question: "How far is Apopka from downtown Orlando and Disney?",
        answer:
          "Apopka is about 30 to 35 minutes from downtown Orlando, 30 to 35 minutes from Disney, and 35 to 40 minutes from Orlando International Airport.",
      },
    ],
  },

  groveland: {
    seoTitle: "Homes for Sale in Groveland, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Groveland, FL with 30-year expert Nicole Mickle. Affordable new construction, active-adult communities, and Lake County insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Groveland, FL",
    intro:
      "Looking for homes for sale in Groveland, FL? This fast-growing Lake County town is where buyers find affordable new construction at a price point that is hard to match anywhere else in the Orlando metro. It is also home to Trilogy Orlando, one of the best 55+ active-adult resort communities in Central Florida. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" },
      { href: "/neighborhoods/minneola", label: "New construction in Minneola" },
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Groveland, FL cost?",
        answer:
          "Homes run from about $300K for townhomes and smaller new-construction homes up to $800K+ for premium and Trilogy Orlando 55+ homes. Most single-family homes fall in the $400K to $550K range.",
      },
      {
        question: "Is Groveland a good area for new construction?",
        answer:
          "Yes. Groveland is one of the most active new construction markets in Central Florida, with over 180 active communities and national builders like Lennar, D.R. Horton, Mattamy Homes, and Taylor Morrison building in Trinity Lakes, Waterstone, and Cypress Oaks. Trilogy Orlando by Shea Homes is the standout for the 55+ market.",
      },
      {
        question: "What is it like living in Groveland, Orlando?",
        answer:
          "Life in Groveland is community-centered, built around neighborhood pools, fitness centers, and weekend cookouts, with Clermont's dining and recreation 10-15 minutes north. The town is growing fast and the infrastructure is still catching up, so buyers here trade proximity for value and newer, larger homes.",
      },
      {
        question: "How far is Groveland from downtown Orlando and Disney?",
        answer:
          "Groveland is about 45 to 55 minutes from downtown Orlando, 30 to 35 minutes from Disney, and 45 to 50 minutes from Orlando International Airport.",
      },
    ],
  },

  ocoee: {
    seoTitle: "Homes for Sale in Ocoee, FL | Nicole Mickle",
    metaDescription:
      "Homes for sale in Ocoee, FL with 30-year Orlando expert Nicole Mickle. Connected west-side living, new construction, lakefront, and neighborhood insight.",
    h1Lead: "Homes for Sale in",
    h1Display: "Ocoee, FL",
    intro:
      "Looking for homes for sale in Ocoee, FL? You can be downtown in 15 minutes, at Disney in 20, or at the airport in 30, all without paying the premium of closer-in zip codes. Daily life here is lake-adjacent, with Starke Lake, Lake Olympia, and Bill Breeze Park, plus a historic downtown that is finally getting its moment. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/winter-garden", label: "Homes for sale in Winter Garden" },
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
      { href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" },
    ],
    faq: [
      {
        question: "How much do homes for sale in Ocoee, FL cost?",
        answer:
          "Homes run from about $350K for townhomes and smaller resale homes up to $900K+ for lakefront and larger executive properties. Most single-family homes fall in the $450K to $650K range in communities like Westyn Bay, Forest Lake Estates, and Wynwood.",
      },
      {
        question: "Is Ocoee a good area for new construction?",
        answer:
          "Yes, though it is more pocketed than Horizon West. D.R. Horton's Wynwood is the largest current offering, and builders like Ryan Homes, Pulte, Lennar, and Meritage are active across communities including Forest Lake Estates, Arden Park, and Preserve at Crown Point.",
      },
      {
        question: "What is it like living in Ocoee, Orlando?",
        answer:
          "Ocoee blends fast connectivity with lake-adjacent daily life. You have Starke Lake, Lake Olympia, and Bill Breeze Park, the West Orange Trail for cycling, and a historic downtown on McKey Street that is mid-revitalization, with Plant Street in Winter Garden just 10 minutes west.",
      },
      {
        question: "How far is Ocoee from downtown Orlando and Disney?",
        answer:
          "Ocoee is about 15 to 20 minutes from downtown Orlando, 15 to 25 minutes from Disney, and 25 to 30 minutes from Orlando International Airport, thanks to the SR-408, SR-429, and Turnpike interchanges that meet here.",
      },
    ],
  },

  minneola: {
    seoTitle: "New Construction Homes in Minneola, FL | Nicole Mickle",
    metaDescription:
      "New construction & homes for sale in Minneola, FL with 30-year expert Nicole Mickle. Elevated terrain, fast-growing communities, and builder insight.",
    h1Lead: "New Construction Homes in",
    h1Display: "Minneola, FL",
    intro:
      "Looking for new construction homes in Minneola, FL? Minneola is one of the few places in Central Florida where you get elevated terrain and scenic homesites, with master plans like the Hills of Minneola and Sugarloaf Ridge driving rapid growth. It sits between Winter Garden's downtown and Clermont's lakes, so you can buy new at a better value while staying close to dining, shopping, and the attractions. After 30 years in this market, here is everything you need to know before you buy.",
    relatedLinks: [
      { href: "/neighborhoods/clermont", label: "Homes for sale in Clermont" },
      { href: "/neighborhoods/groveland", label: "Homes for sale in Groveland" },
      { href: "/neighborhoods/horizon-west", label: "New construction in Horizon West" },
    ],
    faq: [
      {
        question: "How much do new construction homes in Minneola cost?",
        answer:
          "New construction runs from about $400K for townhomes and smaller single-family homes in communities like Sugarloaf Ridge up to $900K+ for larger homes and lakefront properties. Most single-family homes in the Hills of Minneola and Sugarloaf fall in the $500K to $650K range.",
      },
      {
        question: "Which builders are active in Minneola?",
        answer:
          "Multiple national builders are active here, including Lennar, Dream Finders, Meritage, Ashton Woods, D.R. Horton, Pulte, KB Home, Toll Brothers, and Ryan Homes, building across communities like the Hills of Minneola, Sugarloaf Ridge, and the Del Webb 55+ community.",
      },
      {
        question: "What is it like living in Minneola, Orlando?",
        answer:
          "Daily life centers around your community amenities like the pool, fitness center, and pickleball courts, with quick runs to Clermont or Winter Garden for dining and shopping. Winter Garden's Plant Street is about 10 minutes east. It's a practical choice for families who want a new home in a growing area that still feels manageable in size.",
      },
      {
        question: "How far is Minneola from downtown Orlando and Disney?",
        answer:
          "Minneola is about 25 to 30 minutes from Disney, 30 to 40 minutes from downtown Orlando, and 40 to 45 minutes from Orlando International Airport.",
      },
    ],
  },
};

/**
 * The 13 priority areas in the order the implementation sheet lists them.
 * Drives the "Where to Build" ordering on /new-construction so the highest-value
 * areas lead. Derived from the map above, so the two can never drift.
 */
export const PRIORITY_AREA_ORDER = Object.keys(neighborhoodPageContent);

/** Full H1 text as a single string, for metadata and schema use. */
export function neighborhoodH1(content: NeighborhoodPageContent) {
  return `${content.h1Lead} ${content.h1Display}`;
}
