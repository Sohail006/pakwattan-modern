import { Loader2, BookOpen } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      {/* Hero Section Skeleton */}
      <div className="relative min-h-[60vh] flex items-center bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600">
        <Container className="py-16">
          <div className="text-center space-y-6">
            <BookOpen className="w-16 h-16 text-white/80 mx-auto animate-pulse" />
            <div className="h-12 bg-white/20 rounded-lg w-3/4 mx-auto animate-pulse"></div>
            <div className="h-6 bg-white/10 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>
        </Container>
      </div>

      {/* Table Section Skeleton */}
      <div className="section-padding bg-white">
        <Container>
          <div className="text-center space-y-4 py-16">
            <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
            <p className="text-lg font-semibold text-gray-700">Loading test syllabi...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch the data</p>
          </div>
        </Container>
      </div>
    </div>
  )
}

