"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Send, Hash, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

// Mock chat data
const mockChannels = [
  { id: "general", name: "General", icon: "💬" },
  { id: "music", name: "Music Events", icon: "🎵" },
  { id: "education", name: "Education", icon: "📚" },
  { id: "sports", name: "Sports", icon: "🏀" },
  { id: "food", name: "Food & Dining", icon: "🍕" },
]

const mockMessages = {
  general: [
    {
      id: 1,
      user: "Alex Chen",
      message: "Hey everyone! Welcome to DOS Friend's Hub chat!",
      timestamp: "2024-01-15T09:00:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      message: "This is so cool! Love the new platform 🎉",
      timestamp: "2024-01-15T09:05:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      user: "Mike Rodriguez",
      message: "Anyone know about upcoming events this weekend?",
      timestamp: "2024-01-15T09:10:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  music: [
    {
      id: 1,
      user: "Emma Wilson",
      message: "The campus music festival lineup looks amazing this year!",
      timestamp: "2024-01-15T10:00:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  education: [
    {
      id: 1,
      user: "David Kim",
      message: "Don't miss the web development workshop next week!",
      timestamp: "2024-01-15T11:00:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  sports: [
    {
      id: 1,
      user: "Lisa Park",
      message: "Basketball tournament registration is now open!",
      timestamp: "2024-01-15T12:00:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  food: [
    {
      id: 1,
      user: "Tom Anderson",
      message: "Food truck festival next Friday - who's in?",
      timestamp: "2024-01-15T13:00:00Z",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
}

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("general")
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers] = useState(47) // Mock online count
  const messagesEndRef = useRef(null)
  const currentUser = "You" // This would come from auth
  const { apiCall, user } = useAuth()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await apiCall(`http://localhost:8000/api/messages/${activeChannel}`)
        if (response.ok) {
          const data = await response.json()
          setMessages((prev) => ({
            ...prev,
            [activeChannel]: data,
          }))
        }
      } catch (error) {
        console.error("Error fetching messages:", error)
      }
    }

    fetchMessages()
  }, [activeChannel, apiCall])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await apiCall("http://localhost:8000/api/messages", {
        method: "POST",
        body: JSON.stringify({
          channel: activeChannel,
          message: newMessage,
        }),
      })

      if (response.ok) {
        setNewMessage("")
        // Message will be added via WebSocket broadcast
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeChannel])

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const currentMessages = messages[activeChannel] || []

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            style={{ height: "calc(100vh - 200px)" }}
          >
            <div className="flex h-full">
              {/* Sidebar */}
              <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">Global Chat</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users size={16} className="mr-1" />
                    <span>{onlineUsers} online</span>
                  </div>
                </div>

                {/* Channels */}
                <div className="flex-1 overflow-y-auto p-2">
                  <div className="space-y-1">
                    {mockChannels.map((channel) => (
                      <button
                        key={channel.id}
                        onClick={() => setActiveChannel(channel.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center ${
                          activeChannel === channel.id
                            ? "bg-orange-100 text-orange-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Hash size={16} className="mr-2" />
                        <span className="mr-2">{channel.icon}</span>
                        {channel.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <div className="flex items-center">
                    <Hash size={20} className="mr-2 text-gray-500" />
                    <span className="mr-2">{mockChannels.find((c) => c.id === activeChannel)?.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {mockChannels.find((c) => c.id === activeChannel)?.name}
                    </h3>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {currentMessages.map((msg) => (
                    <div key={msg.id} className="flex space-x-3">
                      <img
                        src={msg.avatar || "/placeholder.svg"}
                        alt={msg.user}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-gray-900 text-sm">{msg.user}</span>
                          <span className="text-gray-500 text-xs">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="text-gray-700 text-sm break-words">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={`Message #${mockChannels.find((c) => c.id === activeChannel)?.name.toLowerCase()}`}
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
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </ProtectedRoute>
  )
}
