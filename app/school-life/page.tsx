import SchoolLifeHero from '@/components/school-life/SchoolLifeHero'
import SchoolLifeActivities from '@/components/school-life/SchoolLifeActivities'
import SchoolLifeGallery from '@/components/school-life/SchoolLifeGallery'

export const metadata = {
  title: 'School Life - Pak Wattan School & College of Sciences',
  description: 'Experience the vibrant school life at Pak Wattan. Learn about our activities, events, and student life.',
  keywords: 'school life, student activities, pak wattan school life, havelian school activities, student events',
}

export default function SchoolLifePage() {
  return (
    <div className="min-h-screen">
      <SchoolLifeHero />
      <SchoolLifeActivities />
      <SchoolLifeGallery />
    </div>
  )
}
