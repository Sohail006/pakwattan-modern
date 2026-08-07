/** Centralized About page content */

export const ABOUT_TABS = [
  { id: 'history', label: 'History', hashAliases: ['background', 'history', 'growth-chart', 'youtube-video'] },
  { id: 'vision', label: 'Vision', hashAliases: ['vision'] },
  { id: 'faculty', label: 'Faculty', hashAliases: ['faculty', 'staff-test'] },
  { id: 'leadership', label: 'Leadership', hashAliases: ['leadership', 'director-message', 'principal-message'] },
  { id: 'achievements', label: 'Achievements', hashAliases: ['achievements', 'prize-distribution'] },
] as const

export type AboutTabId = (typeof ABOUT_TABS)[number]['id']

export function resolveAboutTabFromHash(hash: string): AboutTabId {
  const clean = hash.replace(/^#/, '').toLowerCase()
  if (!clean) return 'history'
  for (const tab of ABOUT_TABS) {
    if (tab.id === clean || tab.hashAliases.includes(clean as never)) {
      return tab.id
    }
  }
  return 'history'
}

export const ABOUT_TIMELINE = [
  {
    year: '2020',
    title: 'Foundation',
    description: 'Pak Wattan opened on 2 November with a mission of quality, affordable education.',
    students: '50',
  },
  {
    year: '2021',
    title: 'Early Growth',
    description: 'Rapid community trust and expansion across Havelian campuses.',
    students: '200',
  },
  {
    year: '2022',
    title: 'First Board Results',
    description: 'Strong board performance established PWSCS among local academic leaders.',
    students: '500',
  },
  {
    year: '2023',
    title: 'Circle Recognition',
    description: 'Top positions in Havelian Circle strengthened our regional reputation.',
    students: '800',
  },
  {
    year: '2024',
    title: 'Sustained Excellence',
    description: 'Multiple toppers and continued excellence across SSC and HSSC.',
    students: '1,200',
  },
  {
    year: '2025',
    title: 'Leading Campus',
    description: '6th consecutive year as Havelian Circle top school, serving 3000+ students.',
    students: '3,000+',
  },
]

export const ABOUT_GALLERY = [
  { src: '/images/about-us/Picture1.jpg', alt: 'Pak Wattan campus life' },
  { src: '/images/about-us/Picture2.jpg', alt: 'Students and academics at Pak Wattan' },
  { src: '/images/about-us/Picture3.png', alt: 'Pak Wattan school activities' },
  { src: '/images/about-us/Picture5.jpg', alt: 'Pak Wattan community and events' },
  { src: '/images/about-us/picture6.jpg', alt: 'Leadership at Pak Wattan' },
  { src: '/images/about-us/Picture7.jpg', alt: 'Pak Wattan principal and campus' },
]

export const ABOUT_VISION = [
  'Leading educational institution in the region',
  'World-class learning with Islamic values',
  'Nurturing future leaders and responsible citizens',
  'An environment that inspires excellence',
]

export const ABOUT_MISSION = [
  'Quality education at affordable expenses',
  'Scholarships for deserving students',
  'High academic standards every year',
  'Character development and moral values',
]

export const ABOUT_VALUES = [
  { title: 'Excellence', description: 'Academic excellence across every program' },
  { title: 'Integrity', description: 'Honesty and ethics in all we do' },
  { title: 'Respect', description: 'Dignity for every student and family' },
  { title: 'Innovation', description: 'Creative approaches to teaching and learning' },
]

export const FACULTY_CARDS = [
  {
    name: 'Science Faculty',
    role: 'Physics · Chemistry · Biology · Math',
    focus: 'Board-focused science coaching with lab culture',
  },
  {
    name: 'Languages Faculty',
    role: 'English · Urdu · Arabic',
    focus: 'Communication, comprehension, and expression',
  },
  {
    name: 'Social Sciences',
    role: 'History · Geography · Civics · Islamiyat',
    focus: 'Values, citizenship, and critical thinking',
  },
  {
    name: 'Computer Science',
    role: 'Programming · IT · Digital Literacy',
    focus: 'Practical skills for modern careers',
  },
  {
    name: 'Montessori & Primary',
    role: 'Early Years · Foundation Skills',
    focus: 'Playful learning and strong foundations',
  },
  {
    name: 'Senior Wing Mentors',
    role: 'SSC · HSSC Guidance',
    focus: 'Exam strategy, mentoring, and career direction',
  },
]

export const FACULTY_STATS = [
  { label: 'Qualified Teachers', end: 50, suffix: '+' },
  { label: 'Advanced Degrees', end: 85, suffix: '%' },
  { label: 'Avg. Experience', end: 10, suffix: '+' },
  { label: 'Teacher : Student', end: 15, suffix: '', displayOverride: '1:15' },
]

export const SCHOLARSHIP_TYPES = [
  { name: 'Pakians Scholarship', detail: 'Merit-based support for outstanding students', percent: 'Up to 100%' },
  { name: 'Merit Based Scholarship', detail: 'Academic excellence scholarships', percent: 'Variable' },
  { name: 'Orphans Scholarship', detail: 'Full support for orphan students', percent: '100%' },
  { name: 'Special Child Scholarship', detail: 'Support for students with special needs', percent: '100%' },
  { name: 'Hafiz ul Quran Scholarship', detail: 'For students who have memorized the Quran', percent: 'Variable' },
]

export const AWARD_CATEGORIES = [
  { title: 'Academic Excellence', description: 'Top performers across subjects' },
  { title: 'Merit Scholarships', description: 'Recognition for academic performance' },
  { title: 'Special Achievements', description: 'Sports and extracurricular honors' },
  { title: 'Hafiz ul Quran', description: 'Religious scholarship program' },
]
