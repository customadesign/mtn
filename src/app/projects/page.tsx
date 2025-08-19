'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockOrders, statusConfig, type OrderStatus } from '@/lib/orders'

export default function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'status' | 'total'>('date')
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')

  const filteredOrders = useMemo(() => {
    let filtered = [...mockOrders]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => 
          item.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Apply sorting
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => 
          new Date(b.placedDate).getTime() - new Date(a.placedDate).getTime()
        )
        break
      case 'status':
        const statusOrder = ['order-received', 'in-production', 'quality-check', 'preparing-shipment', 'shipped', 'delivered', 'on-hold']
        filtered.sort((a, b) => 
          statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
        )
        break
      case 'total':
        filtered.sort((a, b) => b.total - a.total)
        break
    }

    return filtered
  }, [searchTerm, statusFilter, sortBy])

  const stats = useMemo(() => {
    const total = mockOrders.length
    const active = mockOrders.filter(o => 
      ['order-received', 'in-production', 'quality-check', 'preparing-shipment', 'shipped'].includes(o.status)
    ).length
    const delivered = mockOrders.filter(o => o.status === 'delivered').length
    const onHold = mockOrders.filter(o => o.status === 'on-hold').length
    
    return { total, active, delivered, onHold }
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
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

  const getDaysUntilDelivery = (deliveryDate: string) => {
    if (!deliveryDate || deliveryDate === 'TBD') return null
    const now = new Date()
    const delivery = new Date(deliveryDate)
    const diffTime = delivery.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

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
                  alt="MTN High Sign Logo" 
                  width={78} 
                  height={26}
                  className="object-contain transform group-hover:scale-105 transition-transform"
                  priority
                />
              </Link>
              <div className="h-8 w-px bg-gray-300"></div>
              <span className="text-lg font-medium text-gray-600">Projects</span>
            </div>
            
            <nav className="flex items-center space-x-2">
              <Link 
                href="/dashboard"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                Dashboard
              </Link>
              <Link 
                href="/shop"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                Shop
              </Link>
              <Link 
                href="/cart"
                className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all"
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title & Stats */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Projects</h2>
          <p className="text-gray-600 mb-6">Track and manage all your sign orders in one place</p>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.active}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🚀</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivered</p>
                  <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On Hold</p>
                  <p className="text-2xl font-bold text-red-600">{stats.onHold}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">⏸️</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by order number, customer, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'all')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'status' | 'total')}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="status">Sort by Status</option>
                <option value="total">Sort by Total</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    viewMode === 'table' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="text-sm">Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <span className="text-4xl mb-4 block">📦</span>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order) => {
              const config = statusConfig[order.status]
              const daysUntil = getDaysUntilDelivery(order.estimatedDelivery)
              
              return (
                <Link
                  key={order.id}
                  href={`/projects/${order.id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">{order.customerName}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}>
                        <span className={`text-sm font-medium ${config.color} flex items-center gap-1`}>
                          <span>{config.icon}</span>
                          {config.label}
                        </span>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Items:</p>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className="text-sm text-gray-800">
                            {item.quantity}x {item.productName}
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-sm text-gray-500">
                            +{order.items.length - 2} more items
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600">Placed</p>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(order.placedDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Total</p>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(order.total)}
                        </p>
                      </div>
                    </div>

                    {/* Delivery Info */}
                    {order.status !== 'delivered' && order.status !== 'on-hold' && daysUntil !== null && (
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600">
                            Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                          {daysUntil > 0 && (
                            <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                              {daysUntil} days
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Tracking Info */}
                    {order.tracking && order.tracking[0] && (
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs text-gray-600 mb-1">Latest Update</p>
                        <p className="text-sm text-gray-800">{order.tracking[0].lastUpdate}</p>
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Delivery
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => {
                    const config = statusConfig[order.status]
                    const daysUntil = getDaysUntilDelivery(order.estimatedDelivery)
                    
                    return (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {order.orderNumber}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formatDate(order.placedDate)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.customerEmail}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${config.bgColor} ${config.borderColor} border`}>
                            <span>{config.icon}</span>
                            <span className={`text-xs font-medium ${config.color}`}>
                              {config.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </div>
                          <div className="text-xs text-gray-500">
                            {order.items[0].productName}
                            {order.items.length > 1 && ` +${order.items.length - 1}`}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900">
                            {formatCurrency(order.total)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.estimatedDelivery === 'TBD' ? (
                            <span className="text-sm text-gray-500">TBD</span>
                          ) : (
                            <div>
                              <div className="text-sm text-gray-900">
                                {new Date(order.estimatedDelivery).toLocaleDateString()}
                              </div>
                              {daysUntil !== null && daysUntil > 0 && (
                                <div className="text-xs text-gray-500">
                                  in {daysUntil} days
                                </div>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link
                            href={`/projects/${order.id}`}
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View Details →
                          </Link>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}