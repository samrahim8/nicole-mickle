export interface PriceSegment {
  label: string;
  range: string;
  description: string;
}

export interface NewConstruction {
  summary: string;
  builders: string[];
  communities: string[];
}

export interface Neighborhood {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  lifestyleTags: string[];
  highlights: string[];
  priceRange: string;
  // Extended guide content
  lifestyle: string;
  bestFor: string[];
  notIdealFor: string[];
  priceSegments: PriceSegment[];
  newConstruction: NewConstruction;
  schools: string[];
  dining: string[];
  commute: {
    downtown: string;
    airport: string;
    disney: string;
  };
  localTips: string[];
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "winter-park",
    name: "Winter Park",
    tagline: "Tree-lined charm meets cultural sophistication",
    description:
      "Winter Park is Orlando's most beloved neighborhood for a reason. Brick-lined Park Avenue, world-class museums, and lakefront living create a walkable, cultured community that feels like a small town. Mature oak canopies, independent boutiques, and some of the best restaurants in Central Florida make this a perennial favorite for relocators.",
    lifestyleTags: ["Walkable", "Cultural", "Lakefront", "Dining"],
    highlights: [
      "Park Avenue shopping and dining district",
      "Rollins College campus and cultural events",
      "Chain of lakes with scenic boat tours",
      "Top-rated public and private schools",
    ],
    priceRange: "$500K - $3M+",
    lifestyle:
      "Winter Park is where you go when you want walkability, culture, and character. Saturday mornings at the farmer's market, afternoon strolls along Park Avenue, evening dinners at chef-driven restaurants. The pace is relaxed but the community is active. It's the kind of place where you run into your neighbors at the coffee shop and actually want to.",
    bestFor: [
      "Families who prioritize top-rated schools",
      "Professionals who value walkability and culture",
      "Relocators from Northeast cities who want a similar urban-village feel",
      "Empty nesters downsizing from larger suburban homes",
    ],
    notIdealFor: [
      "Buyers looking for new construction — most homes are established",
      "Those who need quick access to the attractions corridor",
      "Budget-conscious buyers under $450K",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$450K - $650K",
        description: "Condos, townhomes, and smaller single-family homes. Often in adjacent areas like Maitland or Hannibal Square.",
      },
      {
        label: "Mid-Range",
        range: "$650K - $1.2M",
        description: "Updated 3-4 bedroom homes in established Winter Park neighborhoods. Some lakefront access. Top school zones.",
      },
      {
        label: "Premium",
        range: "$1.2M - $3M+",
        description: "Lakefront estates, historic homes, and custom builds on large lots. Via Tuscany, Palmer Avenue, and lakefront properties.",
      },
    ],
    newConstruction: {
      summary: "New construction in Winter Park proper is limited due to the established nature of the community. Most new builds are custom homes on infill lots or tear-down rebuilds. Adjacent areas like Winter Park Village and parts of Maitland offer some new townhome developments.",
      builders: ["Custom builders", "Boutique infill developers"],
      communities: ["Winter Park Village", "Maitland infill developments"],
    },
    schools: [
      "Winter Park High School (A-rated)",
      "Brookshire Elementary (A-rated)",
      "The Geneva School (private, classical)",
      "Trinity Preparatory School (private)",
      "Rollins College campus community",
    ],
    dining: [
      "Prato — Italian, Park Avenue staple",
      "The Ravenous Pig — gastropub, nationally recognized",
      "Hillstone — upscale American, lakefront views",
      "Swine & Sons — casual, excellent sandwiches and brunch",
    ],
    commute: {
      downtown: "10-15 minutes",
      airport: "25-30 minutes",
      disney: "30-40 minutes",
    },
    localTips: [
      "The Winter Park Farmer's Market on Saturdays is a community institution — go early",
      "The Scenic Boat Tour on Lake Osceola is the best way to see the historic lakefront homes",
      "Park Avenue during the holidays is worth the visit even if you don't live here yet",
      "The Morse Museum houses the world's largest collection of Tiffany glass — and it's free on Friday evenings",
    ],
  },
  {
    slug: "lake-nona",
    name: "Lake Nona",
    tagline: "Orlando's master-planned community of the future",
    description:
      "Lake Nona is where innovation meets lifestyle. Home to the Medical City, USTA National Campus, and a growing tech corridor, this master-planned community offers modern architecture, resort-style amenities, and a forward-thinking approach to community design. Ideal for families and professionals who want new construction with walkable town centers.",
    lifestyleTags: ["Modern", "Family-Friendly", "Sports", "Innovation"],
    highlights: [
      "Medical City and growing employment corridor",
      "USTA National Campus and sports facilities",
      "Boxi Park and Tavistock restaurants",
      "New construction from top national builders",
    ],
    priceRange: "$400K - $2M+",
    lifestyle:
      "Lake Nona feels like living in the future. Autonomous shuttles, a performance club with golf simulators and recovery labs, and a town center designed for walking. It attracts a younger, professional demographic — medical professionals, tech workers, and families who want new everything. The community programming is excellent. It's planned, yes, but it's planned well.",
    bestFor: [
      "Medical professionals working at Medical City",
      "Families who want new construction with modern amenities",
      "Active lifestyle buyers — tennis, golf, fitness",
      "Remote workers who want community without a commute",
    ],
    notIdealFor: [
      "Buyers who prefer established, character-rich neighborhoods",
      "Those who need quick access to north Orlando or Winter Park",
      "Buyers looking for large lots or rural feel",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$400K - $600K",
        description: "Townhomes and smaller single-family homes in communities like Laureate Park. Great for first-time buyers and young families.",
      },
      {
        label: "Mid-Range",
        range: "$600K - $1M",
        description: "Single-family homes in Laureate Park, Village Walk, and newer phases. 3-5 bedrooms with modern finishes and community amenities.",
      },
      {
        label: "Premium",
        range: "$1M - $2M+",
        description: "Luxury homes in Lake Nona Golf & Country Club and custom builds. Larger lots, premium finishes, and golf course or water views.",
      },
    ],
    newConstruction: {
      summary: "Lake Nona is one of Orlando's best markets for new construction. Tavistock Development continues to expand the community with new phases, and national builders offer a range of options from townhomes to custom estates. This is where you come if new construction is a priority.",
      builders: ["Toll Brothers", "Ashton Woods", "Taylor Morrison", "Pulte Homes"],
      communities: ["Laureate Park", "Lake Nona Golf & Country Club", "Isles at Lake Nona", "Storey Park"],
    },
    schools: [
      "Innovation Middle School (A-rated)",
      "Lake Nona High School (A-rated)",
      "Moss Park Elementary (A-rated)",
      "Lake Nona Middle School (A-rated)",
      "NorthLake Park Community School",
    ],
    dining: [
      "Canvas Restaurant & Market — farm-to-table",
      "Boxi Park — outdoor food hall and live music",
      "Chroma Modern Bar + Kitchen — upscale American",
      "Bosphorous Turkish Cuisine — Mediterranean",
    ],
    commute: {
      downtown: "20-25 minutes",
      airport: "15-20 minutes",
      disney: "25-35 minutes",
    },
    localTips: [
      "Lake Nona Town Center is still growing — expect new restaurants and retail regularly",
      "The USTA National Campus offers public court rentals and youth programs",
      "Laureate Park has the best community events calendar in Orlando",
      "Drive Shack is the go-to for casual social outings",
    ],
  },
  {
    slug: "windermere",
    name: "Windermere",
    tagline: "Lakefront luxury with a relaxed pace",
    description:
      "Windermere is Orlando's premier lakefront community, known for its spacious estates, rolling hills, and the Butler Chain of Lakes. This is where you come for space, privacy, and water access without sacrificing proximity to Disney-area attractions and top schools. A favorite of executives and families seeking room to breathe.",
    lifestyleTags: ["Luxury", "Lakefront", "Spacious", "Gated"],
    highlights: [
      "Butler Chain of Lakes access",
      "Windermere Preparatory School",
      "Close to Disney and major attractions",
      "Gated communities with large lots",
    ],
    priceRange: "$600K - $5M+",
    lifestyle:
      "Windermere is space and water. Weekend mornings on the boat, kids playing in big backyards, dinner at home with the sunset over the lake. It's quieter than most of Orlando's popular neighborhoods and that's exactly the point. The town of Windermere itself is charming — a few blocks of small shops and restaurants that feel like old Florida.",
    bestFor: [
      "Families who want large lots and top schools",
      "Executives and professionals seeking privacy",
      "Boating and water sports enthusiasts",
      "Buyers relocating from high-cost markets who want space",
    ],
    notIdealFor: [
      "Buyers who want walkability or urban convenience",
      "Budget-conscious buyers under $550K",
      "Those who prefer newer, master-planned communities",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$550K - $800K",
        description: "Homes in communities adjacent to Windermere proper. Good school zones, established neighborhoods. Some gated communities.",
      },
      {
        label: "Mid-Range",
        range: "$800K - $1.5M",
        description: "Gated communities like Keenes Pointe and Belmere. 4-5 bedrooms, community amenities, some with lake or conservation views.",
      },
      {
        label: "Premium",
        range: "$1.5M - $5M+",
        description: "Lakefront estates on the Butler Chain. Custom builds, large lots, private docks. Isleworth, Bay Hill, and direct lakefront properties.",
      },
    ],
    newConstruction: {
      summary: "New construction in Windermere is primarily custom builds on remaining lots and a few newer communities on the outskirts. The core of Windermere is established, but surrounding areas like Horizon West offer extensive new construction options with Windermere mailing addresses.",
      builders: ["Toll Brothers", "Taylor Morrison", "M/I Homes", "Custom builders"],
      communities: ["Lakeside at Hamlin", "Windermere Sound", "Horizon West communities"],
    },
    schools: [
      "Windermere High School (A-rated)",
      "Windermere Elementary (A-rated)",
      "Windermere Preparatory School (private, PreK-12)",
      "Isleworth Country Day School",
      "Bay Meadows Elementary (A-rated)",
    ],
    dining: [
      "The Town of Windermere — small-town restaurants and cafes",
      "Rocco's Italian Grille — neighborhood favorite",
      "Izziban Sushi — local favorite in nearby Horizon West",
      "Restaurant Row in Dr. Phillips — 10 minutes away",
    ],
    commute: {
      downtown: "25-35 minutes",
      airport: "30-40 minutes",
      disney: "10-20 minutes",
    },
    localTips: [
      "The Butler Chain of Lakes is one of Florida's most pristine lake chains — boat access is a genuine lifestyle upgrade",
      "Windermere's downtown has a farmers market and community events worth checking out",
      "Horizon West is the fast-growing area adjacent to Windermere — new construction at lower price points",
      "The West Orange Trail runs right through the area for biking and running",
    ],
  },
  {
    slug: "dr-phillips",
    name: "Dr. Phillips",
    tagline: "Orlando's dining capital with suburban comfort",
    description:
      "Dr. Phillips offers the best of Orlando dining at Restaurant Row while maintaining a family-friendly suburban character. With excellent schools, proximity to the attractions corridor, and a wide range of housing from townhomes to estates, it's one of the most versatile neighborhoods for relocators who want convenience and community.",
    lifestyleTags: ["Dining", "Convenient", "Family-Friendly", "Diverse"],
    highlights: [
      "Restaurant Row with 100+ dining options",
      "Dr. Phillips Center for the Performing Arts nearby",
      "Highly rated public schools",
      "Easy access to I-4 and attractions",
    ],
    priceRange: "$350K - $1.5M+",
    lifestyle:
      "Dr. Phillips is convenience wrapped in a residential package. You're 10 minutes from world-class dining, 15 from the theme parks, and 20 from downtown — but your street feels like a quiet suburb. The dining scene is genuinely one of the best in Central Florida. The community is diverse, the schools are strong, and the housing stock ranges from accessible townhomes to gated estates.",
    bestFor: [
      "Families who want great schools and dining without the premium of Winter Park",
      "Professionals working in the attractions or hospitality corridor",
      "Foodies who want walkable (or short-drive) access to top restaurants",
      "Buyers looking for the most options across price points",
    ],
    notIdealFor: [
      "Buyers seeking walkable, urban neighborhoods",
      "Those who want lakefront living",
      "Buyers looking for extensive new construction",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$350K - $500K",
        description: "Townhomes and smaller single-family homes. Several gated communities in this range. Great value for the school district.",
      },
      {
        label: "Mid-Range",
        range: "$500K - $900K",
        description: "Updated 3-4 bedroom homes in established communities like Bay Hill, Phillips Landing, and Turkey Lake area. Pool homes common.",
      },
      {
        label: "Premium",
        range: "$900K - $1.5M+",
        description: "Bay Hill golf community, larger custom homes, and gated estates. Some with golf course or conservation views.",
      },
    ],
    newConstruction: {
      summary: "New construction within Dr. Phillips proper is limited as the area is largely built out. However, adjacent Horizon West offers extensive new construction options. Some infill and teardown-rebuild projects exist in the core area.",
      builders: ["Meritage Homes", "Lennar (Horizon West)", "Custom infill builders"],
      communities: ["Horizon West communities", "Windermere Sound area"],
    },
    schools: [
      "Dr. Phillips High School (A-rated)",
      "Southwest Middle School (A-rated)",
      "Bay Meadows Elementary (A-rated)",
      "Sand Lake Elementary (A-rated)",
      "The First Academy (private, PreK-12)",
    ],
    dining: [
      "Christini's — fine Italian dining institution",
      "Dragonfly Robata Grill — Japanese, upscale",
      "Eddie V's — seafood and prime steaks",
      "Seasons 52 — health-conscious American",
      "Hawkers Asian Street Food — casual, excellent",
    ],
    commute: {
      downtown: "15-25 minutes",
      airport: "20-30 minutes",
      disney: "10-15 minutes",
    },
    localTips: [
      "Restaurant Row along Sand Lake Road is the real dining destination in Orlando — not the tourist areas",
      "Bay Hill hosts the Arnold Palmer Invitational PGA Tour event annually",
      "The Dr. Phillips Center for the Performing Arts downtown is worth the 15-minute drive",
      "I-4 access is excellent but can be congested during rush hour — plan accordingly",
    ],
  },
  {
    slug: "celebration",
    name: "Celebration",
    tagline: "A walkable town designed for community",
    description:
      "Celebration is a master-planned town originally developed by Disney that has grown into one of Orlando's most distinctive communities. Its walkable downtown, community events calendar, and mix of architectural styles create a neighborhood that feels intentionally crafted for connection. Great for families and anyone who values a strong sense of place.",
    lifestyleTags: ["Walkable", "Community", "Town Center", "Family-Friendly"],
    highlights: [
      "Walkable downtown with shops and restaurants",
      "Year-round community events and festivals",
      "Multiple parks and trail systems",
      "Close proximity to Disney area employment",
    ],
    priceRange: "$350K - $1.2M+",
    lifestyle:
      "Celebration is a town, not a neighborhood. It was designed to feel that way and it works. You walk to dinner downtown, your kids ride bikes to the park, the community hosts events nearly every weekend. The architecture is intentionally varied — Coastal, Classical, Victorian, Colonial — which gives it character that most planned communities lack. It's not for everyone, but the people who love it really love it.",
    bestFor: [
      "Families who prioritize community and walkability",
      "Disney and hospitality industry professionals",
      "Buyers who want a strong sense of place and neighbor connection",
      "Those relocating who want instant community",
    ],
    notIdealFor: [
      "Buyers who find planned communities too structured",
      "Those who want large lots or rural privacy",
      "Buyers who need to be close to north Orlando or Winter Park",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$350K - $550K",
        description: "Condos, townhomes, and smaller homes in the outer neighborhoods. Walking distance to downtown in most cases.",
      },
      {
        label: "Mid-Range",
        range: "$550K - $850K",
        description: "Single-family homes in established Celebration neighborhoods. 3-4 bedrooms, varied architectural styles, community pool access.",
      },
      {
        label: "Premium",
        range: "$850K - $1.2M+",
        description: "Lakefront and premium lot homes. Larger custom builds in the original Celebration Village neighborhoods.",
      },
    ],
    newConstruction: {
      summary: "Original Celebration is largely built out, but newer phases and adjacent developments continue to add inventory. Some builders are active in the surrounding area with Celebration-adjacent communities that offer newer homes at competitive price points.",
      builders: ["Mattamy Homes", "Lennar", "Select custom builders"],
      communities: ["Celebration (newer phases)", "North Celebration", "Adjacent Osceola communities"],
    },
    schools: [
      "Celebration High School",
      "Celebration School (K-8, innovative model)",
      "Celebration community tutoring programs",
      "Nearby Osceola County magnet programs",
    ],
    dining: [
      "Celebration Town Tavern — American, downtown staple",
      "Columbia Restaurant — Spanish, historic Florida chain",
      "Cafe D'Antonio — Italian, locally loved",
      "Market Street Cafe — casual breakfast and lunch",
    ],
    commute: {
      downtown: "25-35 minutes",
      airport: "20-30 minutes",
      disney: "5-15 minutes",
    },
    localTips: [
      "Celebration's \"Now Snowing\" event in December is a beloved tradition — fake snow on Market Street",
      "The lakefront walking trail is the best evening walk in the Orlando area",
      "Downtown Celebration is small but curated — quality over quantity",
      "The community association is active — review the guidelines before buying if you value flexibility",
    ],
  },
  {
    slug: "baldwin-park",
    name: "Baldwin Park",
    tagline: "Urban village living in the heart of Orlando",
    description:
      "Built on the former Orlando Naval Training Center, Baldwin Park is a vibrant urban village minutes from downtown. Tree-lined streets, a central village center with restaurants and shops, and a mix of condos, townhomes, and single-family homes make it one of the most walkable and community-oriented neighborhoods in Central Florida.",
    lifestyleTags: ["Urban", "Walkable", "Community", "Central"],
    highlights: [
      "Village center with dining and retail",
      "Walking distance to downtown Orlando",
      "Mix of housing types and price points",
      "Active community events and farmers market",
    ],
    priceRange: "$300K - $1.5M+",
    lifestyle:
      "Baldwin Park is the closest thing Orlando has to a true urban village. You walk your dog past the lake, grab coffee at the village center, and bike downtown for dinner. The mix of housing means you see everyone from young professionals in condos to families in single-family homes to retirees in townhomes. The farmers market on Sunday is the social center of the week. It's community by design, but it feels organic.",
    bestFor: [
      "Young professionals who want walkability and proximity to downtown",
      "Families who want urban convenience with a neighborhood feel",
      "Buyers relocating from cities like DC, Chicago, or Boston who miss walkable living",
      "Anyone who values community and mixed-use design",
    ],
    notIdealFor: [
      "Buyers who want large lots or significant privacy",
      "Those who need to be near the attractions corridor",
      "Buyers looking for new construction options",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$300K - $500K",
        description: "Condos and townhomes in the village center and surrounding streets. Many with lake or park views. Low maintenance living.",
      },
      {
        label: "Mid-Range",
        range: "$500K - $900K",
        description: "Single-family homes on tree-lined streets. 3-4 bedrooms, traditional architecture, walking distance to the village center.",
      },
      {
        label: "Premium",
        range: "$900K - $1.5M+",
        description: "Lakefront single-family homes and larger custom properties. Premium lots along Lake Baldwin and Lake Susannah.",
      },
    ],
    newConstruction: {
      summary: "Baldwin Park is fully built out with no new construction available. All purchases are resale. The community was master-planned and completed, which means the infrastructure, landscaping, and community amenities are mature and well-maintained.",
      builders: [],
      communities: [],
    },
    schools: [
      "Baldwin Park Elementary (within the community)",
      "Glenridge Middle School (A-rated)",
      "Winter Park High School (A-rated, nearby)",
      "Trinity Preparatory School (private, nearby)",
    ],
    dining: [
      "Osprey Tavern — upscale American, neighborhood gem",
      "Seito Sushi — Japanese, consistently excellent",
      "Corvo Bianco — Italian, village center",
      "Luke's Kitchen and Bar — casual American, lakeside",
    ],
    commute: {
      downtown: "5-10 minutes",
      airport: "15-20 minutes",
      disney: "25-35 minutes",
    },
    localTips: [
      "The Sunday farmers market at the village center is the best in Orlando — arrive by 9am",
      "Lake Baldwin dog park is one of the few lakefront dog parks in the city",
      "The community is tightly knit — expect to know your neighbors within weeks",
      "Parking can be tight in the village center on weekends — walk or bike if you can",
    ],
  },
  {
    slug: "horizon-west",
    name: "Horizon West",
    tagline: "Orlando's fastest-growing new construction corridor",
    description:
      "Horizon West is the epicenter of new construction in the greater Orlando area. Spanning a massive growth corridor west of Orlando, it encompasses multiple master-planned communities, town centers, and villages — each with its own identity. If new construction is your priority, this is where you start.",
    lifestyleTags: ["New Construction", "Family-Friendly", "Growing", "Master-Planned"],
    highlights: [
      "Largest concentration of new construction in Central Florida",
      "Multiple town centers with dining, retail, and entertainment",
      "Top-rated new schools built for growing communities",
      "Easy access to Disney, Universal, and the attractions corridor",
    ],
    priceRange: "$350K - $1.5M+",
    lifestyle:
      "Horizon West is where Orlando is being built right now. Every month there's a new restaurant, a new park, a new community opening. It attracts young families and professionals who want everything new — new home, new schools, new amenities — without the premium of established neighborhoods. The trade-off is that some areas still feel like they're under construction, because they literally are. But if you're patient, you're buying into a community that will mature beautifully.",
    bestFor: [
      "Buyers who want new construction with modern floor plans",
      "Families who want brand-new schools and community amenities",
      "Professionals working near Disney, Universal, or the I-4 corridor",
      "Buyers who want a Windermere-adjacent address at a lower price point",
    ],
    notIdealFor: [
      "Buyers who want established, mature neighborhoods with character",
      "Those who dislike construction activity and growing pains",
      "Buyers who need to be close to downtown Orlando or the east side",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$350K - $500K",
        description: "Townhomes and smaller single-family homes in communities like Summerlake and Lakeside. Great for first-time buyers and young families.",
      },
      {
        label: "Mid-Range",
        range: "$500K - $800K",
        description: "Single-family homes in Lakeside at Hamlin, Water's Edge, and newer phases. 3-5 bedrooms with modern finishes and resort-style amenities.",
      },
      {
        label: "Premium",
        range: "$800K - $1.5M+",
        description: "Larger custom and semi-custom homes in communities like Windermere Sound and Overlook at Hamlin. Premium lots and upgraded finishes.",
      },
    ],
    newConstruction: {
      summary: "Horizon West is Orlando's new construction capital. Virtually every national builder has an active presence here, and new communities continue to launch. The range of options spans from affordable townhomes to luxury single-family estates. This is the area I recommend most often to buyers whose top priority is building new.",
      builders: ["Toll Brothers", "Taylor Morrison", "Meritage Homes", "Pulte Homes", "M/I Homes", "Lennar", "Ashton Woods", "Dream Finders Homes"],
      communities: ["Lakeside at Hamlin", "Windermere Sound", "Summerlake", "Water's Edge", "Overlook at Hamlin", "Westside"],
    },
    schools: [
      "Horizon West area schools (multiple new builds)",
      "Hamlin School (K-8, new)",
      "Olympia High School (A-rated)",
      "Windermere High School (A-rated, nearby)",
      "Several new elementary schools opening with community growth",
    ],
    dining: [
      "Hamlin Town Center — growing collection of restaurants",
      "Reel Fish Coastal Kitchen + Bar — seafood",
      "BJ's Restaurant & Brewhouse — casual American",
      "Restaurant Row (Dr. Phillips) — 10-15 minutes away",
    ],
    commute: {
      downtown: "25-35 minutes",
      airport: "30-40 minutes",
      disney: "10-20 minutes",
    },
    localTips: [
      "Hamlin Town Center is the social hub — it's growing fast with new restaurants and retail quarterly",
      "The Horizon West area is huge — specific commute times vary significantly depending on which community you choose",
      "New schools are being built alongside the communities — check with the district on which school your community feeds into",
      "Builder incentives are strongest during pre-construction and community closeout phases — timing matters here",
    ],
  },
  {
    slug: "winter-garden",
    name: "Winter Garden",
    tagline: "Small-town charm with a thriving downtown",
    description:
      "Winter Garden is one of Orlando's best-kept secrets — a historic small town with a revitalized downtown that has become one of the most desirable places to live in Central Florida. Plant Street's boutique shops, craft breweries, and farm-to-table restaurants create a walkable core, while surrounding communities offer everything from new construction to established estates.",
    lifestyleTags: ["Downtown", "Historic", "Family-Friendly", "Trail Access"],
    highlights: [
      "Historic Plant Street with boutique shops and restaurants",
      "West Orange Trail for biking and running",
      "Garden Theatre — restored historic performing arts venue",
      "Mix of new construction and established neighborhoods",
    ],
    priceRange: "$350K - $2M+",
    lifestyle:
      "Winter Garden has the small-town feel that most of Orlando lacks. Friday nights you walk downtown for dinner and live music at the Garden Theatre. Saturday mornings you bike the West Orange Trail and stop at the farmers market. Your kids know the neighbors' kids. The downtown is genuinely charming — not manufactured charm like some planned communities, but real character from a town that's been here since the 1800s and had the good sense to revitalize rather than tear down.",
    bestFor: [
      "Families who want small-town character with modern conveniences",
      "Buyers who love walkable downtowns with independent restaurants and shops",
      "Active lifestyle buyers — the West Orange Trail is a real asset",
      "Buyers who want new construction options near a charming downtown",
    ],
    notIdealFor: [
      "Buyers who need to be close to downtown Orlando for work",
      "Those who want a more urban, cosmopolitan environment",
      "Buyers looking for lakefront luxury estates",
    ],
    priceSegments: [
      {
        label: "Entry",
        range: "$350K - $550K",
        description: "Townhomes and smaller homes in newer communities surrounding downtown. Some older homes closer to the core at this price point.",
      },
      {
        label: "Mid-Range",
        range: "$550K - $1M",
        description: "Single-family homes in communities like Waterleigh, Oakland Park, and newer developments. 3-5 bedrooms with community amenities.",
      },
      {
        label: "Premium",
        range: "$1M - $2M+",
        description: "Custom homes and estate properties. Homes near downtown with character, or newer luxury builds in surrounding communities.",
      },
    ],
    newConstruction: {
      summary: "Winter Garden offers a strong mix of new construction, particularly in the communities surrounding the historic downtown core. Several national builders are active in the area, and new communities continue to develop along the western corridor. It's one of the few areas where you can buy new and still be close to a walkable, historic downtown.",
      builders: ["Taylor Morrison", "Meritage Homes", "Pulte Homes", "Dream Finders Homes", "Ashton Woods"],
      communities: ["Waterleigh", "Oakland Park", "Johns Lake area communities", "Lakeshore by Taylor Morrison"],
    },
    schools: [
      "West Orange High School (A-rated)",
      "Dillard Street Elementary (A-rated)",
      "Bridgewater Middle School",
      "Foundation Academy (private, PreK-12)",
      "Several new schools serving growing communities",
    ],
    dining: [
      "The Whole Enchilada — Mexican, Plant Street staple",
      "Crooked Can Brewing Company — craft brewery and taproom",
      "Chef's Table at the Edgewater — upscale American",
      "Pilars Martini — Latin-inspired, downtown favorite",
    ],
    commute: {
      downtown: "25-35 minutes",
      airport: "35-45 minutes",
      disney: "15-25 minutes",
    },
    localTips: [
      "The Winter Garden Farmers Market on Saturday mornings is one of the best in Central Florida",
      "The West Orange Trail connects Winter Garden to downtown Orlando — 22 miles of paved trail for biking and running",
      "The Garden Theatre hosts live performances, movies, and community events year-round",
      "Plant Street is genuinely walkable — if you can live within biking distance of downtown, it transforms daily life",
    ],
  },
];
