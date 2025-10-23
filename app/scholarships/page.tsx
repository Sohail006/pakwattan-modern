import ScholarshipsHero from '@/components/scholarships/ScholarshipsHero'
import ScholarshipStats from '@/components/scholarships/ScholarshipStats'
import ScholarshipDataTables from '@/components/scholarships/ScholarshipDataTables'
import ScholarshipCriteria from '@/components/scholarships/ScholarshipCriteria'
import ScholarshipApplicationProcess from '@/components/scholarships/ScholarshipApplicationProcess'
import { 
  scholarshipStats, 
  scholarshipTypes, 
  scholarshipCriteria, 
  allScholarshipSessions 
} from '@/lib/scholarship-data'

export const metadata = {
  title: 'Scholarships - Pak Wattan School & College of Sciences',
  description: 'Learn about our scholarship programs including Pakians Scholarship, merit-based, orphan, special child, and Hafiz e Quran scholarships. 15 lacs scholarship program with detailed criteria and application process.',
  keywords: 'scholarships, pak wattan scholarships, merit scholarship, orphan scholarship, hafiz e quran scholarship, 15 lacs scholarship, march 23rd test',
}

export default function ScholarshipsPage() {
  return (
    <div className="min-h-screen">
      <ScholarshipsHero />
      <ScholarshipStats stats={scholarshipStats} />
      <ScholarshipDataTables sessions={allScholarshipSessions} />
      <ScholarshipCriteria 
        criteria={scholarshipCriteria} 
        scholarshipTypes={scholarshipTypes} 
      />
      <ScholarshipApplicationProcess />
    </div>
  )
}
