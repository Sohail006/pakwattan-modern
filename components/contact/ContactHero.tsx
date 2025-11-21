'use client'

import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const ContactHero = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Address',
      details: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: '0318 0821377'
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: 'pakwattan2020@gmail.com'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Hours',
      details: 'Monday - Friday: 8:00 AM - 4:00 PM'
    }
  ]

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold font-josefin leading-tight">
                Get in{' '}
                <span className="text-gradient">
                  Touch
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                We&apos;d love to hear from you
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Have questions about our programs, admissions, or want to learn more about 
                Pak Wattan School & College of Sciences? We&apos;re here to help!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Call Now
              </button>
              <button className="btn-secondary text-center">
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {info.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000"></div>
    </section>
  )
}

export default ContactHero
