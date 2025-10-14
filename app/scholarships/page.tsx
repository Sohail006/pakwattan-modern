import ScholarshipsHero from '@/components/scholarships/ScholarshipsHero'
import ScholarshipTypes from '@/components/scholarships/ScholarshipTypes'
import ScholarshipApplication from '@/components/scholarships/ScholarshipApplication'

export const metadata = {
  title: 'Scholarships - Pak Wattan School & College of Sciences',
  description: 'Learn about our scholarship programs including Pakians Scholarship, merit-based, orphan, special child, and Hafiz e Quran scholarships.',
  keywords: 'scholarships, pak wattan scholarships, merit scholarship, orphan scholarship, hafiz e quran scholarship',
}

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen">
      <ScholarshipsHero />
      <ScholarshipTypes />
      <ScholarshipApplication />
    </div>
  )
}
