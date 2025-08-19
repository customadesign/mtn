'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bell, X, Package, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: 'completed' | 'in_progress' | 'on_hold' | 'new'
  orderNumber: string
  read: boolean
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Order Completed',
      message: 'Your Channel Letters order has been completed and is ready for pickup.',
      time: '2 hours ago',
      type: 'completed',
      orderNumber: 'ORD-003',
      read: false
    },
    {
      id: '2',
      title: 'Status Update',
      message: 'Monument Sign project has moved to production stage.',
      time: '5 hours ago',
      type: 'in_progress',
      orderNumber: 'ORD-005',
      read: false
    },
    {
      id: '3',
      title: 'Order On Hold',
      message: 'Digital LED Display order is on hold pending approval.',
      time: '1 day ago',
      type: 'on_hold',
      orderNumber: 'ORD-007',
      read: true
    },
    {
      id: '4',
      title: 'New Order Received',
      message: 'New order for Vehicle Wrap has been received and processing started.',
      time: '2 days ago',
      type: 'new',
      orderNumber: 'ORD-009',
      read: true
    }
  ])
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    )
  }

  const clearAll = () => {
    setNotifications([])
    setIsOpen(false)
  }

  const getIcon = (type: string) => {
    switch(type) {
      case 'completed':
        return <CheckCircle className="text-green-600" size={20} />
      case 'in_progress':
        return <Clock className="text-blue-600" size={20} />
      case 'on_hold':
        return <AlertCircle className="text-orange-600" size={20} />
      case 'new':
        return <Package className="text-purple-600" size={20} />
      default:
        return <Bell className="text-gray-600" size={20} />
    }
  }

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'completed':
        return 'bg-green-50 border-green-200'
      case 'in_progress':
        return 'bg-blue-50 border-blue-200'
      case 'on_hold':
        return 'bg-orange-50 border-orange-200'
      case 'new':
        return 'bg-purple-50 border-purple-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 animate-slideUp">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all read
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg border ${getTypeColor(notification.type)}`}>
                      {getIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 text-sm">
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 mt-0.5">{notification.message}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs font-medium text-gray-600">
                              {notification.orderNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-200 flex items-center justify-between">
              <button
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View all notifications
              </button>
              <button
                onClick={clearAll}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.2s ease-out;
        }
      `}</style>
    </div>
  )
}