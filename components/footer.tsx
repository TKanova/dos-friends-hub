"use client"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MountainIcon } from "lucide-react"

export default function Footer() {
  const { isDosMember, becomeDosMember } = useDosMembership()

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 px-6 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <MountainIcon className="h-6 w-6" />
            <span className="text-lg font-semibold">DOS – Friend’s Hub</span>
          </Link>
          <p className="text-sm">Connecting friends through unforgettable events.</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <Link href="/" className="hover:underline" prefetch={false}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/create-event" className="hover:underline" prefetch={false}>
                Create Event
              </Link>
            </li>
            <li>
              <Link href="/my-rsvps" className="hover:underline" prefetch={false}>
                My RSVPs
              </Link>
            </li>
            <li>
              <Link href="/chat" className="hover:underline" prefetch={false}>
                Chat
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">Become a DOS Member</h3>
          <p className="text-sm">Unlock full features like commenting, RSVPs, and chat access.</p>
          {!isDosMember && (
            <Button onClick={becomeDosMember} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Get Started - It's Free!
            </Button>
          )}
          {isDosMember && <p className="text-sm text-green-300">You are already a DOS Member!</p>}
        </div>
      </div>
      <div className="border-t border-secondary-foreground/20 mt-8 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} DOS – Friend’s Hub. All rights reserved.
      </div>
    </footer>
  )
}
