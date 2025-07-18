"use client"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
  type: "public" | "private"
}

const getRandomAvatar = (seed: string) => {
  const avatars = [
    "https://api.dicebear.com/7.x/lorelei/svg?seed=avatar1",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=avatar2",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=avatar3",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=avatar4",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=avatar5",
  ]
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return avatars[hash % avatars.length]
}

const initialMessages: Message[] = [
  {
    id: "m1",
    sender: "CommunityBot",
    avatar: getRandomAvatar("CommunityBot"),
    content: "Welcome to the DOS Global Chat! Feel free to say hello.",
    timestamp: "10:00 AM",
    type: "public",
  },
  {
    id: "m2",
    sender: "User123",
    avatar: getRandomAvatar("User123"),
    content: "Hey everyone! Excited for the Summer Music Festival!",
    timestamp: "10:05 AM",
    type: "public",
  },
  {
    id: "m3",
    sender: "EventFan",
    avatar: getRandomAvatar("EventFan"),
    content: "I'm looking for someone to carpool to the Tech Meetup. Anyone from downtown?",
    timestamp: "10:10 AM",
    type: "public",
  },
  {
    id: "m4",
    sender: "PrivateUser",
    avatar: getRandomAvatar("PrivateUser"),
    content: "Hey User123, I'm also going to the festival. Want to meet up?",
    timestamp: "10:12 AM",
    type: "private",
  },
  {
    id: "m5",
    sender: "User123",
    avatar: getRandomAvatar("User123"),
    content: "Sure, PrivateUser! DM me for details.",
    timestamp: "10:15 AM",
    type: "private",
  },
]

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `m${messages.length + 1}`,
        sender: "You", // Placeholder for current user
        avatar: getRandomAvatar("You"), // Placeholder for current user's avatar
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "public", // Default to public for simplicity
      }
      setMessages((prevMessages) => [...prevMessages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender !== "You" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <div className="font-semibold text-sm mb-1">{msg.sender}</div>
              <p className="text-sm">{msg.content}</p>
              <div className="text-xs text-right mt-1 opacity-75">{msg.timestamp}</div>
            </div>
            {msg.sender === "You" && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                <AvatarFallback>{msg.sender.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 flex items-center gap-2">
        <Input
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage()
            }
          }}
          className="flex-1"
        />
        <Button onClick={handleSendMessage} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Send className="h-5 w-5" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}
