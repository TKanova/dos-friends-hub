"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function CreateEventPage() {
  const { isDosMember } = useDosMembership()

  if (!isDosMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">You need to be a DOS Member to create events.</p>
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
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create New Event</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="event-name">Event Name</Label>
            <Input id="event-name" placeholder="e.g., Summer Music Festival" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-description">Description</Label>
            <Textarea id="event-description" placeholder="Tell us about your event..." rows={5} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="event-time">Time</Label>
              <Input id="event-time" type="time" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-location">Location</Label>
            <Input id="event-location" placeholder="e.g., Central Park, New York" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="event-image">Image URL</Label>
            <Input id="event-image" placeholder="e.g., https://example.com/event-banner.jpg" />
          </div>
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Create Event</Button>
        </CardContent>
      </Card>
    </div>
  )
}
