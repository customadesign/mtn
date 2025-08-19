'use client'

import React, { useState, useEffect } from 'react'
import { X, MessageCircle, Calendar, Phone, Clock, ChevronLeft, ChevronRight, Check } from 'lucide-react'

interface ContactSupportModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenChat: () => void
}

export default function ContactSupportModal({ isOpen, onClose, onOpenChat }: ContactSupportModalProps) {
  const [view, setView] = useState<'options' | 'schedule'>('options')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: ''
  })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setView('options')
        setSelectedDate(null)
        setSelectedTime('')
        setFormData({ name: '', email: '', phone: '', description: '' })
        setShowSuccess(false)
      }, 300)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleLiveChat = () => {
    onClose()
    setTimeout(() => {
      onOpenChat()
    }, 300)
  }

  const handleScheduleCall = () => {
    setView('schedule')
  }

  const handleBack = () => {
    setView('options')
  }

  // Calendar logic
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    
    return days
  }

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today || date.getDay() === 0 || date.getDay() === 6 // Disable past dates and weekends
  }

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day))
    }
  }

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      
      // Close modal after showing success
      setTimeout(() => {
        onClose()
      }, 2000)
    }, 1500)
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-slideIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {view === 'schedule' && (
                <button
                  onClick={handleBack}
                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft size={20} />
                </button>
              )}
              <h2 className="text-xl font-semibold">
                {view === 'options' ? 'Contact Support' : 'Schedule a Call'}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>
          {view === 'options' && (
            <p className="mt-2 text-blue-100">Choose how you&apos;d like to get in touch with our team</p>
          )}
        </div>
        
        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {view === 'options' && !showSuccess && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Live Chat Option */}
              <button
                onClick={handleLiveChat}
                className="group relative bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 text-left hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="absolute top-3 right-3 bg-green-500 w-3 h-3 rounded-full animate-pulse"></div>
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600">
                      Connect instantly with our support team. We&apos;re online and ready to help!
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Available Now</span>
                  </div>
                </div>
              </button>
              
              {/* Schedule Call Option */}
              <button
                onClick={handleScheduleCall}
                className="group relative bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 text-left hover:border-purple-400 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule a Call</h3>
                    <p className="text-sm text-gray-600">
                      Book a time that works for you. We&apos;ll call you at your preferred time.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Clock size={16} />
                    <span className="text-sm font-medium">Next available: Today</span>
                  </div>
                </div>
              </button>
            </div>
          )}
          
          {view === 'schedule' && !showSuccess && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              
              {/* Calendar */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Select a Date</h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                      disabled={currentMonth.getMonth() === new Date().getMonth() && currentMonth.getFullYear() === new Date().getFullYear()}
                    >
                      <ChevronLeft size={20} className="text-gray-600" />
                    </button>
                    <h4 className="text-lg font-medium text-gray-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <ChevronRight size={20} className="text-gray-600" />
                    </button>
                  </div>
                  
                  {/* Day Names */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="text-center text-xs font-medium text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Calendar Days */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => (
                      <div key={index} className="aspect-square">
                        {day && (
                          <button
                            type="button"
                            onClick={() => handleDateSelect(day)}
                            disabled={isDateDisabled(day)}
                            className={`w-full h-full rounded-lg transition-all ${
                              isDateDisabled(day)
                                ? 'text-gray-300 cursor-not-allowed'
                                : selectedDate && selectedDate.getDate() === day && 
                                  selectedDate.getMonth() === currentMonth.getMonth()
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'hover:bg-blue-100 text-gray-700'
                            }`}
                          >
                            {day}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Time Selection */}
              {selectedDate && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-900">Select a Time</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-lg border transition-all ${
                          selectedTime === time
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Description */}
              {selectedTime && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-900">What would you like to discuss?</h3>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    rows={4}
                    placeholder="Brief description of your inquiry (optional)"
                  />
                </div>
              )}
              
              {/* Submit Button */}
              {selectedDate && selectedTime && (
                <div className="flex justify-end space-x-3 pt-4 border-t animate-fadeIn">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Scheduling...</span>
                      </>
                    ) : (
                      <>
                        <Phone size={18} />
                        <span>Schedule Call</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          )}
          
          {/* Success Message */}
          {showSuccess && (
            <div className="text-center py-12 animate-fadeIn">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Call Scheduled!</h3>
              <p className="text-gray-600 mb-1">
                We&apos;ll call you on {selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
              <p className="text-gray-600">at {selectedTime}</p>
              <p className="text-sm text-gray-500 mt-4">You&apos;ll receive a confirmation email shortly.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}