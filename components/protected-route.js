"use client"

import { useAuth } from "@/contexts/auth-context"
import { useEffect, useState } from "react"
import AuthModal from "./auth/auth-modal"
import { Mail } from "lucide-react"

export default function ProtectedRoute({ children, fallback = null }) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowAuthModal(true)
    }
  }, [isAuthenticated, isLoading])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <>
        {fallback || (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access this page.</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
            >
              Sign In
            </button>
          </div>
        )}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} initialMode="login" />
      </>
    )
  }

  if (user && !user.is_verified) {
    return (
      <>
        <div className="text-center py-12">
          <Mail className="mx-auto text-orange-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verification Required</h2>
          <p className="text-gray-600 mb-6">
            Please check your email and click the verification link to access this feature.
          </p>
          <p className="text-sm text-gray-500">Didn't receive the email? Check your spam folder or contact support.</p>
        </div>
      </>
    )
  }

  return children
}
