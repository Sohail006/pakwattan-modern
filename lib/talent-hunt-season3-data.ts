export const TALENT_HUNT_SEASON3_TAGLINE = 'DREAM • DARE • DEVELOP'

export const TALENT_HUNT_SEASON3_TITLE = 'Talent Hunt with Pak Wattan-Season 3'

export const TALENT_HUNT_SEASON3_PERIOD = 'July 2026 – January 2027'

export const TALENT_HUNT_SEASON3_FLYER = {
  src: '/images/talent-hunt/Talenthunt3fliyer.webp',
  width: 1146,
  height: 1600,
  alt: 'Talent Hunt with Pak Wattan-Season 3 flyer — Grand Opening 25 July 2026, Jalal Baba Auditorium Abbottabad',
} as const

export const TALENT_HUNT_PARTICIPANT_FEE = 500
export const TALENT_HUNT_INSTITUTION_FEE = 1000

export const TALENT_HUNT_SEASON3_INTRO =
  'One of the largest educational and co-curricular competitions designed to discover, nurture, and celebrate the hidden talents of students from schools, colleges, and universities — through six exciting streams spanning creativity, leadership, innovation, communication, and sportsmanship.'

export const TALENT_HUNT_SEASON3_EXECUTIVE_SUMMARY =
  'Talent Hunt with Pak Wattan is one of the largest educational and co-curricular competitions designed to discover, nurture, and celebrate the hidden talents of students from schools, colleges, and universities. Through six exciting streams, participants will showcase their creativity, leadership, innovation, communication, and sportsmanship while competing on a prestigious platform. Season 3 runs from July 2026 to January 2027 and builds on the legacy of previous editions with a broader district-wide stage for student achievement.'

export const TALENT_HUNT_SEASON3_OBJECTIVES = [
  'Discover hidden talent',
  'Promote creativity and innovation',
  'Build confidence and leadership',
  'Encourage healthy competition',
  'Strengthen communication and critical thinking',
  'Connect educational institutions across the region',
  'Celebrate excellence beyond academics',
] as const

export const TALENT_HUNT_SEASON3_PILLARS = [
  {
    title: 'Literary Arts',
    description:
      'Poetry, Drama & Skit, and Storytelling competitions celebrating language, expression, and creative performance.',
  },
  {
    title: 'Science & Innovation',
    description:
      'Science Model Competition encouraging research, experimentation, and scientific thinking among students.',
  },
  {
    title: 'Entrepreneurship',
    description:
      'Young Entrepreneurs Pitch fostering business acumen, innovation, and leadership in young minds.',
  },
  {
    title: 'Sports',
    description:
      'Sports Gala with Badminton, Chess, Ludo & Tug of War — promoting teamwork, discipline, and sportsmanship.',
  },
] as const

export const TALENT_HUNT_SEASON3_OPENING = {
  title: 'Grand Opening Ceremony',
  subtitle: 'Season 3 Kickoff',
  date: '25 July 2026',
  venue: 'Jalal Baba Auditorium, Abbottabad',
  description:
    'The Grand Opening Ceremony marks the official launch of Talent Hunt with Pak Wattan Season 3. This flagship event will bring together students, educators, and community leaders from across the district to celebrate the spirit of talent, competition, and growth.',
}

export const TALENT_HUNT_SEASON3_TIMELINE = [
  { date: '25 July 2026', stream: 'Grand Opening Ceremony', venue: 'Jalal Baba Auditorium, Abbottabad' },
  { date: '22 August 2026', stream: 'Poetry Competition / Mushaira' },
  { date: '12 September 2026', stream: 'Drama & Skit Competition' },
  { date: '31 October 2026', stream: 'Storytelling Championship' },
  { date: '21 November 2026', stream: 'Science Model Competition' },
  { date: '12 December 2026', stream: 'Young Entrepreneurs Pitch' },
  { date: '21–23 January 2027', stream: 'Sports Gala & Closing Ceremony' },
] as const

