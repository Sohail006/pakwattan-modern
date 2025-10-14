import TalentHuntHero from '@/components/talent-hunt/TalentHuntHero'
import TalentHuntOverview from '@/components/talent-hunt/TalentHuntOverview'
import TalentHuntSeasons from '@/components/talent-hunt/TalentHuntSeasons'
import TalentHuntContests from '@/components/talent-hunt/TalentHuntContests'
import TalentHuntRegistration from '@/components/talent-hunt/TalentHuntRegistration'

export const metadata = {
  title: 'Talent Hunt with Pak Wattan - School & College of Sciences',
  description: 'Join Talent Hunt with Pak Wattan - A vibrant platform to uncover hidden talents, build self-esteem, and inspire young minds to explore their full potential.',
  keywords: 'talent hunt, pak wattan, school competition, student talent, creativity, confidence, young minds',
}

export default function TalentHuntPage() {
  return (
    <div className="min-h-screen">
      <TalentHuntHero />
      <TalentHuntOverview />
      <TalentHuntSeasons />
      <TalentHuntContests />
      <TalentHuntRegistration />
    </div>
  )
}
