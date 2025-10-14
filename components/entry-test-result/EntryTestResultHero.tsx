'use client'

import Image from 'next/image'

const EntryTestResultHero = () => {
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
                Entry Test Result
                <span className="block text-gradient">
                  Check Your Results
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
                View your entry test results online
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Check your entry test results by entering your roll number or registration details. 
                View your scores, rankings, and admission status for the upcoming academic session.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-accent text-center">
                Check Results
              </button>
              <button className="btn-secondary text-center">
                Download Result
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/entry-test/entry-test-hero.jpg"
                alt="Entry Test Results"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EntryTestResultHero
