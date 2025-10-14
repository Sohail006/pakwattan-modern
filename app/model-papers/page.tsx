import ModelPapersHero from '@/components/model-papers/ModelPapersHero'
import ModelPapersDetails from '@/components/model-papers/ModelPapersDetails'
import ModelPapersDownload from '@/components/model-papers/ModelPapersDownload'

export default function ModelPapers() {
  return (
    <div className="min-h-screen">
      <ModelPapersHero />
      <ModelPapersDetails />
      <ModelPapersDownload />
    </div>
  )
}
