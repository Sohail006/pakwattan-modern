import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import { BookOpen, Users, Calendar, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Montessori Education - PakWattan Modern School',
  description: 'Early childhood education program focusing on holistic development for children aged 3-5 years.',
}

const MontessoriPage = () => {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Play-Based Learning',
      description: 'Learning through interactive play activities that stimulate creativity and imagination.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Social Development',
      description: 'Building social skills through group activities and peer interaction.'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Structured Schedule',
      description: 'Age-appropriate daily routines that balance learning, play, and rest.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Character Building',
      description: 'Instilling moral values and good habits from an early age.'
    }
  ]

  const subjects = [
    'Basic Mathematics',
    'Language Development',
    'Art & Craft',
    'Physical Activities',
    'Music & Movement',
    'Social Skills',
    'Environmental Awareness'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Montessori Education
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Early childhood education focusing on holistic development for children aged 3-5 years
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
                Our Montessori Program
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our Montessori program is designed to provide a nurturing environment where young children 
                can explore, discover, and learn at their own pace. We focus on developing the whole child 
                through hands-on activities and experiential learning.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our experienced teachers create a supportive atmosphere that encourages curiosity, 
                independence, and a love for learning that will last a lifetime.
              </p>
              
                     <div className="grid grid-cols-2 gap-4">
                       <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-primary-200">
                         <div className="text-2xl font-bold text-primary-600">3-5</div>
                         <div className="text-sm text-gray-600">Age Range</div>
                       </div>
                       <div className="text-center p-4 bg-white rounded-lg shadow-sm border border-primary-200">
                         <div className="text-2xl font-bold text-primary-600">2</div>
                         <div className="text-sm text-gray-600">Years Duration</div>
                       </div>
                     </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Features</h3>
              <div className="space-y-4">
                       {features.map((feature, index) => (
                         <div key={index} className="flex items-start space-x-4">
                           <div className="text-primary-600 mt-1">
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
              Subjects & Activities
            </h2>
            <p className="text-lg text-gray-600">
              Our comprehensive curriculum covers all essential areas of early childhood development
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-2xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900">{subject}</h3>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Admission Info */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Child&apos;s Educational Journey?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join our Montessori program and give your child the best foundation for future learning and success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/admission" 
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Apply Now
              </a>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
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

export default MontessoriPage
