"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MyRsvpsPage() {
  const { isDosMember } = useDosMembership()

  if (!isDosMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">You need to be a DOS Member to view your RSVPs.</p>
        <p className="text-md text-muted-foreground mb-6">
          Please click the "Become a DOS Member" button in the footer to gain access.
        </p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    )
  }

  const myRsvps = [
    {
      id: "e1",
      name: "Summer Music Festival",
      date: "2024-08-15",
      time: "18:00",
      location: "Central Park, New York",
      status: "Confirmed",
    },
    {
      id: "e3",
      name: "Tech Innovators Meetup",
      date: "2024-09-01",
      time: "10:00",
      location: "Innovation Hub, San Francisco",
      status: "Pending",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My RSVPs</h1>
      {myRsvps.length === 0 ? (
        <p className="text-center text-lg text-muted-foreground">You have no RSVPs yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myRsvps.map((rsvp) => (
            <Card key={rsvp.id}>
              <CardHeader>
                <CardTitle>{rsvp.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Date: {rsvp.date} at {rsvp.time}
                </p>
                <p className="text-sm text-muted-foreground">Location: {rsvp.location}</p>
                <p className="text-sm font-semibold">Status: {rsvp.status}</p>
                <Link href={`/event/${rsvp.id}`}>
                  <Button variant="outline" className="w-full mt-2 bg-transparent">
                    View Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
