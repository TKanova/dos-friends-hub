"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, MapPin, Clock, Users } from "lucide-react"

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
      imageUrl:
        "https://images.unsplash.com/photo-1514525253164-ff44ce820118?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      attendees: 120,
    },
    {
      id: "e3",
      name: "Tech Innovators Meetup",
      date: "2024-09-01",
      time: "10:00",
      location: "Innovation Hub, San Francisco",
      status: "Pending",
      imageUrl:
        "https://images.unsplash.com/photo-1556761175-5974ddf47dc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      attendees: 80,
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
            <Card key={rsvp.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={rsvp.imageUrl || "/placeholder.svg"} alt={rsvp.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle>{rsvp.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>{rsvp.date}</span>
                  <Clock className="h-4 w-4 ml-4" />
                  <span>{rsvp.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{rsvp.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{rsvp.attendees} going</span>
                </div>
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
