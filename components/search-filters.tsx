"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  categories: string[]
}

export default function SearchFilters({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <Input
        type="text"
        placeholder="Search events..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-grow"
      />
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
