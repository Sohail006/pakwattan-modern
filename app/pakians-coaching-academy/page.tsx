import PakiansCoachingAcademyHero from '@/components/pakians-coaching-academy/PakiansCoachingAcademyHero'
import PakiansCoachingAcademyDetails from '@/components/pakians-coaching-academy/PakiansCoachingAcademyDetails'
import PakiansCoachingAcademyPrograms from '@/components/pakians-coaching-academy/PakiansCoachingAcademyPrograms'
import PakiansCoachingAcademyRegistration from '@/components/pakians-coaching-academy/PakiansCoachingAcademyRegistration'

export default function PakiansCoachingAcademy() {
  return (
    <div className="min-h-screen">
      <PakiansCoachingAcademyHero />
      <PakiansCoachingAcademyDetails />
      <PakiansCoachingAcademyPrograms />
      <PakiansCoachingAcademyRegistration />
    </div>
  )
}
