'use client'

import React, { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getProductById } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'
import NotificationBell from '@/components/NotificationBell'

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { addToCart, getTotalItems } = useCart()
  const resolvedParams = use(params)
  const product = getProductById(resolvedParams.id)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [showNotification, setShowNotification] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h1>
          <button 
            onClick={() => router.push('/shop')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button onClick={() => router.push('/shop')} className="text-gray-600 hover:text-gray-900">
                ← Back to Shop
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/mtn-logo.svg" 
                  alt="MTN High Sign Logo" 
                  width={78} 
                  height={26}
                  className="object-contain"
                  priority
                />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <NotificationBell />
              <button 
              onClick={() => router.push('/cart')}
              className="relative px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>🛒</span>
              <span>Cart</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ Added to cart!
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-96 lg:h-full relative bg-gradient-to-br from-blue-50 to-blue-100">
              <Image 
                src={product.image} 
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <p className="text-lg text-gray-500">{product.category}</p>
                  </div>
                  {product.inStock && (
                    <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="text-4xl font-bold text-blue-600 mb-6">
                  ${product.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            selectedSize === size
                              ? 'border-blue-600 bg-blue-50 text-blue-600'
                              : 'border-gray-300 text-gray-700 hover:border-gray-400'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center text-black font-medium"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add to Cart - ${(product.price * quantity).toLocaleString()}
                </button>
                <button
                  onClick={() => router.push('/shop')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}