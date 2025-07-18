"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendIcon } from "lucide-react"
import { useDosMembership } from "@/contexts/dos-membership-context"
import Link from "next/link"

interface Message {
  id: string
  text: string
  sender: string
  avatar: string
  timestamp: string
}

const sampleMessages: Message[] = [
  {
    id: "m1",
    text: "Hey everyone, excited for the Summer Music Festival!",
    sender: "Alice",
    avatar: "/images/avatar-1.png",
    timestamp: "10:00 AM",
  },
  {
    id: "m2",
    text: "Me too! Anyone planning to meet up before?",
    sender: "Bob",
    avatar: "/images/avatar-2.png",
    timestamp: "10:05 AM",
  },
  {
    id: "m3",
    text: "I'm thinking of checking out the local farmers market this weekend. Anyone interested?",
    sender: "Charlie",
    avatar: "/images/avatar-3.png",
    timestamp: "10:15 AM",
  },
  {
    id: "m4",
    text: "Sounds great, Charlie! What time are you heading there?",
    sender: "Diana",
    avatar: "/images/avatar-4.png",
    timestamp: "10:20 AM",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState("")
  const { isMember } = useDosMembership()

  if (!isMember) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">You need to be a DOS Member to access the chat.</p>
            <p className="text-muted-foreground">Please become a member to unlock this feature.</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/about-membership">Become a DOS Member</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `m${messages.length + 1}`,
        text: newMessage,
        sender: "You", // In a real app, this would be the logged-in user's name
        avatar: "/images/avatar-5.png", // Placeholder for current user's avatar
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto h-[70vh] flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="text-2xl font-bold">Community Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start gap-3">
              <Avatar>
                <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{message.sender}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                <p className="text-gray-800">{message.text}</p>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <SendIcon className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
