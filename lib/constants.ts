// Shared constants for PakWattanModern application

import { NavigationItem, QuickLink, Achievement, Event, SchoolInfo, NewsItem } from '@/types'

// School Information
export const SCHOOL_INFO: SchoolInfo = {
  name: 'PAK WATTAN',
  fullName: 'Pak Wattan School & College of Sciences',
  established: 2020,
  description: 'Pak Wattan School & College of Sciences is committed to providing quality education with affordable expenses in Havelian, KPK.',
  logo: '/images/logo/logo_150x150.png',
  contact: {
    phone: '0318 0821377',
    email: 'pakwattan2020@gmail.com',
    address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
    socialMedia: {
      facebook: 'https://web.facebook.com/PAKWATTAN2020/',
      youtube: 'https://youtu.be/edf2-HxPxxs?si=Az95EFwCE2cY1UJP',
      twitter: 'https://twitter.com/WattanAnd?s=20&t=Fhqy3yMnnMGjq84gHEp5Sw'
    }
  }
}

// Main Navigation
export const MAIN_NAVIGATION: NavigationItem[] = [
  { name: 'Home', href: '/' },
  { 
    name: 'Who We Are', 
    href: '/about',
    submenu: [
      { name: 'Background & History', href: '/about#background' },
      { name: 'Vision, Mission & Values', href: '/about#vision' },
      { name: 'Staff Entrance Test', href: '/about#staff-test' },
      { name: 'Prize Distribution Ceremony', href: '/about#prize-distribution' },
      { name: 'Growth Chart', href: '/about#growth-chart' },
      { name: 'Executive Director\'s Message', href: '/about#director-message' },
      { name: 'Principal\'s Message', href: '/about#principal-message' },
    ]
  },
  { name: 'Admission', href: '/admission' },
  { 
    name: 'Academic', 
    href: '#',
    submenu: [
      { name: 'Academic Syllabus', href: '/academic-syllabus' },
      { name: 'Model Papers', href: '/model-papers' },
      { name: 'Entry Test Result', href: '/entry-test-result' },
      { name: 'Yearly Academic Schedule', href: '/yearly-academic-schedule' },
      { name: 'Montessori', href: '/academic/montessori' },
      { name: 'Primary', href: '/academic/primary' },
      { name: 'Matric', href: '/academic/matric' },
    ]
  },
  { name: 'School Life', href: '/school-life' },
  { name: 'Awards', href: '/awards' },
  { name: 'Contact Us', href: '/contact' },
]

// Secondary Navigation
export const SECONDARY_NAVIGATION: NavigationItem[] = [
  { 
    name: 'Programs', 
    href: '#',
    icon: '📚',
    description: 'Educational programs and activities',
    submenu: [
      { name: 'Pakians Coaching Academy', href: '/pakians-coaching-academy' },
      { name: 'Talent Hunt', href: '/talent-hunt' },
      { name: 'Registration Form', href: '/registration-form' },
    ]
  },
  { 
    name: 'Achievements', 
    href: '#',
    icon: '🏆',
    description: 'Our success stories and awards',
    submenu: [
      { name: 'Awards', href: '/awards' },
      { name: 'Gold Medals', href: '/gold-medals' },
      { name: 'Umrah Tickets', href: '/umrah-tickets' },
      { name: 'Hajj Tickets', href: '/hajj-tickets' },
      { name: 'Laptop Winners', href: '/laptop-winners' },
    ]
  },
  { 
    name: 'Facilities', 
    href: '/facilities',
    icon: '🏫',
    description: 'Our modern facilities and infrastructure',
    submenu: [
      { name: 'Medical', href: '/facilities#medical' },
      { name: 'Physical Training', href: '/facilities#physical-training' },
      { name: 'Science Lab', href: '/facilities#science-lab' },
      { name: 'Religious Training', href: '/facilities#religious-training' },
      { name: 'Class Rooms', href: '/facilities#class-rooms' },
      { name: 'Computer Lab', href: '/facilities#computer-lab' },
      { name: 'Security System', href: '/facilities#security' },
      { name: 'Smart Boards', href: '/facilities#smart-boards' },
    ]
  },
  { 
    name: 'Gallery', 
    href: '#',
    icon: '📸',
    description: 'Photos and videos of our activities',
    submenu: [
      { name: 'Photo Gallery', href: '/photo-gallery' },
      { name: 'Video Gallery', href: '/video-gallery' },
    ]
  },
]

