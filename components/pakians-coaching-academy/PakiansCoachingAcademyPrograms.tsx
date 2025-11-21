'use client'

import Image from 'next/image'

const PakiansCoachingAcademyPrograms = () => {
  const programs = [
    {
      title: "Matric Preparation",
      description: "Comprehensive preparation for Matriculation examinations",
      subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "English", "Urdu"],
      duration: "1 Year",
      level: "Grade 9-10",
      image: "/images/pakians-coaching-academy/pca-hero.jpg/course.jpg"
    },
    {
      title: "FSC Pre-Medical",
      description: "Specialized coaching for Pre-Medical students",
      subjects: ["Biology", "Chemistry", "Physics", "English", "Pakistan Studies"],
      duration: "2 Years",
      level: "FSC Part I & II",
      image: "/images/pakians-coaching-academy/pca-hero.jpg/h-about.jpg"
    },
    {
      title: "FSC Pre-Engineering",
      description: "Focused preparation for Pre-Engineering stream",
      subjects: ["Mathematics", "Physics", "Chemistry", "English", "Pakistan Studies"],
      duration: "2 Years",
      level: "FSC Part I & II",
      image: "/images/pakians-coaching-academy/pca-hero.jpg/h-res.jpg"
    },
    {
      title: "ICS/IT",
      description: "Computer Science and Information Technology coaching",
      subjects: ["Computer Science", "Mathematics", "Physics", "English", "Pakistan Studies"],
      duration: "2 Years",
      level: "FSC Part I & II",
      image: "/images/pakians-coaching-academy/pca-hero.jpg/h-cam.jpg"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Our Programs
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive coaching programs designed for academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200 group">
              {/* Program Image */}
              <div className="relative h-48 w-full">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-primary-800 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                    {program.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-600 font-semibold">Level:</span>
                    <span className="text-gray-700">{program.level}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-primary-600 font-semibold">Duration:</span>
                    <span className="text-gray-700">{program.duration}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Subjects Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {program.subjects.map((subject, idx) => (
                      <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {subject}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full btn-primary text-center">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PakiansCoachingAcademyPrograms
