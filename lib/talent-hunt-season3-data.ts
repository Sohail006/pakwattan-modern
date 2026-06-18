export const TALENT_HUNT_SEASON3_TAGLINE = 'DREAM • DARE • DEVELOP'

export const TALENT_HUNT_SEASON3_TITLE = 'Talent Hunt with Pak Wattan-Season 3'

export const TALENT_HUNT_SEASON3_FLYER = {
  src: '/images/talent-hunt/Talenthunt3fliyer.webp',
  width: 1146,
  height: 1600,
  alt: 'Talent Hunt with Pak Wattan-Season 3 flyer — Grand Opening 25 July 2026, Jalal Baba Auditorium Abbottabad',
} as const

export const TALENT_HUNT_PARTICIPANT_FEE = 500
export const TALENT_HUNT_INSTITUTION_FEE = 1000

export const TALENT_HUNT_SEASON3_INTRO =
  'A district-wide talent development initiative designed to identify, nurture, and celebrate student talent across literary, scientific, entrepreneurial, creative, and sports-based competitions.'

export const TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY =
  'Talent Hunt with PWSCS – Season 3 is a district-wide talent development initiative designed to identify, nurture, and celebrate student talent through literary, scientific, entrepreneurial, creative, and sports-based competitions. This multi-stream program brings together students from across the district to compete, showcase their abilities, and grow under the guidance of national and international experts. Season 3 builds on the legacy of previous editions, offering a broader platform for student achievement and institutional collaboration.'

export const TALENT_HUNT_SEASON3_PILLARS = [
  {
    title: 'Literary Arts',
    description:
      'Poetry, Drama, and Storytelling competitions celebrating language, expression, and creative performance.',
  },
  {
    title: 'Science & Innovation',
    description:
      'Science Model Competition encouraging research, experimentation, and scientific thinking among students.',
  },
  {
    title: 'Entrepreneurship',
    description:
      'Young Entrepreneur Pitch fostering business acumen, innovation, and leadership in young minds.',
  },
  {
    title: 'Sports',
    description:
      'Badminton, Chess, Ludo & Tug of War competitions promoting teamwork, strategy, and physical excellence.',
  },
] as const

export const TALENT_HUNT_SEASON3_OPENING = {
  title: 'Grand Opening Ceremony',
  subtitle: 'Season 3 Kickoff',
  date: '25 July 2026',
  venue: 'Jalal Baba Auditorium, Abbottabad',
  description:
    'The Grand Opening Ceremony marks the official launch of Talent Hunt with PWSCS Season 3. This flagship event will bring together students, educators, and community leaders from across the district to celebrate the spirit of talent, competition, and growth. The Jalal Baba Auditorium in Abbottabad will serve as the central stage for this momentous occasion, setting the tone for a season of excellence and discovery.',
}

export const TALENT_HUNT_SEASON3_CONTESTS = [
  {
    id: 'poetry',
    name: 'Poetry / Mushaira',
    date: '15 August 2026',
    category: 'Literary Arts',
    section: 'literary' as const,
    description:
      'A celebration of Urdu and regional poetry, giving students the stage to recite original and classic verses before expert judges.',
  },
  {
    id: 'drama',
    name: 'Drama / Skit Competition',
    date: '12 September 2026',
    category: 'Literary Arts',
    section: 'literary' as const,
    description:
      'Teams perform original or adapted dramatic pieces, showcasing acting talent, scriptwriting, and stagecraft.',
  },
  {
    id: 'storytelling',
    name: 'Storytelling Championship',
    date: '31 October 2026',
    category: 'Literary Arts',
    section: 'literary' as const,
    description:
      'Individual participants captivate audiences and judges with compelling narratives, building oratory and creative thinking skills.',
  },
  {
    id: 'science',
    name: 'Science Model Competition',
    date: '21 November 2026',
    category: 'Science & Innovation',
    section: 'innovation' as const,
    description:
      'Students present innovative science models and experiments, demonstrating research skills and scientific understanding before a panel of expert judges.',
  },
  {
    id: 'entrepreneur',
    name: 'Young Entrepreneur Pitch',
    date: '12 December 2026',
    category: 'Entrepreneurship',
    section: 'innovation' as const,
    description:
      'Aspiring young entrepreneurs present business ideas to a panel of industry professionals, developing pitch skills, strategic thinking, and confidence.',
  },
  {
    id: 'sports',
    name: 'Sports Competition',
    date: 'Dates to be announced',
    category: 'Sports',
    section: 'innovation' as const,
    description:
      'Badminton, Chess, Ludo & Tug of War competitions promoting teamwork, strategy, and physical excellence. Dates will be confirmed closer to the season.',
  },
] as const

