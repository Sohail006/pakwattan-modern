import AdmissionHero from '@/components/admission/AdmissionHero'
import AdmissionProcess from '@/components/admission/AdmissionProcess'
import AdmissionRequirements from '@/components/admission/AdmissionRequirements'
import AdmissionForm from '@/components/admission/AdmissionForm'

export const metadata = {
  title: 'Admission - Pak Wattan School & College of Sciences',
  description: 'Apply for admission to Pak Wattan School & College of Sciences. Learn about our admission process, requirements, and application procedures.',
  keywords: 'admission, school admission, pak wattan admission, havelian school admission, apply now',
}

export default function AdmissionPage() {
  return (
    <div className="min-h-screen">
      <AdmissionHero />
      <AdmissionProcess />
      <AdmissionRequirements />
      <AdmissionForm />
    </div>
  )
}
