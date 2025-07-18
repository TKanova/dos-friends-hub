import { notFound } from "next/navigation"
import Image from "next/image"
import { Calendar, MapPin, Users, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
      "An annual music festival featuring various genres and artists. Enjoy live performances, food trucks, and a vibrant atmosphere under the summer sky. Bring your friends and family for an unforgettable experience!",
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
      "Fresh produce, artisanal goods, and local crafts. Support local farmers and small businesses while enjoying a lively community atmosphere. Perfect for a morning stroll.",
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
      "Networking event for tech enthusiasts and professionals. Discuss the latest trends in AI, blockchain, and software development. Opportunities for collaboration and learning.",
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
      "Start your day with a refreshing outdoor yoga session. All skill levels welcome. Bring your mat and water bottle. A perfect way to find peace and rejuvenate.",
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
      "Explore contemporary art from emerging and established artists. A diverse collection of paintings, sculptures, and digital art. Guided tours available.",
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
      "Learn the fundamentals of Next.js for building modern web applications. This interactive workshop covers routing, data fetching, and component creation. Basic JavaScript knowledge recommended.",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Technology",
    coordinates: { lat: 0, lng: 0 }, // Online event, coordinates might be irrelevant
    going: 90,
  },
]

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const event = sampleEvents.find((e) => e.id === params.id)

  if (!event) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="relative w-full h-80 rounded-lg overflow-hidden">
            <Image src={event.imageUrl || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
          </div>
          <h1 className="text-4xl font-bold">{event.name}</h1>
          <p className="text-lg text-muted-foreground">{event.description}</p>

          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary" />
                <span>
                  {event.date} at {event.time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span>{event.going} people going</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-primary" />
                <span>
                  Coordinates: {event.coordinates.lat}, {event.coordinates.lng}
                </span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">RSVP Now</Button>
        </div>

        <div>
          <CommentSection eventId={event.id} />
        </div>
      </div>
    </div>
  )
}
