"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"

interface RSVP {
  id: string
  eventName: string
  eventDate: string
  eventTime: string
  eventLocation: string
  imageUrl: string
  status: "Going" | "Maybe" | "Not Going"
  attendees: number
}

const sampleRSVPs: RSVP[] = [
  {
    id: "r1",
    eventName: "Summer Music Festival",
    eventDate: "2024-08-15",
    eventTime: "18:00",
    eventLocation: "Central Park, New York",
    imageUrl:
      "https://images.unsplash.com/photo-1514525253164-ff44ce820118?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Going",
    attendees: 120,
  },
  {
    id: "r2",
    eventName: "Local Farmers Market",
    eventDate: "2024-08-20",
    eventTime: "09:00",
    eventLocation: "Union Square, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1587054867758-a405ad471937?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Maybe",
    attendees: 50,
  },
  {
    id: "r3",
    eventName: "Tech Innovators Meetup",
    eventDate: "2024-09-01",
    eventTime: "10:00",
    eventLocation: "Innovation Hub, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1556761175-5974ddf47dc3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Going",
    attendees: 80,
  },
  {
    id: "r4",
    eventName: "Yoga in the Park",
    eventDate: "2024-08-25",
    eventTime: "07:30",
    eventLocation: "Golden Gate Park, San Francisco",
    imageUrl:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    status: "Not Going",
    attendees: 30,
  },
]

export default function MyRsvpsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("All")

  const filteredRSVPs = sampleRSVPs.filter((rsvp) => {
    const matchesSearch =
      rsvp.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rsvp.eventLocation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "All" || rsvp.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">My RSVPs</h1>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="text"
            placeholder="Search RSVPs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant={filterStatus === "All" ? "default" : "outline"} onClick={() => setFilterStatus("All")}>
            All
          </Button>
          <Button variant={filterStatus === "Going" ? "default" : "outline"} onClick={() => setFilterStatus("Going")}>
            Going
          </Button>
          <Button variant={filterStatus === "Maybe" ? "default" : "outline"} onClick={() => setFilterStatus("Maybe")}>
            Maybe
          </Button>
          <Button
            variant={filterStatus === "Not Going" ? "default" : "outline"}
            onClick={() => setFilterStatus("Not Going")}
          >
            Not Going
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRSVPs.length > 0 ? (
          filteredRSVPs.map((rsvp) => (
            <Card key={rsvp.id} className="overflow-hidden">
              <Image
                src={rsvp.imageUrl || "/placeholder.svg"}
                alt={rsvp.eventName}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4">
                <CardTitle className="text-xl font-bold mb-2">{rsvp.eventName}</CardTitle>
                <CardDescription className="flex items-center text-gray-600 mb-1">
                  <Calendar className="h-4 w-4 mr-2" /> {rsvp.eventDate} at {rsvp.eventTime}
                </CardDescription>
                <CardDescription className="flex items-center text-gray-600 mb-2">
                  <MapPin className="h-4 w-4 mr-2" /> {rsvp.eventLocation}
                </CardDescription>
                <div className="flex items-center justify-between text-sm text-gray-700">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      rsvp.status === "Going"
                        ? "bg-green-500"
                        : rsvp.status === "Maybe"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  >
                    {rsvp.status}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" /> {rsvp.attendees} going
                  </span>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  View Event Details
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No RSVPs found matching your criteria.</p>
        )}
      </div>
    </div>
  )
}
