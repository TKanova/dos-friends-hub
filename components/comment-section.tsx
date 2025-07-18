"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDosMembership } from "@/contexts/dos-membership-context"
import Link from "next/link"

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  replies?: Comment[]
}

interface CommentSectionProps {
  eventId: string
}

const getRandomAvatar = (seed: string) => {
  const avatars = [
    "https://api.dicebear.com/7.x/lorelei/svg?seed=1",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=2",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=3",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=4",
    "https://api.dicebear.com/7.x/lorelei/svg?seed=5",
  ]
  const hash = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return avatars[hash % avatars.length]
}

const initialComments: Comment[] = [
  {
    id: "c1",
    author: "Alice Smith",
    avatar: getRandomAvatar("Alice Smith"),
    content: "This looks like an amazing event! Can't wait to join.",
    timestamp: "2 hours ago",
  },
  {
    id: "c2",
    author: "Bob Johnson",
    avatar: getRandomAvatar("Bob Johnson"),
    content: "Is there a dress code for the music festival?",
    timestamp: "1 hour ago",
    replies: [
      {
        id: "r1",
        author: "Event Organizer",
        avatar: getRandomAvatar("Event Organizer"),
        content: "No specific dress code, just come as you are and enjoy the music!",
        timestamp: "30 minutes ago",
      },
    ],
  },
  {
    id: "c3",
    author: "Charlie Brown",
    avatar: getRandomAvatar("Charlie Brown"),
    content: "Anyone else coming from the downtown area?",
    timestamp: "15 minutes ago",
  },
]

export default function CommentSection({ eventId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState("")
  const { isDosMember } = useDosMembership()

  const handleSubmitComment = () => {
    if (newComment.trim() && isDosMember) {
      const newId = `c${comments.length + 1}`
      const newCommentObj: Comment = {
        id: newId,
        author: "DOS Member", // Placeholder for logged-in user
        avatar: getRandomAvatar("DOS Member"),
        content: newComment.trim(),
        timestamp: "Just now",
      }
      setComments([...comments, newCommentObj])
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={comment.avatar || "/placeholder.svg"} />
              <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{comment.author}</h4>
                <span className="text-sm text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-foreground">{comment.content}</p>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-2 space-y-2 border-l pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={reply.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold text-sm">{reply.author}</h5>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs text-foreground">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isDosMember ? (
        <div className="flex gap-2 pt-4 border-t">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            className="flex-1"
          />
          <Button
            onClick={handleSubmitComment}
            className="self-end bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Post
          </Button>
        </div>
      ) : (
        <div className="text-center py-6 border-t">
          <p className="text-lg text-muted-foreground mb-4">You need to be a DOS Member to post comments.</p>
          <Link href="/about-membership">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Become a DOS Member
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