// Quick Links for Hero Section
export const HERO_QUICK_LINKS: QuickLink[] = [
  {
    icon: null, // Will be set in component
    title: 'Job opportunity 2026-27',
    href: '/jobs'
  },
  {
    icon: null,
    title: 'Scholarships',
    href: '/scholarships'
  },
  {
    icon: null,
    title: 'Talent Hunt',
    href: '/talent-hunt'
  },
  {
    icon: null,
    title: 'Pakians Coaching Academy (PCA)',
    href: '/pakians-coaching-academy'
  }
]

// Achievements Data
export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    icon: null, // Will be set in component
    count: 3000,
    label: 'STUDENTS',
    color: 'text-blue-600'
  },
  {
    icon: null,
    count: 2000,
    label: 'AWARDS',
    color: 'text-yellow-600'
  },
  {
    icon: null,
    count: 1353,
    label: 'ALUMNI',
    color: 'text-green-600'
  },
  {
    icon: null,
    count: 4,
    label: 'CAMPUSES',
    color: 'text-purple-600'
  }
]

// Events Data
export const EVENTS_DATA: Event[] = [
  {
    date: '26',
    month: 'June, 2024',
    title: 'SUMMER TIMING',
    description: 'Summer morning timing of PWSCS is:',
    time: '07:30 am – 02:10 pm'
  },
  {
    date: '26',
    month: 'June, 2024',
    title: 'WINTER TIMING',
    description: 'Winter timing of PWSCS is:',
    time: '08:00 am – 01:45 pm'
  },
  {
    date: '23',
    month: 'March, 2024',
    title: 'SCHOLARSHIP TEST',
    description: 'Girls Campus Havelian',
    time: '08:30 AM'
  }
]

// News Marquee Data
export const NEWS_MARQUEE_ITEMS = [
  '🏆 Once again, honored to top the Havelian Circle',
  '🎓 FSC 2025 Abbottabad Board Results Congratulations to the Havelian Circle Topper!',
  '🥇 Qasim Zaib | 202835 | Marks: 1035 (Pak Wattan Boys Wing) Overall First Position in the Havelian Circle in HSSC (Boys) Board Results 2024, Computer Science Group',
  '🥇 Umme Habiba | Marks:534| Overall First Position in the Havelian Circle in HSSC Part-I Board Results 2025, Pre Medical Group',
  '🥇 Rashail Waheed |Marks: 524| (Overall First Position in HSSC-Part 1 (Pre-Engeneering Group) Board Results 2024',
  '🥇 Toheed Ahmed |Marks: 528| 1st Position in the Computer Science Group (Havelian Circle)',
  '🥈 Haleema Waqar | Marks: 1135 | (Pak Wattan Girls Campus) 2nd Position in the Pre-Medical Group (Overall in Havelian Circle) in HSSC',
  '🏅 Laiba Ashraf Marks | 1103 |',
  '🏅 Umama Hafeez Marks | 1103 |'
]

// Helper function to parse date string and create ISO date for sorting
const parseDate = (dateStr: string): string => {
  // Parse dates like "27th September 2025 (Saturday)" or "1st May, 2025 (Thursday)"
  const months: { [key: string]: string } = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
  }
  
  const dateMatch = dateStr.match(/(\d+)(?:st|nd|rd|th)?\s+(\w+)[,\s]+(\d{4})/i)
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0')
    const monthName = dateMatch[2].toLowerCase()
    const year = dateMatch[3]
    const month = months[monthName] || '01'
    return `${year}-${month}-${day}T00:00:00.000Z`
  }
  
  // Fallback for dates like "On January, 2025"
  const monthYearMatch = dateStr.match(/(\w+)[,\s]+(\d{4})/i)
  if (monthYearMatch) {
    const monthName = monthYearMatch[1].toLowerCase()
    const year = monthYearMatch[2]
    const month = months[monthName] || '01'
    return `${year}-${month}-01T00:00:00.000Z`
  }
  
  // Default to current date if parsing fails
  return new Date().toISOString()
}

