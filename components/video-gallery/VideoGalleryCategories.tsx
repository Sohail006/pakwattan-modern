'use client'

const VideoGalleryCategories = () => {
  const categories = [
    {
      name: "School Events",
      description: "Annual events, celebrations, and special occasions",
      videoCount: 15,
      icon: "🎉",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Academic Activities",
      description: "Classes, lectures, and educational activities",
      videoCount: 12,
      icon: "📚",
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "Sports & Physical Education",
      description: "Sports competitions, physical activities, and games",
      videoCount: 8,
      icon: "⚽",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Cultural Programs",
      description: "Cultural performances, music, and arts",
      videoCount: 10,
      icon: "🎭",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "Achievements & Awards",
      description: "Recognition ceremonies and award distributions",
      videoCount: 6,
      icon: "🏆",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Student Life",
      description: "Daily school life, activities, and student experiences",
      videoCount: 20,
      icon: "👥",
      color: "from-teal-500 to-cyan-500"
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Video Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our video content organized by categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 border border-gray-100 hover:border-primary-200">
              <div className="text-center">
                <div className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {category.description}
                </p>
                <div className="flex items-center justify-center space-x-2 mb-6">
                  <span className="text-2xl font-bold text-primary-600">{category.videoCount}</span>
                  <span className="text-gray-500">Videos</span>
                </div>
                <button className="w-full btn-primary">
                  View Videos
                </button>
              </div>
            </div>
          ))}
        </div>

               <div className="mt-12 text-center">
                 <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                   <div className="flex items-center justify-center mb-6">
                     <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mr-4">
                       <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                       </svg>
                     </div>
                     <div className="text-left">
                       <h3 className="text-2xl font-bold text-primary-800 mb-2">
                         Subscribe to Our YouTube Channel
                       </h3>
                       <p className="text-gray-600">
                         @pakwattanSchoolCollege
                       </p>
                     </div>
                   </div>
                   <p className="text-gray-600 mb-6">
                     Stay updated with our latest videos, school events, and educational content
                   </p>
                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <a
                       href="https://www.youtube.com/@pakwattanSchoolCollege"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="btn-primary flex items-center justify-center space-x-2"
                     >
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                       </svg>
                       <span>Subscribe on YouTube</span>
                     </a>
                     <button className="btn-secondary">
                       Follow on Social Media
                     </button>
                   </div>
                 </div>
               </div>
      </div>
    </section>
  )
}

export default VideoGalleryCategories
