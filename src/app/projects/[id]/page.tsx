'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { getOrderById, statusConfig, type OrderStatus } from '@/lib/orders'
import ContactSupportModal from '@/components/ContactSupportModal'
import { useChat } from '@/contexts/ChatContext'

export default function ProjectDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { openChat } = useChat()
  const [order, setOrder] = useState<ReturnType<typeof getOrderById>>(undefined)
  const [activeTab, setActiveTab] = useState<'overview' | 'tracking' | 'history'>('overview')
  const [copied, setCopied] = useState<string | null>(null)
  const [showContactModal, setShowContactModal] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundOrder = getOrderById(params.id as string)
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        router.push('/projects')
      }
    }
  }, [params.id, router])

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const getDaysUntilDelivery = () => {
    if (!order.estimatedDelivery || order.estimatedDelivery === 'TBD') return null
    const now = new Date()
    const delivery = new Date(order.estimatedDelivery)
    const diffTime = delivery.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getStatusProgress = () => {
    const statusOrder: OrderStatus[] = [
      'order-received',
      'in-production',
      'quality-check',
      'preparing-shipment',
      'shipped',
      'delivered'
    ]
    
    if (order.status === 'on-hold') return -1
    
    const currentIndex = statusOrder.indexOf(order.status)
    return ((currentIndex + 1) / statusOrder.length) * 100
  }

  const config = statusConfig[order.status]
  const daysUntil = getDaysUntilDelivery()
  const progress = getStatusProgress()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-3 group">
                <Image 
                  src="/mtn-logo.svg" 
                  alt="Mtn High Sign Logo" 
                  width={78} 
                  height={26}
                  className="object-contain transform group-hover:scale-105 transition-transform"
                  priority
                />
              </Link>
              <div className="h-8 w-px bg-gray-300"></div>
              <span className="text-lg font-medium text-gray-600">Order Details</span>
            </div>
            
            <nav className="flex items-center space-x-2">
              <Link 
                href="/projects"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all flex items-center gap-2"
              >
                ← Back to Projects
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
                <div className={`px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border inline-flex items-center gap-1`}>
                  <span>{config.icon}</span>
                  <span className={`text-sm font-medium ${config.color}`}>
                    {config.label}
                  </span>
                </div>
              </div>
              <p className="text-gray-600">Placed on {formatDate(order.placedDate)}</p>
              <p className="text-gray-600">{order.customerName} • {order.customerEmail}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-right">
                <p className="text-sm text-gray-600">Order Total</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(order.total)}</p>
              </div>
              {daysUntil !== null && daysUntil > 0 && order.status !== 'delivered' && (
                <div className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-700 font-medium">
                    Estimated delivery in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {progress >= 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Order Progress</p>
                <p className="text-sm font-medium text-gray-900">{Math.round(progress)}% Complete</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <div className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'tracking'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Tracking & Delivery
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Status History
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Order Items */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{item.productName}</h4>
                          {item.size && (
                            <p className="text-sm text-gray-600">Size: {item.size}</p>
                          )}
                          {item.customization && (
                            <p className="text-sm text-gray-600">Customization: {item.customization}</p>
                          )}
                          <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatCurrency(item.price)} each
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">{formatCurrency(order.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">{formatCurrency(order.shipping)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900">{formatCurrency(order.total)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {order.notes && (
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Notes</h3>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm text-yellow-800">{order.notes}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'tracking' && (
              <div className="space-y-6">
                {/* Shipping Address */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h3>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                    {order.shippingAddress.company && (
                      <p className="text-gray-700">{order.shippingAddress.company}</p>
                    )}
                    <p className="text-gray-600">{order.shippingAddress.street}</p>
                    <p className="text-gray-600">
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                    </p>
                    <p className="text-gray-600 mt-2">Phone: {order.shippingAddress.phone}</p>
                  </div>
                </div>

                {/* Tracking Information */}
                {order.tracking && order.tracking.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Tracking Information</h3>
                    <div className="space-y-4">
                      {order.tracking.map((tracking, index) => (
                        <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="font-medium text-gray-900">{tracking.carrier}</p>
                              <p className="text-sm text-gray-600">
                                Tracking: {tracking.trackingNumber}
                              </p>
                            </div>
                            <button
                              onClick={() => copyToClipboard(tracking.trackingNumber, `tracking-${index}`)}
                              className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50 transition-colors"
                            >
                              {copied === `tracking-${index}` ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xl">📍</span>
                              <p className="text-sm text-gray-700">{tracking.lastUpdate}</p>
                            </div>
                            
                            {tracking.estimatedDelivery !== 'TBD' && (
                              <p className="text-sm text-gray-600">
                                Estimated delivery: {formatDate(tracking.estimatedDelivery)}
                              </p>
                            )}
                          </div>

                          <a
                            href={tracking.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                          >
                            Track Package
                            <span>→</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">📦</span>
                    <p className="text-gray-600">Tracking information will be available once your order ships</p>
                  </div>
                )}

                {/* Estimated Delivery */}
                {order.estimatedDelivery !== 'TBD' && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Timeline</h3>
                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-green-900">Estimated Delivery Date</p>
                          <p className="text-2xl font-bold text-green-700 mt-1">
                            {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        {daysUntil !== null && daysUntil > 0 && (
                          <div className="text-center">
                            <p className="text-3xl font-bold text-green-600">{daysUntil}</p>
                            <p className="text-sm text-green-700">day{daysUntil !== 1 ? 's' : ''} remaining</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Timeline</h3>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-8 bottom-0 w-0.5 bg-gray-200"></div>
                  
                  {/* Timeline Items */}
                  <div className="space-y-6">
                    {order.statusHistory.map((update, index) => {
                      const updateConfig = statusConfig[update.status]
                      const isLatest = index === order.statusHistory.length - 1
                      
                      return (
                        <div key={index} className="relative flex items-start gap-4">
                          {/* Timeline Dot */}
                          <div className={`
                            w-16 h-16 rounded-full flex items-center justify-center z-10
                            ${isLatest 
                              ? `${updateConfig.bgColor} ${updateConfig.borderColor} border-2 shadow-lg` 
                              : 'bg-white border-2 border-gray-300'
                            }
                          `}>
                            <span className="text-2xl">{updateConfig.icon}</span>
                          </div>
                          
                          {/* Content */}
                          <div className={`flex-1 ${isLatest ? '' : 'opacity-75'}`}>
                            <div className={`
                              p-4 rounded-lg
                              ${isLatest 
                                ? `${updateConfig.bgColor} ${updateConfig.borderColor} border` 
                                : 'bg-gray-50'
                              }
                            `}>
                              <div className="flex items-center justify-between mb-1">
                                <h4 className={`font-semibold ${isLatest ? updateConfig.color : 'text-gray-900'}`}>
                                  {updateConfig.label}
                                </h4>
                                <span className="text-sm text-gray-500">
                                  {formatDate(update.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600">{updateConfig.description}</p>
                              {update.note && (
                                <p className="text-sm text-gray-700 mt-2 italic">Note: {update.note}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Download Invoice
            </button>
            <button 
              onClick={() => setShowContactModal(true)}
              className="flex-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Contact Support
            </button>
            {order.status === 'delivered' && (
              <button className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                Reorder Items
              </button>
            )}
          </div>
        </div>
      </main>
      
      {/* Contact Support Modal */}
      <ContactSupportModal
        isOpen={showContactModal}
        onClose={() => setShowContactModal(false)}
        onOpenChat={openChat}
      />
    </div>
  )
}