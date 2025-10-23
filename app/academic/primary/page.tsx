import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { BookOpen, Users, Calculator, Globe, Heart, Microscope } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Primary Education - PakWattan Modern School',
  description: 'Foundation education program for students aged 6-10 years with emphasis on core subjects and character building.',
}

const PrimaryPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Core Subjects',
      description: 'Strong foundation in Mathematics, English, Urdu, Science, and Islamic Studies.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Character Building',
      description: 'Developing moral values, discipline, and good citizenship through structured programs.'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'Critical Thinking',
      description: 'Encouraging analytical thinking and problem-solving skills from an early age.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Awareness',
      description: 'Understanding of world cultures, geography, and environmental responsibility.'
    }
  ]

  const subjects = [
    { name: 'Mathematics', icon: <Calculator className="w-6 h-6" />, description: 'Number sense, basic operations, geometry, and problem-solving' },
    { name: 'English Language', icon: <BookOpen className="w-6 h-6" />, description: 'Reading, writing, grammar, and communication skills' },
    { name: 'Urdu Language', icon: <BookOpen className="w-6 h-6" />, description: 'National language proficiency and literature appreciation' },
    { name: 'Science', icon: <Microscope className="w-6 h-6" />, description: 'Basic concepts in physics, chemistry, biology, and earth sciences' },
    { name: 'Islamic Studies', icon: <Heart className="w-6 h-6" />, description: 'Quranic studies, Islamic history, and moral values' },
    { name: 'Social Studies', icon: <Globe className="w-6 h-6" />, description: 'History, geography, civics, and cultural awareness' }
  ]

  const gradeLevels = [
    { grade: 'Grade 1', age: '6-7 years', focus: 'Basic literacy and numeracy skills' },
    { grade: 'Grade 2', age: '7-8 years', focus: 'Building on foundational concepts' },
    { grade: 'Grade 3', age: '8-9 years', focus: 'Developing critical thinking' },
    { grade: 'Grade 4', age: '9-10 years', focus: 'Advanced problem-solving' },
    { grade: 'Grade 5', age: '10-11 years', focus: 'Preparation for middle school' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Primary Education
            </h1>
            <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
              Foundation education for students aged 6-10 years with emphasis on core subjects and character building
            </p>
          </div>
        </Container>
      </section>

      {/* Program Overview */}
      <section className="py-16">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Primary Program
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our primary education program provides a solid foundation for lifelong learning. 
                We focus on developing essential academic skills while nurturing character, creativity, 
                and critical thinking abilities.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our experienced teachers use innovative teaching methods to make learning engaging 
                and effective, ensuring every student reaches their full potential.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">6-10</div>
                  <div className="text-sm text-gray-600">Age Range</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-600">5</div>
                  <div className="text-sm text-gray-600">Years Duration</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-green-600 mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive curriculum covering all essential areas of primary education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-green-600">
                    {subject.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900">{subject.name}</h3>
                </div>
                <p className="text-gray-600 text-sm">{subject.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Grade Levels */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Grade Levels
            </h2>
            <p className="text-lg text-gray-600">
              Progressive learning journey through primary education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gradeLevels.map((level, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-green-600 mb-2">{level.grade}</div>
                <div className="text-sm text-gray-600 mb-3">{level.age}</div>
                <p className="text-gray-700 text-sm">{level.focus}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Admission Info */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Start Your Child&apos;s Primary Education Journey
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join our primary program and give your child a strong foundation for academic success and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/admission" 
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

export default PrimaryPage
