'use client'

import Image from 'next/image'
import { TrendingUp, Users, Award, Calendar } from 'lucide-react'

const GrowthChart = () => {
  const growthStats = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Student Enrollment',
      value: '1750+',
      description: 'Students enrolled across all campuses'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Awards & Achievements',
      value: '1100+',
      description: 'Awards won by our students'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Years of Excellence',
      value: '4+',
      description: 'Years of providing quality education'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Rate',
      value: '95%',
      description: 'Consistent growth year over year'
    }
  ]

  return (
    <section id="growth-chart" className="section-padding bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Growth Chart of Pak Wattan</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Visual representation of our school's remarkable growth and achievements since establishment.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Growth Chart Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="bg-white rounded-2xl p-6 shadow-2xl">
                  <div className="w-full h-96 lg:h-[500px] relative rounded-xl overflow-hidden">
                    <Image
                      src="/images/about-us/GrowthOverYearPAWPSC.png"
                      alt="Pak Wattan Growth Chart Over Years"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            {/* Growth Statistics */}
            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-4">
                  Our Journey of Excellence
                </h3>
                <p className="text-lg text-secondary-700 leading-relaxed">
                  Since our establishment on November 2nd, 2020, Pak Wattan School & College of Sciences 
                  has experienced remarkable growth and success. Our commitment to quality education and 
                  student development has resulted in outstanding achievements.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {growthStats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        {stat.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-secondary-800">{stat.title}</h4>
                        <p className="text-2xl font-bold text-primary-600">{stat.value}</p>
                      </div>
                    </div>
                    <p className="text-sm text-secondary-600">{stat.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h4 className="text-lg font-semibold text-secondary-800 mb-4">Key Milestones</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-secondary-700">Established in November 2020</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent-600 rounded-full"></div>
                    <span className="text-secondary-700">Multiple scholarship programs launched</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-secondary-700">Consistent academic excellence</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-secondary-700">Community recognition and awards</span>
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

export default GrowthChart
