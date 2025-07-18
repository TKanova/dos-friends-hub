"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Users } from "lucide-react"

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

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/event/${event.id}`} prefetch={false}>
        <Image
          alt={event.name}
          className="w-full h-48 object-cover"
          height={200}
          src={event.imageUrl || "/placeholder.svg"}
          style={{
            aspectRatio: "350/200",
            objectFit: "cover",
          }}
          width={350}
        />
      </Link>
      <CardContent className="p-4 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold mb-2">
          <Link href={`/event/${event.id}`} className="hover:underline" prefetch={false}>
            {event.name}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>
              {event.date} at {event.time}
            </span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.going} going</span>
          </div>
        </div>
        <div className="mt-auto flex justify-end">
          <Button asChild size="sm">
            <Link href={`/event/${event.id}`} prefetch={false}>
              View Details
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
