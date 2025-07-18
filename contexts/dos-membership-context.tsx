"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface DosMembershipContextType {
  isDosMember: boolean
  becomeDosMember: () => void
}

const DosMembershipContext = createContext<DosMembershipContextType | undefined>(undefined)

export const DosMembershipProvider = ({ children }: { children: ReactNode }) => {
  const [isDosMember, setIsDosMember] = useState(false)

  useEffect(() => {
    // Check local storage for membership status on mount
    const memberStatus = localStorage.getItem("isDosMember")
    if (memberStatus === "true") {
      setIsDosMember(true)
    }
  }, [])

  const becomeDosMember = () => {
    setIsDosMember(true)
    localStorage.setItem("isDosMember", "true")
    // Optionally, redirect or show a success message
    alert("Congratulations! You are now a DOS Member.")
  }

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
