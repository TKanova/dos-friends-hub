"use client"

import Link from "next/link"
import { MountainIcon } from "lucide-react" // Assuming Lucide React is available

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-semibold">DOS – Friend’s Hub</span>
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/" className="hover:underline" prefetch={false}>
          Home
        </Link>
        <Link href="/create-event" className="hover:underline" prefetch={false}>
          Create Event
        </Link>
        <Link href="/my-rsvps" className="hover:underline" prefetch={false}>
          My RSVPs
        </Link>
        <Link href="/chat" className="hover:underline" prefetch={false}>
          Chat
        </Link>
      </nav>
    </header>
  )
}
