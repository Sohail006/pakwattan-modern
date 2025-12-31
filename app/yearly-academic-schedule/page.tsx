import { Metadata } from 'next'
import YearlyAcademicScheduleHero from '@/components/yearly-academic-schedule/YearlyAcademicScheduleHero'
import YearlyAcademicScheduleDetails from '@/components/yearly-academic-schedule/YearlyAcademicScheduleDetails'
import YearlyAcademicScheduleCalendar from '@/components/yearly-academic-schedule/YearlyAcademicScheduleCalendar'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Yearly Academic Schedule',
  description: 'View the yearly academic schedule and calendar for Pak Wattan School & College of Sciences. Important dates, holidays, exams, and events throughout the academic year.',
  keywords: 'academic schedule, school calendar, academic calendar, yearly schedule, pak wattan calendar, exam schedule, holiday schedule',
  path: '/yearly-academic-schedule',
})

export default function YearlyAcademicSchedule() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Yearly Academic Schedule', url: 'https://pakwattan.edu.pk/yearly-academic-schedule' },
  ])
  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <YearlyAcademicScheduleHero />
        <YearlyAcademicScheduleDetails />
        <YearlyAcademicScheduleCalendar />
      </div>
    </>
  )
}
