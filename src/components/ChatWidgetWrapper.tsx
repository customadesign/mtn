'use client'

import React, { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useChat } from '@/contexts/ChatContext'

// Dynamically import ChatWidget to avoid SSR issues
const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false })

export default function ChatWidgetWrapper() {
  const { isChatOpen, openChat, closeChat } = useChat()
  const [localOpen, setLocalOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  
  useEffect(() => {
    if (isChatOpen && !localOpen) {
      setLocalOpen(true)
      setUnreadCount(0)
    }
  }, [isChatOpen, localOpen])
  
  const handleOpen = () => {
    setLocalOpen(true)
    setUnreadCount(0)
    openChat()
  }
  
  const handleClose = () => {
    setLocalOpen(false)
    closeChat()
  }
  
  // Show chat button when closed
  if (!localOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={handleOpen}
          className="relative group bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 hover:from-blue-700 hover:to-blue-800 animate-bounceIn"
          aria-label="Open chat"
        >
          <MessageCircle size={28} className="animate-pulse" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
              {unreadCount}
            </span>
          )}
          <span className="absolute -top-12 right-0 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat with us!
          </span>
        </button>
      </div>
    )
  }
  
  // Show the actual chat widget when open
  return <ChatWidget onClose={handleClose} />
}