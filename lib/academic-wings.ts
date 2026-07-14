import type { LucideIcon } from 'lucide-react'
import {
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Calculator,
  Calendar,
  FlaskConical,
  Globe,
  Heart,
  Laptop,
  Microscope,
  Palette,
  PenTool,
  Shield,
  Target,
  Users,
} from 'lucide-react'
import type { PakiansFacultyWing } from '@/lib/pakians-faculty-data'

export type AcademicWingSlug =
  | 'primary-wing'
  | 'boys-middle-wing'
  | 'boys-senior-wing'
  | 'girls-wing'

export interface AcademicWingFeature {
  icon: LucideIcon
  title: string
  description: string
}

export interface AcademicWingSubject {
  name: string
  icon: LucideIcon
}

export interface AcademicWingHighlight {
  value: string
  label: string
}

export interface AcademicWingContent {
  slug: AcademicWingSlug
  /** Exact DB wing value from Pakians Faculty Registration */
  facultyWing: PakiansFacultyWing
  shortName: string
  menuName: string
  path: string
  badge: string
  title: string
  titleAccent: string
  heroDescription: string
  highlights: AcademicWingHighlight[]
  facultyIntroTitle: string
  facultyIntroDescription: string
  programTitle: string
  programDescription: string
  features: AcademicWingFeature[]
  subjectsTitle: string
  subjectsDescription: string
  subjects: AcademicWingSubject[]
  ctaTitle: string
  ctaDescription: string
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export const ACADEMIC_WINGS: AcademicWingContent[] = [
  {
    slug: 'primary-wing',
    facultyWing: 'Primary wing (1st to 7th)',
    shortName: 'Primary Wing',
    menuName: 'Primary Wing',
    path: '/academic/primary-wing',
    badge: 'Grades 1st – 7th',
    title: 'Primary',
    titleAccent: 'Wing',
    heroDescription:
      'A strong foundation in literacy, numeracy, and character for students from 1st to 7th class — guided by verified Primary Wing faculty.',
    highlights: [
      { value: '1–7', label: 'Grade Range' },
      { value: 'Core', label: 'Subject Focus' },
      { value: '1:18', label: 'Care Ratio' },
    ],
    facultyIntroTitle: 'Leadership & Faculty',
    facultyIntroDescription:
      'Meet our Primary Wing incharge and teachers — caring educators building academic and moral foundations.',
    programTitle: 'Primary Wing Program',
    programDescription:
      'Structured learning from early primary through middle-primary years with emphasis on basics, creativity, and discipline.',
    features: [
      {
        icon: BookOpen,
        title: 'Strong Literacy',
        description: 'English and Urdu reading, writing, and communication skills for every grade.',
      },
      {
        icon: Calculator,
        title: 'Numeracy Growth',
        description: 'Conceptual mathematics that builds confidence step by step from class 1 to 7.',
      },
      {
        icon: Heart,
        title: 'Character Education',
        description: 'Islamic values, manners, and responsibility woven into daily school life.',
      },
      {
        icon: Users,
        title: 'Holistic Growth',
        description: 'Sports, arts, and activities that develop the whole child beyond the classroom.',
      },
    ],
    subjectsTitle: 'Subjects & Focus Areas',
    subjectsDescription: 'A balanced curriculum covering academic, spiritual, and creative development.',
    subjects: [
      { name: 'English Language', icon: BookOpen },
      { name: 'Urdu Language', icon: PenTool },
      { name: 'Mathematics', icon: Calculator },
      { name: 'General Science', icon: FlaskConical },
      { name: 'Islamic Studies', icon: Heart },
      { name: 'Social Studies', icon: Globe },
      { name: 'Computer Basics', icon: Laptop },
      { name: 'Art & Physical Education', icon: Palette },
    ],
    ctaTitle: 'Enrol Your Child in Primary Wing',
    ctaDescription: 'Give your child a solid academic and moral foundation from class 1 to 7.',
    seo: {
      title: 'Primary Wing (1st to 7th)',
      description:
        'Primary Wing at Pak Wattan School & College of Sciences for grades 1st to 7th — core subjects, character building, and verified teaching faculty.',
      keywords:
        'primary wing, primary school havelian, grades 1 to 7, pak wattan primary, elementary education',
    },
  },
  {
    slug: 'boys-middle-wing',
    facultyWing: 'Boys wing Middle section (5th to 7th Boys)',
    shortName: 'Boys Middle Wing',
    menuName: 'Boys Middle Wing',
    path: '/academic/boys-middle-wing',
    badge: 'Boys · 5th – 7th',
    title: 'Boys Middle',
    titleAccent: 'Wing',
    heroDescription:
      'Dedicated boys section for classes 5th to 7th focusing on academic discipline, confidence, and smooth transition toward senior studies.',
    highlights: [
      { value: '5–7', label: 'Grade Range' },
      { value: 'Boys', label: 'Section' },
      { value: 'Prep', label: 'Senior Pathway' },
    ],
    facultyIntroTitle: 'Leadership & Faculty',
    facultyIntroDescription:
      'Meet our Boys Middle Wing incharge and teachers preparing young learners for senior academic challenges.',
    programTitle: 'Boys Middle Wing Program',
    programDescription:
      'A focused boys environment that strengthens subject mastery, study habits, and personal responsibility.',
    features: [
      {
        icon: Target,
        title: 'Focused Academics',
        description: 'Clear learning targets in English, Math, Science, and Urdu for middle grades.',
      },
      {
        icon: Shield,
        title: 'Boys Mentorship',
        description: 'Mentoring that builds discipline, confidence, and respectful behaviour.',
      },
      {
        icon: Microscope,
        title: 'Science Readiness',
        description: 'Hands-on concepts that prepare students for senior science streams.',
      },
      {
        icon: Activity,
        title: 'Sports & Teamwork',
        description: 'Physical activities that develop fitness, leadership, and healthy competition.',
      },
    ],
    subjectsTitle: 'Subjects & Focus Areas',
    subjectsDescription: 'Curriculum designed to bridge primary foundations with senior secondary expectations.',
    subjects: [
      { name: 'English', icon: BookOpen },
      { name: 'Urdu', icon: PenTool },
      { name: 'Mathematics', icon: Calculator },
      { name: 'General Science', icon: FlaskConical },
      { name: 'Islamic Studies', icon: Heart },
      { name: 'Pakistan Studies', icon: Globe },
      { name: 'Computer', icon: Laptop },
      { name: 'Physical Education', icon: Activity },
    ],
    ctaTitle: 'Join Boys Middle Wing',
    ctaDescription: 'Help your son build stronger study habits and confidence for senior classes.',
    seo: {
      title: 'Boys Middle Wing (5th to 7th)',
      description:
        'Boys Middle Wing at Pak Wattan for classes 5th to 7th — focused academics, mentorship, and verified faculty.',
      keywords:
        'boys middle wing, boys section 5th to 7th, pak wattan boys wing, middle school boys havelian',
    },
  },
  {
    slug: 'boys-senior-wing',
    facultyWing: 'Boys wing senior section (8th to 2nd year)',
    shortName: 'Boys Senior Wing',
    menuName: 'Boys Senior Wing',
    path: '/academic/boys-senior-wing',
    badge: 'Boys · 8th – 2nd Year',
    title: 'Boys Senior',
    titleAccent: 'Wing',
    heroDescription:
      'Senior boys education from 8th class through Intermediate (2nd year) with exam-focused teaching, career guidance, and verified faculty.',
    highlights: [
      { value: '8–XII', label: 'Grade Range' },
      { value: 'Boys', label: 'Section' },
      { value: 'Exam', label: 'Board Focus' },
    ],
    facultyIntroTitle: 'Leadership & Faculty',
    facultyIntroDescription:
      'Meet our Boys Senior Wing incharge and subject specialists preparing students for board exams and higher studies.',
    programTitle: 'Boys Senior Wing Program',
    programDescription:
      'Rigorous academics for secondary and intermediate boys with subject depth, test practice, and moral grounding.',
    features: [
      {
        icon: Award,
        title: 'Board Excellence',
        description: 'Structured preparation for Matric and Intermediate board examinations.',
      },
      {
        icon: FlaskConical,
        title: 'Science & Commerce Paths',
        description: 'Specialized teaching for science and commerce streams at intermediate level.',
      },
      {
        icon: Briefcase,
        title: 'Career Awareness',
        description: 'Guidance that connects classroom learning with university and career pathways.',
      },
      {
        icon: Calendar,
        title: 'Exam Discipline',
        description: 'Timetables, assessments, and revision cycles that build consistent performance.',
      },
    ],
    subjectsTitle: 'Subjects & Streams',
    subjectsDescription: 'Secondary and intermediate subjects taught by verified senior-wing faculty.',
    subjects: [
      { name: 'English', icon: BookOpen },
      { name: 'Urdu', icon: PenTool },
      { name: 'Mathematics / Accounting', icon: Calculator },
      { name: 'Physics / Chemistry / Biology', icon: Microscope },
      { name: 'Islamic Studies', icon: Heart },
      { name: 'Pakistan Studies', icon: Globe },
      { name: 'Computer Science', icon: Laptop },
      { name: 'Career Guidance', icon: Briefcase },
    ],
    ctaTitle: 'Join Boys Senior Wing',
    ctaDescription: 'Equip your son for board success and future academic opportunities.',
    seo: {
      title: 'Boys Senior Wing (8th to 2nd Year)',
      description:
        'Boys Senior Wing at Pak Wattan for 8th class to Intermediate 2nd year — board preparation, streams, and verified faculty.',
      keywords:
        'boys senior wing, matric intermediate boys, pak wattan senior boys, 8th to 2nd year havelian',
    },
  },
  {
    slug: 'girls-wing',
    facultyWing: 'Girls wing (8th to second year)',
    shortName: 'Girls Wing',
    menuName: 'Girls Wing',
    path: '/academic/girls-wing',
    badge: 'Girls · 8th – 2nd Year',
    title: 'Girls',
    titleAccent: 'Wing',
    heroDescription:
      'A supportive girls section from 8th class to Intermediate (2nd year) focused on academic excellence, confidence, and values-based education.',
    highlights: [
      { value: '8–XII', label: 'Grade Range' },
      { value: 'Girls', label: 'Section' },
      { value: 'Safe', label: 'Learning Space' },
    ],
    facultyIntroTitle: 'Leadership & Faculty',
    facultyIntroDescription:
      'Meet our Girls Wing incharge and teachers inspiring academic achievement and confident young women.',
    programTitle: 'Girls Wing Program',
    programDescription:
      'Secondary and intermediate education in a respectful girls environment with strong academics and personal development.',
    features: [
      {
        icon: Award,
        title: 'Academic Excellence',
        description: 'High-quality teaching for Matric and Intermediate success.',
      },
      {
        icon: Shield,
        title: 'Safe Environment',
        description: 'A dedicated girls wing that prioritizes dignity, care, and focused learning.',
      },
      {
        icon: Users,
        title: 'Confidence Building',
        description: 'Activities and mentoring that develop communication, leadership, and self-belief.',
      },
      {
        icon: Heart,
        title: 'Values & Character',
        description: 'Islamic ethics and life skills alongside rigorous subject instruction.',
      },
    ],
    subjectsTitle: 'Subjects & Streams',
    subjectsDescription: 'A complete secondary and intermediate curriculum tailored for girls wing students.',
    subjects: [
      { name: 'English', icon: BookOpen },
      { name: 'Urdu', icon: PenTool },
      { name: 'Mathematics / Accounting', icon: Calculator },
      { name: 'Science Subjects', icon: FlaskConical },
      { name: 'Islamic Studies', icon: Heart },
      { name: 'Pakistan Studies', icon: Globe },
      { name: 'Computer Science', icon: Laptop },
      { name: 'Personal Development', icon: Users },
    ],
    ctaTitle: 'Join Girls Wing',
    ctaDescription: 'Give your daughter a strong academic path in a supportive, values-based setting.',
    seo: {
      title: 'Girls Wing (8th to Second Year)',
      description:
        'Girls Wing at Pak Wattan for 8th class to Intermediate 2nd year — safe learning, board focus, and verified faculty.',
      keywords:
        'girls wing, girls section matric intermediate, pak wattan girls wing, girls school havelian',
    },
  },
]

export function getAcademicWingBySlug(slug: AcademicWingSlug): AcademicWingContent {
  const wing = ACADEMIC_WINGS.find((w) => w.slug === slug)
  if (!wing) {
    throw new Error(`Unknown academic wing slug: ${slug}`)
  }
  return wing
}

/** Short menu links for Academic submenu + footer */
export const ACADEMIC_WING_NAV_LINKS = [
  { name: 'Montessori', href: '/academic/montessori' },
  ...ACADEMIC_WINGS.map((w) => ({ name: w.menuName, href: w.path })),
] as const
