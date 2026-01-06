'use client'

import { useRef, useEffect } from 'react'
import { Bold, Italic, Underline, List, ListOrdered, Link, Image as ImageIcon } from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
  className?: string
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Enter content...',
  rows = 8,
  disabled = false,
  className = '',
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const isComposingRef = useRef(false)

  useEffect(() => {
    const editor = editorRef.current
    if (!editor) return

    // Only update if content differs (to avoid cursor jumping)
    if (editor.innerHTML !== value) {
      const selection = window.getSelection()
      const range = selection?.rangeCount ? selection.getRangeAt(0) : null
      const cursorPosition = range?.startOffset || 0
      
      editor.innerHTML = value || ''
      
      // Restore cursor position if possible
      if (range && editor.firstChild) {
        try {
          const newRange = document.createRange()
          const textNode = editor.firstChild.nodeType === Node.TEXT_NODE 
            ? editor.firstChild 
            : editor.firstChild.firstChild
          if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            const maxOffset = Math.min(cursorPosition, textNode.textContent?.length || 0)
            newRange.setStart(textNode, maxOffset)
            newRange.setEnd(textNode, maxOffset)
            selection?.removeAllRanges()
            selection?.addRange(newRange)
          }
        } catch {
          // Ignore cursor restoration errors
        }
      }
    }
  }, [value])

  const handleInput = () => {
    const editor = editorRef.current
    if (!editor || isComposingRef.current) return
    
    const content = editor.innerHTML
    if (content !== value) {
      onChange(content)
    }
  }

  const handleCompositionStart = () => {
    isComposingRef.current = true
  }

  const handleCompositionEnd = () => {
    isComposingRef.current = false
    handleInput()
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      execCommand('createLink', url)
    }
  }

  const insertImage = () => {
    const url = prompt('Enter image URL:')
    if (url) {
      execCommand('insertImage', url)
    }
  }

  return (
    <div className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Bold"
          aria-label="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Italic"
          aria-label="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Underline"
          aria-label="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300" />
        <button
          type="button"
          onClick={() => execCommand('insertUnorderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Bullet List"
          aria-label="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => execCommand('insertOrderedList')}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Numbered List"
          aria-label="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-300" />
        <button
          type="button"
          onClick={insertLink}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Insert Link"
          aria-label="Insert Link"
        >
          <Link className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="p-2 hover:bg-gray-200 rounded transition-colors touch-target min-h-[44px] min-w-[44px] flex items-center justify-center"
          title="Insert Image"
          aria-label="Insert Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable={!disabled}
        onInput={handleInput}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        className="w-full px-4 py-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-primary-500"
        style={{ minHeight: `${rows * 1.5}rem` }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
      
      <style jsx>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
    </div>
  )
}

