import Image from 'next/image'

const FooterCTA = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/3.png"
              alt="Pak Wattan Logo"
              width={80}
              height={80}
              className="w-20 h-20"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold font-josefin mb-3">
              Never Say Die!
            </h3>
            <p className="text-base text-white/90 leading-relaxed max-w-2xl">
              All I can say is that the only person that can stop you from achieving your goals is yourself. 
              If you believe, then everyone else will too.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FooterCTA
