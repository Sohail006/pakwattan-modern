import { Metadata } from 'next'
import AdmissionHero from '@/components/admission/AdmissionHero'
import AdmissionProcess from '@/components/admission/AdmissionProcess'
import AdmissionRequirements from '@/components/admission/AdmissionRequirements'
import FeeStructure from '@/components/admission/FeeStructure'
import StudentRegistrationForm from '@/components/registration-form/StudentRegistrationForm'
import StickyApplyButton from '@/components/admission/StickyApplyButton'
import QuickNavigation from '@/components/admission/QuickNavigation'
import StructuredData from '@/components/seo/StructuredData'
import { generateMetadata as generatePageMetadata } from '@/lib/seo/metadata'
import { generateBreadcrumbSchema } from '@/lib/seo/structuredData'

export const metadata: Metadata = generatePageMetadata({
  title: 'Admission',
  description: 'Apply for admission to Pak Wattan School & College of Sciences. Learn about our admission process, requirements, fee structure, age limits, and application procedures for 2026-27 session.',
  keywords: 'admission, school admission, pak wattan admission, havelian school admission, fee structure, age limits, apply now, 2026-27 admission',
  path: '/admission',
})

export default function AdmissionPage() {
  const breadcrumbs = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://pakwattan.edu.pk' },
    { name: 'Admission', url: 'https://pakwattan.edu.pk/admission' },
  ])

  return (
    <>
      <StructuredData data={breadcrumbs} />
      <div className="min-h-screen">
        <AdmissionHero />
        <div className="border-t border-gray-200"></div>
        <AdmissionProcess />
        <div className="border-t border-gray-200"></div>
        <AdmissionRequirements />
        <div className="border-t border-gray-200"></div>
        <FeeStructure />
        <div className="border-t border-gray-200"></div>
        <div id="admission-form">
          <StudentRegistrationForm />
        </div>
        <StickyApplyButton />
        <QuickNavigation />
      </div>
    </>
  )
}
