import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SkeletonLoader variant="section" className="w-full max-w-lg" />
    </div>
  )
}
