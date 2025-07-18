"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Calendar, MapPin, Edit3 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

export default function MyRSVPsPage() {
  const { apiCall } = useAuth()
  const [rsvps, setRSVPs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        const response = await apiCall("http://localhost:8000/api/rsvps/my")
        if (response.ok) {
          const data = await response.json()
          setRSVPs(data)
        }
      } catch (error) {
        console.error("Error fetching RSVPs:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchRSVPs()
  }, [apiCall])

  const handleStatusChange = async (eventId, newStatus) => {
    try {
      const response = await apiCall("http://localhost:8000/api/rsvps", {
        method: "POST",
        body: JSON.stringify({
          event_id: eventId,
          status: newStatus,
        }),
      })

      if (response.ok) {
        // Update local state
        setRSVPs((prevRSVPs) =>
          prevRSVPs.map((rsvp) => (rsvp.event.id === eventId ? { ...rsvp, status: newStatus } : rsvp)),
        )
      }
    } catch (error) {
      console.error("Error updating RSVP:", error)
    }
  }

  const filteredRSVPs = rsvps.filter((rsvp) => {
    if (filter === "all") return true
    return rsvp.status === filter
  })

  const getStatusBadge = (status) => {
    const badges = {
      going: "bg-green-100 text-green-800",
      maybe: "bg-yellow-100 text-yellow-800",
      notGoing: "bg-red-100 text-red-800",
    }
    const labels = {
      going: "Going",
      maybe: "Maybe",
      notGoing: "Not Going",
    }

    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badges[status]}`}>{labels[status]}</span>
  }

  const getStatusButtonClass = (status, currentStatus) => {
    const baseClass = "px-3 py-1 rounded text-xs font-medium transition-colors duration-200 "
    if (status === currentStatus) {
      return baseClass + "bg-teal-500 text-white"
    }
    return baseClass + "bg-gray-100 text-gray-700 hover:bg-teal-100 hover:text-teal-700"
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">My RSVPs</h1>
              <p className="text-gray-600">Manage your event responses and stay updated</p>
            </div>

            {/* Filter Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { key: "all", label: "All Events" },
                    { key: "going", label: "Going" },
                    { key: "maybe", label: "Maybe" },
                    { key: "notGoing", label: "Not Going" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setFilter(tab.key)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        filter === tab.key
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* RSVP List */}
            <div className="space-y-4">
              {filteredRSVPs.map((rsvp) => (
                <div key={rsvp.event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    {/* Event Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={rsvp.event.image || "/placeholder.svg"}
                        alt={rsvp.event.title}
                        className="w-full md:w-32 h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Event Details */}
                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{rsvp.event.title}</h3>
                          <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium">
                            {rsvp.event.categoryIcon} {rsvp.event.category}
                          </span>
                        </div>
                        {getStatusBadge(rsvp.status)}
                      </div>

                      <div className="space-y-1 mb-4">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {new Date(rsvp.event.date).toLocaleDateString("en-US", {
                              weekday: "short",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at {rsvp.event.time}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin size={16} className="mr-2" />
                          <span>{rsvp.event.location}</span>
                        </div>
                      </div>

                      {/* RSVP Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleStatusChange(rsvp.event.id, "going")}
                            className={getStatusButtonClass("going", rsvp.status)}
                          >
                            Going
                          </button>
                          <button
                            onClick={() => handleStatusChange(rsvp.event.id, "maybe")}
                            className={getStatusButtonClass("maybe", rsvp.status)}
                          >
                            Maybe
                          </button>
                          <button
                            onClick={() => handleStatusChange(rsvp.event.id, "notGoing")}
                            className={getStatusButtonClass("notGoing", rsvp.status)}
                          >
                            Not Going
                          </button>
                        </div>

                        <div className="flex items-center space-x-4">
                          <span className="text-xs text-gray-500">
                            RSVP'd on {new Date(rsvp.rsvpDate).toLocaleDateString()}
                          </span>
                          <button className="text-orange-500 hover:text-orange-600 text-sm font-medium flex items-center">
                            <Edit3 size={14} className="mr-1" />
                            View Event
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredRSVPs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No RSVPs found for the selected filter.</p>
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </ProtectedRoute>
  )
}
