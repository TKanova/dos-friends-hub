"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDosMembership } from "@/contexts/dos-membership-context"

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  avatarUrl?: string
  replies?: Comment[]
}

interface CommentSectionProps {
  eventId: string
}

const sampleComments: Comment[] = [
  {
    id: "c1",
    author: "Alice Smith",
    content: "This event looks amazing! Can't wait to join.",
    timestamp: "2024-07-17T10:00:00Z",
    avatarUrl: "/placeholder-user.jpg",
    replies: [
      {
        id: "r1",
        author: "Bob Johnson",
        content: "Me too! The location is perfect.",
        timestamp: "2024-07-17T10:15:00Z",
        avatarUrl: "/placeholder-user.jpg",
      },
    ],
  },
  {
    id: "c2",
    author: "Charlie Brown",
    content: "Is there parking available nearby?",
    timestamp: "2024-07-17T11:30:00Z",
    avatarUrl: "/placeholder-user.jpg",
  },
  {
    id: "c3",
    author: "Diana Prince",
    content: "Looking forward to meeting new people!",
    timestamp: "2024-07-17T12:45:00Z",
    avatarUrl: "/placeholder-user.jpg",
  },
]

export default function CommentSection({ eventId }: CommentSectionProps) {
  const { isDosMember } = useDosMembership()
  const [comments, setComments] = useState<Comment[]>(sampleComments)
  const [newComment, setNewComment] = useState("")

  const handlePostComment = () => {
    if (newComment.trim() === "") return

    const comment: Comment = {
      id: `c${Date.now()}`,
      author: "DOS Member", // Placeholder for authenticated user
      content: newComment,
      timestamp: new Date().toISOString(),
      avatarUrl: "/placeholder-user.jpg",
    }
    setComments([...comments, comment])
    setNewComment("")
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {isDosMember ? (
        <div className="mb-6 flex items-start gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handlePostComment}>Post Comment</Button>
          </div>
        </div>
      ) : (
        <p className="mb-6 text-muted-foreground">
          Become a DOS Member to post comments. You can do so by clicking the button in the footer.
        </p>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.avatarUrl || "/placeholder.svg"} />
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{comment.author}</h3>
                <span className="text-sm text-muted-foreground">{new Date(comment.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-sm text-foreground">{comment.content}</p>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4 space-y-4 border-l pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.avatarUrl || "/placeholder.svg"} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{reply.author}</h4>
                          <span className="text-xs text-muted-foreground">
                            {new Date(reply.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
