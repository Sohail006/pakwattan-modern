import FacilitiesHero from '@/components/facilities/FacilitiesHero'
import MedicalFacilities from '@/components/facilities/MedicalFacilities'
import PhysicalTraining from '@/components/facilities/PhysicalTraining'
import ScienceLab from '@/components/facilities/ScienceLab'
import ReligiousTraining from '@/components/facilities/ReligiousTraining'
import ClassRooms from '@/components/facilities/ClassRooms'
import ComputerLab from '@/components/facilities/ComputerLab'
import SecuritySystem from '@/components/facilities/SecuritySystem'
import SmartBoards from '@/components/facilities/SmartBoards'

export const metadata = {
  title: 'Facilities - Pak Wattan School & College of Sciences',
  description: 'Explore our state-of-the-art facilities including medical, physical training, science labs, computer labs, and more at Pak Wattan School.',
  keywords: 'school facilities, medical facilities, science lab, computer lab, smart boards, security system, pak wattan facilities',
}

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen">
      <FacilitiesHero />
      <MedicalFacilities />
      <PhysicalTraining />
      <ScienceLab />
      <ReligiousTraining />
      <ClassRooms />
      <ComputerLab />
      <SecuritySystem />
      <SmartBoards />
    </div>
  )
}
