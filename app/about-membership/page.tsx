"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, MessageCircle } from "lucide-react"
import { useDosMembership } from "@/contexts/dos-membership-context"

export default function AboutMembershipPage() {
  const { becomeMember } = useDosMembership()

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary">Unlock Your Full DOS Experience</h1>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Become a DOS Member and gain access to exclusive features designed to help you connect deeper, enjoy events
          more, and find your perfect match effortlessly.
        </p>
      </div>

      <section className="grid md:grid-cols-2 gap-8 mb-12">
        <Card className="flex flex-col items-center text-center p-6 shadow-lg">
          <CardHeader>
            <Users className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold">Enhanced Matching</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Our advanced algorithm helps you find the most compatible DOS or Doses based on your interests, event
              preferences, and activity.
            </p>
            <ul className="mt-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Personalized DOS recommendations
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Detailed compatibility insights
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Priority access to new matching features
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="flex flex-col items-center text-center p-6 shadow-lg">
          <CardHeader>
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold">Exclusive Forum Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              Participate in private discussions, get early event announcements, and connect directly with event
              organizers and other premium members.
            </p>
            <ul className="mt-4 space-y-2 text-left text-gray-700 dark:text-gray-300">
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Member-only discussion boards
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Direct messaging with potential matches
              </li>
              <li className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> Ad-free browsing experience
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="text-center space-y-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
          Ready to find your best DOS fit?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Becoming a DOS Member is completely free and unlocks a world of enhanced connections and experiences. Join
          today and start your journey!
        </p>
        <Button size="lg" className="text-lg px-8 py-3" onClick={becomeMember}>
          Become a DOS Member - It's Free!
        </Button>
        <p className="text-sm text-gray-500 dark:text-gray-400">No credit card required. Cancel anytime.</p>
      </section>

      <section className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">Still have questions?</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Check out our{" "}
          <Link href="#" className="text-primary hover:underline">
            FAQ
          </Link>{" "}
          or{" "}
          <Link href="#" className="text-primary hover:underline">
            contact support
          </Link>
          .
        </p>
      </section>
    </div>
  )
}