export const TALENT_HUNT_SEASON3_CONTEST_OPTIONS = TALENT_HUNT_SEASON3_CONTESTS.map((c) => c.name)

/** Participant registration dropdown — Season 3 streams only (sports listed per event). */
export const TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS = [
  { value: 'Poetry Competition / Mushaira', group: 'Literary Arts', date: '15 August 2026' },
  { value: 'Drama / Skit Competition', group: 'Literary Arts', date: '12 September 2026' },
  { value: 'Storytelling Championship', group: 'Literary Arts', date: '31 October 2026' },
  { value: 'Science Model Competition', group: 'Science & Innovation', date: '21 November 2026' },
  { value: 'Young Entrepreneur Pitch', group: 'Entrepreneurship', date: '12 December 2026' },
  { value: 'Badminton', group: 'Sports', date: 'To be decided soon' },
  { value: 'Chess', group: 'Sports', date: 'To be decided soon' },
  { value: 'Ludo', group: 'Sports', date: 'To be decided soon' },
  { value: 'Tug of War', group: 'Sports', date: 'To be decided soon' },
] as const

export const TALENT_HUNT_SEASON3_REGISTRATION_CONTEST_VALUES =
  TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS.map((c) => c.value)

export const TALENT_HUNT_GENDER_OPTIONS = [
  { value: 'Male', label: 'Male' },
  { value: 'Female', label: 'Female' },
] as const

export const TALENT_HUNT_SEASON3_EXPERTS_INTRO =
  'Each competition stream will be guided and judged by a panel of National & International Level Experts, ensuring a world-class evaluation experience for all participants. These experts bring credibility, mentorship, and inspiration to every stage of the competition.'

export const TALENT_HUNT_SEASON3_EXPERTS = [
  {
    title: 'Academicians',
    description:
      'Renowned educators and scholars from leading institutions who bring academic rigor and mentorship to student evaluations.',
  },
  {
    title: 'Entrepreneurs',
    description:
      'Successful business leaders and startup founders who inspire the next generation of innovators and provide real-world perspective.',
  },
  {
    title: 'Researchers',
    description:
      'Scientific and academic researchers who evaluate innovation, methodology, and critical thinking in student projects.',
  },
  {
    title: 'Industry Professionals',
    description:
      'Seasoned professionals from various sectors who bring practical expertise and industry standards to the judging panels.',
  },
]

export const TALENT_HUNT_SEASON3_CONTACT = {
  institution: 'Pak Wattan School & College of Sciences',
  website: 'https://www.pakwattan.edu.pk',
  websiteLabel: 'www.pakwattan.edu.pk',
  email: 'pakwattan2020@gmail.com',
  phone: '0992-811555',
  socialMedia: '@pakwattan2020',
  socialUrl: 'https://www.facebook.com/PAKWATTAN2020',
  location: 'Beside Mubarak plaza, Havelian city, Havelian, Pakistan',
  closingLine:
    "Let's Build Something Great Together. Partner with PWSCS Season 3 and help your students DREAM • DARE • DEVELOP.",
}

export const TALENT_HUNT_PAST_SEASONS = [
  {
    season: 'Season I',
    year: '2024–25',
    href: '/talent-hunt/season-1',
    summary: 'Inaugural season with participants exclusively from Pak Wattan.',
  },
  {
    season: 'Season II',
    year: '2025–26',
    href: '/talent-hunt/season-2',
    summary: 'District-level expansion with ten contest streams — now completed.',
  },
]
