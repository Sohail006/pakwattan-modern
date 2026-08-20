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
    phone: '0992-811555',
    email: 'pakwattan2020@gmail.com',
    address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
    whatsapp: '03180821377',
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
      { name: 'History', href: '/about#history' },
      { name: 'Vision, Mission & Values', href: '/about#vision' },
      { name: 'Faculty', href: '/faculty' },
      { name: 'Leadership', href: '/about#leadership' },
      { name: 'Achievements', href: '/about#achievements' },
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
      { name: 'Primary Wing', href: '/academic/primary-wing' },
      { name: 'Boys Middle Wing', href: '/academic/boys-middle-wing' },
      { name: 'Boys Senior Wing', href: '/academic/boys-senior-wing' },
      { name: 'Girls Wing', href: '/academic/girls-wing' },
    ]
  },
  { name: 'School Life', href: '/school-life' },
  { name: 'Awards', href: '/awards' },
  { name: 'FAQs', href: '/faqs' },
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
      { name: 'Events', href: '/events' },
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
  },
  {
    icon: null,
    title: 'Academic and Co-curricular Exposure',
    href: '/pakians-events'
  }
]

// Achievements Data
export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    icon: null, // Will be set in component
    count: 3000,
    label: 'STUDENTS',
    color: 'text-blue-600',
    countSuffix: ' +'
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

// News Marquee is managed only via dashboard flag IsInMarquee (API).
// The old static ticker list was removed so migrate/seed cannot re-add
// items like "Umama Hafeez Marks | 1103 |" to the homepage marquee.

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

/** Homepage social proof & conversion content */
export const GOOGLE_RATING = {
  rating: 4.9,
  reviewCount: 180,
  label: 'Google Reviews',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pak+Wattan+School+College+of+Sciences+Havelian',
}

export const HOME_TESTIMONIALS = [
  {
    name: 'Aisha Khan',
    role: 'Grade 10 Student',
    quote:
      'Pak Wattan has given me the confidence to pursue my dreams. The teachers are supportive and the environment is truly inspiring.',
  },
  {
    name: 'Ahmed Ali',
    role: 'FSc Pre-Engineering',
    quote:
      'From academics to activities, everything is well organized. My board results improved a lot after joining Pak Wattan.',
  },
  {
    name: 'Fatima Sheikh',
    role: 'Grade 9 Student',
    quote:
      'I love the sense of community here. Everyone is friendly and supportive, making learning enjoyable every day.',
  },
  {
    name: 'Hassan Raza',
    role: 'HSSC Computer Science',
    quote:
      'The faculty guided me step by step for board exams. Securing a top circle position was possible because of their dedication.',
  },
]

export const PARENT_REVIEWS = [
  {
    name: 'Mrs. Sana Javed',
    relation: 'Parent of Grade 8 student',
    rating: 5,
    quote:
      'Transparent communication and strong discipline. We appreciate how teachers keep parents updated on progress.',
  },
  {
    name: 'Mr. Imran Khan',
    relation: 'Parent of FSc student',
    rating: 5,
    quote:
      'Affordable quality education with real board results. Our daughter feels safe and motivated at campus.',
  },
  {
    name: 'Mrs. Nadia Rehman',
    relation: 'Parent of Grade 5 student',
    rating: 5,
    quote:
      'From Montessori onwards, the academic foundation is excellent. Staff is cooperative and caring.',
  },
]

export const TRUST_BADGES = [
  { title: '6 Years Top in Circle', subtitle: 'Havelian SSC excellence' },
  { title: 'BISE Affiliated', subtitle: 'Abbottabad Board' },
  { title: '4 Campuses', subtitle: 'Boys & Girls wings' },
  { title: '3000+ Students', subtitle: 'Trusted by families' },
  { title: 'Qualified Faculty', subtitle: 'Experienced educators' },
  { title: 'Scholarship Support', subtitle: 'Talent Hunt & aid' },
]

export const HOME_FAQS = [
  {
    question: 'How can I apply for admission at Pak Wattan?',
    answer:
      'Visit our online Admission page, fill the application form, or contact the campus office on Azam Khan Road, Havelian. You can also message us on WhatsApp for guidance.',
  },
  {
    question: 'Which classes and wings are offered?',
    answer:
      'We offer Montessori, Primary, Boys Middle & Senior wings, and Girls Wing, along with FSc and coaching programs through Pakians Coaching Academy.',
  },
  {
    question: 'Is Pak Wattan affiliated with BISE Abbottabad?',
    answer:
      'Yes. Our students appear in BISE Abbottabad examinations and have consistently secured top positions in Havelian Circle.',
  },
  {
    question: 'Do you provide scholarships or fee concessions?',
    answer:
      'Yes. Pakians Scholarship and need-based scholarships are available for deserving students. Visit the Scholarships page or inquire at the admission office for eligibility and how to apply.',
  },
  {
    question: 'How can parents stay updated about results and events?',
    answer:
      'Follow our website news section and official Facebook page. Campus offices also share important notices with parents directly.',
  },
]

/** Combined FAQ set for the dedicated /faqs page */
export const SITE_FAQS = [
  ...HOME_FAQS,
  {
    question: 'What are the main campus office hours?',
    answer:
      'Monday to Friday 8:00 AM – 4:00 PM, and Saturday 8:00 AM – 1:00 PM. The office is closed on Sunday.',
  },
  {
    question: 'Where is Pak Wattan located?',
    answer:
      'Azam Khan Road, beside Mubarak Plaza, Havelian, Abbottabad, KPK. Use Get Directions on the Contact page for navigation.',
  },
  {
    question: 'How do I contact the school on WhatsApp?',
    answer:
      'Message 0318-0821377 or use the floating WhatsApp button on the website for a quick response about admissions and campus queries.',
  },
  {
    question: 'Are there careers or faculty openings?',
    answer:
      'Open positions are listed on the Careers (Jobs) page. Faculty applicants can also use the Pakians Faculty Registration form.',
  },
]

