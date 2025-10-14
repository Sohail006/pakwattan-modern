'use client'

const PhotoGalleryCategories = () => {
  const categories = [
    {
      name: "School Events",
      description: "Annual events, celebrations, and special occasions",
      photoCount: 45,
      icon: "🎉",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Academic Activities",
      description: "Classes, lectures, and educational activities",
      photoCount: 38,
      icon: "📚",
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "Sports & Physical Education",
      description: "Sports competitions, physical activities, and games",
      photoCount: 52,
      icon: "⚽",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Cultural Programs",
      description: "Cultural performances, music, and arts",
      photoCount: 28,
      icon: "🎭",
      color: "from-purple-500 to-violet-500"
    },
    {
      name: "Achievements & Awards",
      description: "Recognition ceremonies and award distributions",
      photoCount: 35,
      icon: "🏆",
      color: "from-yellow-500 to-orange-500"
    },
    {
      name: "Student Life",
      description: "Daily school life, activities, and student experiences",
      photoCount: 67,
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
              Photo Categories
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our photo content organized by categories
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
                  <span className="text-2xl font-bold text-primary-600">{category.photoCount}</span>
                  <span className="text-gray-500">Photos</span>
                </div>
                <button className="w-full btn-primary">
                  View Photos
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-800 mb-4">
              Download Photo Albums
            </h3>
            <p className="text-gray-600 mb-6">
              Download complete photo albums for your personal collection
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                Download All Photos
              </button>
              <button className="btn-secondary">
                Request Specific Album
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PhotoGalleryCategories
