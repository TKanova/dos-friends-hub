"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Mail, X, RefreshCw, CheckCircle } from "lucide-react"

export default function EmailVerificationBanner() {
  const { user, apiCall } = useAuth()
  const [isResending, setIsResending] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (!user || user.is_verified || isDismissed) {
    return null
  }

  const handleResendVerification = async () => {
    setIsResending(true)
    try {
      const response = await fetch("http://localhost:8000/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      })

      if (response.ok) {
        setResendSuccess(true)
        setTimeout(() => setResendSuccess(false), 5000)
      } else {
        const errorData = await response.json()
        console.error("Error resending verification:", errorData)
      }
    } catch (error) {
      console.error("Error resending verification:", error)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Mail className="text-orange-400 mr-3" size={20} />
          <div>
            <p className="text-sm font-medium text-orange-800">Please verify your email address</p>
            <p className="text-sm text-orange-700">
              Check your inbox for a verification link. Didn't receive it?{" "}
              {resendSuccess ? (
                <span className="inline-flex items-center text-green-600">
                  <CheckCircle size={14} className="mr-1" />
                  Verification email sent!
                </span>
              ) : (
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="font-medium underline hover:text-orange-600 disabled:opacity-50 inline-flex items-center"
                >
                  {isResending ? (
                    <>
                      <RefreshCw size={14} className="mr-1 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Resend verification email"
                  )}
                </button>
              )}
            </p>
          </div>
        </div>
        <button onClick={() => setIsDismissed(true)} className="text-orange-400 hover:text-orange-600">
          <X size={20} />
        </button>
      </div>
    </div>
  )
}
