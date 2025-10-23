// Shared constants for PakWattanModern application

import { NavigationItem, QuickLink, Achievement, Event, SchoolInfo } from '@/types'

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
  { name: 'Scholarships', href: '/scholarships' },
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
    title: 'Awards',
    href: '/awards'
  }
]

// Achievements Data
export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    icon: null, // Will be set in component
    count: 1750,
    label: 'STUDENTS',
    color: 'text-blue-600'
  },
  {
    icon: null,
    count: 1100,
    label: 'AWARDS',
    color: 'text-yellow-600'
  },
  {
    icon: null,
    count: 525,
    label: 'ALUMNI',
    color: 'text-green-600'
  },
  {
    icon: null,
    count: 3,
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
