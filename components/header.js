"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "./auth/auth-modal"
import EmailVerificationBanner from "./auth/email-verification-banner"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState("login")

  const { user, isAuthenticated, logout } = useAuth()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Create Event", href: "/create-event" },
    { name: "My RSVPs", href: "/my-rsvps" },
    { name: "Chat", href: "/chat" },
  ]

  const handleLogin = () => {
    setAuthMode("login")
    setAuthModalOpen(true)
  }

  const handleRegister = () => {
    setAuthMode("register")
    setAuthModalOpen(true)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <img src="/placeholder.svg?height=40&width=40" alt="DOS Logo" className="h-10 w-10" />
              <span className="text-2xl font-bold text-gray-900">
                DOS <span className="text-orange-500">Friend's Hub</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}

              {/* Auth Buttons */}
              <div className="flex items-center space-x-4">
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700">Welcome, {user?.username}!</span>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors duration-200"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Auth Buttons */}
                {!isAuthenticated ? (
                  <>
                    <button
                      onClick={handleLogin}
                      className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </button>
                    <button
                      onClick={handleRegister}
                      className="bg-orange-500 text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-orange-600 transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-base font-medium hover:bg-gray-200 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Logout
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
        {/* Auth Modal */}
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialMode={authMode} />
      </header>
      <EmailVerificationBanner />
    </>
  )
}
