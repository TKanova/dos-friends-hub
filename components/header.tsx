"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useDosMembership } from "@/contexts/dos-membership-context"
import Image from "next/image"

export function Header() {
  const { isMember, becomeMember } = useDosMembership()

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-background border-b">
      <Link href="/" className="flex items-center justify-center" prefetch={false}>
        <Image src="/oslogo.png" alt="DOS Logo" width={32} height={32} className="h-8 w-8" />
        <span className="sr-only">DOS – Friend's Hub</span>
      </Link>
      <nav className="flex gap-4 sm:gap-6">
        <Link href="/create-event" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Create Event
        </Link>
        <Link href="/my-rsvps" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          My RSVPs
        </Link>
        <Link href="/chat" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Chat
        </Link>
      </nav>
      {!isMember && (
        <Link href="/about-membership" prefetch={false}>
          <Button variant="default">Get started - it's free</Button>
        </Link>
      )}
    </header>
  )
}
