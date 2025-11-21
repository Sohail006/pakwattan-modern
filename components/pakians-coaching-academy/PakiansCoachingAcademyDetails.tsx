'use client'

import Image from 'next/image'

const PakiansCoachingAcademyDetails = () => {
  const features = [
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/book.png",
      title: "Expert Faculty",
      description: "Experienced and qualified teachers dedicated to student success"
    },
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/book.png",
      title: "Comprehensive Curriculum",
      description: "Well-structured syllabus covering all essential topics"
    },
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/ScholarshipTopPicture.jpg",
      title: "Proven Results",
      description: "Consistent track record of student achievements"
    },
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/seminar-bg.jpg",
      title: "Modern Teaching Methods",
      description: "Interactive and engaging learning approaches"
    },
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/TopPositionsInHavelian.jpg",
      title: "Regular Assessments",
      description: "Continuous evaluation and feedback system"
    },
    {
      icon: "/images/pakians-coaching-academy/pca-hero.jpg/PWPSC_BannerImage.jpg",
      title: "Goal-Oriented Approach",
      description: "Focused preparation for academic excellence"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Why Choose PCA?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our commitment to excellence in education and student success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 overflow-hidden p-2">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="object-contain w-full h-full"
                    style={{ minWidth: '32px', minHeight: '32px' }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PakiansCoachingAcademyDetails
