import { Loader2 } from 'lucide-react'
import Container from '@/components/ui/Container'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center">
      <Container>
        <div className="text-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary-600 mx-auto" />
          <p className="text-lg font-semibold text-gray-700">Loading about page...</p>
          <p className="text-sm text-gray-500">Please wait while we load the content</p>
        </div>
      </Container>
    </div>
  )
}

