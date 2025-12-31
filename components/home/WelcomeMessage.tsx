'use client'

import Image from 'next/image'

const WelcomeMessage = () => {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-8 sm:py-10 lg:py-12">
      <div className="container-custom">
        <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:space-x-4 mb-6 sm:mb-8">
              <Image
                src="/images/AlhumdullahImage.png"
                alt="Alhumdullah"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 flex-shrink-0"
                priority
                unoptimized
              />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-josefin blink break-words">
              <strong>
                مسلسل چار سال میں چار مرتبہ حویلیاں سرکل ٹاپ
              </strong>
            </h1>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed break-words px-4 sm:px-0">
            Four consecutive years of being the top school in Havelian Circle
          </p>
        </div>
      </div>
    </section>
  )
}

export default WelcomeMessage
