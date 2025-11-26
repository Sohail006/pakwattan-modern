'use client'

import { Component, ReactNode } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import Button from './Button'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null
    })
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-sm text-gray-600 text-center mb-6 max-w-md">
            We encountered an error while loading this content. Please try refreshing the page.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={this.handleReset}
              variant="accent"
              size="md"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Try Again
            </Button>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              size="md"
            >
              Reload Page
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-gray-100 rounded text-xs text-left max-w-2xl">
              <summary className="cursor-pointer font-semibold mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="whitespace-pre-wrap overflow-auto">
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
