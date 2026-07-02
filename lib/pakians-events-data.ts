export const PAKIANS_EVENTS_PAGE_TITLE = 'Pakians Events'

export const PAKIANS_EVENTS_INTRO = {
  title: 'Academic & Co-Curricular Exposure',
  summary:
    'At Pak Wattan Schools & Colleges of Sciences, learning extends beyond the classroom. Alongside academic excellence, we prepare students for the future by providing meaningful exposure to national-level conferences, competitions, leadership forums, entrepreneurial platforms, and academic events. These opportunities foster confidence, leadership, professional skills, and lifelong learning.',
  subtitle: 'Below is a glimpse of the enriching experiences and achievements of our students.',
} as const

export type PakiansEventCategory =
  | 'Symposium'
  | 'Model UN'
  | 'Declamation'
  | 'Summit'
  | 'Competition'
  | 'Conference'

export interface PakiansEvent {
  id: string
  number: number
  title: string
  venue: string
  category: PakiansEventCategory
  description: string
  highlight?: string
}

export const PAKIANS_EVENTS: PakiansEvent[] = [
  {
    id: 'marka-e-haq-symposium',
    number: 1,
    title: 'Marka-e-Haq Symposium — NUST',
    venue: 'NUST',
    category: 'Symposium',
    description:
      'A delegation of our students attended the Marka-e-Haq Symposium at NUST, where they engaged with students and professionals from across Pakistan. Beyond gaining valuable insights from the event, they explored academic opportunities at one of the country\'s leading universities while expanding their professional and educational networks.',
  },
  {
    id: 'mpmun',
    number: 2,
    title: 'MPMUN (Mutasil Pakistan Model United Nations)',
    venue: 'Pine Hill Public School, Abbottabad',
    category: 'Model UN',
    description:
      'Our students proudly represented Iraq at the Mutasil Pakistan Model United Nations (MPMUN) hosted by Pine Hill Public School, Abbottabad. Competing alongside delegates from leading institutions, they actively participated in committee sessions that strengthened their confidence, diplomacy, critical thinking, public speaking, and interpersonal skills.',
    highlight: 'Represented Iraq',
  },
  {
    id: 'comsats-declamation',
    number: 3,
    title: 'All Pakistan Bi-Lingual Declamation Competition',
    venue: 'COMSATS University Islamabad, Abbottabad Campus',
    category: 'Declamation',
    description:
      'Our students represented the institution at the All Pakistan Bi-Lingual Declamation Competition hosted by COMSATS University Islamabad, Abbottabad Campus. Competing with participants from schools, colleges, and universities across Pakistan, they confidently showcased their communication, critical thinking, and public speaking abilities on a national platform.',
  },
  {
    id: 'begum-rana-declamation',
    number: 4,
    title: 'All Pakistan Begum Rana Liaquat Ali Khan Bi-Lingual Declamation Competition',
    venue: 'Army Burn Hall College for Girls, Abbottabad',
    category: 'Declamation',
    description:
      'Our talented speakers participated in the All Pakistan Begum Rana Liaquat Ali Khan Bi-Lingual Declamation Competition at Army Burn Hall College for Girls, Abbottabad. The event provided a prestigious platform to compete with some of the country\'s finest speakers, enhancing students\' confidence, articulation, and persuasive communication skills.',
  },
  {
    id: 'umeed-youth-summit',
    number: 5,
    title: 'Umeed Youth Summit',
    venue: 'District Council Hall, Abbottabad',
    category: 'Summit',
    description:
      'At the Umeed Youth Summit held at the District Council Hall, Abbottabad, our students engaged with industry experts, innovators, and young leaders from diverse fields. Six of our teams presented their business ideas in the pitching competition, securing distinctions and sponsorship opportunities. The summit provided invaluable mentorship, networking, and practical exposure, empowering students to transform their entrepreneurial ideas into impactful ventures.',
    highlight: '6 teams — distinctions & sponsorships',
  },
  {
    id: 'fakhar-e-hazara-summit',
    number: 6,
    title: 'Fakhar-e-Hazara Summit',
    venue: 'Jalal Baba Auditorium, Abbottabad',
    category: 'Summit',
    description:
      'As the Academic Partner of the Fakhar-e-Hazara Summit held at Jalal Baba Auditorium, our institution proudly facilitated student participation in this prestigious event. Students had the unique opportunity to interact with and learn from distinguished personalities who have brought national and international recognition to the Hazara region, inspiring them to pursue excellence in their own journeys.',
    highlight: 'Academic Partner',
  },
  {
    id: 'regional-business-idea',
    number: 7,
    title: 'Regional Business Idea Competition',
    venue: 'Jalal Baba Auditorium, Abbottabad',
    category: 'Competition',
    description:
      'Five student teams from our institution showcased their entrepreneurial talent at the Regional Business Idea Competition held at Jalal Baba Auditorium. Competing against outstanding teams from across the region, they delivered innovative business solutions and secured distinction, reflecting our commitment to nurturing future entrepreneurs.',
    highlight: '5 teams — distinction',
  },
  {
    id: 'mental-health-leadership',
    number: 8,
    title: 'Conference on Mental Health & Leadership Development',
    venue: 'Jalal Baba Auditorium, Abbottabad',
    category: 'Conference',
    description:
      'Our students participated in the Conference on Mental Health and Leadership Development at Jalal Baba Auditorium, where they explored practical strategies for mental well-being and effective leadership. The conference was further enriched by the keynote address of our distinguished faculty member, Ms. Alveena Farooq, inspiring students to build resilience, confidence, and leadership qualities.',
    highlight: 'Keynote: Ms. Alveena Farooq',
  },
  {
    id: 'seerat-naat-tilawat',
    number: 9,
    title: 'Regional Seerat-un-Nabi (PBUH) Naat & Tilawat Competition',
    venue: 'FG High School',
    category: 'Competition',
    description:
      'Our students participated in the Regional Seerat-un-Nabi (PBUH) Naat and Tilawat Competition hosted by FG High School. Demonstrating exceptional recitation skills and devotion, they earned distinction while proudly representing the values and excellence of our institution.',
    highlight: 'Distinction',
  },
]
