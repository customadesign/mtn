import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
}

// Base64 placeholder for blur effect
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f9ff" offset="20%" />
      <stop stop-color="#e0f2fe" offset="50%" />
      <stop stop-color="#f0f9ff" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f9ff" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const dataUrl = `data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`

export default function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality = 90,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Default sizes based on common use cases
  const defaultSizes = fill
    ? sizes || '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
    : undefined

  // Fallback image for errors
  // const fallbackSrc = '/mtn-logo.svg'

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoading(false)
  }

  if (hasError) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200`}>
        <div className="text-center p-4">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-xs text-gray-500">Image unavailable</p>
        </div>
      </div>
    )
  }

  const imageProps = {
    src: src,
    alt: alt,
    quality: quality,
    placeholder: 'blur' as const,
    blurDataURL: dataUrl,
    className: `${className} ${isLoading ? 'blur-sm scale-110' : 'blur-0 scale-100'} transition-all duration-300`,
    onLoadingComplete: handleLoadingComplete,
    onError: handleError,
    priority: priority,
    sizes: defaultSizes,
    style: { objectFit: objectFit as React.CSSProperties['objectFit'] }
  }

  if (fill) {
    return <Image {...imageProps} fill alt={alt} />
  }

  return (
    <Image
      {...imageProps}
      alt={alt}
      width={width || 500}
      height={height || 500}
    />
  )
}