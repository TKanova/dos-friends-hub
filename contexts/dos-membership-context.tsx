"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface DosMembershipContextType {
  isMember: boolean
  becomeMember: () => void
}

const DosMembershipContext = createContext<DosMembershipContextType | undefined>(undefined)

export function DosMembershipProvider({ children }: { children: ReactNode }) {
  const [isMember, setIsMember] = useState(false)

  useEffect(() => {
    // In a real application, you would check for membership status here,
    // e.g., from a cookie, local storage, or a server session.
    // For this example, we'll simulate it.
    const storedMembership = localStorage.getItem("dos_membership")
    if (storedMembership === "true") {
      setIsMember(true)
    }
  }, [])

  const becomeMember = () => {
    setIsMember(true)
    localStorage.setItem("dos_membership", "true")
    // In a real app, you'd likely make an API call here to register the user
    // or update their membership status on the backend.
    console.log("User has become a DOS Member!")
  }

  return <DosMembershipContext.Provider value={{ isMember, becomeMember }}>{children}</DosMembershipContext.Provider>
}

export function useDosMembership() {
  const context = useContext(DosMembershipContext)
  if (context === undefined) {
    throw new Error("useDosMembership must be used within a DosMembershipProvider")
  }
  return context
}
