'use client'

import { MapPin, Navigation, Phone, Mail } from 'lucide-react'

const MapSection = () => {
  // Campus locations for information cards
  const campuses = [
    {
      name: 'Main Campus (Boys Wing)',
      address: 'Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    },
    {
      name: 'Primary Section',
      address: 'Gohar Market, Main Havelian City, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    },
    {
      name: 'Girls Campus',
      address: 'Havelian, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    },
    {
      name: 'Secondary Campus',
      address: 'Havelian, Abbottabad, KPK, Pakistan',
      phone: '0318 0821377',
      email: 'pakwattan2020@gmail.com'
    }
  ]

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Visit our main campus located in Havelian, Abbottabad. View the map below for our exact location.
          </p>
        </div>

        {/* Google Maps Embed */}
        <div className="bg-secondary-100 rounded-2xl overflow-hidden shadow-xl mb-8">
          <div className="aspect-video relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.9665027710457!2d73.15231645927724!3d34.052579608411705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38de35a5c79e4a3b%3A0xe10972f181f577f5!2sPak%20Wattan%20School%20And%20College%20of%20Sciences%2CHavelian!5e1!3m2!1sen!2s!4v1764491327824!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
              title="Pak Wattan School and College of Sciences Location"
              aria-label="Interactive map showing Pak Wattan School and College of Sciences location in Havelian, Abbottabad"
            />
          </div>
        </div>

        {/* Campus Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {campuses.map((campus) => (
            <div key={campus.name} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100">
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-secondary-800 mb-1">
                    {campus.name}
                  </h3>
                  <p className="text-sm text-secondary-600 leading-relaxed">
                    {campus.address}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <a 
                    href={`tel:${campus.phone}`}
                    className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
                  >
                    {campus.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-2">
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
          ))}
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-secondary-800 mb-4">
              Need Directions?
            </h3>
            <p className="text-secondary-600 mb-6">
              Get turn-by-turn directions to any of our campuses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://maps.google.com/?q=Havelian,Abbottabad,KPK,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
              <a
                href="tel:03180821377"
                className="btn-secondary inline-flex items-center space-x-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
