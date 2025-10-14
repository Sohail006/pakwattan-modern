import AcademicSyllabusHero from '@/components/academic-syllabus/AcademicSyllabusHero'
import AcademicSyllabusDetails from '@/components/academic-syllabus/AcademicSyllabusDetails'
import AcademicSyllabusLevels from '@/components/academic-syllabus/AcademicSyllabusLevels'

export default function AcademicSyllabus() {
  return (
    <div className="min-h-screen">
      <AcademicSyllabusHero />
      <AcademicSyllabusDetails />
      <AcademicSyllabusLevels />
    </div>
  )
}
