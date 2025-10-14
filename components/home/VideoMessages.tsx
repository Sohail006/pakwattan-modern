import MDMessageVideo from './MDMessageVideo'
import GraduationCeremonyVideo from './GraduationCeremonyVideo'

const VideoMessages = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-primary-100 rounded-full px-6 py-3 text-sm font-medium text-primary-700 mb-6">
            <span>🎥</span>
            <span>Important Messages</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-josefin mb-6">
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Video Messages
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch important messages from our leadership and special ceremonies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MDMessageVideo />
          <GraduationCeremonyVideo />
        </div>
      </div>
    </section>
  )
}

export default VideoMessages
