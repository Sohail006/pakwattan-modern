import SchoolLifeHero from '@/components/school-life/SchoolLifeHero'
import AcademicSchedule from '@/components/school-life/AcademicSchedule'
import StudentCodeOfConduct from '@/components/school-life/StudentCodeOfConduct'
import CollegeKit from '@/components/school-life/CollegeKit'
import AttendancePolicy from '@/components/school-life/AttendancePolicy'
import ParentTeacherMeetings from '@/components/school-life/ParentTeacherMeetings'
import SchoolActivities from '@/components/school-life/SchoolActivities'
import StudentLife from '@/components/school-life/StudentLife'

export const metadata = {
  title: 'School Life - Pak Wattan School & College of Sciences',
  description: 'Discover the vibrant school life at Pak Wattan School & College of Sciences. Learn about our academic schedule, student activities, code of conduct, and more.',
}

export default function SchoolLifePage() {
  return (
    <div className="min-h-screen">
      <SchoolLifeHero />
      <AcademicSchedule />
      <StudentCodeOfConduct />
      <CollegeKit />
      <AttendancePolicy />
      <ParentTeacherMeetings />
      <SchoolActivities />
      <StudentLife />
    </div>
  )
}