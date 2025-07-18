"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
}

interface CommentSectionProps {
  eventId: string
}

export default function CommentSection({ eventId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "Jane Doe",
      avatar: "/placeholder-user.jpg",
      content: "This looks amazing! Can't wait to be there.",
      timestamp: "2 hours ago",
    },
    {
      id: "c2",
      author: "John Smith",
      avatar: "/placeholder-user.jpg",
      content: "Is there parking available nearby?",
      timestamp: "1 hour ago",
    },
  ])
  const [newComment, setNewComment] = useState("")

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment: Comment = {
        id: `c${comments.length + 1}`,
        author: "You", // In a real app, this would be the logged-in user's name
        avatar: "/placeholder-user.jpg", // In a real app, this would be the logged-in user's avatar
        content: newComment,
        timestamp: "Just now",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Comments ({comments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mb-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 flex-grow">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{comment.author}</div>
                  <div className="text-sm text-gray-500">{comment.timestamp}</div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleAddComment} className="flex gap-4">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="flex-grow"
          />
          <Button type="submit" className="self-end">
            <Send className="h-5 w-5" />
            <span className="sr-only">Add comment</span>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
