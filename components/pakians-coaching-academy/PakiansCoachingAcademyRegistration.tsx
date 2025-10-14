'use client'

const PakiansCoachingAcademyRegistration = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Registration & Admission
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join Pakians Coaching Academy and start your journey towards academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Registration Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-primary-800 mb-6">Registration Form</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input type="tel" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Program of Interest</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                  <option>Select Program</option>
                  <option>Matric Preparation</option>
                  <option>FSC Pre-Medical</option>
                  <option>FSC Pre-Engineering</option>
                  <option>ICS/IT</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"></textarea>
              </div>

              <button type="submit" className="w-full btn-primary">
                Submit Registration
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-primary-800 mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📞</span>
                  <span className="text-gray-700">0318 0821377</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📧</span>
                  <span className="text-gray-700">pakwattan2020@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-primary-600">📍</span>
                  <span className="text-gray-700">Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary-800 mb-6">Admission Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Completed application form</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Previous academic records</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Photocopy of CNIC/B-Form</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Recent passport size photographs</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">Admission test (if required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PakiansCoachingAcademyRegistration
