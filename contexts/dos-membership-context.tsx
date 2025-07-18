"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"

interface DosMembershipContextType {
  isDosMember: boolean
  becomeDosMember: () => void
}

const DosMembershipContext = createContext<DosMembershipContextType | undefined>(undefined)

export const DosMembershipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDosMember, setIsDosMember] = useState(false)

  useEffect(() => {
    // Check local storage for membership status on initial load
    const storedStatus = localStorage.getItem("isDosMember")
    if (storedStatus === "true") {
      setIsDosMember(true)
    }
  }, [])

  const becomeDosMember = useCallback(() => {
    setIsDosMember(true)
    localStorage.setItem("isDosMember", "true")
    // Optionally, you could redirect or show a success message here
    alert("Congratulations! You are now a DOS Member!")
  }, [])

  return (
    <DosMembershipContext.Provider value={{ isDosMember, becomeDosMember }}>{children}</DosMembershipContext.Provider>
  )
}

export const useDosMembership = () => {
  const context = useContext(DosMembershipContext)
  if (context === undefined) {
    throw new Error("useDosMembership must be used within a DosMembershipProvider")
  }
  return context
}
