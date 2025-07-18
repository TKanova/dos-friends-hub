"use client"

import { useState } from "react"
import EventCard from "@/components/event-card"
import SearchFilters from "@/components/search-filters"

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
    description: "An annual music festival featuring various genres and artists.",
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
    description: "Fresh produce, artisanal goods, and local crafts.",
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
    description: "Networking event for tech enthusiasts and professionals.",
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
    description: "Start your day with a refreshing outdoor yoga session.",
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
    description: "Explore contemporary art from emerging and established artists.",
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
    description: "Learn the fundamentals of Next.js for building modern web applications.",
    imageUrl:
      "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Technology",
    coordinates: { lat: 0, lng: 0 }, // Online event, coordinates might be irrelevant
    going: 90,
  },
]

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredEvents = sampleEvents.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ["All", ...new Set(sampleEvents.map((event) => event.category))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Discover Events</h1>
      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
