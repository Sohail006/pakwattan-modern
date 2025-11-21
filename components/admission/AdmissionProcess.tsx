'use client'

import { Calendar, FileText, Users, Award, CheckCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const AdmissionProcess = () => {
  const processSteps = [
    {
      step: 1,
      icon: <FileText className="w-8 h-8" />,
      title: 'Application Submission',
      description: 'Submit completed admission form with required documents before the entry test date.',
      details: [
        'Admission form duly completed in all aspects',
        'Photo copy Form B/Birth Certificate issued by NADRA',
        '2 latest passport size photographs',
        'Photocopy of CNIC (Father) or Guardian'
      ]
    },
    {
      step: 2,
      icon: <Calendar className="w-8 h-8" />,
      title: 'Entry Test',
      description: 'Entry test is held on 5th February every year. Advertisement appears in prominent English/Urdu dailies.',
      details: [
        'Test based on previous class curriculum',
        'Aptitude/intelligence/picture tests for Prep and Nursery',
        'Minimum 60% score required for eligibility',
        'Test results cannot be challenged'
      ]
    },
    {
      step: 3,
      icon: <Users className="w-8 h-8" />,
      title: 'Interview',
      description: 'Candidates scoring 60% or above will be called for interview.',
      details: [
        'Personal interview with admission committee',
        'Assessment of student&apos;s potential',
        'Verification of documents',
        'Final selection based on merit'
      ]
    },
    {
      step: 4,
      icon: <Award className="w-8 h-8" />,
      title: 'Admission Confirmation',
      description: 'Selected candidates will receive admission confirmation and further instructions.',
      details: [
        'Admission purely on merit basis',
        'According to seats availability',
        'Additional documents required after confirmation',
        'Fee payment and enrollment process'
      ]
    }
  ]

  const importantNotes = [
    'Students found residing outside college premises without parents will be immediately expelled',
    'Own students (play group to intermediate) admission based on annual exam performance',
    'Score less than 60% in annual exams will not be forwarded for admission in new class',
    'Candidates must be medically fit for admission'
  ]

  return (
    <section id="admission-process" className="section-padding bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Admission Process</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Our comprehensive admission process ensures fair and transparent selection of students
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 lg:mb-16">
          {processSteps.map((step, index) => (
            <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white">
                  {step.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary-600 mb-2">Step {step.step}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 mb-4">{step.description}</p>
              <ul className="text-sm text-gray-600 space-y-1">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        {/* Important Notes */}
        <Card className="p-6 sm:p-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="w-6 h-6 text-primary-600 mr-3" />
            Important Notes
          </h3>
          <ul className="space-y-3">
            {importantNotes.map((note, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 mr-3 flex-shrink-0" />
                <span className="text-gray-700">{note}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  )
}

export default AdmissionProcess
