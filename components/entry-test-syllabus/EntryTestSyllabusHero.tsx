'use client'

import { BookOpen, FileText, Download } from 'lucide-react'
import Button from '@/components/ui/Button'

const EntryTestSyllabusHero = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold">
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="truncate">Test Preparation Resources</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-josefin leading-tight break-words">
                Test
                <span className="bg-gradient-to-r from-accent-300 to-white bg-clip-text text-transparent">
                  {' '}Model Papers
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed break-words">
                Prepare for your admission and scholarship tests with our comprehensive model papers
              </p>
              
              <p className="text-base sm:text-lg text-white/80 leading-relaxed break-words">
                Access detailed test model papers for all grades. Download PDFs or view online. 
                Know exactly what to prepare and excel in your tests.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                href="/admission" 
                variant="accent" 
                size="md"
                className="group bg-white text-primary-600 hover:bg-white/90 active:bg-white/80 font-bold touch-target"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:rotate-12 transition-transform duration-300 flex-shrink-0" />
                <span className="truncate">Apply for Admission</span>
              </Button>
              <Button 
                href="#syllabus-viewer" 
                variant="outline"
                size="md"
                className="group bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 active:bg-white/30 font-semibold touch-target"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                <span className="truncate">View Model Papers</span>
              </Button>
            </div>
          </div>

          {/* Visual Elements */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-center w-24 h-24 bg-white/20 rounded-2xl mx-auto">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">All Grades Covered</h3>
                    <p className="text-white/80">From Grade 6 to Matric</p>
                  </div>
                  <div className="mt-8">
                    <div className="bg-white/10 rounded-xl p-6 text-center">
                      <div className="text-3xl font-bold">Model Papers</div>
                      <div className="text-sm text-white/80 mt-2">For Admission & Scholarship</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow"></div>
      <div className="absolute bottom-20 left-20 w-16 h-16 bg-accent-500/20 rounded-full animate-bounce-slow delay-1000"></div>
    </section>
  )
}

export default EntryTestSyllabusHero

