"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, ClockIcon, MapPinIcon, ImagePlusIcon, TagIcon } from "lucide-react"

export default function CreateEventPage() {
  const [eventName, setEventName] = useState("")
  const [eventDate, setEventDate] = useState("")
  const [eventTime, setEventTime] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventDescription, setEventDescription] = useState("")
  const [eventImage, setEventImage] = useState<File | null>(null)
  const [eventCategory, setEventCategory] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle event creation logic here
    console.log({
      eventName,
      eventDate,
      eventTime,
      eventLocation,
      eventDescription,
      eventImage,
      eventCategory,
    })
    alert("Event created successfully (simulated)!")
    // Reset form
    setEventName("")
    setEventDate("")
    setEventTime("")
    setEventLocation("")
    setEventDescription("")
    setEventImage(null)
    setEventCategory("")
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEventImage(e.target.files[0])
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="eventName">Event Name</Label>
              <Input
                id="eventName"
                type="text"
                placeholder="e.g., Summer Music Festival"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="eventDate">Date</Label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="eventDate"
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventTime">Time</Label>
                <div className="relative">
                  <ClockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="eventTime"
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="pl-9"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventLocation">Location</Label>
              <div className="relative">
                <MapPinIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="eventLocation"
                  type="text"
                  placeholder="e.g., Central Park, New York"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventCategory">Category</Label>
              <div className="relative">
                <TagIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="eventCategory"
                  type="text"
                  placeholder="e.g., Music, Technology, Community"
                  value={eventCategory}
                  onChange={(e) => setEventCategory(e.target.value)}
                  className="pl-9"
                  required
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventDescription">Description</Label>
              <Textarea
                id="eventDescription"
                placeholder="Tell us more about your event..."
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                rows={5}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="eventImage">Event Image</Label>
              <div className="relative">
                <ImagePlusIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  id="eventImage"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="pl-9 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                />
              </div>
              {eventImage && <p className="text-sm text-gray-500 mt-2">Selected file: {eventImage.name}</p>}
            </div>
            <Button type="submit" className="w-full">
              Create Event
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
