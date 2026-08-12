import Image from 'next/image'
import Container from '@/components/ui/Container'

const WelcomeMessage = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 py-3 sm:py-4 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-10" aria-hidden>
        <div className="absolute -left-10 top-0 h-32 w-32 rounded-full bg-accent-400 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-32 w-32 rounded-full bg-accent-500 blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="flex flex-col items-center justify-center gap-1.5 text-center sm:flex-row sm:gap-3 sm:text-left">
          <Image
            src="/images/AlhumdullahImage.png"
            alt="Alhumdullah"
            width={48}
            height={48}
            className="h-9 w-9 shrink-0 drop-shadow-md sm:h-11 sm:w-11"
            priority
            unoptimized
          />
          <div className="min-w-0">
            <h2
              className="font-josefin text-base font-bold leading-snug sm:text-lg md:text-xl"
              dir="rtl"
            >
              <strong className="bg-gradient-to-r from-accent-300 to-accent-100 bg-clip-text text-transparent">
                مسلسل چھ سال میں چھ مرتبہ حویلیاں سرکل ٹاپ
              </strong>
            </h2>
            <p className="mt-0.5 text-xs font-medium leading-snug text-white/90 sm:text-sm md:text-base">
              Six consecutive years of being the top school in Havelian Circle
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default WelcomeMessage
