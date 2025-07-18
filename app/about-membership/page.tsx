"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CheckCircleIcon } from "lucide-react"
import { useDosMembership } from "@/contexts/dos-membership-context"

export default function AboutMembershipPage() {
  const { isMember, becomeMember } = useDosMembership()

  return (
    <div className="container mx-auto px-4 py-12 text-center">
      <Card className="max-w-2xl mx-auto p-6">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4">About DOS Membership</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Unlock the full potential of DOS – Friend's Hub by becoming a member. It's free and easy!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Create Events</h3>
                <p className="text-muted-foreground">Organize and host your own events for the community.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">RSVP to Events</h3>
                <p className="text-muted-foreground">Confirm your attendance for events and manage your schedule.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Engage in Chat</h3>
                <p className="text-muted-foreground">Participate in event-specific chats and general forums.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircleIcon className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Find Your DOS Fit</h3>
                <p className="text-muted-foreground">Get matched with compatible partners for events.</p>
              </div>
            </div>
          </div>

          {isMember ? (
            <div className="flex flex-col items-center space-y-4">
              <p className="text-xl font-semibold text-green-600">You are already a DOS Member!</p>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/">Go to Homepage</Link>
              </Button>
            </div>
          ) : (
            <Button
              onClick={becomeMember}
              className="w-full max-w-xs bg-primary text-primary-foreground hover:bg-primary/90 text-lg py-3"
            >
              Become a DOS Member - It's Free!
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
