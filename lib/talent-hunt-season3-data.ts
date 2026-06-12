export const TALENT_HUNT_SEASON3_TAGLINE = 'DREAM • DARE • DEVELOP'

export const TALENT_HUNT_PARTICIPANT_FEE = 500
export const TALENT_HUNT_INSTITUTION_FEE = 1000

export const TALENT_HUNT_SEASON3_OPENING = {
  title: 'Grand Opening Ceremony',
  date: '25 July 2026',
  venue: 'Jalal Baba Auditorium, Abbottabad',
}

export const TALENT_HUNT_SEASON3_CONTESTS = [
  {
    id: 'poetry',
    name: 'Poetry Competition / Mushaira',
    date: '15 August 2026',
    category: 'Literary Arts',
  },
  {
    id: 'drama',
    name: 'Drama / Skit Competition',
    date: '12 September 2026',
    category: 'Literary Arts',
  },
  {
    id: 'storytelling',
    name: 'Storytelling Championship',
    date: '31 October 2026',
    category: 'Literary Arts',
  },
  {
    id: 'science',
    name: 'Science Model Competition',
    date: '21 November 2026',
    category: 'Science & Innovation',
  },
  {
    id: 'entrepreneur',
    name: 'Young Entrepreneur Pitch',
    date: '12 December 2026',
    category: 'Entrepreneurship',
  },
  {
    id: 'sports',
    name: 'Sports (Badminton, Chess, Ludo & Tug of War)',
    date: 'To be decided soon',
    category: 'Sports',
  },
] as const

export const TALENT_HUNT_SEASON3_CONTEST_OPTIONS = TALENT_HUNT_SEASON3_CONTESTS.map((c) => c.name)

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
