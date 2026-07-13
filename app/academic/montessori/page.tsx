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
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Play-Based Learning',
    description: 'Learning through interactive play activities that stimulate creativity and imagination.',
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: 'Social Development',
    description: 'Building social skills through group activities and peer interaction.',
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Structured Schedule',
    description: 'Age-appropriate daily routines that balance learning, play, and rest.',
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: 'Character Building',
    description: 'Instilling moral values and good habits from an early age.',
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
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50/60">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 sm:py-20 text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.14),transparent_45%)]" />
          <Container className="relative">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-accent-300" />
                Ages 3–5 · Early Years
              </span>
              <h1 className="mt-5 font-josefin text-4xl font-bold sm:text-5xl lg:text-6xl">
                Montessori Education
              </h1>
              <p className="mt-4 text-lg text-primary-100 sm:text-xl leading-relaxed">
                Holistic early childhood education with nurturing teachers, purposeful play, and a
                strong foundation for lifelong learning.
              </p>
            </div>
          </Container>
        </section>

        {/* Program overview */}
        <section className="py-16 sm:py-20">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-josefin">
                  Our Montessori Program
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-gray-600">
                  Our Montessori program provides a nurturing environment where young children can
                  explore, discover, and learn at their own pace. We focus on developing the whole
                  child through hands-on activities and experiential learning.
                </p>
                <p className="mt-4 text-lg leading-relaxed text-gray-600">
                  Experienced educators create a supportive atmosphere that encourages curiosity,
                  independence, and a love for learning that lasts a lifetime.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-sm">
                    <div className="text-3xl font-bold text-primary-600">3–5</div>
                    <div className="mt-1 text-sm text-gray-600">Age Range</div>
                  </div>
                  <div className="rounded-2xl border border-primary-100 bg-white p-5 text-center shadow-sm">
                    <div className="text-3xl font-bold text-primary-600">2</div>
                    <div className="mt-1 text-sm text-gray-600">Years Duration</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-primary-100 bg-white p-8 shadow-xl shadow-primary-900/5">
                <h3 className="text-2xl font-bold text-gray-900">Program Features</h3>
                <div className="mt-6 space-y-5">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="rounded-xl bg-primary-50 p-2 text-primary-600">{feature.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                        <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Faculty from Pakians Faculty Registration */}
        <WingFacultyShowcase
          wingName="Montessori Wing"
          members={faculty}
          introTitle="Montessori Leadership & Faculty"
          introDescription="Wing Incharge appears at the top right. Teachers are listed below. Only profiles marked School Faculty (admin verified) and Active in the faculty dashboard are shown."
        />

        {/* Subjects */}
        <section className="py-16 sm:py-20 bg-white">
          <Container>
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-josefin">
                Subjects & Activities
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
                A comprehensive curriculum covering all essential areas of early childhood development
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject, index) => (
                <Card
                  key={index}
                  className="group p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary-200"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-2xl transition-colors group-hover:bg-primary-100">
                    📚
                  </div>
                  <h3 className="font-semibold text-gray-900">{subject}</h3>
                </Card>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-primary-700 to-primary-800 text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-3xl font-bold sm:text-4xl font-josefin">
                Ready to Start Your Child&apos;s Educational Journey?
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-100">
                Join our Montessori program and give your child the best foundation for future learning
                and success.
              </p>
              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <a
                  href="/admission"
                  className="rounded-xl bg-white px-8 py-3.5 font-semibold text-primary-700 shadow-lg transition hover:bg-gray-100"
                >
                  Apply Now
                </a>
                <a
                  href="/contact"
                  className="rounded-xl border-2 border-white px-8 py-3.5 font-semibold text-white transition hover:bg-white hover:text-primary-700"
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
