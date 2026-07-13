import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import WingFacultyShowcase from '@/components/academic/shared/WingFacultyShowcase'
import { BookOpen, Users, Calendar, Award, Sparkles } from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getPublicPakiansFacultyByWing } from '@/lib/api/pakiansFaculty'

const MONTESSORI_WING = 'Montessori wing'

/** Always load latest verified faculty (avoid stale static build cache) */
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
    description: 'Interactive play that builds creativity and imagination.',
  },
  {
    icon: Users,
    title: 'Social Development',
    description: 'Group activities that strengthen communication and teamwork.',
  },
  {
    icon: Calendar,
    title: 'Structured Schedule',
    description: 'Balanced routines for learning, play, and rest.',
  },
  {
    icon: Award,
    title: 'Character Building',
    description: 'Moral values and positive habits from an early age.',
  },
]

const subjects = [
  'Basic Mathematics',
  'Language Development',
  'Art & Craft',
  'Physical Activities',
  'Music & Movement',
  'Social Skills',
  'Environmental Awareness',
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
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgba(255,255,255,0.12),transparent_55%)]" />
          <Container className="relative py-12 sm:py-14">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent-300" />
                Ages 3–5
              </span>
              <h1 className="mt-4 font-josefin text-3xl font-bold sm:text-4xl lg:text-5xl">
                Montessori Education
              </h1>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-primary-100 sm:text-lg">
                Holistic early childhood education with nurturing teachers, purposeful play, and a
                strong foundation for lifelong learning.
              </p>
            </div>
          </Container>
        </section>

        {/* Faculty — directly below hero */}
        <WingFacultyShowcase
          wingName="Montessori Wing"
          members={faculty}
          introTitle="Leadership & Faculty"
          introDescription="Verified School Faculty only — active profiles from our faculty registration system."
        />

        {/* Program overview */}
        <section className="py-12 sm:py-16">
          <Container>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div>
                <h2 className="font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
                  Our Montessori Program
                </h2>
                <p className="mt-4 text-gray-600 leading-relaxed">
                  A nurturing environment where young children explore, discover, and learn at their
                  own pace through hands-on activities and experiential learning.
                </p>
                <p className="mt-3 text-gray-600 leading-relaxed">
                  Our educators encourage curiosity, independence, and a lasting love for learning.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 max-w-xs">
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-primary-600">3–5</div>
                    <div className="text-xs text-gray-500">Age Range</div>
                  </div>
                  <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-center">
                    <div className="text-2xl font-bold text-primary-600">2</div>
                    <div className="text-xs text-gray-500">Years</div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-7">
                <h3 className="text-lg font-semibold text-gray-900">Program Features</h3>
                <ul className="mt-5 space-y-4">
                  {features.map((feature) => (
                    <li key={feature.title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                        <feature.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Subjects */}
        <section className="border-t border-gray-100 bg-white py-12 sm:py-16">
          <Container>
            <div className="mb-8 text-center">
              <h2 className="font-josefin text-2xl font-bold text-gray-900 sm:text-3xl">
                Subjects & Activities
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-gray-500 sm:text-base">
                Essential areas of early childhood development
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subjects.map((subject) => (
                <Card
                  key={subject}
                  className="border-gray-100 p-4 text-center transition-colors hover:border-primary-200 hover:bg-primary-50/30"
                >
                  <h3 className="text-sm font-medium text-gray-800">{subject}</h3>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="bg-primary-700 py-12 text-white sm:py-14">
          <Container>
            <div className="text-center">
              <h2 className="font-josefin text-2xl font-bold sm:text-3xl">
                Start Your Child&apos;s Journey
              </h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-primary-100 sm:text-base">
                Give your child a strong foundation for future learning and success.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <a
                  href="/admission"
                  className="rounded-lg bg-white px-6 py-2.5 text-sm font-semibold text-primary-700 transition hover:bg-gray-100"
                >
                  Apply Now
                </a>
                <a
                  href="/contact"
                  className="rounded-lg border border-white/80 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
