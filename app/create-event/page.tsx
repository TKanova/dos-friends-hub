"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CreateEventPage() {
  const { isDosMember } = useDosMembership()

  if (!isDosMember) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-lg text-muted-foreground mb-6">You need to be a DOS Member to create events.</p>
        <p className="text-md text-muted-foreground mb-6">
          Please click the "Become a DOS Member" button in the footer to gain access.
        </p>
        <Link href="/">
          <Button>Go to Home</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Create New Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div>
              <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                Event Name
              </label>
              <input
                type="text"
                id="eventName"
                name="eventName"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., Summer Music Festival"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="eventTime" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="eventTime"
                name="eventTime"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="eventLocation"
                name="eventLocation"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., Central Park, New York"
                required
              />
            </div>
            <div>
              <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="eventDescription"
                name="eventDescription"
                rows={4}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Tell us more about your event..."
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="eventImage" className="block text-sm font-medium text-gray-700">
                Event Image URL
              </label>
              <input
                type="url"
                id="eventImage"
                name="eventImage"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="e.g., https://example.com/image.jpg"
              />
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
