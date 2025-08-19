'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { products, getCategories } from '@/lib/products'
import { useCart } from '@/contexts/CartContext'
import NotificationBell from '@/components/NotificationBell'

export default function ShopPage() {
  const router = useRouter()
  const { addToCart, getTotalItems } = useCart()
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [showCartNotification, setShowCartNotification] = useState(false)
  const categories = ['All', ...getCategories()]

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product)
    setShowCartNotification(true)
    setTimeout(() => setShowCartNotification(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button onClick={() => router.push('/dashboard')} className="text-gray-600 hover:text-gray-900">
                ← Back
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/mtn-logo.svg" 
                  alt="Mtn High Sign Logo" 
                  width={78} 
                  height={26}
                  className="object-contain"
                  priority
                />
              </button>
              <h1 className="text-xl font-bold text-gray-900 ml-2">Shop</h1>
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

      {showCartNotification && (
        <div className="fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          ✓ Added to cart!
        </div>
      )}

      <div className="flex">
        <aside className="w-64 bg-white h-screen sticky top-16 border-r border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map(category => (
              <li key={category}>
                <button
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Professional Signage Solutions</h2>
            <p className="text-gray-600">Browse our complete catalog of custom signs and displays</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 relative bg-gradient-to-br from-blue-50 to-blue-100">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
                    {product.inStock && (
                      <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-blue-600">
                      ${product.price.toLocaleString()}
                    </p>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/products/${product.id}`)}
                        className="px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}