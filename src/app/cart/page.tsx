'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/contexts/CartContext'
import NotificationBell from '@/components/NotificationBell'

export default function CartPage() {
  const router = useRouter()
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart()

  const handleCheckout = () => {
    alert('Checkout functionality would be implemented here!')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <button onClick={() => router.push('/shop')} className="text-gray-600 hover:text-gray-900">
                ← Continue Shopping
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
              <h1 className="text-xl font-bold text-gray-900 ml-2">Shopping Cart</h1>
            </div>
            <NotificationBell />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <span className="text-6xl mb-4 block">🛒</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some amazing signs to get started!</p>
            <button
              onClick={() => router.push('/shop')}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Cart Items ({items.length})</h2>
                    <button
                      onClick={clearCart}
                      className="text-sm text-red-600 hover:text-red-700"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-24 h-24 relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden">
                          <Image 
                            src={item.product.image} 
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                              <p className="text-sm text-gray-500">{item.product.category}</p>
                              {item.selectedSize && (
                                <p className="text-sm text-gray-600 mt-1">Size: {item.selectedSize}</p>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center text-black font-bold text-lg"
                              >
                                −
                              </button>
                              <span className="w-12 text-center text-black font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="w-8 h-8 border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center text-black font-bold text-lg"
                              >
                                +
                              </button>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Price per item: ${item.product.price.toLocaleString()}</p>
                              <p className="text-lg font-semibold text-gray-900">
                                ${(item.product.price * item.quantity).toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-3"
                >
                  Proceed to Checkout
                </button>
                
                <button
                  onClick={() => router.push('/shop')}
                  className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
                
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-800">
                    <strong>Secure Checkout:</strong> Your information is protected with SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}