export type Season3StreamDetail = {
  id: string
  streamNumber: number
  name: string
  date: string
  category: string
  section: 'literary' | 'innovation'
  description: string
  highlights: string[]
  details?: {
    label: string
    items: string[]
  }[]
}

export const TALENT_HUNT_SEASON3_CONTESTS: Season3StreamDetail[] = [
  {
    id: 'poetry',
    streamNumber: 1,
    name: 'Poetry Competition / Mushaira',
    date: '22 August 2026',
    category: 'Literary Arts',
    section: 'literary',
    description:
      'Celebrate imagination, emotions, and expression through original poetry and classical literary masterpieces.',
    highlights: [
      'Language: Urdu',
      'Time: 2–2.5 minutes',
      'Eligibility: Grade 8 onwards',
      'Original poetry OR works by renowned poets',
    ],
    details: [
      {
        label: 'Themes',
        items: [
          'Theme A — “Mera Khawab, Mera Mustaqbil”',
          'Theme B — “Badalti Duniya, Badalta Insaan”',
          'Theme C — “Khawab aur Haqeeqat ke Darmiyan”',
        ],
      },
      {
        label: 'Suggested poets (if not original)',
        items: [
          'Allama Iqbal',
          'Faiz Ahmed Faiz',
          'Habib Jalib',
          'Ahmed Nadeem Qasmi',
          'Parveen Shakir',
          'Amjad Islam Amjad',
          'Josh Malihabadi',
        ],
      },
    ],
  },
  {
    id: 'drama',
    streamNumber: 2,
    name: 'Drama & Skit Competition',
    date: '12 September 2026',
    category: 'Literary Arts',
    section: 'literary',
    description:
      'An opportunity for students to communicate powerful ideas through theatre, acting, and storytelling — across literary drama, ethical comedy, and awareness themes.',
    highlights: [
      'Language: Urdu or English',
      'Team performance only',
      'Categories: Grades 1–5, 6–8, 9–2nd Year, University',
      'No script reading / no recorded dialogues',
    ],
    details: [
      {
        label: 'Categories & duration',
        items: [
          'Category A (Grade 1–5): 5–7 minutes',
          'Category B (Grade 6–8): 7–9 minutes',
          'Category C (Grade 9–2nd Year): 10–12 minutes',
          'Category D (University): 12–15 minutes',
        ],
      },
      {
        label: 'Theme options',
        items: [
          'Theme 1 — Literary Drama (adapt a famous Urdu or English literary work; original adaptations with prior approval)',
          'Theme 2 — Ethical & Satirical Comedy (family-friendly comedy on everyday social issues)',
          'Theme 3 — Awareness Drama (AI, climate, bullying, girls’ education, drug abuse prevention, responsible social media)',
        ],
      },
      {
        label: 'Judging criteria (100 marks)',
        items: [
          'Acting & Character Portrayal',
          'Script & Story Development',
          'Creativity & Originality',
          'Dialogue Delivery',
          'Team Coordination',
          'Theme Relevance',
          'Stage Presentation',
          'Time Management',
        ],
      },
    ],
  },
  {
    id: 'storytelling',
    streamNumber: 3,
    name: 'Storytelling Championship',
    date: '31 October 2026',
    category: 'Literary Arts',
    section: 'literary',
    description:
      'Present an original story or perform a classic story creatively using costumes, props, and expressive narration.',
    highlights: [
      'Language: Urdu or English',
      'Individual performance',
      'Presentation time: 3 minutes',
      'Creative costumes & props encouraged',
    ],
    details: [
      {
        label: 'Categories',
        items: [
          'Category A — Grades 1–5 (e.g. The Lion and the Mouse, Cinderella, Aladdin, or original)',
          'Category B — Grades 6–10 (e.g. The Selfish Giant, The Necklace, or original)',
          'Category C — College & University (e.g. After Twenty Years, The Gift of the Magi, The Bet, or original)',
        ],
      },
    ],
  },
  {
    id: 'science',
    streamNumber: 4,
    name: 'Science Model Competition',
    date: '21 November 2026',
    category: 'Science & Innovation',
    section: 'innovation',
    description: 'Present innovative scientific ideas that solve real-world problems through static or working models.',
    highlights: [
      'Team members: 1–3 students',
      'Presentation time: 3–4 minutes',
      'Static or working models (working models earn grace marks)',
      'Categories: Grades 1–4, 5–7, 8–University',
    ],
    details: [
      {
        label: 'Evaluation includes',
        items: [
          'Innovation',
          'Scientific Understanding',
          'Practical Application',
          'Creativity',
          'Presentation Skills',
        ],
      },
    ],
  },
  {
    id: 'entrepreneur',
    streamNumber: 5,
    name: 'Young Entrepreneurs Pitch',
    date: '12 December 2026',
    category: 'Entrepreneurship',
    section: 'innovation',
    description: 'Transform ideas into opportunities — present an innovative business idea to a panel of experts.',
    highlights: [
      'Team size: 3–5 members',
      'Presentation time: 3 minutes',
      'Working businesses are NOT required',
      'Categories: Grades 1–5, 6–10, College & University',
    ],
    details: [
      {
        label: 'Pitch should include',
        items: [
          'Problem Identification',
          'Innovative Solution',
          'Clear Revenue Model',
          'Social Impact',
          'Scalability',
        ],
      },
    ],
  },
  {
    id: 'sports',
    streamNumber: 6,
    name: 'Sports Gala',
    date: '21–23 January 2027',
    category: 'Sports',
    section: 'innovation',
    description:
      'Promoting teamwork, discipline, and sportsmanship through Badminton, Chess, Ludo, and Tug of War — culminating in finals, closing ceremony, and prize distribution.',
    highlights: [
      'Sports: Badminton, Chess, Ludo, Tug of War',
      'Day 1: Round One · Day 2: Semi Finals · Day 3: Finals & Closing',
      'Categories: Grades 5–7, 8–10, College & University',
      'Winners, participation certificates & special awards',
    ],
    details: [
      {
        label: 'Schedule',
        items: [
          'Day 1 — Round One',
          'Day 2 — Semi Finals',
          'Day 3 — Finals, Closing Ceremony & Prize Distribution',
        ],
      },
      {
        label: 'Awards & recognition',
        items: [
          'Winners — Special Awards by Pak Wattan School & College of Sciences',
          'Participants — Official Participation Certificates',
          'Outstanding Performers — Special Recognition during Closing Ceremony',
        ],
      },
    ],
  },
]

export const TALENT_HUNT_SEASON3_CONTEST_OPTIONS = TALENT_HUNT_SEASON3_CONTESTS.map((c) => c.name)

/** Participant registration dropdown — Season 3 streams only (sports listed per event). */
export const TALENT_HUNT_SEASON3_REGISTRATION_CONTESTS = [
  { value: 'Poetry Competition / Mushaira', group: 'Literary Arts', date: '22 August 2026' },
  { value: 'Drama & Skit Competition', group: 'Literary Arts', date: '12 September 2026' },
  { value: 'Storytelling Championship', group: 'Literary Arts', date: '31 October 2026' },
  { value: 'Science Model Competition', group: 'Science & Innovation', date: '21 November 2026' },
  { value: 'Young Entrepreneurs Pitch', group: 'Entrepreneurship', date: '12 December 2026' },
  { value: 'Badminton', group: 'Sports', date: '21–23 January 2027' },
  { value: 'Chess', group: 'Sports', date: '21–23 January 2027' },
  { value: 'Ludo', group: 'Sports', date: '21–23 January 2027' },
  { value: 'Tug of War', group: 'Sports', date: '21–23 January 2027' },
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
    summary: 'District-level expansion with contest streams — now completed.',
  },
]
