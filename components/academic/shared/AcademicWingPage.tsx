import Link from 'next/link'
import Container from '@/components/ui/Container'
import WingFacultyShowcase from '@/components/academic/shared/WingFacultyShowcase'
import { ChevronRight, Sparkles } from 'lucide-react'
import StructuredData from '@/components/seo/StructuredData'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import { getPublicPakiansFacultyByWing } from '@/lib/api/pakiansFaculty'
import type { AcademicWingContent } from '@/lib/academic-wings'

interface AcademicWingPageProps {
  wing: AcademicWingContent
}

export default async function AcademicWingPage({ wing }: AcademicWingPageProps) {
  const faculty = await getPublicPakiansFacultyByWing(wing.facultyWing)

  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Academic', url: 'https://pakwattan.edu.pk/academic' },
    { name: wing.shortName, url: `https://pakwattan.edu.pk${wing.path}` },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen bg-secondary-50">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,white,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,white,transparent_40%)]" />
          </div>

          <Container className="relative py-14 sm:py-16 lg:py-20">
            <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-white/70">
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className="text-white/90">{wing.shortName}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-accent-400" />
                {wing.badge}
              </span>
              <h1 className="mt-5 font-josefin text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                {wing.title}{' '}
                <span className="bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
                  {wing.titleAccent}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                {wing.heroDescription}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {wing.highlights.map((item) => (
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

        <WingFacultyShowcase
          wingName={wing.shortName}
          members={faculty}
          introTitle={wing.facultyIntroTitle}
          introDescription={wing.facultyIntroDescription}
        />

        <section className="section-padding">
          <Container>
            <div className="mb-10 text-center sm:mb-12">
              <h2 className="font-josefin text-3xl font-bold text-secondary-800 sm:text-4xl">
                Our <span className="text-gradient">{wing.programTitle}</span>
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-secondary-600">{wing.programDescription}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {wing.features.map((feature) => (
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

        <section className="section-padding bg-white">
          <Container>
            <div className="mb-10 text-center">
              <h2 className="font-josefin text-3xl font-bold text-secondary-800 sm:text-4xl">
                <span className="text-gradient">{wing.subjectsTitle}</span>
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-secondary-600">{wing.subjectsDescription}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wing.subjects.map((subject) => (
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

        <section className="relative overflow-hidden bg-gradient-to-r from-primary-700 via-primary-600 to-primary-700 py-14 text-white sm:py-16">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)]" />
          <Container className="relative text-center">
            <h2 className="font-josefin text-3xl font-bold sm:text-4xl">{wing.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-lg text-primary-100">{wing.ctaDescription}</p>
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
