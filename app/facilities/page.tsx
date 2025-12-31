import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import FacilitiesHero from '@/components/facilities/FacilitiesHero'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'
import SkeletonLoader from '@/components/ui/SkeletonLoader'

// Lazy load below-fold components for better performance
const MedicalFacilities = dynamic(() => import('@/components/facilities/MedicalFacilities'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const PhysicalTraining = dynamic(() => import('@/components/facilities/PhysicalTraining'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ScienceLab = dynamic(() => import('@/components/facilities/ScienceLab'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ReligiousTraining = dynamic(() => import('@/components/facilities/ReligiousTraining'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ClassRooms = dynamic(() => import('@/components/facilities/ClassRooms'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const ComputerLab = dynamic(() => import('@/components/facilities/ComputerLab'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const SecuritySystem = dynamic(() => import('@/components/facilities/SecuritySystem'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

const SmartBoards = dynamic(() => import('@/components/facilities/SmartBoards'), {
  loading: () => <SkeletonLoader variant="section" className="my-8" />
})

export const metadata: Metadata = generatePageMetadata({
  title: 'Facilities',
  description: 'Explore our state-of-the-art facilities including medical, physical training, science labs, computer labs, smart boards, and security systems at Pak Wattan School & College of Sciences.',
  keywords: 'school facilities, medical facilities, science lab, computer lab, smart boards, security system, pak wattan facilities, havelian school facilities',
  path: '/facilities',
})

export default function FacilitiesPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Facilities', url: 'https://pakwattan.edu.pk/facilities' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <FacilitiesHero />
        <MedicalFacilities />
        <PhysicalTraining />
        <ScienceLab />
        <ReligiousTraining />
        <ClassRooms />
        <ComputerLab />
        <SecuritySystem />
        <SmartBoards />
      </div>
    </>
  )
}
