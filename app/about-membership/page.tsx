"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { CheckCircle, Users, Sparkles } from "lucide-react"

export default function AboutMembershipPage() {
  const { isDosMember, becomeDosMember } = useDosMembership()

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <Card className="max-w-3xl mx-auto p-8 space-y-8">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Become a DOS Member</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Unlock the full potential of DOS – Friend’s Hub by becoming a member. It's completely free and gives you
            access to exclusive features designed to enhance your event experience.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center space-y-3">
              <CheckCircle className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-semibold">Post Comments</h3>
              <p className="text-sm text-muted-foreground">Engage with the community on event pages.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <Users className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-semibold">Manage RSVPs</h3>
              <p className="text-sm text-muted-foreground">Keep track of events you're attending.</p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <Sparkles className="h-10 w-10 text-primary" />
              <h3 className="text-xl font-semibold">Access Chat</h3>
              <p className="text-sm text-muted-foreground">Join the global community chat.</p>
            </div>
          </div>

          {isDosMember ? (
            <div className="space-y-4">
              <p className="text-xl font-semibold text-green-600">You are already a DOS Member!</p>
              <Link href="/">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Go to Home</Button>
              </Link>
            </div>
          ) : (
            <Button
              onClick={becomeDosMember}
              className="w-full md:w-auto bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              Become a DOS Member - It's Free!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
