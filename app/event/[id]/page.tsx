"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Users, MessageCircle } from "lucide-react"
import CommentSection from "@/components/comment-section"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  category: string
  coordinates: { lat: number; lng: number }
  going: number
}

const sampleEvents: Event[] = [
  {
    id: "e1",
    name: "Summer Music Festival",
    date: "2024-08-15",
    time: "18:00",
    location: "Central Park, New York",
    description:
      "An annual music festival featuring various genres and artists. Enjoy live performances, food trucks, and a vibrant atmosphere. Perfect for all ages!",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253164-ff44ce820118?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Music",
    coordinates: { lat: 40.785091, lng: -73.968285 },
    going: 120,
  },
  {
    id: "e2",
    name: "Local Farmers Market",
    date: "2024-08-20",
    time: "09:00",
    location: "Union Square, San Francisco",
    description:
      "Fresh produce, artisanal goods, and local crafts. Support local farmers and artisans while enjoying a lively community atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1587054867758-a405ad471937?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Community",
    coordinates: { lat: 37.787994, lng: -122.407437 },
    going: 50,
  },
  {
    id: "e3",
    name: "Tech Innovators Meetup",
    date: "2024-09-01",
    time: "10:00",
    location: "Innovation Hub, San Francisco",
    description:
      "Networking event for tech enthusiasts and professionals. Discuss the latest trends, share ideas, and connect with potential collaborators.",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5974ddf47dc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Technology",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    going: 80,
  },
  {
    id: "e4",
    name: "Yoga in the Park",
    date: "2024-08-25",
    time: "07:30",
    location: "Golden Gate Park, San Francisco",
    description:
      "Start your day with a refreshing outdoor yoga session. All skill levels welcome. Bring your mat and water bottle!",
    imageUrl:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Wellness",
    coordinates: { lat: 37.7694, lng: -122.4862 },
    going: 30,
  },
  {
    id: "e5",
    name: "Art Exhibition: Modern Visions",
    date: "2024-09-10",
    time: "14:00",
    location: "Museum of Modern Art, New York",
    description:
      "Explore contemporary art from emerging and established artists. A diverse collection of paintings, sculptures, and digital art.",
    imageUrl:
      "https://images.unsplash.com/photo-1501443766828-857b77747fa4?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Art",
    coordinates: { lat: 40.7614, lng: -73.9776 },
    going: 65,
  },
  {
    id: "e6",
    name: "Coding Workshop: Next.js Basics",
    date: "2024-09-15",
    time: "09:00",
    location: "Online (Zoom)",
    description:
      "Learn the fundamentals of Next.js for building modern web applications. This interactive workshop covers routing, data fetching, and deployment.",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Technology",
    coordinates: { lat: 0, lng: 0 }, // Online event, coordinates might be irrelevant
    going: 90,
  },
]

export default function EventDetailPage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<Event | null>(null)
  const [isGoing, setIsGoing] = useState(false)

  useEffect(() => {
    const foundEvent = sampleEvents.find((e) => e.id === eventId)
    setEvent(foundEvent || null)
    // In a real app, you'd check user's RSVP status from backend
    setIsGoing(false) // Default to not going
  }, [eventId])

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Event Not Found</h1>
        <p className="text-gray-600 mt-2">The event you are looking for does not exist.</p>
      </div>
    )
  }

  const handleRsvp = () => {
    setIsGoing(!isGoing)
    // In a real app, send RSVP update to backend
    console.log(`RSVP status for ${event.name}: ${!isGoing ? "Going" : "Not Going"}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.name}
          width={800}
          height={450}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <CardContent className="p-6">
          <CardTitle className="text-4xl font-bold mb-3">{event.name}</CardTitle>
          <CardDescription className="text-lg text-gray-700 mb-4">{event.description}</CardDescription>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="h-5 w-5 mr-2" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <span>{event.going} people going</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={handleRsvp} variant={isGoing ? "outline" : "default"} className="px-8 py-3 text-lg">
              {isGoing ? "Cancel RSVP" : "RSVP Now"}
            </Button>
            <Button variant="secondary" className="px-8 py-3 text-lg">
              <MessageCircle className="h-5 w-5 mr-2" /> Chat about event
            </Button>
          </div>

          <CommentSection eventId={event.id} />
        </CardContent>
      </Card>
    </div>
  )
}
