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
  title: 'Admission 2026-27 — Apply Online',
  description:
    'Apply online for admission to Pak Wattan School & College of Sciences, Havelian. Process, requirements, fees, age limits, and 2026-27 application form.',
  keywords:
    'Pak Wattan admission, apply online Havelian, school admission 2026, fee structure, age limits, PWSCS admission form',
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
