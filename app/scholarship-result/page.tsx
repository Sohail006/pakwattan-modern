import { Award, Calendar, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import StructuredData from '@/components/seo/StructuredData'
import { generateBreadcrumbSchema, generateWebPageSchema } from '@/lib/seo/structuredData'
import ScholarshipFscPart1Section from '@/components/scholarships/ScholarshipFscPart1Section'
import ScholarshipResultClassList from '@/components/scholarships/ScholarshipResultClassList'

export default function ScholarshipResultPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Scholarship Test Result 2026-27', url: 'https://pakwattan.edu.pk/scholarship-result' },
  ])
  const webPage = generateWebPageSchema({
    name: 'Scholarship Test Result 2026-27 — Pak Wattan School & College of Sciences, Havelian',
    description:
      'Official Good Will scholarship test result 2026-27 for Pak Wattan School & College of Sciences, Havelian. FSC Part 1 (by group) and class-wise merit tables for 1st through 9th class.',
    url: 'https://pakwattan.edu.pk/scholarship-result',
  })

  return (
    <>
      <StructuredData data={[breadcrumbs, webPage]} />
      <div className="min-h-screen bg-gray-50">
        {/* Hero — mobile-first: compact top, scales up */}
        <header className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.12]"
            aria-hidden
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
          <Container className="relative py-10 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-3 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white/75 sm:text-xs">
                Pak Wattan School & College of Sciences, Havelian
              </p>
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 sm:h-16 sm:w-16">
                <Award className="h-7 w-7 text-white sm:h-8 sm:w-8" strokeWidth={1.75} aria-hidden />
              </div>
              <h1 className="font-josefin text-[1.65rem] font-bold leading-tight sm:text-4xl md:text-5xl">
                Scholarship Test Result
                <span className="mt-1 block bg-gradient-to-r from-amber-200 to-white bg-clip-text text-transparent sm:mt-2">
                  2026–27
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/88 sm:text-base">
                Good Will scholarship test — FSC Part 1 (Ist Year groups) and class-wise merit lists (1st–9th)
                below, as published by Pak Wattan School & College, Havelian.
              </p>
            </div>
          </Container>
        </header>

        <main className="pb-12 pt-6 sm:pb-16 sm:pt-8 lg:pt-10">
          <Container>
            <div className="mx-auto max-w-3xl lg:max-w-5xl">
              {/* Announcement */}
              <section
                aria-labelledby="announcement-heading"
                className="mb-6 rounded-2xl border border-gray-200/90 bg-white p-4 shadow-sm sm:mb-8 sm:rounded-3xl sm:p-6"
              >
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 sm:h-11 sm:w-11">
                  <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} aria-hidden />
                </div>
                <h2
                  id="announcement-heading"
                  className="text-center text-lg font-bold text-gray-900 sm:text-xl"
                >
                  Official announcement
                </h2>
                <div className="mx-auto mt-3 max-w-2xl space-y-2 text-[0.9375rem] leading-snug text-gray-600 sm:text-base sm:leading-relaxed">
                  <p>The scholarship test result has been officially announced.</p>
                  <p>
                    We warmly congratulate all students who have secured merit-based scholarships through their
                    hard work and outstanding performance.
                  </p>
                  <p>We wish all candidates continued success in their academic journey.</p>
                </div>
                <div className="mx-auto mt-4 flex max-w-xl flex-col items-center gap-1 border-t border-gray-100 pt-4 text-center sm:flex-row sm:justify-center sm:gap-2">
                  <span className="inline-flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4 shrink-0 text-primary-600" aria-hidden />
                    Scholarship test · 2026–27
                  </span>
                </div>
                <p className="mx-auto mt-3 max-w-lg text-center text-sm text-gray-500">
                  Select your class to view the full table. Values shown are as in the official lists; blank
                  cells are shown empty.
                </p>
              </section>

              {/* Results */}
              <section aria-labelledby="results-heading" className="mb-10 sm:mb-12">
                <h2
                  id="results-heading"
                  className="mb-4 text-center text-lg font-bold text-gray-900 sm:mb-6 sm:text-xl"
                >
                  Results
                </h2>
                <p className="mb-5 text-center text-sm text-gray-500 sm:text-base">
                  FSC Part 1 first, then 1st through 9th class — open one section at a time
                </p>
                <div className="flex flex-col gap-2 sm:gap-3">
                  <ScholarshipFscPart1Section />
                  <ScholarshipResultClassList />
                </div>
              </section>

              {/* Practical info — no “coming soon” or contradictory notices */}
              <section
                aria-labelledby="info-heading"
                className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-sm sm:p-8"
              >
                <h3 id="info-heading" className="text-center text-base font-bold text-gray-900 sm:text-lg">
                  Quick guide
                </h3>
                <ul className="mx-auto mt-6 max-w-2xl space-y-4 text-sm text-gray-600 sm:text-base">
                  <li className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-xs font-bold text-primary-800"
                      aria-hidden
                    >
                      1
                    </span>
                    <span>
                      Tables list roll number, names, marks, and totals as in the official class result
                      sheets.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-xs font-bold text-primary-800"
                      aria-hidden
                    >
                      2
                    </span>
                    <span>Open your class and use your roll number to find your row.</span>
                  </li>
                  <li className="flex gap-3">
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-xs font-bold text-primary-800"
                      aria-hidden
                    >
                      3
                    </span>
                    <span>
                      Shortlisted students should complete admission steps by the deadline communicated by the
                      school.
                    </span>
                  </li>
                </ul>
              </section>

              <div className="mt-8 text-center sm:mt-10">
                <a
                  href="/scholarships"
                  className="inline-flex min-h-[3rem] w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-primary-700 sm:w-auto sm:px-8 sm:text-base"
                >
                  <Award className="h-5 w-5 shrink-0" aria-hidden />
                  Learn more about scholarships
                </a>
              </div>
            </div>
          </Container>
        </main>
      </div>
    </>
  )
}
