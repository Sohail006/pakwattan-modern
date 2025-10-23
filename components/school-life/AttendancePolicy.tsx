'use client'

import { ClipboardCheck, AlertTriangle, DollarSign, BookOpen } from 'lucide-react'

const AttendancePolicy = () => {
  const attendanceRules = [
    {
      id: 1,
      text: 'Attendance is recorded once in a day after morning assembly, at the end of first period.',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      id: 2,
      text: 'Leave for absence has to be applied for in advance writing and application should be written in ink and duly signed by parents/guardian.',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      id: 3,
      text: 'Application for medical must be delivered personally by the parent/guardian to eliminate the chances of malingering.',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      id: 4,
      text: 'Medical Leave of 6 days will be acceptable, recommended by authorized government medical officer.',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
    {
      id: 5,
      text: 'Students absenting themselves without valid reason for (3) or more (than 3) consecutive or random days will be issued warning letters.',
      icon: <AlertTriangle className="w-6 h-6 text-orange-500" />,
      color: 'bg-orange-50'
    },
    {
      id: 6,
      text: 'Students absenting themselves without valid reasons for (6) or more than (6) consecutive or random days will be issued struck off letters and will have to seek re-admission.',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      color: 'bg-red-50'
    },
    {
      id: 7,
      text: 'Absenting from terminal/phase exams will not be entertained as a case of re-exam and as all terms/phases contribute to the core of final exam, thus the absence from any exam would substantially decrease the chances of passing at the end of year.',
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50'
    },
    {
      id: 8,
      text: 'Students of board classes(9th to 2nd Year) who remains absent from terminal/phase/detention exams will not be allowed to appear in annual board examination.',
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      color: 'bg-purple-50'
    },
    {
      id: 9,
      text: 'A fine of Rs.100/- per day is levied for absence without leave and Rs.100/- per day may be imposed for absence immediately after and before the vacations/holidays.',
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50'
    },
    {
      id: 10,
      text: 'Absentee in any exam during year will lead to charge of Rs 1000/- fine per paper.',
      icon: <DollarSign className="w-6 h-6 text-green-500" />,
      color: 'bg-green-50'
    },
    {
      id: 11,
      text: 'Late comer will be fined Rs.100 per day and casual students will be fined heavily and will be given warning letters leading to expulsion from school/college.',
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      color: 'bg-red-50'
    },
    {
      id: 12,
      text: 'Telephonic information about the leave will be entertained only in case of emergency.',
      icon: <ClipboardCheck className="w-6 h-6 text-blue-500" />,
      color: 'bg-blue-50'
    },
  ]

  return (
    <section id="attendance-policy" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">ATTENDANCE</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
            Punctuality is the backbone of any field of life; achievement and accomplishment is the product of regularity. Observing the gravity of the major offence of missing the classes, the education code, as well as the Board's Calendar (BISE Abbottabad) have laid down that a student who has less than 75% of possible attendance, counted from the date of the commencement of the academic session, or the date of his/her admission to the school/college, in case of new admission, may not be allowed to take the annual examination. Therefore, we consider that complete class attendance is primary to learning and punctuality is the bedrock of discipline. On our part, the School and College have taken further strict measures to curb absenteeism.
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Attendance Rules */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 font-josefin mb-8 text-center">
              Attendance Rules & Regulations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {attendanceRules.map((rule) => (
                <div key={rule.id} className={`p-6 rounded-2xl shadow-md border border-gray-100 ${rule.color} flex items-start space-x-4 hover-lift`}>
                  <div className="flex-shrink-0 mt-1">
                    {rule.icon}
                  </div>
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notice */}
          <div className="mt-16 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-200">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-red-800 mb-4">Important Notice</h3>
              <p className="text-lg text-red-700 leading-relaxed">
                Students who maintain less than 75% attendance may not be allowed to appear in the annual examination as per BISE Abbottabad regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AttendancePolicy
