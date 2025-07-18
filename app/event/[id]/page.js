"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ChatComponent from "@/components/chat-component"
import { Calendar, MapPin, User, Users } from "lucide-react"

// Mock event data
const mockEventDetails = {
  1: {
    id: 1,
    title: "Campus Music Festival 2024",
    date: "2024-02-15",
    time: "18:00",
    location: "University Main Quad",
    address: "123 University Ave, Los Angeles, CA 90210",
    city: "Los Angeles, CA",
    category: "Music",
    categoryIcon: "🎵",
    description:
      "Join us for the annual Campus Music Festival featuring local student bands, food trucks, and amazing performances. This year's lineup includes indie rock, electronic, and acoustic acts from across the region. Don't miss this incredible night of music and community!",
    organizer: {
      name: "Student Activities Board",
      email: "sab@university.edu",
      phone: "(555) 123-4567",
    },
    image: "/placeholder.svg?height=400&width=800",
    rsvpCount: { going: 45, maybe: 12, notGoing: 3 },
    tags: ["music", "festival", "outdoor", "food", "community"],
  },
}

export default function EventDetailPage() {
  const params = useParams()
  const eventId = Number.parseInt(params.id)
  const [event, setEvent] = useState(null)
  const [userRSVP, setUserRSVP] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent(mockEventDetails[eventId] || null)
      setLoading(false)
    }, 500)
  }, [eventId])

  const handleRSVP = (rsvpType) => {
    setUserRSVP(rsvpType)
    // This would typically make an API call
    console.log(`RSVP ${rsvpType} for event ${eventId}`)
  }

  const getRSVPButtonClass = (type) => {
    const baseClass = "px-6 py-2 rounded-lg font-medium transition-all duration-200 "
    if (userRSVP === type) {
      return baseClass + "bg-teal-500 text-white"
    }
    return baseClass + "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Event Header */}
        <div className="mb-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-6">
            <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4">
              <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <span className="mr-1">{event.categoryIcon}</span>
                {event.category}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <Calendar size={20} className="mr-3" />
              <div>
                <p className="font-medium">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin size={20} className="mr-3" />
              <div>
                <p className="font-medium">{event.location}</p>
                <p className="text-sm">{event.address}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <User size={20} className="mr-3" />
              <div>
                <p className="font-medium">Organized by</p>
                <p className="text-sm">{event.organizer.name}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <Users size={20} className="mr-3" />
              <div>
                <p className="font-medium">
                  {event.rsvpCount.going} going, {event.rsvpCount.maybe} maybe
                </p>
                <p className="text-sm">{event.rsvpCount.notGoing} not going</p>
              </div>
            </div>
          </div>

          {/* RSVP Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => handleRSVP("going")} className={getRSVPButtonClass("going")}>
              I'm Going
            </button>
            <button onClick={() => handleRSVP("maybe")} className={getRSVPButtonClass("maybe")}>
              Maybe
            </button>
            <button onClick={() => handleRSVP("notGoing")} className={getRSVPButtonClass("notGoing")}>
              Not Going
            </button>
          </div>
        </div>

        {/* Event Description */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Event</h2>
          <p className="text-gray-700 leading-relaxed mb-4">{event.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
          <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Map integration would go here (Leaflet/Mapbox)</p>
          </div>
        </div>

        {/* Organizer Info */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Organizer</h2>
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">{event.organizer.name}</h3>
            <p className="text-gray-600 text-sm mb-1">Email: {event.organizer.email}</p>
            <p className="text-gray-600 text-sm">Phone: {event.organizer.phone}</p>
          </div>
        </div>

        {/* Chat Component */}
        <ChatComponent eventId={eventId} />
      </div>

      <Footer />
    </div>
  )
}
