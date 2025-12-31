'use client'

import { FileText, User, Award, CheckCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'

const AdmissionRequirements = () => {
  const initialDocuments = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Admission Form',
      description: 'Duly completed in all aspects and handed over before entry test date'
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'Birth Certificate',
      description: 'Photo copy Form B/Birth Certificate issued by NADRA'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Photographs',
      description: '2 latest passport size photographs'
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'CNIC Copy',
      description: 'Photocopy of CNIC (Father). In case father is not alive, CNIC of guardian is acceptable'
    }
  ]

  const postAdmissionDocuments = [
    {
      icon: <Award className="w-6 h-6" />,
      title: 'School Leaving Certificate',
      description: 'In original duly signed by concerned board/DEO'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'DMC Copies',
      description: 'Copy of DMC&apos;s for class 9th to 2nd Year'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Migration Certificate',
      description: 'Original migration certificate of other/local board'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Scholarship Documents',
      description: 'Scholarship students will deposit their Original DMC&apos;s, returned after completion of 2nd Year'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Affidavit',
      description: 'Affidavit on stamp paper as per specimen'
    },
    {
      icon: <User className="w-6 h-6" />,
      title: 'Death Certificate',
      description: 'In case of Orphan candidate must provide copy of father&apos;s death certificate'
    }
  ]

  const eligibilityCriteria = [
    'For admission to any class, a candidate must either be studying in that class or must have passed the lower class preferably from an English medium institution',
    'The candidate must be medically fit',
    'Own students (play group to intermediate) who have appeared in annual exam will be granted admission on their performance in annual examination',
    'Score less than 60% in annual exams will not be forwarded for admission in new class'
  ]

  return (
    <section id="admission-requirements" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <Container>
        <div className="text-center mb-8 sm:mb-12 lg:mb-16 px-4 sm:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6">
            <span className="text-gradient">Admission Requirements</span>
          </h2>
          <p className="text-base sm:text-lg text-secondary-600 max-w-3xl mx-auto break-words">
            Complete list of documents and eligibility criteria for admission
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12 lg:mb-16">
          {/* Initial Documents */}
          <Card className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="break-words">Initial Documents Required</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              These documents must be submitted before the entry test date:
            </p>
            <div className="space-y-3 sm:space-y-4">
              {initialDocuments.map((doc, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-primary-600 mt-1 flex-shrink-0">
                    {doc.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 break-words">{doc.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Post-Admission Documents */}
          <Card className="p-4 sm:p-6 lg:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="break-words">Post-Admission Documents</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 break-words">
              These documents must be provided after confirmation of admission:
            </p>
            <div className="space-y-3 sm:space-y-4">
              {postAdmissionDocuments.map((doc, index) => (
                <div key={index} className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                  <div className="text-primary-600 mt-1 flex-shrink-0">
                    {doc.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900 break-words">{doc.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 break-words">{doc.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Eligibility Criteria */}
        <Card className="p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-primary-50 to-accent-50 border-l-4 border-primary-400">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 mr-2 sm:mr-3 flex-shrink-0" />
              <span className="break-words">Eligibility Criteria</span>
            </h3>
          <ul className="space-y-3 sm:space-y-4">
            {eligibilityCriteria.map((criteria, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-700 break-words">{criteria}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  )
}

export default AdmissionRequirements
