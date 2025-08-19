'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
  containerClassName?: string
  priority?: boolean
  quality?: number
  sizes?: string
  objectFit?: 'contain' | 'cover'
}

export default function ProductImage({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
  quality = 90,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  objectFit = 'cover'
}: ProductImageProps) {
  const [isInView, setIsInView] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (priority) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [priority])

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
    setIsLoaded(true)
  }

  return (
    <div ref={containerRef} className={`relative ${containerClassName}`}>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 animate-pulse z-10" />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 z-10">
          <div className="text-center p-4">
            <svg className="w-8 h-8 mx-auto text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          fill
          quality={quality}
          sizes={sizes}
          priority={priority}
          className={`${className} ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          // Optimize loading performance
          loading={priority ? 'eager' : 'lazy'}
          // Use unoptimized for very high quality requirements
          unoptimized={quality > 95}
        />
      )}

      {/* Low quality placeholder while loading */}
      {!isInView && !priority && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-8 h-8 text-blue-200 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}