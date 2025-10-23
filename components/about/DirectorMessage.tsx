'use client'

import Image from 'next/image'
import { Quote, User, Award, Heart } from 'lucide-react'

const DirectorMessage = () => {
  return (
    <section id="director-message" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Executive Director's Message</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            A message from our Executive Director about our vision and commitment to education.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Director Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="w-full h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/about-us/picture6.jpg"
                      alt="Sardar Abdul Aqeel - Executive Director"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Director Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
                    Sardar Abdul Aqeel
                  </h3>
                  <p className="text-lg text-primary-600 font-semibold mb-6">
                    Executive Director, Pak Wattan School & College of Sciences
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-secondary-700 leading-relaxed">
                    Sardar Abdul Aqeel S/o Sardar Abdul Hameed is the managing director of PAK WATTAN. 
                    He is an educationist, an enthusiastic and passionate personality. He is such an 
                    optimistic person and always stands firm on his words. Here are some of his words 
                    regarding his vision for opening this prestigious institute, PAK WATTAN.
                  </p>

                  <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-primary-600">
                    <div className="flex items-start space-x-4">
                      <Quote className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
                      <div className="space-y-4">
                        <p className="text-lg text-secondary-800 font-medium italic leading-relaxed">
                          "Since, PAK WATTAN came into being on 2nd November 2020 striding on the way of 
                          rapid growth in leaps and bounds. I feel proud to be the principal of such a 
                          prestigious, glorious and miraculous institute which provides great benefits and 
                          opportunities to the future doctors, engineers, professors and to the people of 
                          every field, it is also a great source of preparing of students for the life and 
                          the future and life also, character, academics, creativity, confidence, dedication 
                          and enthusiasm for education"
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-secondary-700 leading-relaxed">
                    Visitors are always welcome to make an appointment to visit PAK WATTAN and see what 
                    we offer to young people of our local community. I look forward to welcoming you to 
                    ensure the best standard of education and personal development of your child.
                  </p>
                </div>

                {/* Key Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                    <Award className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Excellence</h4>
                    <p className="text-sm text-secondary-600">Committed to academic excellence</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                    <Heart className="w-8 h-8 text-accent-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Passion</h4>
                    <p className="text-sm text-secondary-600">Passionate about education</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                    <User className="w-8 h-8 text-green-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Community</h4>
                    <p className="text-sm text-secondary-600">Serving local community</p>
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

export default DirectorMessage
