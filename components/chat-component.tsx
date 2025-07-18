"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, MessageCircle, Users, Hash } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface Message {
  id: string
  sender: string
  avatar: string
  content: string
  timestamp: string
}

interface Channel {
  id: string
  name: string
  type: "public" | "private"
  unreadCount: number
}

interface User {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away"
}

const sampleChannels: Channel[] = [
  { id: "general", name: "General Chat", type: "public", unreadCount: 3 },
  { id: "tech", name: "Tech Enthusiasts", type: "public", unreadCount: 0 },
  { id: "music", name: "Music Lovers", type: "public", unreadCount: 5 },
  { id: "private-john", name: "John Doe", type: "private", unreadCount: 1 },
]

const sampleUsers: User[] = [
  { id: "user1", name: "Alice", avatar: "/placeholder-user.jpg", status: "online" },
  { id: "user2", name: "Bob", avatar: "/placeholder-user.jpg", status: "away" },
  { id: "user3", name: "Charlie", avatar: "/placeholder-user.jpg", status: "offline" },
  { id: "user4", name: "Diana", avatar: "/placeholder-user.jpg", status: "online" },
]

export default function ChatComponent() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m1", sender: "Alice", avatar: "/placeholder-user.jpg", content: "Hey everyone!", timestamp: "10:00 AM" },
    { id: "m2", sender: "Bob", avatar: "/placeholder-user.jpg", content: "Hello Alice!", timestamp: "10:01 AM" },
    { id: "m3", sender: "You", avatar: "/placeholder-user.jpg", content: "What's up?", timestamp: "10:02 AM" },
  ])
  const [newMessage, setNewMessage] = useState("")
  const [activeChannel, setActiveChannel] = useState<Channel>(sampleChannels[0])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: `m${messages.length + 1}`,
        sender: "You", // This would be dynamic in a real app
        avatar: "/placeholder-user.jpg", // This would be dynamic
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)]">
      {/* Sidebar */}
      <Card className="w-64 flex flex-col border-r rounded-none">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl">Channels</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow overflow-auto">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-2">
              {sampleChannels.map((channel) => (
                <Button
                  key={channel.id}
                  variant={activeChannel.id === channel.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveChannel(channel)}
                >
                  {channel.type === "public" ? (
                    <Hash className="mr-2 h-4 w-4" />
                  ) : (
                    <MessageCircle className="mr-2 h-4 w-4" />
                  )}
                  {channel.name}
                  {channel.unreadCount > 0 && (
                    <span className="ml-auto px-2 py-0.5 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {channel.unreadCount}
                    </span>
                  )}
                </Button>
              ))}
            </div>
            <Separator className="my-4" />
            <h3 className="text-lg font-semibold mb-2">Direct Messages</h3>
            <div className="space-y-2">
              {sampleUsers.map((user) => (
                <Button
                  key={user.id}
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setActiveChannel({ id: user.id, name: user.name, type: "private", unreadCount: 0 })}
                >
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {user.name}
                  <span
                    className={`ml-auto h-2 w-2 rounded-full ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "away"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                    }`}
                  />
                </Button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat Area */}
      <div className="flex flex-col flex-grow">
        <Card className="flex-grow flex flex-col rounded-none border-b-0 border-l-0 border-r-0">
          <CardHeader className="pb-4 border-b">
            <CardTitle className="text-xl flex items-center">
              {activeChannel.type === "public" ? (
                <Hash className="mr-2 h-5 w-5" />
              ) : (
                <MessageCircle className="mr-2 h-5 w-5" />
              )}
              {activeChannel.name}
              {activeChannel.type === "public" && (
                <span className="ml-2 text-sm text-gray-500 flex items-center">
                  <Users className="h-4 w-4 mr-1" /> {sampleUsers.length}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-auto p-4">
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.sender === "You" ? "justify-end" : ""}`}
                  >
                    {message.sender !== "You" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col ${message.sender === "You" ? "items-end" : "items-start"}`}>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        {message.sender !== "You" && <span className="font-semibold">{message.sender}</span>}
                        <span>{message.timestamp}</span>
                      </div>
                      <div
                        className={`rounded-lg p-3 max-w-[70%] ${
                          message.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                    {message.sender === "You" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
