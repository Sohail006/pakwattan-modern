'use client'

interface TextViewerProps {
  content: string
}

const TextViewer = ({ content }: TextViewerProps) => {
  return (
    <div className="prose prose-lg max-w-none">
      <div
        className="text-gray-700 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{
          fontSize: '16px',
          lineHeight: '1.8',
        }}
      />
    </div>
  )
}

export default TextViewer

