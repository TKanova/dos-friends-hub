"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CityContextType {
  selectedCity: string
  setSelectedCity: (city: string) => void
  cities: string[]
}

const CityContext = createContext<CityContextType | undefined>(undefined)

export function CityProvider({ children }: { children: ReactNode }) {
  const defaultCities = ["Almaty", "Astana", "Shymkent", "Karaganda", "Aktobe"]
  const [selectedCity, setSelectedCity] = useState<string>(() => {
    // Initialize from localStorage on client-side
    if (typeof window !== "undefined") {
      const storedCity = localStorage.getItem("selectedCity")
      return storedCity || defaultCities[0] // Default to Almaty if not found
    }
    return defaultCities[0] // Default for server-side rendering
  })

  useEffect(() => {
    // Persist selected city to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedCity", selectedCity)
    }
  }, [selectedCity])

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities: defaultCities }}>
      {children}
    </CityContext.Provider>
  )
}

export function useCity() {
  const context = useContext(CityContext)
  if (context === undefined) {
    throw new Error("useCity must be used within a CityProvider")
  }
  return context
}
