'use client'

import { Users, Heart, Calendar, Phone, Mail } from 'lucide-react'

const ParentTeacherMeetings = () => {
  return (
    <section id="parent-teacher-meetings" className="section-padding bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Parent-Teacher Meetings</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-4xl mx-auto">
            It is a pristine fact that good working relationship between parents and teachers is one of the strong pillars on which an educational institute stands for the achievement of academic excellence.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8">
              <div className="flex items-center justify-center space-x-4 mb-6">
                <Users className="w-12 h-12 text-white" />
                <h3 className="text-3xl font-bold text-white">Building Strong Partnerships</h3>
              </div>
              <p className="text-white/90 text-lg text-center max-w-3xl mx-auto">
                It is needless to say that the first learning institute for a child is a mother's lap whereas; a teacher not only flourishes the mind but also uplifts a child spiritually. Therefore, the combination of parents and teacher's edification for the child reaches to the climax of understanding and development.
              </p>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h4>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Keeping in mind the importance of parents-teachers role, Pak Wattan School and College of Sciences conducts parents Teachers meetings on regular basis.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Calendar className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Regular Meetings</h5>
                        <p className="text-gray-600">Scheduled parent-teacher conferences throughout the academic year</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Phone className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Open Communication</h5>
                        <p className="text-gray-600">Direct communication channels between parents and teachers</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <Heart className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
                      <div>
                        <h5 className="font-semibold text-gray-900">Student Welfare</h5>
                        <p className="text-gray-600">Focus on holistic development and academic progress</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Meeting Benefits</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Discuss student progress and academic performance</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Address any concerns or challenges</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Plan strategies for student improvement</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Strengthen home-school partnership</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">Share information about school activities and events</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-12 text-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <h4 className="text-2xl font-bold mb-4">Ready to Schedule a Meeting?</h4>
                  <p className="text-lg mb-6">
                    Contact us to schedule a parent-teacher meeting or for any inquiries about your child's progress.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+92-999-123-4567" className="btn-secondary inline-flex items-center justify-center">
                      <Phone className="w-5 h-5 mr-2" />
                      Call Us
                    </a>
                    <a href="mailto:info@pakwattan.edu.pk" className="btn-secondary inline-flex items-center justify-center">
                      <Mail className="w-5 h-5 mr-2" />
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ParentTeacherMeetings
