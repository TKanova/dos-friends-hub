"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, MapPin, Users } from "lucide-react"

export default function EventCard({ event, onRSVP }) {
  const [userRSVP, setUserRSVP] = useState(null)

  const handleRSVP = (rsvpType) => {
    setUserRSVP(rsvpType)
    onRSVP(event.id, rsvpType)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const getRSVPButtonClass = (type) => {
    const baseClass = "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 "
    if (userRSVP === type) {
      return baseClass + "bg-teal-500 text-white"
    }
    return baseClass + "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200">
        <img src={event.image || "/placeholder.svg"} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <span className="mr-1">{event.categoryIcon}</span>
            {event.category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{event.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar size={16} className="mr-2" />
            <span>
              {formatDate(event.date)} at {event.time}
            </span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={16} className="mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <Users size={16} className="mr-2" />
            <span>
              {event.rsvpCount.going} going, {event.rsvpCount.maybe} maybe
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>

        {/* RSVP Buttons */}
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button onClick={() => handleRSVP("going")} className={getRSVPButtonClass("going")}>
              Going
            </button>
            <button onClick={() => handleRSVP("maybe")} className={getRSVPButtonClass("maybe")}>
              Maybe
            </button>
            <button onClick={() => handleRSVP("notGoing")} className={getRSVPButtonClass("notGoing")}>
              Not Going
            </button>
          </div>

          <Link href={`/event/${event.id}`} className="text-orange-500 hover:text-orange-600 text-sm font-medium">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
