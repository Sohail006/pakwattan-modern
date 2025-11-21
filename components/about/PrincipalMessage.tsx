'use client'

import Image from 'next/image'
import { Quote, User, BookOpen, Target, Users } from 'lucide-react'

const PrincipalMessage = () => {
  return (
    <section id="principal-message" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Principal&apos;s Message</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            A message from our Principal about our educational approach and student development.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Principal Image */}
              <div className="lg:col-span-1">
                <div className="relative">
                  <div className="w-full h-80 lg:h-96 relative rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src="/images/about-us/Picture7.jpg"
                      alt="Malik Ahsan Ali - Principal"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Principal Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
                    Malik Ahsan Ali
                  </h3>
                  <p className="text-lg text-accent-600 font-semibold mb-6">
                    Administration Cum Principal, Pak Wattan School & College of Sciences
                  </p>
                </div>

                <div className="space-y-6">
                  <p className="text-lg text-secondary-700 leading-relaxed">
                    MALIK AHSAN ALI S/O MALIK MUHAMMAD SHABBIR is the administrator cum principal of PAK WATTAN. 
                    He is a great educationist, a very passionate and professional person. He is the man of his 
                    words. He never goes against his words, here are some of his words regarding his 
                    responsibilities at PAK WATTAN.
                  </p>

                  <div className="bg-gradient-to-br from-accent-50 to-primary-50 rounded-2xl p-8 shadow-lg border-l-4 border-accent-600">
                    <div className="flex items-start space-x-4">
                      <Quote className="w-8 h-8 text-accent-600 flex-shrink-0 mt-1" />
                      <div className="space-y-4">
                        <p className="text-lg text-secondary-800 font-medium italic leading-relaxed">
                          &ldquo;Since, PAK WATTAN came into being on 2nd November 2020 striding on the way of 
                          rapid growth in leaps and bounds. I feel proud to be the principal of such a 
                          prestigious, glorious and miraculous institute which provides great benefits and 
                          opportunities to the future doctors, engineers, professors and to the people of 
                          every field, it is also a great source of preparing of students for the life and 
                          the future and life also, character, academics, creativity, confidence, dedication 
                          and enthusiasm for education&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-secondary-700 leading-relaxed">
                    People admire PAK WATTAN for its quality of education, policies to provide the very fine 
                    fee structures and attractive scholarships. I assure you that your first entry in PAK WATTAN 
                    would be the entry in never ending room of success, laurels, discipline, and sincerity. It would 
                    be your most prudent decision and you will be find us so much active in your all actions.
                  </p>

                  <p className="text-lg text-secondary-700 leading-relaxed">
                    We always advise our students that don&apos;t ever let yourself to be agree on less knowledge 
                    always strive for more and more so you can find the real knowledge, the real soul of the 
                    knowledge; the real thirst of the knowledge and the real world of the knowledge.
                  </p>
                </div>

                {/* Key Principles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <BookOpen className="w-8 h-8 text-primary-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Knowledge</h4>
                    <p className="text-sm text-secondary-600">Striving for real knowledge and understanding</p>
                  </div>
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Target className="w-8 h-8 text-accent-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Discipline</h4>
                    <p className="text-sm text-secondary-600">Maintaining high standards of discipline</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-4" />
                    <h4 className="font-semibold text-secondary-800 mb-2">Success</h4>
                    <p className="text-sm text-secondary-600">Pathway to success and laurels</p>
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

export default PrincipalMessage
