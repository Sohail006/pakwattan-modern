'use client'

import { Users, Heart, BookOpen, Trophy, Globe, Shield, Calendar } from 'lucide-react'

const StudentLife = () => {
  const studentLifeFeatures = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Vibrant Community',
      description: 'Join a diverse community of students from different backgrounds, fostering cultural exchange and mutual understanding.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Academic Excellence',
      description: 'Experience world-class education with dedicated teachers and modern teaching methodologies.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Extracurricular Activities',
      description: 'Participate in sports, arts, music, debate, and various clubs to develop well-rounded personalities.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Character Development',
      description: 'Build strong moral values, leadership skills, and social responsibility through various programs.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Safe Environment',
      description: 'Study in a secure, supportive environment that promotes learning and personal growth.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'Develop a global mindset through international programs and cultural exchange opportunities.',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  const dailyLife = [
    {
      time: '8:00 AM',
      activity: 'Morning Assembly',
      description: 'Start the day with prayers, announcements, and motivational talks'
    },
    {
      time: '8:15 AM - 2:30 PM',
      activity: 'Academic Classes',
      description: 'Engaging lessons across all subjects with interactive learning'
    },
    {
      time: '10:30 AM',
      activity: 'Break Time',
      description: 'Refreshments and social interaction with friends'
    },
    {
      time: '12:15 PM',
      activity: 'Lunch Break',
      description: 'Nutritious meals and recreational activities'
    },
    {
      time: '2:30 PM - 4:00 PM',
      activity: 'Extracurricular Activities',
      description: 'Sports, clubs, and special interest groups'
    }
  ]

  const studentTestimonials = [
    {
      name: 'Aisha Khan',
      grade: 'Grade 10',
      quote: 'Pak Wattan has given me the confidence to pursue my dreams. The teachers are supportive and the environment is truly inspiring.',
      image: '/images/students/student1.jpg'
    },
    {
      name: 'Ahmed Ali',
      grade: 'Grade 12',
      quote: 'The extracurricular activities here have helped me discover my passion for debate and public speaking.',
      image: '/images/students/student2.jpg'
    },
    {
      name: 'Fatima Sheikh',
      grade: 'Grade 9',
      quote: 'I love the sense of community here. Everyone is friendly and supportive, making learning enjoyable.',
      image: '/images/students/student3.jpg'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Student Life at Pak Wattan</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Experience a transformative educational journey that shapes character, builds skills, and prepares students for success in life.
          </p>
        </div>

        {/* Student Life Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {studentLifeFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 hover-lift"
            >
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Life Schedule */}
        <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            A Day in the Life of a Pak Wattan Student
          </h3>
          <div className="space-y-6">
            {dailyLife.map((item, index) => (
              <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{item.activity}</h4>
                    <span className="text-sm text-primary-600 font-medium">{item.time}</span>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Testimonials */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What Our Students Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {studentTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-primary-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.grade}</p>
                </div>
                <blockquote className="text-gray-600 italic text-center">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Join Our Community?
          </h3>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Become part of the Pak Wattan family and experience a transformative educational journey that will shape your future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
              Apply Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentLife
