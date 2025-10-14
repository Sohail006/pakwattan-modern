'use client'

import { MapPin, Clock, Mountain, Factory } from 'lucide-react'

const BackgroundHistory = () => {
  return (
    <section id="background" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            <span className="text-gradient">Background & History</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8 mb-12">
            <p className="text-lg text-secondary-700 leading-relaxed text-center">
              <strong>PAK WATTAN School and College of Sciences Havelian</strong> was established on 
              <strong> November 2nd, 2020</strong>, with the mission of providing quality education 
              with affordable expenses. PWSCS gives scholarships to students every year, including 
              Pakians Scholarship, merit-based, orphan, special child, and Hafiz e Quran scholarships. 
              The scholarship test has always been conducted on <strong>March 23rd</strong> in the 
              girl's campus Havelian.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-secondary-800 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-primary-600" />
                Location
              </h3>
              <p className="text-secondary-700 leading-relaxed">
                PAK WATTAN institute is located at <strong>Havelian city</strong>, on the 
                <strong> Karakoram Highway</strong> and on the banks of <strong>Dor River</strong>, 
                about <strong>15.5 kilometers</strong> southwest of Abbottabad. The boys wing along 
                with the main campus is situated at <strong>Azam Khan road</strong> and the primary 
                section is located at <strong>Gohar Market</strong> in main Havelian city.
              </p>
              <p className="text-secondary-700 leading-relaxed">
                The city is the last railway station while traveling to the northern areas of 
                Pakistan in KPK province. The city is also home to one of the largest ordinance 
                factories of Pakistan, <strong>Pakistan Ordinance Factory Havelian</strong>.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center">
                  <Mountain className="w-5 h-5 mr-2 text-primary-600" />
                  Tourist Attractions
                </h4>
                <p className="text-secondary-700 leading-relaxed">
                  There is a breathtaking waterfall, named as <strong>Sajikot Waterfall</strong>, 
                  located in tehsil Havelian, district Abbottabad, KPK province. It is a popular 
                  tourist destination in Havelian, about <strong>27 km from Havelian</strong> and 
                  <strong> 40km from Abbottabad</strong> district.
                </p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center">
                  <Factory className="w-5 h-5 mr-2 text-primary-600" />
                  Industrial Significance
                </h4>
                <p className="text-secondary-700 leading-relaxed">
                  An ordinance depot also exists in the vicinity of the city and the factory, 
                  making Havelian an important industrial and strategic location in the region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BackgroundHistory
