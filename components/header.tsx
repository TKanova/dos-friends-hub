"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useDosMembership } from "@/contexts/dos-membership-context"
import Image from "next/image"
import { CitySelector } from "@/components/city-selector"

export function Header() {
  const { isMember } = useDosMembership()

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 border-b bg-background">
      <Link className="flex items-center gap-2" href="/" prefetch={false}>
        <Image src="/oslogo.png" alt="DOS Friends' Hub Logo" width={70} height={28} className="rounded-md" />
        <span className="sr-only">DOS Friends' Hub</span>
      </Link>
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
        <Link className="hover:underline underline-offset-4" href="/" prefetch={false}>
          Home
        </Link>
        <Link className="hover:underline underline-offset-4" href="/create-event" prefetch={false}>
          Create Event
        </Link>
        <Link className="hover:underline underline-offset-4" href="/my-rsvps" prefetch={false}>
          My RSVPs
        </Link>
        <Link className="hover:underline underline-offset-4" href="/chat" prefetch={false}>
          Chat
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden md:block">
          <CitySelector />
        </div>
        <Button asChild className="hidden md:inline-flex">
          <Link href="/about-membership" prefetch={false}>
            Get started - it's free
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button className="md:hidden bg-transparent" size="icon" variant="outline">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 p-4">
              <CitySelector /> {/* City selector for mobile */}
              <Link className="hover:underline underline-offset-4" href="/" prefetch={false}>
                Home
              </Link>
              <Link className="hover:underline underline-offset-4" href="/create-event" prefetch={false}>
                Create Event
              </Link>
              <Link className="hover:underline underline-offset-4" href="/my-rsvps" prefetch={false}>
                My RSVPs
              </Link>
              <Link className="hover:underline underline-offset-4" href="/chat" prefetch={false}>
                Chat
              </Link>
              <Button asChild>
                <Link href="/about-membership" prefetch={false}>
                  Get started - it's free
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
