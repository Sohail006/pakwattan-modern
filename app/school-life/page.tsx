import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import SchoolLifeHero from '@/components/school-life/SchoolLifeHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const AcademicSchedule = dynamic(() => import('@/components/school-life/AcademicSchedule'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const StudentCodeOfConduct = dynamic(() => import('@/components/school-life/StudentCodeOfConduct'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const CollegeKit = dynamic(() => import('@/components/school-life/CollegeKit'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const AttendancePolicy = dynamic(() => import('@/components/school-life/AttendancePolicy'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ParentTeacherMeetings = dynamic(() => import('@/components/school-life/ParentTeacherMeetings'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const HouseSystem = dynamic(() => import('@/components/school-life/HouseSystem'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const SchoolActivities = dynamic(() => import('@/components/school-life/SchoolActivities'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const StudentLife = dynamic(() => import('@/components/school-life/StudentLife'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'School Life',
  description: 'Discover the vibrant school life at Pak Wattan School & College of Sciences. Explore our four-house system, academic schedule, student activities, code of conduct, attendance policy, and parent-teacher meetings.',
  keywords: 'school life, house system, Edhi house, Aziz Bhatti house, Marium Mukhtiar house, Abdul Qadeer Khan house, student activities, academic schedule, pak wattan school life',
  path: '/school-life',
})

export default function SchoolLifePage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'School Life', url: 'https://pakwattan.edu.pk/school-life' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <SchoolLifeHero />
        <AcademicSchedule />
        <StudentCodeOfConduct />
        <CollegeKit />
        <AttendancePolicy />
        <ParentTeacherMeetings />
        <HouseSystem />
        <SchoolActivities />
        <StudentLife />
      </div>
    </>
  )
}