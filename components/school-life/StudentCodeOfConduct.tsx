'use client'

import { Shield, Users, BookOpen, Clock, Phone, Sparkles, AlertTriangle, Ban, Star } from 'lucide-react'

const StudentCodeOfConduct = () => {
  const codeOfConduct = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Punctuality & Attendance',
      description: 'Students must be punctual and attend all classes regularly.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Proper Uniform & Grooming',
      description: 'Students must wear the prescribed uniform and maintain proper grooming.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Respect for All',
      description: 'Students must respect teachers, staff, and fellow students.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Discipline & Order',
      description: 'Students must maintain discipline and order in the classroom and on campus.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: 'No Bullying Policy',
      description: 'Students must not engage in any form of bullying or harassment.',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Mobile Phone Policy',
      description: 'Students must not use mobile phones during class hours.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Cleanliness & Hygiene',
      description: 'Students must maintain cleanliness and hygiene in the school premises.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Safety Rules',
      description: 'Students must follow all safety rules and regulations.',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: <Ban className="w-6 h-6" />,
      title: 'Prohibited Items',
      description: 'Students must not bring any prohibited items to school.',
      color: 'from-gray-500 to-gray-600'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Participation in Activities',
      description: 'Students must participate in all school activities and events.',
      color: 'from-yellow-500 to-yellow-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">CODE OF HONOUR</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Every student is expected to maintain high standards of personal conduct and to respect the rights and privileges of other students, faculty, and staff members. The following rules and regulations are designed to ensure a safe and productive learning environment for all students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {codeOfConduct.map((rule, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 hover-lift"
            >
              <div className={`h-2 bg-gradient-to-r ${rule.color}`}></div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${rule.color} rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                    {rule.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                      {rule.title}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Important Notes
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All students are expected to follow these guidelines to maintain a positive learning environment. 
              Violations of the code of conduct may result in appropriate disciplinary action.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">For Students</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Follow all rules and regulations</li>
                <li>• Maintain respectful behavior</li>
                <li>• Participate actively in school activities</li>
                <li>• Report any violations to teachers or staff</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h4 className="font-semibold text-gray-900 mb-3">For Parents</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• Support the school&apos;s disciplinary policies</li>
                <li>• Communicate regularly with teachers</li>
                <li>• Ensure your child follows the uniform policy</li>
                <li>• Attend parent-teacher meetings</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default StudentCodeOfConduct
