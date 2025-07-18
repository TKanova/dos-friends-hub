"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="flex flex-col py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-background">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold text-balance">Company</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            About Us
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Our Team
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Careers
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            News
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold text-balance">Product</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Features
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Pricing
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Integrations
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Security
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold text-balance">Resources</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Blog
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Help Center
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Tutorials
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            FAQs
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold text-balance">Legal</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Privacy Policy
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Terms of Service
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Cookie Policy
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold text-balance">Contact</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Support
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Sales
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400 break-words" href="#">
            Partnerships
          </Link>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="container max-w-7xl flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <p className="text-xs text-gray-500 dark:text-gray-400 break-words">
          © 2024 DOS Friends' Hub. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 break-words" href="#" prefetch={false}>
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 break-words" href="#" prefetch={false}>
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 break-words" href="#" prefetch={false}>
            Contact
          </Link>
        </nav>
        <div className="flex gap-4 mt-4 sm:mt-0">
          <Link className="hover:text-gray-900 dark:hover:text-gray-50" href="#">
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link className="hover:text-gray-900 dark:hover:text-gray-50" href="#">
            <Facebook className="h-5 w-5" />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link className="hover:text-gray-900 dark:hover:text-gray-50" href="#">
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
