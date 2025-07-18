"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ChatComponent from "@/components/chat-component" // Assuming this component exists

export default function ChatPage() {
  const { isDosMember } = useDosMembership()

  if (!isDosMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">You need to be a DOS Member to access the chat.</p>
        <p className="text-md text-muted-foreground mb-6">
          Please click the "Become a DOS Member" button in the footer to gain access.
        </p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto h-[70vh] flex flex-col">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Global Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0">
          <ChatComponent />
        </CardContent>
      </Card>
    </div>
  )
}
