"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import EventCard from "@/components/event-card"
import SearchFilters from "@/components/search-filters"

// Mock data for events
const mockEvents = [
  {
    id: 1,
    title: "Campus Music Festival 2024",
    date: "2024-02-15",
    time: "18:00",
    location: "University Main Quad",
    city: "Los Angeles, CA",
    category: "Music",
    categoryIcon: "🎵",
    description: "Annual music festival featuring local student bands and artists.",
    organizer: "Student Activities Board",
    image: "/placeholder.svg?height=200&width=400",
    rsvpCount: { going: 45, maybe: 12, notGoing: 3 },
  },
  {
    id: 2,
    title: "Tech Workshop: Web Development",
    date: "2024-02-18",
    time: "14:00",
    location: "Computer Science Building",
    city: "San Francisco, CA",
    category: "Education",
    categoryIcon: "📚",
    description: "Learn modern web development techniques with React and Node.js.",
    organizer: "CS Student Association",
    image: "/placeholder.svg?height=200&width=400",
    rsvpCount: { going: 28, maybe: 8, notGoing: 1 },
  },
  {
    id: 3,
    title: "Basketball Tournament",
    date: "2024-02-20",
    time: "16:00",
    location: "Sports Complex",
    city: "Berkeley, CA",
    category: "Sports",
    categoryIcon: "🏀",
    description: "Inter-college basketball championship. Come support your team!",
    organizer: "Athletics Department",
    image: "/placeholder.svg?height=200&width=400",
    rsvpCount: { going: 67, maybe: 15, notGoing: 2 },
  },
]

export default function HomePage() {
  const [events, setEvents] = useState(mockEvents)
  const [filteredEvents, setFilteredEvents] = useState(mockEvents)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((event) => event.category === selectedCategory)
    }

    if (selectedLocation !== "All") {
      filtered = filtered.filter((event) => event.city.includes(selectedLocation))
    }

    setFilteredEvents(filtered)
  }, [searchTerm, selectedCategory, selectedLocation, events])

  const handleRSVP = (eventId, rsvpType) => {
    // This would typically make an API call
    console.log(`RSVP ${rsvpType} for event ${eventId}`)
    // Update local state for demo
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              rsvpCount: {
                ...event.rsvpCount,
                [rsvpType]: event.rsvpCount[rsvpType] + 1,
              },
            }
          : event,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Background Watermark */}
      <div className="relative bg-gradient-to-r from-orange-50 to-white py-12">
        <div className="absolute inset-0 opacity-5">
          <img
            src="/placeholder.svg?height=400&width=400"
            alt="DOS Logo Watermark"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-orange-500">DOS</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Your hub for local youth and student events</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
        />
      </div>

      {/* Events Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} onRSVP={handleRSVP} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
