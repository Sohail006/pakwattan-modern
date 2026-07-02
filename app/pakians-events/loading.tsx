import SkeletonLoader from '@/components/ui/SkeletonLoader'

export default function Loading() {
  return (
    <div className="container-custom py-16">
      <SkeletonLoader variant="section" className="min-h-[480px]" />
    </div>
  )
}
