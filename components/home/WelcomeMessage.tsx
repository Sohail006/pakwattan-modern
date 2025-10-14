'use client'

import Image from 'next/image'

const WelcomeMessage = () => {
  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white py-12">
      <div className="container-custom">
        <div className="text-center">
            <div className="inline-flex items-center space-x-4 mb-8">
              <Image
                src="/images/AlhumdullahImage.png"
                alt="Alhumdullah"
                width={60}
                height={60}
                className="w-15 h-15"
                priority
              />
            <h1 className="text-2xl md:text-3xl font-bold font-josefin blink">
              <strong>
                مسلسل چار سال میں چار مرتبہ حویلیاں سرکل ٹاپ
              </strong>
            </h1>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Four consecutive years of being the top school in Havelian Circle
          </p>
        </div>
      </div>
    </section>
  )
}

export default WelcomeMessage
