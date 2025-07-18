import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

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
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Link href={`/event/${event.id}`} prefetch={false}>
        <Image
          src={event.imageUrl || "/placeholder.svg"}
          alt={event.name}
          width={400}
          height={225}
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-bold truncate">{event.name}</CardTitle>
        <CardDescription className="text-sm text-gray-600">{event.category}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 text-sm text-gray-700">
        <div className="flex items-center mb-1">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span>{event.date}</span>
        </div>
        <div className="flex items-center mb-1">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center mb-2">
          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
          <span className="truncate">{event.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2 text-gray-500" />
          <span>{event.going} going</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={`/event/${event.id}`} className="w-full" prefetch={false}>
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
