'use client'

import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Trophy, ZoomIn, Grid3x3 } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedFireworksBackground from './AnimatedFireworksBackground'

const SSCBISE2024_25Detailed = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [zoomedImage, setZoomedImage] = useState<string | null>(null)
  const [showAllImages, setShowAllImages] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Memoize resultImages to prevent unnecessary re-renders
  const resultImages = useMemo(() => [
    { id: 1, left: '/images/ssc-results/566.jpg', right: '/images/ssc-results/1105.jpg' },
    { id: 2, left: '/images/ssc-results/565.jpg', right: '/images/ssc-results/1101.jpg' },
    { id: 3, left: '/images/ssc-results/565_2.jpg', right: '/images/ssc-results/1094.jpg' },
    { id: 4, left: '/images/ssc-results/552.jpg', right: '/images/ssc-results/1078.jpg' },
    { id: 5, left: '/images/ssc-results/538.jpg', right: '/images/ssc-results/1063.jpg' },
    { id: 6, left: '/images/ssc-results/531.jpg', right: '/images/ssc-results/1061.jpg' },
    { id: 7, left: '/images/ssc-results/531_1.jpg', right: '/images/ssc-results/1041.jpg' },
    { id: 8, left: '/images/ssc-results/530.jpg', right: '/images/ssc-results/1033.jpg' },
    { id: 9, left: '/images/ssc-results/528.jpg', right: '/images/ssc-results/1032.jpg' },
    { id: 10, left: '/images/ssc-results/527.jpg', right: '/images/ssc-results/1023.jpg' },
    { id: 11, left: '/images/ssc-results/521.jpg', right: '/images/ssc-results/1022.jpg' },
    { id: 12, left: '/images/ssc-results/508.jpg', right: '/images/ssc-results/1014.jpg' },
    { id: 13, left: '/images/ssc-results/506.jpg', right: '/images/ssc-results/1014_1.jpg' },
    { id: 14, left: '/images/ssc-results/505.jpg', right: '/images/ssc-results/1007.jpg' },
    { id: 15, left: '/images/ssc-results/503.jpg', right: '/images/ssc-results/1005.jpg' },
    { id: 16, left: '/images/ssc-results/500.jpg', right: '/images/ssc-results/1005.jpg' }
  ], [])

  // Show only first 4 slides initially (8 images)
  const INITIAL_SLIDES_COUNT = 4
  const initialSlides = useMemo(() => resultImages.slice(0, INITIAL_SLIDES_COUNT), [resultImages])
  const remainingSlides = useMemo(() => resultImages.slice(INITIAL_SLIDES_COUNT), [resultImages])

  // Flatten all images into a single array for expanded grid view
  const allImages = useMemo(() => {
    const images: Array<{ id: number; src: string; slideId: number; position: 'left' | 'right' }> = []
    resultImages.forEach((slide) => {
      images.push({ id: slide.id * 2 - 1, src: slide.left, slideId: slide.id, position: 'left' })
      images.push({ id: slide.id * 2, src: slide.right, slideId: slide.id, position: 'right' })
    })
    return images
  }, [resultImages])
  
  // Get unique image count
  const uniqueImages = useMemo(() => {
    const unique = new Set(allImages.map(img => img.src))
    return unique.size
  }, [allImages])

  // Get slides to display based on showAllImages state
  const displayedSlides = useMemo(() => {
    return showAllImages ? resultImages : initialSlides
  }, [showAllImages, resultImages, initialSlides])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % displayedSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + displayedSlides.length) % displayedSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const handleShowAllImages = () => {
    setShowAllImages(true)
    // Smooth scroll to expanded section after a brief delay
    setTimeout(() => {
      const element = document.getElementById('all-results-section')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
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
      // Prevent body scroll when modal is open
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      // Cleanup on unmount
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [zoomedImage])

  return (
    <>
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-yellow-50 via-primary-50 to-accent-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl"></div>
        </div>

        <Container className="px-4 sm:px-0 relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full px-6 sm:px-8 py-2 sm:py-3 mb-6 shadow-lg">
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              <span className="text-sm sm:text-base md:text-lg font-bold text-black">Top Achiever</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-secondary-800 font-josefin mb-4 sm:mb-6 break-words">
              <span className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                5th time in a row
              </span>
              <br />
              <span className="text-secondary-800">SSC Havelian Circle&apos;s Top Achiever!</span>
            </h2>
            <p className="text-base sm:text-lg text-secondary-600 max-w-2xl mx-auto">
              Celebrating continued excellence and outstanding academic achievements
            </p>
            {!showAllImages && (
              <div className="mt-4 text-sm text-secondary-500">
                Showing {initialSlides.length} of {resultImages.length} result groups
              </div>
            )}
          </div>

          {/* Enhanced Image Display */}
          <div className="relative max-w-7xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-yellow-400/30">
              <AnimatedFireworksBackground className="bg-gradient-to-br from-yellow-50/50 to-primary-50/50 backdrop-blur-sm">
                {/* Slider View - Shows Initial or All Slides */}
                <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] overflow-hidden">
                  {displayedSlides.map((slide, index) => (
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
                          {/* Left Image - Enhanced */}
                          <div className="group relative bg-gradient-to-br from-white to-yellow-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer bg-gray-100" onClick={() => setZoomedImage(slide.left)}>
                              {!imageErrors.has(slide.left) ? (
                                <Image
                                  src={slide.left}
                                  alt={`SSC Result 2024-25 - Slide ${slide.id} Left`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  loading={index < 4 ? "eager" : "lazy"}
                                  priority={index < 2}
                                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                              <div className="absolute top-3 right-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Result
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Image - Enhanced */}
                          <div className="group relative bg-gradient-to-br from-white to-primary-50/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
                            <div className="relative aspect-[4/5] rounded-lg overflow-hidden cursor-pointer bg-gray-100" onClick={() => setZoomedImage(slide.right)}>
                              {!imageErrors.has(slide.right) ? (
                                <Image
                                  src={slide.right}
                                  alt={`SSC Result 2024-25 - Slide ${slide.id} Right`}
                                  fill
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                  loading={index < 4 ? "eager" : "lazy"}
                                  priority={index < 2}
                                  sizes="(max-width: 1024px) 100vw, 50vw"
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
                              <div className="absolute top-3 right-3 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                Result
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Enhanced Navigation Arrows */}
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

                  {/* Enhanced Indicators */}
                  <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    {displayedSlides.map((_, index) => (
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
                      {currentSlide + 1} / {displayedSlides.length}
                    </span>
                  </div>
                </div>

                {/* More Details Button - Only show when not expanded */}
                {!showAllImages && (
                  <div className="flex justify-center pb-8 sm:pb-10 lg:pb-12 pt-6 sm:pt-8">
                    <button
                      onClick={handleShowAllImages}
                      className="group relative px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 text-black font-bold text-base sm:text-lg lg:text-xl rounded-full shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 active:scale-100 transition-all duration-300 flex items-center gap-3 sm:gap-4 animate-pulse-subtle overflow-hidden"
                    >
                      {/* Shimmer effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      
                      <Grid3x3 className="w-6 h-6 sm:w-7 sm:h-7 relative z-10" />
                      <span className="relative z-10">View All {resultImages.length} Result Groups</span>
                      <span className="bg-black/20 px-4 py-1.5 rounded-full text-sm sm:text-base font-semibold relative z-10">
                        +{remainingSlides.length} more
                      </span>
                    </button>
                  </div>
                )}

                {/* Expanded Grid View - Shows when showAllImages is true */}
                {showAllImages && (
                  <div id="all-results-section" className="border-t-4 border-yellow-400/30 pt-8 sm:pt-10 lg:pt-12 animate-fade-in bg-gradient-to-br from-yellow-50/30 to-transparent">
                    <div className="px-6 sm:px-8 lg:px-12 pb-6">
                      <div className="text-center mb-8">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary-800 font-josefin mb-3">
                          All Result Images
                        </h3>
                        <p className="text-base sm:text-lg text-secondary-600 mb-4">
                          Showing all {allImages.length} result images ({uniqueImages} unique)
                        </p>
                        {imageErrors.size > 0 && (
                          <p className="text-sm text-red-600 mb-2">
                            ⚠️ {imageErrors.size} image(s) failed to load
                          </p>
                        )}
                        <button
                          onClick={() => {
                            setShowAllImages(false)
                            setCurrentSlide(0)
                            window.scrollTo({ top: 0, behavior: 'smooth' })
                          }}
                          className="mt-4 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full text-sm font-semibold transition-all duration-300"
                        >
                          Show Less
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
                        {allImages.map((image, idx) => {
                          const handleImageClick = () => {
                            if (!imageErrors.has(image.src)) {
                              setZoomedImage(image.src)
                            }
                          }

                          const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              handleImageClick()
                            }
                          }
                          
                          return (
                            <div
                              key={image.id}
                              className="group relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-white to-yellow-50/50 animate-fade-in-up"
                              style={{
                                animationDelay: `${idx * 0.05}s`,
                                animationFillMode: 'both'
                              }}
                              onClick={handleImageClick}
                              role="button"
                              tabIndex={0}
                              onKeyDown={handleKeyDown}
                              aria-label={`View image ${idx + 1} full size`}
                            >
                              {!imageErrors.has(image.src) ? (
                                <>
                                  <Image
                                    src={image.src}
                                    alt={`SSC Result ${image.slideId} - Image ${idx + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110 pointer-events-none"
                                    loading={idx < 8 ? "eager" : "lazy"}
                                    priority={idx < 4}
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 20vw, 16vw"
                                    onError={() => {
                                      console.error(`Failed to load image: ${image.src}`)
                                      setImageErrors(prev => new Set(prev).add(image.src))
                                    }}
                                  />
                                  <div 
                                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-2 pointer-events-none"
                                  >
                                    <div className="flex items-center space-x-1 text-white">
                                      <ZoomIn className="w-4 h-4" />
                                      <span className="text-xs font-medium">Click to zoom</span>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-200 pointer-events-none">
                                  <span className="text-gray-400 text-xs text-center px-2">Failed to load</span>
                                  <span className="text-gray-300 text-[10px] mt-1 truncate w-full px-2">{image.src.split('/').pop()}</span>
                                </div>
                              )}
                              <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-0.5 rounded-full text-xs font-bold shadow-lg z-10 pointer-events-none">
                                #{image.slideId}
                              </div>
                              <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-0.5 rounded text-[10px] font-semibold z-10 pointer-events-none">
                                {idx + 1}/{allImages.length}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
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
              unoptimized={false}
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
