export interface OriginCity {
  slug: string;
  name: string;
  state: string;
  description: string;
  costComparison: string;
  schoolComparison: string;
  weatherComparison: string;
  whyOrlando: string[];
  topNeighborhoods: string[]; // slugs
  commonQuestions: { q: string; a: string }[];
}

export const originCities: OriginCity[] = [
  {
    slug: "new-york",
    name: "New York",
    state: "NY",
    description:
      "New Yorkers are one of the largest groups relocating to Orlando. The combination of no state income tax, dramatically lower housing costs, and year-round outdoor living makes Central Florida an increasingly popular destination for NYC professionals, families, and retirees.",
    costComparison:
      "Housing in Orlando averages 45-60% less than comparable properties in the New York metro area. A $450K home in Orlando would cost $750K-$1M in most NYC suburbs. Florida has no state income tax, which for a household earning $200K means roughly $12-15K in annual savings compared to New York.",
    schoolComparison:
      "Orange County and Seminole County public schools consistently earn A and B ratings statewide. Winter Park, Windermere, and Lake Nona are known for top-rated school zones. Private options include Trinity Preparatory School, Lake Highland Preparatory School, and The Geneva School. Families from Westchester or Long Island find comparable academic quality at a fraction of the property tax cost.",
    weatherComparison:
      "Orlando averages 233 sunny days per year compared to New York's 224. Winters are mild (average January high of 72F vs New York's 39F). The trade-off is hot, humid summers and an active hurricane season from June through November.",
    whyOrlando: [
      "No state income tax saves the average New York transplant $10-15K annually",
      "Housing costs 45-60% less for comparable square footage and quality",
      "Growing job market in tech, healthcare, and entertainment",
      "Year-round outdoor lifestyle – pools, parks, and activities 12 months a year",
      "Direct flights to all three NYC airports (JFK, LGA, EWR) – easy to visit family",
    ],
    topNeighborhoods: ["winter-park", "baldwin-park", "lake-nona"],
    commonQuestions: [
      {
        q: "How does the cost of living in Orlando compare to New York?",
        a: "Overall cost of living in Orlando is approximately 35-45% lower than the New York metro area. Housing is the biggest difference at 45-60% less. Groceries, dining, and transportation are also significantly cheaper. The absence of state income tax in Florida adds another substantial savings layer.",
      },
      {
        q: "What Orlando neighborhoods feel most like living in the NYC suburbs?",
        a: "Winter Park and Baldwin Park offer the walkability and cultural density that New York transplants miss most. Winter Park's Park Avenue has a similar feel to a walkable suburban downtown, while Baldwin Park offers true urban village living minutes from downtown Orlando.",
      },
      {
        q: "Is the Orlando job market strong enough to relocate for?",
        a: "Orlando's job market has diversified significantly beyond tourism. Major employers include AdventHealth, Lockheed Martin, EA Sports, Deloitte, and a growing tech corridor in Lake Nona. Remote work has also made Orlando attractive for professionals who keep NYC salaries while enjoying Florida's lower cost of living.",
      },
    ],
  },
  {
    slug: "illinois",
    name: "Illinois",
    state: "IL",
    description:
      "Illinois-to-Orlando relocations have surged as families and professionals seek relief from Illinois taxes, harsh winters, and rising urban costs. Many Illinois residents find Orlando's combination of suburban comfort, strong schools, and year-round outdoor living to be the lifestyle upgrade they've been looking for.",
    costComparison:
      "Housing in Orlando is comparable to or 10-20% more affordable than popular Chicago suburbs like Naperville and Hinsdale, with significantly more new construction inventory. The bigger financial impact comes from taxes: Florida has no state income tax, while Illinois charges a flat 4.95%. For a household earning $175K, that's roughly $8,600 in annual savings on income tax alone.",
    schoolComparison:
      "Orlando's top school zones compete with the best Illinois suburban districts. Winter Park High School, Windermere High School, and the Lake Nona cluster are all highly rated. Private schools like Trinity Prep, Lake Highland Prep, and Windermere Preparatory School offer strong college-prep programs. Seminole County schools rank among the top three districts in Florida.",
    weatherComparison:
      "Orlando's average annual temperature is 73F compared to Chicago's 50F. Illinois averages 36 inches of snow per year. Orlando averages zero. The trade-off is Orlando's summer heat and humidity, which peaks from June through September.",
    whyOrlando: [
      "No state income tax. Illinois charges 4.95% flat rate",
      "No more brutal winters. Average January high of 72F",
      "Housing comparable to or 10-20% more affordable than popular Chicago suburbs, with significantly more new construction inventory",
      "Excellent new construction options not available in established Illinois suburbs",
      "Direct flights to O'Hare and Midway. Family is a 2.5-hour flight away",
    ],
    topNeighborhoods: ["windermere", "dr-phillips", "celebration"],
    commonQuestions: [
      {
        q: "What's the biggest adjustment moving from Illinois to Orlando?",
        a: "Most Illinois transplants cite the summer heat as the biggest adjustment. July and August in Orlando are similar to January and February in Chicago. You spend more time indoors. The other adjustment is the driving culture. Orlando is more car-dependent, though neighborhoods like Winter Park and Baldwin Park offer walkability.",
      },
      {
        q: "Are Orlando schools comparable to top Illinois suburban schools?",
        a: "Orange County and Seminole County both have highly rated public school districts with multiple A-rated schools. Winter Park, Windermere, and Lake Nona in particular have schools that compete with top Illinois suburban districts. Private school options are also strong.",
      },
      {
        q: "Which Orlando neighborhoods do Illinois families prefer?",
        a: "Families from Chicago's western suburbs often gravitate toward Windermere and Dr. Phillips for the spacious lots and strong schools. Those from the North Shore tend to prefer Winter Park for its walkable downtown and cultural scene. Families with kids who want new construction often choose Lake Nona or Horizon West.",
      },
    ],
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    state: "MA",
    description:
      "Massachusetts professionals and families relocating to Orlando often cite the combination of lower housing costs, tax savings, and escape from New England winters as primary motivators. Orlando's growing healthcare and tech sectors also provide strong career opportunities for Massachusetts' professional workforce.",
    costComparison:
      "Housing in Orlando averages 40-55% less than the greater Boston area. A home that costs $800K in the Boston suburbs would be $350-450K in a comparable Orlando neighborhood. Massachusetts income tax is 5%, which Florida doesn't have, a significant annual savings.",
    schoolComparison:
      "Orlando offers A-rated public schools across Orange and Seminole counties that compare well with top Massachusetts districts. Winter Park and Lake Nona have particularly strong school zones. Private options like Trinity Prep, Lake Highland Prep, and The Geneva School provide rigorous academics. Families from Newton or Wellesley find the school quality strong with significantly lower property taxes.",
    weatherComparison:
      "Orlando averages 233 sunny days compared to Boston's 200. Massachusetts winters (average January high of 36F) contrast sharply with Orlando's mild 72F. New Englanders generally adapt well to Orlando's summers, finding the heat preferable to shoveling snow.",
    whyOrlando: [
      "Housing costs 40-55% less than greater Boston",
      "No state income tax. Massachusetts charges 5%",
      "Growing healthcare sector (AdventHealth, Orlando Health, Lake Nona Medical City)",
      "Year-round outdoor lifestyle replaces seasonal limitations",
      "Direct flights to Logan. 3 hours to visit family",
    ],
    topNeighborhoods: ["winter-park", "lake-nona", "baldwin-park"],
    commonQuestions: [
      {
        q: "How does Orlando's healthcare job market compare to Massachusetts?",
        a: "Orlando's healthcare sector is one of the fastest growing in the Southeast. Lake Nona's Medical City, AdventHealth, and Orlando Health are major employers. While Massachusetts has more research institutions, Orlando offers strong clinical and administrative positions with significantly lower cost of living.",
      },
      {
        q: "Which Orlando neighborhoods appeal to Massachusetts transplants?",
        a: "Winter Park is the most common recommendation for Massachusetts relocators. Its walkable downtown, cultural institutions, and tree-canopy streets feel familiar. Baldwin Park appeals to those who lived in Brookline or Cambridge. Lake Nona attracts healthcare professionals working at Medical City.",
      },
      {
        q: "Is it worth buying or renting first when relocating from Massachusetts?",
        a: "It depends on your timeline and confidence level. Many Massachusetts relocators rent for 3-6 months to explore neighborhoods in person before buying. Others work with a relocation specialist like Nicole to narrow options virtually and buy during their first visit. The Orlando market moves quickly, so having an agent who knows the neighborhoods saves time either way.",
      },
    ],
  },
  {
    slug: "washington-dc",
    name: "Washington, D.C.",
    state: "DC",
    description:
      "D.C.-area professionals relocating to Orlando often find the transition smooth – both are metro areas with strong job markets, good schools, and diverse communities. The difference is price. A family that's priced out of the D.C. suburbs can buy significantly more home in Orlando while keeping their career trajectory intact.",
    costComparison:
      "Housing in Orlando is 30-45% less expensive than the D.C. metro area. A home that costs $600K in Montgomery County would be $350-450K in a comparable Orlando neighborhood. Florida's lack of state income tax adds further savings on top of Virginia's 5.75% or Maryland's up to 6.50% rate.",
    schoolComparison:
      "Orange and Seminole counties have multiple A-rated schools that compare well to Fairfax and Montgomery County public schools. Winter Park, Windermere, and Lake Nona are known for top-rated school zones. Private options including Trinity Prep, Lake Highland Prep, and Foundation Academy offer strong college-prep programs.",
    weatherComparison:
      "Orlando is warmer year-round with milder winters (72F vs D.C.'s 43F in January). D.C.'s infamous muggy summers are actually comparable to Orlando's, so the heat is less of an adjustment for D.C. transplants than for those from cooler climates.",
    whyOrlando: [
      "Housing 30-45% more affordable than the D.C. metro",
      "No state income tax – Virginia charges 5.75%, Maryland up to 6.50%",
      "Strong job market in defense, tech, and healthcare",
      "Similar suburban lifestyle at a fraction of the cost",
      "Direct flights to Reagan, Dulles, and BWI – easy weekend visits",
    ],
    topNeighborhoods: ["baldwin-park", "winter-park", "dr-phillips"],
    commonQuestions: [
      {
        q: "Which Orlando neighborhoods feel most like the D.C. suburbs?",
        a: "Baldwin Park is the closest analogue to Arlington or Bethesda – walkable, urban-village feel, close to downtown. Winter Park feels like a nicer version of Old Town Alexandria with its boutique shopping and dining. Dr. Phillips offers the suburban family lifestyle similar to Fairfax or Loudoun County at a much lower price point.",
      },
      {
        q: "Are there remote work opportunities that let me keep my D.C. salary?",
        a: "Absolutely. Many D.C.-area professionals in government contracting, consulting, and tech maintain remote positions after relocating. The combination of a D.C. salary with Orlando's cost of living and no state income tax creates a significant quality-of-life upgrade.",
      },
      {
        q: "How do Orlando schools compare to the D.C. suburbs?",
        a: "Orange and Seminole counties have multiple A-rated schools that compare well to Fairfax and Montgomery County public schools. Specific neighborhoods like Winter Park, Windermere, and Lake Nona are known for top-rated schools. Private options including Trinity Prep, The Geneva School, and Foundation Academy are also strong.",
      },
    ],
  },
  {
    slug: "georgia",
    name: "Georgia",
    state: "GA",
    description:
      "Georgia-to-Orlando moves are among the most common Southeast relocations. Both states share a similar pace of life, but Orlando offers lower housing costs in many areas, no state income tax, and a lifestyle that leans more toward outdoor living year-round.",
    costComparison:
      "Housing costs are comparable in overall cost, with Orlando offering significantly more new construction options than comparable Atlanta suburbs. The real savings come from Florida's lack of state income tax. Georgia charges up to 5.19%. For a household earning $150K, that's roughly $7-8K in annual savings.",
    schoolComparison:
      "Orlando's top school zones hold up well against popular Georgia suburbs like Alpharetta and Johns Creek. Orange County has multiple A-rated schools, and Seminole County ranks among Florida's top three districts. Horizon West and Winter Garden have newer schools built alongside growing communities. Private options include Montverde Academy, Trinity Prep, and Foundation Academy.",
    weatherComparison:
      "Both regions are warm and humid, so the weather adjustment is minimal. Orlando is slightly warmer year-round and rarely sees the ice storms that occasionally hit Atlanta. Georgia transplants adapt to Orlando's climate faster than those from northern states.",
    whyOrlando: [
      "No state income tax. Georgia charges up to 5.19%",
      "Similar lifestyle and pace, comparable housing costs with more new construction options",
      "Stronger new construction market with more builder options",
      "Year-round warm weather without Georgia's occasional ice storms",
      "Only a 6-hour drive or 1-hour flight to visit Atlanta",
    ],
    topNeighborhoods: ["horizon-west", "winter-garden", "lake-nona"],
    commonQuestions: [
      {
        q: "Is Orlando's job market as strong as Georgia's major metros?",
        a: "Atlanta has a larger corporate presence, but Orlando's job market has diversified significantly with growth in tech, healthcare, simulation/defense, and entertainment. Many Georgia transplants find comparable opportunities, especially in healthcare and hospitality management. Remote work has also equalized the playing field.",
      },
      {
        q: "Which Orlando areas are most like Georgia's popular suburbs?",
        a: "Horizon West and Winter Garden appeal to families from Atlanta's Alpharetta or Johns Creek. New construction, good schools, growing community feel. Windermere is comparable to Buckhead or Vinings for those seeking established luxury. Lake Nona has a similar energy to Peachtree City with its master-planned approach.",
      },
      {
        q: "How does Orlando handle growth compared to Atlanta's sprawl?",
        a: "Orlando is growing rapidly, particularly in the Horizon West corridor, and traffic is a real consideration. However, Orlando's growth is more concentrated in master-planned communities with town centers, which creates more walkable pockets than Atlanta's typical sprawl pattern. Choosing the right neighborhood relative to your commute is critical.",
      },
    ],
  },
  {
    slug: "california",
    name: "California",
    state: "CA",
    description:
      "California-to-Orlando relocations have accelerated as families and professionals look for relief from the state's high cost of living, income taxes, and housing shortage. Orlando offers a similar year-round warm climate with dramatically more affordable housing, no state income tax, and a growing job market.",
    costComparison:
      "Housing in Orlando averages 50-65% less than comparable properties in major California metros. A home that costs $1.2M in the LA suburbs or Bay Area would be $400-550K in a top Orlando neighborhood. California's top income tax rate of 13.3% disappears entirely in Florida, which has no state income tax.",
    schoolComparison:
      "Orlando's top school zones offer strong academics without California's overcrowding. Orange County and Seminole County both have highly rated public schools. Winter Park, Windermere, and Lake Nona neighborhoods are popular with families prioritizing education. Private schools like Trinity Prep, Lake Highland Prep, and Windermere Prep provide college-prep programs comparable to California's best independent schools.",
    weatherComparison:
      "Both offer year-round warm weather, but the climates differ. California has dry heat and mild winters. Orlando has humid heat and a rainy season from June through September. Californians generally appreciate the greenery and water features that come with Orlando's rainfall, though the humidity takes some adjustment.",
    whyOrlando: [
      "Housing costs 50-65% less than major California metros",
      "No state income tax. California charges up to 13.3%",
      "Year-round warm weather with more water access (lakes, springs, coast nearby)",
      "Growing tech, healthcare, and entertainment job market",
      "Direct flights to LAX, SFO, and SAN. Easy to visit family",
    ],
    topNeighborhoods: ["winter-park", "lake-nona", "windermere"],
    commonQuestions: [
      {
        q: "How does Orlando compare to California for families?",
        a: "Orlando offers excellent schools, safe neighborhoods, and significantly more space for the money. Families from California are often surprised by how much home they can afford in areas like Winter Park, Windermere, and Lake Nona. The trade-off is less cultural density than LA or the Bay Area, but Orlando's food, arts, and outdoor scene have grown substantially.",
      },
      {
        q: "Which Orlando neighborhoods appeal to California transplants?",
        a: "Winter Park is popular with Californians who miss walkability and a curated downtown. Lake Nona appeals to those from planned communities in Irvine or the South Bay. Windermere attracts families from Calabasas or the Peninsula who want space, privacy, and top schools.",
      },
      {
        q: "What's the biggest adjustment moving from California to Orlando?",
        a: "Humidity is the most common adjustment. California's dry heat is very different from Orlando's humid summers. The other shift is lifestyle. Orlando is more car-dependent than many California neighborhoods, though communities like Winter Park and Baldwin Park offer walkability. Most Californians say the financial savings more than make up for the adjustment.",
      },
    ],
  },
];
