"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"

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
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{event.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{event.category}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ClockIcon className="h-4 w-4" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPinIcon className="h-4 w-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UsersIcon className="h-4 w-4" />
          <span>{event.going} going</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/event/${event.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
