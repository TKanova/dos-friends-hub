"use client"

import { useState, useEffect, useRef } from "react"
import { Send, MessageCircle } from "lucide-react"

export default function ChatComponent({ eventId }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "Sarah M.",
      message: "So excited for this event! Anyone else going?",
      timestamp: "2024-01-15T10:30:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      user: "Mike R.",
      message: "Yes! Can't wait to see the lineup. Should be amazing!",
      timestamp: "2024-01-15T10:35:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [currentUser] = useState("You") // This would come from auth
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message = {
      id: messages.length + 1,
      user: currentUser,
      message: newMessage,
      timestamp: new Date().toISOString(),
      avatar: "/placeholder.svg?height=32&width=32",
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <MessageCircle className="mr-2" size={24} />
          Event Discussion
        </h2>
        <p className="text-gray-600 text-sm">Chat with other attendees</p>
      </div>

      {/* Messages */}
      <div className="h-64 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex space-x-3">
            <img src={msg.avatar || "/placeholder.svg"} alt={msg.user} className="w-8 h-8 rounded-full" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 text-sm">{msg.user}</span>
                <span className="text-gray-500 text-xs">{formatTime(msg.timestamp)}</span>
              </div>
              <p className="text-gray-700 text-sm">{msg.message}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  )
}