// News & Events Data
export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'SPELL BEE CONTEST',
    description: 'Get ready to showcase your spelling skills and compete in our upcoming Spell Bee Contest.',
    date: '27th September 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'spell-bee-contest',
    featured: true,
    createdAt: parseDate('27th September 2025 (Saturday)')
  },
  {
    id: '2',
    title: 'Free Speech in Pakistan: Illusion or Reality?',
    description: 'Join us for an exciting speech competition at Pak Wattan, aimed at discovering young orators and bold thinkers.',
    date: '23rd August 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'free-speech-competition',
    featured: true,
    createdAt: parseDate('23rd August 2025 (Saturday)')
  },
  {
    id: '3',
    title: 'Qirat & Naat Competition',
    description: 'We warmly invite you to the Qirat & Naat competition at Pak Wattan — an inspiring event to showcase the beautiful voices and spiritual talents of our youth.',
    date: '12th July 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'qirat-naat-competition',
    featured: true,
    createdAt: parseDate('12th July 2025 (Saturday)')
  },
  {
    id: '4',
    title: 'Singing (National, Folk, Patriotic)',
    description: 'Join us at Pak Wattan for a vibrant Singing Competition featuring National, Folk, and Patriotic songs. Let the voices of our talented youth echo with pride and passion!',
    date: '15th November 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'singing-competition',
    createdAt: parseDate('15th November 2025 (Saturday)')
  },
  {
    id: '5',
    title: 'Instrumental Music (Individual or Team)',
    description: 'Experience the rhythm and harmony at Pak Wattan\'s Instrumental Music Competition! Whether solo or in a team, showcase your musical talent in a celebration of creativity and sound.',
    date: '15th November 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'instrumental-music-competition',
    createdAt: parseDate('15th November 2025 (Saturday)')
  },
  {
    id: '6',
    title: 'Quiz Competition',
    description: 'Get ready to challenge your knowledge! Separate syllabi have been prepared for Grades 6–7 and Grades 8–10. Participate individually or in teams and put your minds to the test in this exciting Quiz Competition at Pak Wattan.',
    date: '18th October 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'quiz-competition',
    createdAt: parseDate('18th October 2025 (Saturday)')
  },
  {
    id: '7',
    title: 'Spelling Bee Competition',
    description: 'Sharpen your spelling skills and join the exciting Spelling Bee Competition at Pak Wattan! A vocabulary list will be provided in advance to help participants prepare confidently.',
    date: '18th October 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'spelling-bee-competition',
    createdAt: parseDate('18th October 2025 (Saturday)')
  },
  {
    id: '8',
    title: 'Handicrafts / DIY Crafts Competition',
    description: 'Unleash your creativity at Pak Wattan\'s Handicrafts & DIY Crafts Competition! Showcase your artistic talent through handmade creations and innovative do-it-yourself projects.',
    date: '13th December 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'handicrafts-diy-competition',
    createdAt: parseDate('13th December 2025 (Saturday)')
  },
  {
    id: '9',
    title: 'Creative Writing (Story, Essay, Poem)',
    description: 'Let your imagination flow at Pak Wattan\'s Creative Writing Competition! Whether it\'s a story, an essay, or a poem, this is your chance to express your thoughts and creativity through words.',
    date: '13th September 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'creative-writing-competition',
    createdAt: parseDate('13th September 2025 (Saturday)')
  },
  {
    id: '10',
    title: 'Painting / Sketching / Calligraphy',
    description: 'Let your creativity shine at Pak Wattan\'s Art Competition! Whether you love painting, sketching, or calligraphy, this is the perfect opportunity to showcase your artistic talent and imagination.',
    date: '13th September 2025 (Saturday)',
    category: 'competition' as const,
    slug: 'painting-sketching-calligraphy',
    createdAt: parseDate('13th September 2025 (Saturday)')
  },
  {
    id: '11',
    title: 'Career Counseling Seminar',
    description: 'Students get ready for the Career Counseling Seminar which is going to be held in Pak Wattan',
    date: '1st May, 2025 (Thursday)',
    category: 'event' as const,
    slug: 'career-counseling-seminar',
    createdAt: parseDate('1st May, 2025 (Thursday)')
  },
  {
    id: '12',
    title: 'Scholarship/ Entry Test (Grade XI)',
    description: 'Great opportunity for students to secure scholarship and fullfil their dreams.',
    date: '10th May, 2025 (Saturday)',
    category: 'test' as const,
    slug: 'scholarship-entry-test-grade-xi',
    featured: true,
    createdAt: parseDate('10th May, 2025 (Saturday)')
  },
  {
    id: '13',
    title: 'Dastar Bandi',
    description: 'A significant milestone for our young students as they receive their Dastar Bandi.',
    date: '14th December, 2024 (Saturday)',
    category: 'ceremony' as const,
    slug: 'dastar-bandi',
    createdAt: parseDate('14th December, 2024 (Saturday)')
  },
  {
    id: '14',
    title: 'Montessori Sports Gala',
    description: 'Get ready for an action-packed weekend of sports, fun, and friendship.',
    date: '18th & 19th November, 2024',
    category: 'event' as const,
    slug: 'montessori-sports-gala',
    createdAt: parseDate('18th November, 2024')
  },
  {
    id: '15',
    title: 'Montessori Graduation Ceremony',
    description: 'Montessori Graduation Ceremony will be held on.',
    date: 'On January, 2025',
    category: 'ceremony' as const,
    slug: 'montessori-graduation-ceremony',
    createdAt: parseDate('January, 2025')
  },
  {
    id: '16',
    title: 'Board Result Ceremony',
    description: 'Celebrating academic excellence and honoring outstanding achievements.',
    date: '15th February, 2025 (Saturday)',
    category: 'ceremony' as const,
    slug: 'board-result-ceremony',
    createdAt: parseDate('15th February, 2025 (Saturday)')
  },
  {
    id: '17',
    title: 'Scholarship Test',
    description: 'An opportunity for deserving students to secure scholarships and pursue their dreams.',
    date: '23rd March, 2025 (Sunday)',
    category: 'test' as const,
    slug: 'scholarship-test',
    createdAt: parseDate('23rd March, 2025 (Sunday)')
  },
  {
    id: '18',
    title: 'Annual Distribution Ceremony',
    description: 'Recognizing and rewarding outstanding performances and achievements.',
    date: '20th April, 2025 (Sunday)',
    category: 'ceremony' as const,
    slug: 'annual-distribution-ceremony',
    featured: true,
    createdAt: parseDate('20th April, 2025 (Sunday)')
  }
].sort((a, b) => {
  // Sort by date (newest first)
  const dateA = new Date(a.createdAt || a.date).getTime()
  const dateB = new Date(b.createdAt || b.date).getTime()
  return dateB - dateA
})

// YouTube Video IDs
export const YOUTUBE_VIDEOS = {
  MD_MESSAGE: 'edf2-HxPxxs',
  GRADUATION_CEREMONY: 'OH7yYQdmsDg'
}

// Animation Durations
export const ANIMATION_DURATIONS = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 1000
}

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  xs: '475px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}

// Developer Information
export const DEVELOPER_INFO = {
  name: 'Developer',
  url: '/developer', // Developer information page
  text: 'Developed by', // Optional: customize the text
  showIcon: true
}

// Common CSS Classes
export const COMMON_CLASSES = {
  container: 'container-custom',
  section: 'section-padding',
  card: 'card',
  cardHover: 'card-hover',
  button: {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent'
  },
  text: {
    gradient: 'text-gradient',
    noOverlap: 'text-no-overlap'
  },
  animation: {
    fadeInUp: 'animate-fade-in-up',
    fadeInLeft: 'animate-fade-in-left',
    fadeInRight: 'animate-fade-in-right',
    marquee: 'animate-marquee'
  }
}
