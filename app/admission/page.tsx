import AdmissionHero from '@/components/admission/AdmissionHero'
import AdmissionProcess from '@/components/admission/AdmissionProcess'
import AdmissionRequirements from '@/components/admission/AdmissionRequirements'
import FeeStructure from '@/components/admission/FeeStructure'
import StudentRegistrationForm from '@/components/registration-form/StudentRegistrationForm'
import StickyApplyButton from '@/components/admission/StickyApplyButton'
import QuickNavigation from '@/components/admission/QuickNavigation'

export const metadata = {
  title: 'Admission - Pak Wattan School & College of Sciences',
  description: 'Apply for admission to Pak Wattan School & College of Sciences. Learn about our admission process, requirements, fee structure, and application procedures.',
  keywords: 'admission, school admission, pak wattan admission, havelian school admission, fee structure, age limits, apply now',
}

export default function AdmissionPage() {
  return (
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
  )
}
