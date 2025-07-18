"use client"

import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-100 p-6 md:py-12 w-full dark:bg-gray-800">
      <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
        <div className="grid gap-1">
          <h3 className="font-semibold">Company</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            About Us
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Our Team
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Careers
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            News
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Product</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Features
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Pricing
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Integrations
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Security
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Resources</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Blog
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Help Center
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Tutorials
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            FAQs
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Legal</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Privacy Policy
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Terms of Service
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Cookie Policy
          </Link>
        </div>
        <div className="grid gap-1">
          <h3 className="font-semibold">Contact</h3>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Support
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Sales
          </Link>
          <Link className="text-gray-600 hover:underline dark:text-gray-400" href="#">
            Partnerships
          </Link>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="container max-w-7xl flex flex-col sm:flex-row items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <p>© 2024 DOS – Friend's Hub. All rights reserved.</p>
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
