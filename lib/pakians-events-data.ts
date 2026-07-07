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
  images?: { src: string; alt: string }[]
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
    images: [
      {
        src: '/images/pakians-events/marka-e-haq-nust-1.png',
        alt: 'Pak Wattan students sitting together at a stepped venue during Marka-e-Haq Symposium visit',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-2.png',
        alt: 'Group of students at public monument steps during Marka-e-Haq Symposium trip',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-3.png',
        alt: 'Pak Wattan students group photo at Lok Virsa Heritage Museum entrance',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-4.png',
        alt: 'Students and teacher in front of Lok Virsa Heritage Museum during educational tour',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-5.png',
        alt: 'Students sharing meal outdoors during Marka-e-Haq Symposium educational visit',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-6.png',
        alt: 'Student holding Marka-e-Haq participation certificate outside NUST entrance',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-7.png',
        alt: 'Student at NUST stage during Marka-e-Haq strategic reflections session',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-8.png',
        alt: 'Girls delegation seated together in NUST courtyard during symposium visit',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-9.png',
        alt: 'Students holding participation certificates in front of military leadership display',
      },
      {
        src: '/images/pakians-events/marka-e-haq-nust-10.png',
        alt: 'Additional certificate group photo from Marka-e-Haq Symposium visit',
      },
    ],
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
    images: [
      {
        src: '/images/pakians-events/umeed-youth-summit-1.png',
        alt: 'Student speaker presenting at Umeed Youth Summit 2026',
      },
      {
        src: '/images/pakians-events/umeed-youth-summit-2.png',
        alt: 'Close-up of student delivering speech during Umeed Youth Summit session',
      },
      {
        src: '/images/pakians-events/umeed-youth-summit-3.png',
        alt: 'Side profile of student speaker addressing the Umeed Youth Summit audience',
      },
      {
        src: '/images/pakians-events/umeed-youth-summit-4.png',
        alt: 'Panel discussion on stage at Umeed Youth Summit 2026',
      },
      {
        src: '/images/pakians-events/umeed-youth-summit-5.png',
        alt: 'Wide panel and stage view from Umeed Youth Summit event',
      },
    ],
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
    images: [
      {
        src: '/images/pakians-events/fakhar-e-hazara-1.png',
        alt: 'Pak Wattan girls delegation group photo at Fakhar-e-Hazara Summit venue',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-2.png',
        alt: 'Pak Wattan boys students standing together at summit event hall',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-3.png',
        alt: 'Students and mentor group portrait inside summit venue',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-4.png',
        alt: 'Students receiving certificates after participation in summit activities',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-5.png',
        alt: 'Second certificate ceremony group photo with participants and mentors',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-6.png',
        alt: 'Wide audience view from Fakhar-e-Hazara Summit auditorium session',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-7.png',
        alt: 'Stage panel discussion in progress at Fakhar-e-Hazara Summit',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-8.png',
        alt: 'Wide stage and audience shot during summit program',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-9.png',
        alt: 'Large outdoor group photo of Pak Wattan boys participants',
      },
      {
        src: '/images/pakians-events/fakhar-e-hazara-10.png',
        alt: 'Additional girls delegation portrait at the summit location',
      },
    ],
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
    images: [
      {
        src: '/images/pakians-events/seerat-naat-tilawat-1.png',
        alt: 'Student speaking at Regional Seerat-un-Nabi (PBUH) Naat and Tilawat competition stage',
      },
      {
        src: '/images/pakians-events/seerat-naat-tilawat-2.png',
        alt: 'Participant delivering speech at Regional Seerat-un-Nabi (PBUH) event podium',
      },
    ],
  },
]
