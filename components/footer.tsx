"use client"

import Link from "next/link"

import { useDosMembership } from "@/contexts/dos-membership-context"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const { isDosMember, becomeDosMember } = useDosMembership()

  return (
    <footer className="bg-secondary text-secondary-foreground py-6 px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm">&copy; 2024 DOS – Friend’s Hub. All rights reserved.</p>
      {!isDosMember && (
        <Button onClick={becomeDosMember} className="bg-accent text-accent-foreground hover:bg-accent/90">
          Become a DOS Member
        </Button>
      )}
      <nav className="flex gap-4 text-sm">
        <Link href="#" className="hover:underline" prefetch={false}>
          Privacy Policy
        </Link>
        <Link href="#" className="hover:underline" prefetch={false}>
          Terms of Service
        </Link>
      </nav>
    </footer>
  )
}
