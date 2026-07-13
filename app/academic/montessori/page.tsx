import { Metadata } from 'next'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import WingFacultyShowcase from '@/components/academic/shared/WingFacultyShowcase'
import {
  Award,
  BookOpen,
  Calculator,
  Calendar,
  ChevronRight,
  Leaf,
  Music,
  Palette,
  Sparkles,
  Users,
  Activity,
} from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getPublicPakiansFacultyByWing } from '@/lib/api/pakiansFaculty'

const MONTESSORI_WING = 'Montessori wing'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = generatePageMetadata({
  title: 'Montessori Education',
  description:
    'Early childhood education program at Pak Wattan School & College of Sciences focusing on holistic development for children aged 3-5 years through play-based learning, expert faculty, and social development.',
  keywords:
    'montessori education, early childhood education, preschool, pak wattan montessori, havelian preschool, play-based learning',
  path: '/academic/montessori',
})

const features = [
  {
    icon: BookOpen,
    title: 'Play-Based Learning',
    description: 'Hands-on activities that spark creativity, curiosity, and joy in learning.',
  },
  {
    icon: Users,
    title: 'Social Development',
    description: 'Collaborative play that builds confidence, empathy, and communication.',
  },
  {
    icon: Calendar,
    title: 'Balanced Routine',
    description: 'Structured days that blend learning, movement, rest, and discovery.',
  },
  {
    icon: Award,
    title: 'Character Building',
    description: 'Values, manners, and positive habits nurtured from the earliest years.',
  },
]

const subjects = [
  { name: 'Basic Mathematics', icon: Calculator },
  { name: 'Language Development', icon: BookOpen },
  { name: 'Art & Craft', icon: Palette },
  { name: 'Physical Activities', icon: Activity },
  { name: 'Music & Movement', icon: Music },
  { name: 'Social Skills', icon: Users },
  { name: 'Environmental Awareness', icon: Leaf },
]

const highlights = [
  { value: '3–5', label: 'Years of Age' },
  { value: '2', label: 'Program Years' },
  { value: '1:12', label: 'Care Ratio' },
]

export default async function MontessoriPage() {
  const faculty = await getPublicPakiansFacultyByWing(MONTESSORI_WING)

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Academic', url: 'https://pakwattan.edu.pk/academic' },
    { name: 'Montessori', url: 'https://pakwattan.edu.pk/academic/montessori' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen bg-secondary-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,white,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,white,transparent_40%)]" />
          </div>

          <Container className="relative py-14 sm:py-16 lg:py-20">
            <nav className="mb-6 flex items-center gap-1 text-sm text-white/70">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-white/90">Montessori</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent-400" />
                Early Years Program
              </span>
              <h1 className="mt-5 font-josefin text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Montessori{' '}
                <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                  Education
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                Holistic early childhood education with nurturing teachers, purposeful play, and a
                strong foundation for lifelong learning.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm"
                  >
                    <div className="text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-xs font-medium text-white/75">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>

          {/* Wave into faculty section */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 48h1440V24C1200 48 960 0 720 24 480 48 240 24 0 48Z"
                className="fill-white"
              />
            </svg>
          </div>
        </section>

        {/* Faculty */}
        <WingFacultyShowcase
          wingName="Montessori Wing"
          members={faculty}
          introTitle="Leadership & Faculty"
          introDescription="Meet our wing incharge and teaching team — caring educators dedicated to your child's growth."
        />

        {/* Program */}
        <section className="section-padding">
          <Container>
            <div className="mb-10 text-center sm:mb-12">
              <h2 className="font-josefin text-3xl font-bold text-secondary-800 sm:text-4xl">
                Our <span className="text-gradient">Montessori Program</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-secondary-600">
                A child-centred approach where exploration, independence, and joyful learning come
                together every day.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-500">{feature.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Subjects */}
        <section className="section-padding bg-white">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="font-josefin text-3xl font-bold text-secondary-800 sm:text-4xl">
                Subjects & <span className="text-gradient">Activities</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-secondary-600">
                A rich blend of academic, creative, and physical experiences for whole-child
                development.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subjects.map((subject) => (
                <div
                  key={subject.name}
                  className="flex items-center gap-4 rounded-xl border border-gray-100 bg-secondary-50/50 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/30"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary-600 shadow-sm">
                    <subject.icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-medium text-gray-800">{subject.name}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 py-14 text-white sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
          <Container className="relative text-center">
            <h2 className="font-josefin text-3xl font-bold sm:text-4xl">
              Begin Your Child&apos;s Learning Journey
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-100">
              Join our Montessori program and give your child the best start in education.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link href="/admission" className="btn-accent inline-flex justify-center">
                Apply for Admission
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/80 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
