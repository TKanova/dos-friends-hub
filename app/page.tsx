"use client"

import { useState } from "react"
import Image from "next/image"
import EventCard from "@/components/event-card"
import SearchFilters from "@/components/search-filters"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Rocket, Users, MessageCircle, HeartHandshake } from "lucide-react" // Icons for reasons
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

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

const sponsorLogos = [
  "https://images.unsplash.com/photo-1517292987717-0639cd99475f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Abstract tech logo
  "https://images.unsplash.com/photo-1517032207800-b82070f01700?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Modern design logo
  "https://images.unsplash.com/photo-1517292987717-0639cd99475f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Geometric logo
  "https://images.unsplash.com/photo-1517032207800-b82070f01700?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Minimalist logo
  "https://images.unsplash.com/photo-1517292987717-0639cd99475f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Dynamic logo
  "https://images.unsplash.com/photo-1517032207800-b82070f01700?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Clean logo
  "https://images.unsplash.com/photo-1517292987717-0639cd99475f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Abstract shape logo
  "https://images.unsplash.com/photo-1517032207800-b82070f01700?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Simple icon logo
  "https://images.unsplash.com/photo-1517292987717-0639cd99475f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Intersecting lines logo
  "https://images.unsplash.com/photo-1517032207800-b82070f01700?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Circular logo
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
    <div className="container w-full mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 mb-12 p-8 rounded-lg bg-gradient-to-br from-background to-muted shadow-lg max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold text-primary">Welcome DOS</h1>
        <p className="text-xl text-black max-w-2xl mx-auto">
          Find a dos or doses to enjoy events together. Comment, choose, visit on events and we'll match you with best
          partner for the fun - or browse it for yourself!
        </p>
        <p className="text-lg text-gray-600">Choose from over 1,100 active events in our country</p>
      </div>

      {/* Sponsor Logos Carousel */}
      <div className="relative w-full overflow-hidden py-8 mb-12">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2500,
              stopOnInteraction: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="flex items-center">
            {sponsorLogos.map((logo, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/5 flex justify-center">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt={`Sponsor Logo ${index + 1}`}
                  width={120}
                  height={40}
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Why find your best DOS fit? Section */}
      <section className="py-12 bg-secondary text-secondary-foreground rounded-lg mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Why find your best DOS fit?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="flex flex-col items-center space-y-4 p-6 bg-secondary/80 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-semibold">Connect Deeper</h3>
              <p className="text-center text-lg">
                Find like-minded individuals who share your passions and interests for events.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-secondary/80 rounded-lg shadow-md">
              <HeartHandshake className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-semibold">Enhanced Experiences</h3>
              <p className="text-center text-lg">
                Enjoy events more with a compatible partner, making every moment memorable.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 p-6 bg-secondary/80 rounded-lg shadow-md">
              <Rocket className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-semibold">Effortless Matching</h3>
              <p className="text-center text-lg">Our system helps you find your ideal DOS, so you can focus on fun.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to find the right DOS Section */}
      <section className="py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">How to find the right DOS</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-lg shadow-md">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-semibold">Get matched</h3>
              <p className="text-center text-muted-foreground">
                Tell us a bit about yourself and be active in the comments! We'll recommend you to your best fit.
              </p>
              <Link href="/about-membership" prefetch={false}>
                <Button variant="link" className="text-primary hover:underline">
                  Get matched →
                </Button>
              </Link>
            </div>
            <div className="flex flex-col items-center space-y-4 p-8 bg-card rounded-lg shadow-md">
              <MessageCircle className="h-12 w-12 text-primary" />
              <h3 className="text-2xl font-semibold">Browse forum</h3>
              <p className="text-center text-muted-foreground">
                Explore our Friends' Forum - you can filter by categories and join discussions.
              </p>
              <Link href="/chat" prefetch={false}>
                <Button variant="link" className="text-primary hover:underline">
                  Browse forum →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Discover Events Section */}
      <div className="max-w-6xl mx-auto">
        {" "}
        {/* Wrapper for centering */}
        <h2 className="text-3xl font-bold mb-6 text-center">Discover Events</h2>
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
    </div>
  )
}
