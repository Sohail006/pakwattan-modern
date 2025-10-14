import AwardsHero from '@/components/awards/AwardsHero'
import AwardsGallery from '@/components/awards/AwardsGallery'
import AwardsAchievements from '@/components/awards/AwardsAchievements'

export const metadata = {
  title: 'Awards - Pak Wattan School & College of Sciences',
  description: 'Celebrate our achievements and awards at Pak Wattan School & College of Sciences. View our award gallery and recognition.',
  keywords: 'awards, pak wattan awards, school awards, achievements, recognition, havelian school awards',
}

export default function AwardsPage() {
  return (
    <div className="min-h-screen">
      <AwardsHero />
      <AwardsGallery />
      <AwardsAchievements />
    </div>
  )
}
