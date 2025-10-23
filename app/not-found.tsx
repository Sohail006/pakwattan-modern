'use client'

import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* 404 Icon */}
          <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6">
            <Search className="w-8 h-8 text-orange-600" />
          </div>

          {/* 404 Content */}
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-gray-600 mb-8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. The page might have been moved, deleted, or you might have entered the wrong URL.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </button>
          </div>

          {/* Popular Links */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Popular Pages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/about"
                className="text-green-600 hover:text-green-700 font-medium text-sm py-2 px-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/admission"
                className="text-green-600 hover:text-green-700 font-medium text-sm py-2 px-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                Admissions
              </Link>
              <Link
                href="/facilities"
                className="text-green-600 hover:text-green-700 font-medium text-sm py-2 px-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                Facilities
              </Link>
              <Link
                href="/contact"
                className="text-green-600 hover:text-green-700 font-medium text-sm py-2 px-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Still can&apos;t find what you&apos;re looking for?
            </p>
            <Link
              href="/contact"
              className="text-green-600 hover:text-green-700 font-medium text-sm mt-2 inline-block"
            >
              Contact our support team
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
