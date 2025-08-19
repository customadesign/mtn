'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getRecentOrders, getOrderStats, statusConfig } from '@/lib/orders'
import { products } from '@/lib/products'
import NotificationBell from '@/components/NotificationBell'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [recentOrders, setRecentOrders] = useState<ReturnType<typeof getRecentOrders>>([])
  const [stats, setStats] = useState<ReturnType<typeof getOrderStats>>({ total: 0, pending: 0, delivered: 0, onHold: 0 })
  const [featuredProducts] = useState(products.slice(0, 4))

  useEffect(() => {
    setRecentOrders(getRecentOrders(3))
    setStats(getOrderStats())
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40 backdrop-blur-lg bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link 
                href="/dashboard"
                className="hover:opacity-80 transition-opacity"
              >
                <Image 
                  src="/mtn-logo.svg" 
                  alt="MTN High Sign Logo" 
                  width={99} 
                  height={33}
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-1">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'overview' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('shop')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'shop' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Shop
              </button>
              <button 
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'projects' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Projects
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <NotificationBell />
              <Link 
                href="/cart"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                <span>Cart</span>
                <span className="text-sm bg-blue-600 text-white px-2 py-0.5 rounded-full">0</span>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Portal</h2>
          <p className="text-gray-600">Manage orders, track projects, and explore our premium signage solutions.</p>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">📦</span>
                  <span className="text-xs font-medium text-gray-500 uppercase">Total</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">⏳</span>
                  <span className="text-xs font-medium text-orange-500 uppercase">Active</span>
                </div>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                <p className="text-sm text-gray-600">In Progress</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">✅</span>
                  <span className="text-xs font-medium text-green-500 uppercase">Complete</span>
                </div>
                <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">⏸️</span>
                  <span className="text-xs font-medium text-red-500 uppercase">Paused</span>
                </div>
                <p className="text-2xl font-bold text-red-600">{stats.onHold}</p>
                <p className="text-sm text-gray-600">On Hold</p>
              </div>
            </div>

            {/* Recent Orders & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                    <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View All →
                    </Link>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentOrders.map((order) => {
                    const config = statusConfig[order.status]
                    return (
                      <Link
                        key={order.id}
                        href={`/projects/${order.id}`}
                        className="block p-6 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                              <div className={`px-2 py-0.5 rounded-full ${config.bgColor} ${config.borderColor} border inline-flex items-center gap-1`}>
                                <span className="text-xs">{config.icon}</span>
                                <span className={`text-xs font-medium ${config.color}`}>
                                  {config.label}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{order.customerName}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(order.placedDate)}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                            <p className="text-xs text-gray-500">{order.items.length} items</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/shop"
                    className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🛍️</span>
                      <div>
                        <p className="font-medium text-gray-900">Browse Products</p>
                        <p className="text-xs text-gray-600">Explore our catalog</p>
                      </div>
                    </div>
                    <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <Link
                    href="/projects"
                    className="w-full flex items-center justify-between p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">📋</span>
                      <div>
                        <p className="font-medium text-gray-900">View All Projects</p>
                        <p className="text-xs text-gray-600">Track your orders</p>
                      </div>
                    </div>
                    <span className="text-green-600 group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <button className="w-full flex items-center justify-between p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">💬</span>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">Get Support</p>
                        <p className="text-xs text-gray-600">Contact our team</p>
                      </div>
                    </div>
                    <span className="text-purple-600 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Products */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Popular Products</h3>
                  <Link href="/shop" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Shop All →
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group cursor-pointer"
                  >
                    <div className="bg-gray-50 rounded-lg h-32 mb-3 group-hover:bg-gray-100 transition-colors relative overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-2">{formatCurrency(product.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shop' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Shop Products</h3>
              <p className="text-gray-600 mb-8">Browse our selection of custom signs, graphics, and printing services.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <span className="text-4xl mb-3 block">🏢</span>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Exterior Signs</h4>
                  <p className="text-sm text-gray-600 mb-4">Channel letters, monument signs, and more</p>
                  <Link href="/shop?category=exterior" className="text-blue-600 font-medium text-sm hover:text-blue-800">
                    Browse Exterior →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6">
                  <span className="text-4xl mb-3 block">📺</span>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Digital Displays</h4>
                  <p className="text-sm text-gray-600 mb-4">LED screens and programmable displays</p>
                  <Link href="/shop?category=digital" className="text-purple-600 font-medium text-sm hover:text-purple-800">
                    Browse Digital →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <span className="text-4xl mb-3 block">🚗</span>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Vehicle Graphics</h4>
                  <p className="text-sm text-gray-600 mb-4">Wraps, decals, and fleet branding</p>
                  <Link href="/shop?category=vehicle" className="text-green-600 font-medium text-sm hover:text-green-800">
                    Browse Vehicle →
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6">
                  <span className="text-4xl mb-3 block">🎯</span>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Promotional</h4>
                  <p className="text-sm text-gray-600 mb-4">Banners, A-frames, and trade show displays</p>
                  <Link href="/shop?category=promotional" className="text-orange-600 font-medium text-sm hover:text-orange-800">
                    Browse Promotional →
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  View Full Catalog
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Projects</h3>
              <p className="text-gray-600 mb-8">Track the status of your orders and view delivery information.</p>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{stats.pending}</p>
                      <p className="text-sm text-gray-600">Active Orders</p>
                    </div>
                    <span className="text-3xl">🚀</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{stats.delivered}</p>
                      <p className="text-sm text-gray-600">Delivered</p>
                    </div>
                    <span className="text-3xl">✅</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
                      <p className="text-sm text-gray-600">Total Orders</p>
                    </div>
                    <span className="text-3xl">📊</span>
                  </div>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="space-y-4 mb-8">
                {recentOrders.slice(0, 4).map((order) => {
                  const config = statusConfig[order.status]
                  return (
                    <Link
                      key={order.id}
                      href={`/projects/${order.id}`}
                      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all hover:border-blue-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{order.orderNumber}</h4>
                            <div className={`px-2.5 py-1 rounded-full ${config.bgColor} ${config.borderColor} border inline-flex items-center gap-1`}>
                              <span className="text-xs">{config.icon}</span>
                              <span className={`text-xs font-medium ${config.color}`}>
                                {config.label}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">
                            {order.items[0].productName}
                            {order.items.length > 1 && ` +${order.items.length - 1} more`}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                          <p className="text-xs text-gray-500">{formatDate(order.placedDate)}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div className="text-center">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  View All Projects
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
