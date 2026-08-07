import { Metadata } from 'next'
import { BookOpen, GraduationCap, Users } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Statistics from '@/components/ui/Statistics'
import FacultyHero from '@/components/faculty/FacultyHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/structuredData'
import { FACULTY_CARDS, FACULTY_STATS } from '@/lib/about-data'

export const metadata: Metadata = generatePageMetadata({
  title: 'Faculty — Departments & Mentors',
  description:
    'Meet Pak Wattan faculty departments: Science, Languages, Social Sciences, Computer Science, Montessori & Primary, and Senior Wing mentors in Havelian.',
  keywords:
    'Pak Wattan faculty, teachers Havelian, school departments, science faculty, computer science teachers KPK',
  path: '/faculty',
})

export default function FacultyPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Faculty', url: 'https://pakwattan.edu.pk/faculty' },
  ])
  const webPage = generateWebPageSchema({
    name: 'Faculty — Pak Wattan School & College of Sciences',
    description:
      'Academic departments and mentoring faculty at Pak Wattan School & College of Sciences, Havelian.',
    url: 'https://pakwattan.edu.pk/faculty',
  })

  return (
    <>
      <StructuredData data={[breadcrumbs, webPage]} />
      <div className="min-h-screen pb-16 md:pb-0">
        <FacultyHero />

        <Statistics
          items={FACULTY_STATS}
          title="Faculty at a Glance"
          subtitle="Qualified teachers supporting Montessori through FSc"
          variant="light"
        />

        <section id="departments" className="scroll-mt-20 py-10 sm:py-14 bg-white">
          <Container>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold font-josefin text-secondary-900 mb-2">
                Academic Departments
              </h2>
              <p className="text-sm sm:text-base text-secondary-600">
                Subject teams built for strong foundations and board results.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {FACULTY_CARDS.map((card) => (
                <Card key={card.name} className="p-5 sm:p-6 border border-secondary-100">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-700 flex items-center justify-center mb-3">
                    <GraduationCap className="w-5 h-5" aria-hidden />
                  </div>
                  <h3 className="font-bold text-secondary-900 mb-1">{card.name}</h3>
                  <p className="text-xs sm:text-sm font-medium text-primary-700 mb-2">{card.role}</p>
                  <p className="text-sm text-secondary-600 leading-relaxed">{card.focus}</p>
                </Card>
              ))}
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: BookOpen, title: 'Academic Excellence', text: 'High standards and a love of learning' },
                { icon: Users, title: 'Mentorship', text: 'Guidance beyond the classroom' },
                { icon: GraduationCap, title: 'Board Focus', text: 'SSC & HSSC exam readiness' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl bg-primary-50 border border-primary-100 p-5">
                  <item.icon className="w-5 h-5 text-primary-700 mb-2" aria-hidden />
                  <h3 className="font-semibold text-secondary-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-secondary-600">{item.text}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
