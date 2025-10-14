const MapSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-6">
            Find Us on the <span className="text-gradient">Map</span>
          </h2>
          <p className="text-lg text-secondary-600 max-w-3xl mx-auto">
            Visit our main campus located in the heart of Havelian, Abbottabad
          </p>
        </div>

        <div className="bg-secondary-100 rounded-2xl overflow-hidden shadow-xl">
          <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                Interactive Map Coming Soon
              </h3>
              <p className="text-secondary-600">
                We're working on adding an interactive map to help you find us easily
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-primary-50 rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-secondary-800 mb-2">
              Main Campus Address
            </h3>
            <p className="text-secondary-700">
              Azam Khan road, beside Mubarak Plaza, Havelian, Abbottabad, KPK, Pakistan
            </p>
            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=Havelian,Abbottabad,KPK,Pakistan"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
