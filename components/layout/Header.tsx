'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone, Mail, Facebook, Youtube, Twitter, User, LogOut, Settings } from 'lucide-react'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) // This would come from auth context
  const [userType, setUserType] = useState('student') // This would come from auth context

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Main navigation - only core links
  const mainNavigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Who We Are', 
      href: '/about',
      submenu: [
        { name: 'Background & History', href: '/about#background' },
        { name: 'Vision, Mission & Values', href: '/about#vision' },
        { name: 'Staff Entrance Test', href: '/about#staff-test' },
        { name: 'Prize Distribution Ceremony', href: '/about#prize-distribution' },
        { name: 'Growth Chart', href: '/about#growth-chart' },
        { name: 'Executive Director\'s Message', href: '/about#director-message' },
        { name: 'Principal\'s Message', href: '/about#principal-message' },
      ]
    },
    { name: 'Admission', href: '/admission' },
    { name: 'Scholarships', href: '/scholarships' },
    { 
      name: 'Academic', 
      href: '#',
      submenu: [
        { name: 'Academic Syllabus', href: '/academic-syllabus' },
        { name: 'Model Papers', href: '/model-papers' },
        { name: 'Entry Test Result', href: '/entry-test-result' },
        { name: 'Yearly Academic Schedule', href: '/yearly-academic-schedule' },
        { name: 'Montessori', href: '/academic/montessori' },
        { name: 'Primary', href: '/academic/primary' },
        { name: 'Matric', href: '/academic/matric' },
      ]
    },
    { name: 'School Life', href: '/school-life' },
    { name: 'Contact Us', href: '/contact' },
  ]

  // Secondary navigation for sidebar
  const secondaryNavigation = [
    { 
      name: 'Programs', 
      href: '#',
      icon: '📚',
      description: 'Educational programs and activities',
      submenu: [
        { name: 'Pakians Coaching Academy', href: '/pakians-coaching-academy' },
        { name: 'Talent Hunt', href: '/talent-hunt' },
        { name: 'Registration Form', href: '/registration-form' },
      ]
    },
    { 
      name: 'Achievements', 
      href: '#',
      icon: '🏆',
      description: 'Our success stories and awards',
      submenu: [
        { name: 'Awards', href: '/awards' },
        { name: 'Gold Medals', href: '/gold-medals' },
        { name: 'Umrah Tickets', href: '/umrah-tickets' },
        { name: 'Hajj Tickets', href: '/hajj-tickets' },
        { name: 'Laptop Winners', href: '/laptop-winners' },
      ]
    },
    { 
      name: 'Facilities', 
      href: '/facilities',
      icon: '🏫',
      description: 'Our modern facilities and infrastructure',
      submenu: [
        { name: 'Medical', href: '/facilities#medical' },
        { name: 'Physical Training', href: '/facilities#physical-training' },
        { name: 'Science Lab', href: '/facilities#science-lab' },
        { name: 'Religious Training', href: '/facilities#religious-training' },
        { name: 'Class Rooms', href: '/facilities#class-rooms' },
        { name: 'Computer Lab', href: '/facilities#computer-lab' },
        { name: 'Security System', href: '/facilities#security' },
        { name: 'Smart Boards', href: '/facilities#smart-boards' },
      ]
    },
    { 
      name: 'Gallery', 
      href: '#',
      icon: '📸',
      description: 'Photos and videos of our activities',
      submenu: [
        { name: 'Photo Gallery', href: '/photo-gallery' },
        { name: 'Video Gallery', href: '/video-gallery' },
      ]
    },
  ]

  return (
    <>
      {/* Fixed Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar - Mobile Optimized */}
        <div className="bg-primary-600 text-white py-1.5">
          <div className="container-custom">
            <div className="flex flex-col sm:flex-row justify-between items-center text-xs space-y-2 sm:space-y-0">
              {/* Contact Info - Stack on mobile */}
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-1.5">
                  <Phone className="w-3 h-3" />
                  <span className="hidden xs:inline">0318 0821377</span>
                  <span className="xs:hidden">Call Us</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Mail className="w-3 h-3" />
                  <span className="hidden sm:inline">pakwattan2020@gmail.com</span>
                  <span className="sm:hidden">Email</span>
                </div>
              </div>
              
              {/* Action Links - Responsive layout */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link href="/login" className="hover:text-accent-300 transition-colors text-xs touch-target">
                  Sign In
                </Link>
                <Link href="/register" className="hover:text-accent-300 transition-colors text-xs touch-target">
                  Register
                </Link>
                <Link href="/video-gallery" className="bg-accent-500 hover:bg-accent-600 text-xs py-1 px-2 rounded transition-colors touch-target">
                  <span className="hidden sm:inline">Video Gallery</span>
                  <span className="sm:hidden">Videos</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Header - Mobile Optimized */}
        <header className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-200/50' : 'bg-white/95 backdrop-blur-md'
        }`}>
        <div className="container-custom">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Enhanced Logo - Mobile Responsive */}
            <Link href="/" className="group flex items-center space-x-2 sm:space-x-3 hover:scale-105 transition-all duration-300 touch-target">
              <div className="relative">
                <Image
                  src="/images/logo/logo_150x150.png"
                  alt="Pak Wattan School"
                  width={45}
                  height={45}
                  className="w-8 h-8 sm:w-11 sm:h-11"
                  priority
                />
              </div>
                     <div className="min-w-0 flex-text-fix">
                       <h1 className="text-sm sm:text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent font-josefin group-hover:from-primary-600 group-hover:to-accent-600 transition-all duration-300 leading-tight text-no-overlap">
                         PAK WATTAN
                       </h1>
                       <p className="text-xs sm:text-xs text-secondary-600 font-medium group-hover:text-primary-600 transition-colors duration-300 leading-tight hidden xs:block text-no-overlap">
                         SCHOOL & COLLEGE OF SCIENCES
                       </p>
                       <p className="text-xs text-secondary-600 font-medium group-hover:text-primary-600 transition-colors duration-300 leading-tight xs:hidden text-no-overlap">
                         SCHOOL & COLLEGE
                       </p>
                     </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {mainNavigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className="relative text-secondary-700 hover:text-primary-600 font-semibold text-sm transition-all duration-300 flex items-center space-x-1 group/nav px-4 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50"
                  >
                    <span className="relative z-10">{item.name}</span>
                    {item.submenu && (
                      <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {/* Enhanced Dropdown Menu */}
                  {item.submenu && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-lg rounded-xl shadow-xl border border-gray-200/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                      <div className="p-1">
                        {item.submenu.map((subItem, subIndex) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group/sub flex items-center space-x-3 px-3 py-2.5 text-sm text-secondary-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 hover:text-primary-700 transition-all duration-200 rounded-lg"
                          >
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200"></div>
                            <span className="flex-1 font-medium">{subItem.name}</span>
                            <svg className="w-3.5 h-3.5 text-primary-400 opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* User Authentication Menu */}
            {isLoggedIn && (
              <div className="hidden lg:flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-gradient-to-r from-primary-50 to-accent-50 hover:from-primary-100 hover:to-accent-100 transition-all duration-200 group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 capitalize">{userType}</span>
                    <svg className="w-4 h-4 text-gray-500 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900 capitalize">{userType} Account</p>
                        <p className="text-xs text-gray-500">Manage your account settings</p>
                      </div>
                      <div className="py-2">
                        <Link
                          href={`/dashboard/${userType}`}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                        <Link
                          href="/profile"
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </Link>
                        <button
                          onClick={() => {
                            setIsLoggedIn(false)
                            setIsUserMenuOpen(false)
                          }}
                          className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Enhanced Mobile Menu Button - Touch Friendly */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden relative p-3 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 group touch-target"
              aria-label="Toggle navigation menu"
            >
              <div className="relative z-10">
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu - Improved UX */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200/50 shadow-xl animate-fade-in-down max-h-[80vh] overflow-y-auto">
            <div className="container-custom py-4">
              <nav className="space-y-1">
                {mainNavigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center justify-between py-3 px-4 text-secondary-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 font-semibold text-base transition-all duration-200 rounded-lg touch-target"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>{item.name}</span>
                      {item.submenu && (
                        <svg className="w-5 h-5 text-primary-400 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="group/sub flex items-center space-x-3 py-2.5 px-4 text-sm text-secondary-600 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 rounded-md touch-target"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200"></div>
                            <span className="font-medium">{subItem.name}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Secondary Navigation in Mobile */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-4">Quick Links</h4>
                  {secondaryNavigation.map((item) => (
                    <div key={item.name}>
                      <Link
                        href={item.href}
                        className="group flex items-center justify-between py-2 px-4 text-secondary-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 font-medium text-sm transition-all duration-200 rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        {item.submenu && (
                          <svg className="w-4 h-4 text-primary-400 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        )}
                      </Link>
                      {item.submenu && (
                        <div className="ml-8 space-y-0.5">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="group/sub flex items-center space-x-3 py-1.5 px-4 text-xs text-secondary-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-200 rounded-md"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <div className="w-1 h-1 bg-primary-400 rounded-full opacity-0 group-hover/sub:opacity-100 transition-opacity duration-200"></div>
                              <span className="font-medium">{subItem.name}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Authentication Links in Mobile */}
                {isLoggedIn && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2">
                      <div className="px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg">
                        <p className="text-sm font-semibold text-gray-900 capitalize">{userType} Account</p>
                        <p className="text-xs text-gray-500">Welcome back!</p>
                      </div>
                      <Link
                        href={`/dashboard/${userType}`}
                        className="flex items-center space-x-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        <span>Dashboard</span>
                      </Link>
                      <Link
                        href="/profile"
                        className="flex items-center space-x-3 py-2 px-4 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        <span>Profile Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          setIsLoggedIn(false)
                          setIsMenuOpen(false)
                        }}
                        className="flex items-center space-x-3 py-2 px-4 text-sm text-red-600 hover:bg-red-50 transition-colors rounded-lg w-full text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
        </header>
      </div>

      {/* Enhanced Social Media Float */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
        <div className="flex flex-col space-y-2">
          <a
            href="https://web.facebook.com/PAKWATTAN2020/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Facebook className="w-4 h-4 relative z-10" />
            <div className="absolute -left-16 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Follow us on Facebook
            </div>
          </a>
          <a
            href="https://youtu.be/edf2-HxPxxs?si=Az95EFwCE2cY1UJP"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Youtube className="w-4 h-4 relative z-10" />
            <div className="absolute -left-20 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Watch our videos
            </div>
          </a>
          <a
            href="https://twitter.com/WattanAnd?s=20&t=Fhqy3yMnnMGjq84gHEp5Sw"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Twitter className="w-4 h-4 relative z-10" />
            <div className="absolute -left-16 bg-black/80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Follow us on Twitter
            </div>
          </a>
        </div>
      </div>
    </>
  )
}

export default Header
