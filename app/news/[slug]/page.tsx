'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { NEWS_ITEMS } from '@/lib/constants'
import Container from '@/components/ui/Container'
import { Calendar, ArrowLeft, Share2, Tag } from 'lucide-react'

export default function NewsDetailPage() {
  const params = useParams()
  const slug = params?.slug as string
  const newsItem = NEWS_ITEMS.find(item => item.slug === slug || item.id === slug)
  
  if (!newsItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
        <Container>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">News Not Found</h1>
            <p className="text-gray-600 mb-6">The news item you&apos;re looking for doesn&apos;t exist.</p>
            <Link
              href="/news"
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </div>
        </Container>
      </div>
    )
  }

  // Get related news (same category, excluding current)
  const relatedNews = NEWS_ITEMS
    .filter(item => item.category === newsItem.category && item.id !== newsItem.id)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <Container>
        <div className="py-8 md:py-12">
          {/* Back Button */}
          <Link
            href="/news"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to News</span>
          </Link>

          {/* Main Content */}
          <article className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-500 to-accent-500 p-6 md:p-8">
              {newsItem.category && (
                <div className="mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase">
                    <Tag className="w-3 h-3 mr-1" />
                    {newsItem.category}
                  </span>
                </div>
              )}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                {newsItem.title}
              </h1>
              <div className="flex items-center text-white/90">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-sm md:text-base">{newsItem.date}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {newsItem.description}
                </p>
                
                {/* Extended content can be added here */}
                <div className="bg-primary-50 rounded-lg p-6 my-8 border-l-4 border-primary-500">
                  <h3 className="text-xl font-semibold text-primary-800 mb-3">Event Details</h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong>Date:</strong> {newsItem.date}</p>
                    {newsItem.category && (
                      <p><strong>Category:</strong> <span className="capitalize">{newsItem.category}</span></p>
                    )}
                  </div>
                </div>
              </div>

              {/* Share Section */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Share2 className="w-5 h-5" />
                    <span className="font-semibold">Share this news:</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: newsItem.title,
                            text: newsItem.description,
                            url: window.location.href,
                          })
                        } else {
                          navigator.clipboard.writeText(window.location.href)
                          alert('Link copied to clipboard!')
                        }
                      }}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold"
                    >
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-800 mb-6">
                Related News
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug || item.id}`}
                    className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-5">
                      {item.category && (
                        <div className="mb-2">
                          <span className="inline-block px-2 py-0.5 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full uppercase">
                            {item.category}
                          </span>
                        </div>
                      )}
                      <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

