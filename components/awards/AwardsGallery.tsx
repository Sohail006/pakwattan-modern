'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trophy, Award, Star, Medal, Laptop, Plane, GraduationCap } from 'lucide-react'

const AwardsGallery = () => {
  const awards = [
    {
      id: 'laptop-winners',
      title: 'Laptop Winners',
      description: 'Laptops are graciously bestowed upon faculty members for their dedication and excellence in teaching.',
      image: '/images/achievements/Laptop.jpeg',
      icon: <Laptop className="w-8 h-8" />,
      link: '/laptop-winners',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'gold-medals',
      title: 'Gold Medals',
      description: 'Gold medals are awarded to students scoring 95% and above in annual examinations.',
      image: '/images/achievements/Gold Medals.jpeg',
      icon: <Medal className="w-8 h-8" />,
      link: '/gold-medals',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      id: 'umrah-tickets',
      title: 'Umrah Tickets',
      description: 'Umrah tickets are awarded to topper students in SSC & HSSC examinations.',
      image: '/images/achievements/Ummrah.jpeg',
      icon: <Plane className="w-8 h-8" />,
      link: '/umrah-tickets',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'scholarships',
      title: 'Scholarships',
      description: 'Scholarships are awarded to students based on merit and financial need.',
      image: '/images/achievements/Scholarship.jpeg',
      icon: <GraduationCap className="w-8 h-8" />,
      link: '/scholarships',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'hajj-tickets',
      title: 'Hajj Tickets',
      description: 'Hajj tickets are awarded to topper students in SSC & HSSC examinations.',
      image: '/images/achievements/Hajj.jpeg',
      icon: <Star className="w-8 h-8" />,
      link: '/hajj-tickets',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'laptops',
      title: 'Student Laptops',
      description: 'Laptops are awarded to topper students in SSC & HSSC examinations.',
      image: '/images/achievements/Laptops/1.jpg',
      icon: <Laptop className="w-8 h-8" />,
      link: '/laptop-winners',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Our Awards</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Recognizing excellence and achievement in academics, sports, and community service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {awards.map((award, index) => (
            <div
              key={award.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={award.image}
                  alt={award.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${award.color} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                {/* Icon overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-gray-700">
                    {award.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {award.title}
                </h3>
                <p className="text-secondary-600 leading-relaxed mb-4">
                  {award.description}
                </p>
                
                <Link
                  href={award.link}
                  className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors duration-300"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Award Images */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-secondary-800 font-josefin mb-8 text-center">
            Award Ceremonies & Recognition
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              '/images/achievements/Laptops/1.jpg',
              '/images/achievements/Laptops/2.jpg',
              '/images/achievements/Laptops/3.jpg',
              '/images/achievements/Laptops/4.jpg'
            ].map((image, index) => (
              <div key={index} className="relative h-32 rounded-lg overflow-hidden group">
                <Image
                  src={image}
                  alt={`Award ceremony ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AwardsGallery
