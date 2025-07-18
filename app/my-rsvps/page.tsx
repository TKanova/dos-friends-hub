"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDosMembership } from "@/contexts/dos-membership-context"

interface RSVPEvent {
  id: string
  name: string
  date: string
  time: string
  location: string
  imageUrl: string
  status: "going" | "interested" | "not going"
}

const sampleRsvps: RSVPEvent[] = [
  {
    id: "e1",
    name: "Summer Music Festival",
    date: "2024-08-15",
    time: "18:00",
    location: "Central Park, Almaty",
    imageUrl: "/images/summer-music-festival.png",
    status: "going",
  },
  {
    id: "e3",
    name: "Tech Innovators Meetup",
    date: "2024-09-01",
    time: "10:00",
    location: "Astana Hub, Astana",
    imageUrl: "/images/tech-innovators-meetup.png",
    status: "interested",
  },
  {
    id: "e5",
    name: "Art Exhibition: Modern Visions",
    date: "2024-09-10",
    time: "14:00",
    location: "Kasteyev State Museum of Arts, Almaty",
    imageUrl: "/images/art-exhibition-modern-visions.png",
    status: "going",
  },
]

export default function MyRsvpsPage() {
  const [rsvps, setRsvps] = useState<RSVPEvent[]>(sampleRsvps)
  const { isMember } = useDosMembership()

  if (!isMember) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Card className="max-w-md mx-auto p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-destructive">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground">You need to be a DOS Member to view your RSVPs.</p>
            <p className="text-muted-foreground">Please become a member to unlock this feature.</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/about-membership">Become a DOS Member</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleCancelRsvp = (id: string) => {
    setRsvps(rsvps.filter((rsvp) => rsvp.id !== id))
    // In a real app, send cancellation to backend
    console.log(`Cancelled RSVP for event ${id}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">My RSVPs</h1>
      {rsvps.length === 0 ? (
        <Card className="max-w-md mx-auto p-6 text-center">
          <CardTitle className="text-xl font-semibold">No RSVPs yet!</CardTitle>
          <CardDescription className="mt-2 text-muted-foreground">
            You haven't RSVP'd to any events. Explore events and find your next adventure.
          </CardDescription>
          <Button asChild className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/">Discover Events</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rsvps.map((rsvp) => (
            <Card key={rsvp.id} className="flex flex-col">
              <Image
                src={rsvp.imageUrl || "/placeholder.svg"}
                alt={rsvp.name}
                width={400}
                height={225}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardContent className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold mb-2">{rsvp.name}</h2>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{rsvp.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{rsvp.time}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{rsvp.location}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-sm font-medium px-3 py-1 rounded-full ${
                      rsvp.status === "going"
                        ? "bg-green-100 text-green-800"
                        : rsvp.status === "interested"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {rsvp.status.charAt(0).toUpperCase() + rsvp.status.slice(1)}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => handleCancelRsvp(rsvp.id)}>
                    Cancel RSVP
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
