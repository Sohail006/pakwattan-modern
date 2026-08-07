'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Trophy, ZoomIn } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedFireworksBackground from './AnimatedFireworksBackground'

const SSCBISE2024_25Detailed = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const scrollPositionRef = useRef(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Grade 9 outstanding result posters
  const resultImages = useMemo(() => [
    {
      id: 1,
      left: '/images/ssc-results/harram-saleem-topper.png',
      right: '/images/ssc-results/grade9-girls-top3.png',
      leftAlt: 'Harram Saleem - 1st in Havelian Circle, 4th in ATD Board (9th Class)',
      rightAlt: 'Grade 9 Girls Top 3 Positions in Havelian Circle - Harram, Fatiha Rehman, Fatiha Nisar',
    },
    {
      id: 2,
      left: '/images/ssc-results/grade9-boys-outstanding.png',
      right: '/images/ssc-results/grade9-girls-outstanding.png',
      leftAlt: 'Outstanding Result Grade 9th Boys - Pak Wattan Havelian',
      rightAlt: 'Outstanding Result Grade 9th Girls - Pak Wattan Havelian',
    },
  ], [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % resultImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + resultImages.length) % resultImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Handle ESC key to close lightbox and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null)
      }
    }

    if (zoomedImage) {
      document.addEventListener('keydown', handleEscape)
      // Store scroll position and prevent body scroll when modal is open
      scrollPositionRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollPositionRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll and position
      const savedScrollY = scrollPositionRef.current
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, savedScrollY)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      // Cleanup: restore body styles; scroll is restored in next effect run (zoomedImage=null)
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [zoomedImage])

  return (
    <>
      <section className="py-10 sm:py-12 lg:py-14 bg-gradient-to-br from-yellow-50 via-primary-50 to-accent-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        </div>

        <Container className="px-4 sm:px-0 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full px-5 sm:px-6 py-2 mb-4 shadow-lg">
              <Trophy className="w-5 h-5 text-black" />
              <span className="text-sm sm:text-base font-bold text-black">Top Achiever</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-800 font-josefin mb-3 break-words">
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                6th time in a row
              </span>
              <br />
              <span className="text-secondary-800">SSC Havelian Circle&apos;s Top Achiever!</span>
            </h2>
            <p className="text-sm sm:text-base text-secondary-600 max-w-2xl mx-auto">
              Celebrating continued excellence and outstanding academic achievements
            </p>
          </div>

          {/* Enhanced Image Display */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400/30">
              <AnimatedFireworksBackground className="bg-gradient-to-br from-yellow-50/50 to-primary-50/50 backdrop-blur-sm">
                {/* Slider View */}
                <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden">
                  {resultImages.map((slide, index) => (
                    <div
                      key={slide.id}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                        index === currentSlide
                          ? 'opacity-100 translate-x-0 scale-100'
                          : index < currentSlide
                          ? 'opacity-0 -translate-x-full scale-95'
                          : 'opacity-0 translate-x-full scale-95'
                      }`}
                    >
                      <div className="h-full flex items-center justify-center p-6 sm:p-8 lg:p-12">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl">
                          {/* Left Image */}
                          <div className="group relative bg-gradient-to-br from-white to-yellow-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer bg-gray-100" onClick={() => setZoomedImage(slide.left)}>
                              {!imageErrors.has(slide.left) ? (
                                <Image
                                  src={slide.left}
                                  alt={slide.leftAlt}
                                  fill
                                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                  priority={false}
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                  unoptimized
                                  onError={() => setImageErrors(prev => new Set(prev).add(slide.left))}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <span className="text-gray-400 text-sm">Image not available</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <div className="flex items-center space-x-2 text-white">
                                  <ZoomIn className="w-5 h-5" />
                                  <span className="text-sm font-medium">Click to enlarge</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Image */}
                          <div className="group relative bg-gradient-to-br from-white to-primary-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer bg-gray-100" onClick={() => setZoomedImage(slide.right)}>
                              {!imageErrors.has(slide.right) ? (
                                <Image
                                  src={slide.right}
                                  alt={slide.rightAlt}
                                  fill
                                  className="object-contain transition-transform duration-500 group-hover:scale-105"
                                  loading="lazy"
                                  priority={false}
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                  unoptimized
                                  onError={() => setImageErrors(prev => new Set(prev).add(slide.right))}
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                  <span className="text-gray-400 text-sm">Image not available</span>
                                </div>
                              )}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                                <div className="flex items-center space-x-2 text-white">
                                  <ZoomIn className="w-5 h-5" />
                                  <span className="text-sm font-medium">Click to enlarge</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-yellow-50 active:bg-yellow-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-yellow-200"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 bg-white hover:bg-yellow-50 active:bg-yellow-100 text-secondary-700 hover:text-primary-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 z-20 hover:scale-110 active:scale-95 touch-target min-h-[44px] min-w-[44px] border-2 border-yellow-200"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
                  </button>

                  {/* Indicators */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    {resultImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 touch-target min-h-[44px] min-w-[44px] flex items-center justify-center ${
                          index === currentSlide
                            ? 'bg-yellow-500 scale-125 shadow-lg'
                            : 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={index === currentSlide ? 'true' : 'false'}
                      />
                    ))}
                  </div>

                  {/* Slide Counter */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg z-20">
                    <span className="text-sm font-semibold text-secondary-700">
                      {currentSlide + 1} / {resultImages.length}
                    </span>
                  </div>
                </div>

                <div className="pb-6 sm:pb-8" />

              </AnimatedFireworksBackground>
            </div>
          </div>
        </Container>
      </section>

      {/* Image Lightbox Modal - Rendered via Portal */}
      {mounted && zoomedImage && createPortal(
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 cursor-pointer"
          style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0,
            zIndex: 99999
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setZoomedImage(null)
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <div 
            className="relative max-w-7xl max-h-[95vh] w-full h-full flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <Image
              src={zoomedImage}
              alt="Enlarged result"
              width={1200}
              height={1600}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default"
              onClick={(e) => {
                e.stopPropagation()
              }}
              priority
              unoptimized
              onError={() => {
                console.error('Failed to load zoomed image:', zoomedImage)
                setZoomedImage(null)
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setZoomedImage(null)
              }}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black w-12 h-12 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-xl font-bold text-xl"
              aria-label="Close lightbox"
              type="button"
            >
              ×
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm pointer-events-none">
              Press ESC or click outside to close
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default SSCBISE2024_25Detailed
