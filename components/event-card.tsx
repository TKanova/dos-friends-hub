import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from "lucide-react"

interface EventCardProps {
  event: {
    id: string
    name: string
    date: string
    time: string
    location: string
    imageUrl: string
    going: number
  }
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image src={event.imageUrl || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{event.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>
            {event.date} at {event.time}
          </span>
        </CardDescription>
        <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{event.location}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{event.going} going</span>
        </div>
        <Link href={`/event/${event.id}`} prefetch={false}>
          <Button
            variant="outline"
            className="bg-transparent text-primary border-primary hover:bg-primary hover:text-primary-foreground"
          >
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
