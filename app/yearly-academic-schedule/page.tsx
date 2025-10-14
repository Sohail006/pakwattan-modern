import YearlyAcademicScheduleHero from '@/components/yearly-academic-schedule/YearlyAcademicScheduleHero'
import YearlyAcademicScheduleDetails from '@/components/yearly-academic-schedule/YearlyAcademicScheduleDetails'
import YearlyAcademicScheduleCalendar from '@/components/yearly-academic-schedule/YearlyAcademicScheduleCalendar'

export default function YearlyAcademicSchedule() {
  return (
    <div className="min-h-screen">
      <YearlyAcademicScheduleHero />
      <YearlyAcademicScheduleDetails />
      <YearlyAcademicScheduleCalendar />
    </div>
  )
}
