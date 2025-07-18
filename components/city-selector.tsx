"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCity } from "@/contexts/city-context"
import { MapPin } from "lucide-react"

export function CitySelector() {
  const { selectedCity, setSelectedCity, cities } = useCity()

  return (
    <div className="flex items-center gap-2">
      <MapPin className="h-5 w-5 text-gray-500" />
      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger className="w-[150px] h-9">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city} value={city}>
              {city}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
