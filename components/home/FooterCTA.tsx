import Image from 'next/image'
import Container from '@/components/ui/Container'

const FooterCTA = () => {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-8 sm:py-10 lg:py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-center space-y-4 sm:space-y-6 md:space-y-0 md:space-x-6 lg:space-x-8">
          <div className="flex-shrink-0">
            <Image
              src="/images/3.png"
              alt="Pak Wattan Logo"
              width={80}
              height={80}
              className="w-16 h-16 sm:w-20 sm:h-20"
              priority
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-josefin mb-2 sm:mb-3 break-words">
              Never Say Die!
            </h3>
            <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl break-words">
              All I can say is that the only person that can stop you from achieving your goals is yourself. 
              If you believe, then everyone else will too.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FooterCTA
