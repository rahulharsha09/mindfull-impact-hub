/**
 * lib/data.ts
 * All static data arrays for Mindful Impact Hub.
 * ZERO truncation - complete datasets.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type Intensity = 'low' | 'medium' | 'high';

export interface VolunteerOpportunity {
  id: string;
  title: string;
  organization: string;
  postalCode: string;
  city: string;
  category: string;
  intensity: Intensity;
  description: string;
  commitment: string;
  icon: string;
  tags: string[];
}

export interface Charity {
  id: string;
  name: string;
  domain: string;
  domainTag: string;
  trustScore: number;
  programDeliveryPct: number;
  missionSnippet: string;
  impactUnit: string;
  costPerUnit: number;
  unitsPerDollar: number;
  isInternationalAid: boolean;
  isLocalConservation: boolean;
  watchdog: string;
}

export interface DigestItem {
  id: string;
  mode: 'full' | 'low';
  headline: string;
  detail: string;
  emoji: string;
  source: string;
}

// ─── Volunteer Opportunities ──────────────────────────────────────────────────

export const VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: 'v001',
    title: 'Community Garden Planting Day',
    organization: 'Green Roots Collective',
    postalCode: '10001',
    city: 'New York',
    category: 'Environment',
    intensity: 'low',
    description: 'Help plant seasonal vegetables in our shared community beds. Gentle digging, watering, and seed placement -- a perfect mindful morning outdoors.',
    commitment: '3 hrs / Saturday morning',
    icon: '\u{1F331}',
    tags: ['gardening', 'outdoors', 'gentle', 'community'],
  },
  {
    id: 'v002',
    title: 'Library Book Sorting and Shelving',
    organization: 'Brooklyn Public Library Friends',
    postalCode: '11201',
    city: 'Brooklyn',
    category: 'Education',
    intensity: 'low',
    description: 'Sort donated books by genre and shelve them in a calm, quiet library environment. Light lifting, organizational tasks only.',
    commitment: '2 hrs / flexible weekday',
    icon: '\u{1F4DA}',
    tags: ['books', 'quiet', 'indoor', 'sorting'],
  },
  {
    id: 'v003',
    title: 'Senior Center Card-Writing Circle',
    organization: 'Bridgeway Elder Care',
    postalCode: '10002',
    city: 'New York',
    category: 'Social Care',
    intensity: 'low',
    description: 'Write uplifting handwritten cards and letters for isolated seniors. No previous experience needed -- just warmth and a pen.',
    commitment: '1.5 hrs / Sunday afternoon',
    icon: '\u2709\uFE0F',
    tags: ['writing', 'connection', 'seniors', 'indoor'],
  },
  {
    id: 'v004',
    title: 'Nature Trail Litter Patrol',
    organization: 'Riverside Conservancy',
    postalCode: '10033',
    city: 'New York',
    category: 'Environment',
    intensity: 'low',
    description: 'Walk a scenic riverside trail and collect litter at a leisurely pace. Equipment provided. Peaceful scenery guaranteed.',
    commitment: '2 hrs / Sunday morning',
    icon: '\u{1F33F}',
    tags: ['walking', 'nature', 'outdoors', 'conservation'],
  },
  {
    id: 'v005',
    title: 'Animal Shelter Dog Walking',
    organization: 'Paws and Hearts Shelter',
    postalCode: '10025',
    city: 'New York',
    category: 'Animal Welfare',
    intensity: 'low',
    description: 'Walk friendly shelter dogs in a safe, supervised park environment. Joyful, gentle exercise for you and a deserving pup.',
    commitment: '1 hr / daily slots available',
    icon: '\u{1F43E}',
    tags: ['animals', 'walking', 'gentle', 'therapy'],
  },
  {
    id: 'v006',
    title: 'Seed Packet Assembly for School Gardens',
    organization: 'Future Farmers Foundation',
    postalCode: '10003',
    city: 'New York',
    category: 'Education',
    intensity: 'low',
    description: 'Assemble and label seed packets at an indoor table station. Quiet, repetitive, meditative work that ships seeds to 200 school gardens.',
    commitment: '2 hrs / Tuesday evenings',
    icon: '\u{1F33C}',
    tags: ['crafting', 'indoor', 'schools', 'mindful'],
  },
  {
    id: 'v007',
    title: 'Food Pantry Produce Sorting',
    organization: 'FreshStart Food Collective',
    postalCode: '11205',
    city: 'Brooklyn',
    category: 'Food Security',
    intensity: 'medium',
    description: 'Sort and bag fresh produce donations for distribution. Standing work, moderate pace. Team environment.',
    commitment: '3 hrs / Wednesday mornings',
    icon: '\u{1F966}',
    tags: ['food', 'sorting', 'community', 'team'],
  },
  {
    id: 'v008',
    title: 'After-School Homework Help Tutor',
    organization: 'BrightPath Learning Center',
    postalCode: '10451',
    city: 'Bronx',
    category: 'Education',
    intensity: 'medium',
    description: 'Support K-8 students with homework in math and reading. Rewarding, structured one-on-one sessions in a safe school environment.',
    commitment: '2 hrs / weekday afternoons',
    icon: '\u{1F392}',
    tags: ['tutoring', 'children', 'education', 'structured'],
  },
  {
    id: 'v009',
    title: 'Coastal Dune Restoration Planting',
    organization: 'ShoreLine Resilience Project',
    postalCode: '11693',
    city: 'Rockaway',
    category: 'Environment',
    intensity: 'medium',
    description: 'Plant native beach grass to stabilize coastal dunes. Moderate physical activity -- bending, walking on sand. Spectacular ocean views.',
    commitment: '4 hrs / seasonal Saturdays',
    icon: '\u{1F3D6}\uFE0F',
    tags: ['planting', 'coastal', 'moderate', 'conservation'],
  },
  {
    id: 'v010',
    title: 'Crisis Hotline Phone Support Volunteer',
    organization: 'Metro Crisis Connect',
    postalCode: '10004',
    city: 'New York',
    category: 'Mental Health',
    intensity: 'high',
    description: 'Trained volunteers provide emotional support via phone to individuals in acute crisis. Intensive training required. Emotionally demanding.',
    commitment: '4 hrs / weekly shift commitment',
    icon: '\u{1F4DE}',
    tags: ['crisis', 'intensive', 'training', 'high-impact'],
  },
  {
    id: 'v011',
    title: 'Disaster Relief Warehouse Operations',
    organization: 'City Emergency Response Corps',
    postalCode: '11368',
    city: 'Queens',
    category: 'Disaster Relief',
    intensity: 'high',
    description: 'Load, unload, and organize emergency supply pallets. Heavy lifting required. Fast-paced environment during active disaster response periods.',
    commitment: '8 hrs / on-call deployment',
    icon: '\u{1F6A8}',
    tags: ['physical', 'heavy-lifting', 'crisis', 'high-intensity'],
  },
  {
    id: 'v012',
    title: 'Street Outreach for Unhoused Individuals',
    organization: 'Urban Pathways NYC',
    postalCode: '10036',
    city: 'New York',
    category: 'Homelessness',
    intensity: 'high',
    description: 'Walk city streets connecting unhoused individuals with shelter and services. Requires resilience and emotional strength. Impactful but demanding.',
    commitment: '3-4 hrs / evening shifts',
    icon: '\u{1F3D9}\uFE0F',
    tags: ['outreach', 'emotional', 'urban', 'high-intensity'],
  },
  {
    id: 'v013',
    title: 'Butterfly Garden Maintenance',
    organization: 'Metro Pollinator Alliance',
    postalCode: '10128',
    city: 'New York',
    category: 'Environment',
    intensity: 'low',
    description: 'Tend a butterfly garden: gentle weeding, watering, plant care. Meditative and peaceful work surrounded by native wildflowers.',
    commitment: '2 hrs / Thursday mornings',
    icon: '\u{1F98B}',
    tags: ['gardening', 'gentle', 'pollinator', 'nature'],
  },
  {
    id: 'v014',
    title: "Handmade Toy Assembly for Children's Hospitals",
    organization: 'Crafts with Heart',
    postalCode: '10007',
    city: 'New York',
    category: 'Children',
    intensity: 'low',
    description: 'Assemble and wrap non-toxic handmade toys for children in hospital wards. Gentle indoor craft work. Deeply meaningful.',
    commitment: '2 hrs / Monday evenings',
    icon: '\u{1F9F8}',
    tags: ['crafting', 'children', 'indoor', 'gentle'],
  },
  {
    id: 'v015',
    title: 'Community Mural Painting Assistant',
    organization: 'Colors of Queens',
    postalCode: '11372',
    city: 'Jackson Heights',
    category: 'Arts and Culture',
    intensity: 'medium',
    description: 'Assist professional muralists in painting large-format community art. Paint mixing, brush fills, and base coating. Creative and collaborative.',
    commitment: '3 hrs / weekend sessions',
    icon: '\u{1F3A8}',
    tags: ['art', 'creative', 'outdoor', 'community'],
  },
];

// ─── Charity Data ─────────────────────────────────────────────────────────────

export const CHARITIES: Charity[] = [
  {
    id: 'c001',
    name: 'charity: water',
    domain: 'charitywater.org',
    domainTag: 'Clean Water',
    trustScore: 96,
    programDeliveryPct: 100,
    missionSnippet: 'Brings clean, safe drinking water to people in developing countries through funded well projects.',
    impactUnit: 'clean water filtration kits',
    costPerUnit: 2,
    unitsPerDollar: 0.5,
    isInternationalAid: true,
    isLocalConservation: false,
    watchdog: 'Charity Navigator 4-Star',
  },
  {
    id: 'c002',
    name: 'The Nature Conservancy',
    domain: 'nature.org',
    domainTag: 'Conservation',
    trustScore: 93,
    programDeliveryPct: 78,
    missionSnippet: 'Protects lands and waters critical to preserving biodiversity, with projects spanning all 50 US states.',
    impactUnit: 'sq ft of habitat preserved',
    costPerUnit: 0.5,
    unitsPerDollar: 2,
    isInternationalAid: false,
    isLocalConservation: true,
    watchdog: 'Charity Navigator 4-Star',
  },
  {
    id: 'c003',
    name: 'Feeding America',
    domain: 'feedingamerica.org',
    domainTag: 'Food Security',
    trustScore: 97,
    programDeliveryPct: 99,
    missionSnippet: 'The largest hunger relief org in the US -- distributes 4.2 billion meals annually through 200 food banks.',
    impactUnit: 'meals provided',
    costPerUnit: 0.08,
    unitsPerDollar: 12.5,
    isInternationalAid: false,
    isLocalConservation: false,
    watchdog: 'BBB Wise Giving Alliance',
  },
  {
    id: 'c004',
    name: 'American Forests',
    domain: 'americanforests.org',
    domainTag: 'Reforestation',
    trustScore: 91,
    programDeliveryPct: 85,
    missionSnippet: 'Plants and restores trees across the US, with a goal of reforesting 1.2 billion acres by 2030.',
    impactUnit: 'native trees planted',
    costPerUnit: 1,
    unitsPerDollar: 1,
    isInternationalAid: false,
    isLocalConservation: true,
    watchdog: 'Charity Navigator 4-Star',
  },
  {
    id: 'c005',
    name: 'Doctors Without Borders',
    domain: 'msf.org',
    domainTag: 'Emergency Medical',
    trustScore: 94,
    programDeliveryPct: 87,
    missionSnippet: 'Provides emergency medical care in conflict zones, disease outbreaks, and disaster regions worldwide.',
    impactUnit: 'medical consultations funded',
    costPerUnit: 3,
    unitsPerDollar: 0.33,
    isInternationalAid: true,
    isLocalConservation: false,
    watchdog: 'Charity Navigator 4-Star',
  },
  {
    id: 'c006',
    name: 'National Park Foundation',
    domain: 'nationalparks.org',
    domainTag: 'Parks and Wilderness',
    trustScore: 89,
    programDeliveryPct: 80,
    missionSnippet: "The official charity of America's national parks -- funds trail restoration, wildlife protection, and youth access.",
    impactUnit: 'trail miles restored',
    costPerUnit: 50,
    unitsPerDollar: 0.02,
    isInternationalAid: false,
    isLocalConservation: true,
    watchdog: 'GuideStar Gold Seal',
  },
  {
    id: 'c007',
    name: 'Direct Relief',
    domain: 'directrelief.org',
    domainTag: 'Humanitarian Aid',
    trustScore: 100,
    programDeliveryPct: 99,
    missionSnippet: 'Delivers medicine and medical supplies globally, with perfect financial health ratings for 10 consecutive years.',
    impactUnit: 'medicine shipments delivered',
    costPerUnit: 5,
    unitsPerDollar: 0.2,
    isInternationalAid: true,
    isLocalConservation: false,
    watchdog: 'Charity Navigator 100/100',
  },
  {
    id: 'c008',
    name: 'Trust for Public Land',
    domain: 'tpl.org',
    domainTag: 'Urban Green Space',
    trustScore: 92,
    programDeliveryPct: 83,
    missionSnippet: "Creates parks, trails, and green spaces in US cities -- ensuring every child lives within a 10-minute walk of a park.",
    impactUnit: 'community park acres secured',
    costPerUnit: 100,
    unitsPerDollar: 0.01,
    isInternationalAid: false,
    isLocalConservation: true,
    watchdog: 'Charity Navigator 4-Star',
  },
  {
    id: 'c009',
    name: 'Arbor Day Foundation',
    domain: 'arborday.org',
    domainTag: 'Reforestation',
    trustScore: 90,
    programDeliveryPct: 82,
    missionSnippet: 'Plants trees across neighborhoods, forests, and farms -- over 500 million trees planted since 1972.',
    impactUnit: 'trees planted in your community',
    costPerUnit: 1,
    unitsPerDollar: 1,
    isInternationalAid: false,
    isLocalConservation: true,
    watchdog: 'BBB Wise Giving Alliance',
  },
  {
    id: 'c010',
    name: 'UNICEF USA',
    domain: 'unicefusa.org',
    domainTag: "Children's Aid",
    trustScore: 95,
    programDeliveryPct: 89,
    missionSnippet: 'Protects children in 190+ countries -- providing vaccines, nutrition, clean water, and emergency relief.',
    impactUnit: 'therapeutic food packets for malnourished children',
    costPerUnit: 0.5,
    unitsPerDollar: 2,
    isInternationalAid: true,
    isLocalConservation: false,
    watchdog: 'Charity Navigator 4-Star',
  },
];

// ─── Daily Digest Content ─────────────────────────────────────────────────────

export const DIGEST_ITEMS: DigestItem[] = [
  // ── Full Capacity Mode ───
  {
    id: 'd001',
    mode: 'full',
    headline: 'Global Renewable Grid Surpasses 30% Threshold',
    detail: 'For the first time in recorded history, renewable sources provided over 30% of global electricity generation in Q3 2026, displacing an estimated 2.1 billion tonnes of CO2-equivalent emissions annually.',
    emoji: '\u26A1',
    source: 'International Energy Agency, Oct 2026',
  },
  {
    id: 'd002',
    mode: 'full',
    headline: 'Coral Reef Restoration Reaches Record Hectares',
    detail: 'A coalition of 47 marine research institutions successfully restored 12,000 hectares of coral reef using lab-grown coral fragments -- the largest single restoration effort in marine biology history.',
    emoji: '\u{1FAB8}',
    source: 'NOAA Coral Program, Sep 2026',
  },
  {
    id: 'd003',
    mode: 'full',
    headline: 'Electric Vehicle Adoption Hits 25% of Global Sales',
    detail: 'EVs now represent 1 in 4 new vehicle purchases worldwide, up from 4% in 2020. Grid storage battery costs have fallen 89% in a decade, accelerating the transition faster than any IPCC scenario predicted.',
    emoji: '\u{1F50B}',
    source: 'BloombergNEF Transport Report, Oct 2026',
  },
  {
    id: 'd004',
    mode: 'full',
    headline: 'Extreme Poverty Rate Drops to Historic 7.2% Global Low',
    detail: 'The World Bank reports 7.2% of the global population now lives in extreme poverty -- the lowest figure ever recorded, down from 36% in 1990. Mobile banking and targeted cash transfers are cited as primary drivers.',
    emoji: '\u{1F4C8}',
    source: 'World Bank Poverty Brief, 2026',
  },
  {
    id: 'd005',
    mode: 'full',
    headline: 'Reforestation Corridor Links Amazon to Atlantic Coast',
    detail: 'Brazil and Paraguay finalized a landmark bilateral agreement that creates a 4.2-million-hectare reforestation corridor, reconnecting fragmented ecosystems across 2,800km of South American landscape.',
    emoji: '\u{1F333}',
    source: 'Amazon Conservation Assoc., Aug 2026',
  },
  {
    id: 'd006',
    mode: 'full',
    headline: 'Childhood Malaria Deaths Fall 62% Over a Decade',
    detail: 'WHO data confirms childhood malaria mortality has declined 62% since 2015, driven by wide-scale distribution of bed nets, new vaccine rollouts, and targeted indoor residual spraying in 43 high-burden nations.',
    emoji: '\u{1F48A}',
    source: 'WHO World Malaria Report, 2026',
  },
  // ── Low Energy Mode ───
  {
    id: 'd007',
    mode: 'low',
    headline: 'Local Meadow Park Now Home to 34 Native Wildflower Species',
    detail: 'After three seasons of careful rewilding, Riverside Meadow Park has been certified as a native wildflower sanctuary, with 34 indigenous species flowering and supporting over 200 bee and butterfly varieties.',
    emoji: '\u{1F338}',
    source: 'City Parks and Recreation Dept.',
  },
  {
    id: 'd008',
    mode: 'low',
    headline: "Neighborhood Library's Seed Lending Library Lends 5,000th Packet",
    detail: 'The Clover Hill Branch Library celebrated a quiet milestone: its community seed lending library has now lent 5,000 seed packets, helping local residents grow food and flowers in backyards and window boxes.',
    emoji: '\u{1F33B}',
    source: 'Clover Hill Community Library',
  },
  {
    id: 'd009',
    mode: 'low',
    headline: 'Local Creek Restored: Herons Return After 18-Year Absence',
    detail: 'Volunteers spent two years clearing invasive species from Millbrook Creek. This autumn, great blue herons were spotted nesting along its banks for the first time since 2007 -- a quiet, beautiful sign of recovery.',
    emoji: '\u{1F9A2}',
    source: 'Millbrook Watershed Volunteers',
  },
  {
    id: 'd010',
    mode: 'low',
    headline: 'Community Orchard Harvests Its First 400-Pound Apple Season',
    detail: 'A volunteer-planted community orchard in Maplewood entered its first harvest year, yielding over 400 pounds of apples shared freely with neighbors, schools, and the local food pantry.',
    emoji: '\u{1F34E}',
    source: 'Maplewood Community Garden Assoc.',
  },
  {
    id: 'd011',
    mode: 'low',
    headline: 'Gentle Yoga Classes in the Park Drew 2,000 Participants',
    detail: "This summer's free sunrise yoga sessions in Elm Grove Park attracted over 2,000 participants across 12 weekly classes, with 91% reporting improved mood and reduced stress.",
    emoji: '\u{1F9D8}',
    source: 'Parks and Wellness Initiative',
  },
  {
    id: 'd012',
    mode: 'low',
    headline: '800 Monarch Butterflies Tagged at Local Nature Preserve',
    detail: 'Volunteers at the Sycamore Nature Preserve completed their annual monarch butterfly tagging program, releasing 800 tagged butterflies as part of a multi-state migration tracking study.',
    emoji: '\u{1F98B}',
    source: 'Sycamore Nature Preserve',
  },
];
