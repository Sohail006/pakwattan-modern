'use client'

import { MapPin, Phone, Mail, Users, Award, BookOpen } from 'lucide-react'

const ContactInfo = () => {
  const campuses = [
    {
      name: 'Main Campus (Boys Wing)',
      address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com',
      description: 'Main campus housing the boys wing and administrative offices'
    },
    {
      name: 'Primary Section',
      address: 'Gohar Market, Main Havelian City, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com',
      description: 'Primary section located in the heart of Havelian city'
    },
    {
      name: 'Girls Campus',
      address: 'Havelian, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com',
      description: 'Dedicated campus for female students'
    }
  ]

  const quickStats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: '1750+',
      label: 'Students',
      color: 'text-blue-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: '1100+',
      label: 'Awards',
      color: 'text-yellow-600'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: '3',
      label: 'Campuses',
      color: 'text-green-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Our Campuses</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Visit us at any of our three campuses located in Havelian, Abbottabad
          </p>
        </div>

        {/* Campus Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {campuses.map((campus, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-secondary-100"
            >
              <div className="p-8">
                <h3 className="text-xl font-bold text-secondary-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-primary-600" />
                  {campus.name}
                </h3>
                <p className="text-secondary-600 mb-6 leading-relaxed">
                  {campus.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-primary-600 mt-1 flex-shrink-0" />
                    <span className="text-sm text-secondary-700">{campus.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <a 
                      href={`tel:${campus.phone}`}
                      className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {campus.phone}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-primary-600 flex-shrink-0" />
                    <a 
                      href={`mailto:${campus.email}`}
                      className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      {campus.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              By the Numbers
            </h3>
            <p className="text-secondary-600">
              Our impact in the community
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-secondary-800 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-secondary-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactInfo
