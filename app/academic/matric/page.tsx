import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { BookOpen, Users, Calculator, Globe, Award, Microscope, Laptop } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Matriculation Education - PakWattan Modern School',
  description: 'Secondary education program for students aged 14-15 years with specialization in science and arts streams.',
}

const MatricPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Advanced Curriculum',
      description: 'Comprehensive study of core subjects with focus on analytical thinking and research skills.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Leadership Development',
      description: 'Building leadership qualities through student councils, clubs, and community service.'
    },
    {
      icon: <Calculator className="w-8 h-8" />,
      title: 'STEM Focus',
      description: 'Strong emphasis on Science, Technology, Engineering, and Mathematics education.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Academic Excellence',
      description: 'Preparing students for board examinations and higher education opportunities.'
    }
  ]

  const scienceSubjects = [
    { name: 'Physics', icon: <Microscope className="w-6 h-6" />, description: 'Mechanics, thermodynamics, electricity, and modern physics' },
    { name: 'Chemistry', icon: <Microscope className="w-6 h-6" />, description: 'Organic, inorganic, and physical chemistry concepts' },
    { name: 'Biology', icon: <Microscope className="w-6 h-6" />, description: 'Cell biology, genetics, ecology, and human physiology' },
    { name: 'Mathematics', icon: <Calculator className="w-6 h-6" />, description: 'Algebra, geometry, trigonometry, and calculus' },
    { name: 'English', icon: <BookOpen className="w-6 h-6" />, description: 'Literature, composition, and communication skills' },
    { name: 'Urdu', icon: <BookOpen className="w-6 h-6" />, description: 'Language proficiency and literary appreciation' },
    { name: 'Pakistan Studies', icon: <Globe className="w-6 h-6" />, description: 'History, geography, and civic education' },
    { name: 'Islamic Studies', icon: <Award className="w-6 h-6" />, description: 'Quranic studies, Islamic history, and ethics' }
  ]

  const streams = [
    {
      name: 'Science Group',
      description: 'Physics, Chemistry, Biology, Mathematics',
      icon: <Microscope className="w-8 h-8" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Arts Group',
      description: 'English, Urdu, Pakistan Studies, Islamic Studies',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Computer Science',
      description: 'Programming, Database, Web Development',
      icon: <Laptop className="w-8 h-8" />,
      color: 'from-green-500 to-green-600'
    }
  ]

  const achievements = [
    { title: 'Board Results', value: '95%+', description: 'Pass rate in SSC examinations' },
    { title: 'A+ Grades', value: '80%+', description: 'Students achieving top grades' },
    { title: 'Scholarships', value: '50+', description: 'Merit-based scholarships awarded' },
    { title: 'University Placements', value: '90%+', description: 'Students admitted to top universities' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Matriculation Education
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              Secondary education program for students aged 14-15 years with specialization in science and arts streams
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
                Our Matriculation Program
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our matriculation program prepares students for the challenges of higher education and professional life. 
                We offer specialized streams in Science, Arts, and Computer Science to cater to diverse interests and career goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our experienced faculty and modern facilities ensure students receive quality education that meets 
                national and international standards.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">14-15</div>
                  <div className="text-sm text-gray-600">Age Range</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">2</div>
                  <div className="text-sm text-gray-600">Years Duration</div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="text-purple-600 mt-1">
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

      {/* Streams */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Available Streams
            </h2>
            <p className="text-lg text-gray-600">
              Choose the stream that aligns with your interests and career goals
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {streams.map((stream, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stream.color} text-white mb-4`}>
                  {stream.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{stream.name}</h3>
                <p className="text-gray-600">{stream.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Core Subjects
            </h2>
            <p className="text-lg text-gray-600">
              Comprehensive curriculum covering all essential areas of secondary education
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scienceSubjects.map((subject, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="text-purple-600">
                    {subject.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm">{subject.name}</h3>
                </div>
                <p className="text-gray-600 text-xs">{subject.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600">
              Outstanding results and student success stories
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-purple-600 mb-2">{achievement.value}</div>
                <h3 className="font-semibold text-gray-900 mb-1">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Admission Info */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready for Advanced Studies?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Join our matriculation program and prepare for a successful academic and professional future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/admission" 
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
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

export default MatricPage
