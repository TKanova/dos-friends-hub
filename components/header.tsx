"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Header() {
  const pathname = usePathname()
  const nav = [
    { href: "/", label: "Home" },
    { href: "/create-event", label: "Create Event" },
    { href: "/my-rsvps", label: "My RSVPs" },
    { href: "/chat", label: "Chat" },
  ]

  return (
    <header className="border-b bg-primary text-primary-foreground">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image src="/oslogo.png" alt="DOS Friends' Hub Logo" width={40} height={40} className="rounded-md" />
          <span className="font-bold text-xl">DOS Hub</span>
        </Link>

        <nav className="hidden sm:flex gap-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`hover:underline ${pathname === n.href ? "font-semibold" : ""}`}
              prefetch={false}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/about-membership" prefetch={false}>
          <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Get started - it's free
          </Button>
        </Link>
      </div>
    </header>
  )
}
