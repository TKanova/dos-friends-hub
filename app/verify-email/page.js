"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CheckCircle, XCircle, RefreshCw, Mail } from "lucide-react"

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState("verifying") // verifying, success, error
  const [message, setMessage] = useState("")
  const [isResending, setIsResending] = useState(false)

  const token = searchParams.get("token")

  useEffect(() => {
    if (!token) {
      setStatus("error")
      setMessage("Invalid verification link. Please check your email for the correct link.")
      return
    }

    verifyEmail(token)
  }, [token])

  const verifyEmail = async (verificationToken) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: verificationToken }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus("success")
        setMessage(data.message)
        // Redirect to home page after 3 seconds
        setTimeout(() => {
          router.push("/")
        }, 3000)
      } else {
        setStatus("error")
        setMessage(data.detail || "Verification failed. Please try again.")
      }
    } catch (error) {
      setStatus("error")
      setMessage("Network error. Please check your connection and try again.")
    }
  }

  const handleResendVerification = async () => {
    const email = prompt("Please enter your email address to resend verification:")
    if (!email) return

    setIsResending(true)
    try {
      const response = await fetch("http://localhost:8000/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("New verification email sent! Please check your inbox.")
      } else {
        setMessage(data.detail || "Failed to resend verification email.")
      }
    } catch (error) {
      setMessage("Network error. Please try again later.")
    } finally {
      setIsResending(false)
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "verifying":
        return <RefreshCw className="animate-spin text-orange-500" size={48} />
      case "success":
        return <CheckCircle className="text-green-500" size={48} />
      case "error":
        return <XCircle className="text-red-500" size={48} />
      default:
        return null
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "verifying":
        return "text-orange-600"
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-md mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <div className="mb-6">{getStatusIcon()}</div>

          <h1 className={`text-2xl font-bold mb-4 ${getStatusColor()}`}>
            {status === "verifying" && "Verifying Your Email..."}
            {status === "success" && "Email Verified Successfully!"}
            {status === "error" && "Verification Failed"}
          </h1>

          <p className="text-gray-600 mb-6">{message}</p>

          {status === "success" && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  🎉 Welcome to DOS Friend's Hub! You can now access all features including creating events, RSVPing,
                  and chatting with the community.
                </p>
              </div>
              <p className="text-sm text-gray-500">Redirecting you to the homepage in a few seconds...</p>
              <button
                onClick={() => router.push("/")}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
              >
                Go to Homepage Now
              </button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 text-sm">
                  The verification link may have expired or is invalid. You can request a new verification email below.
                </p>
              </div>
              <button
                onClick={handleResendVerification}
                disabled={isResending}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={16} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={16} className="mr-2" />
                    Resend Verification Email
                  </>
                )}
              </button>
            </div>
          )}

          {status === "verifying" && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-800 text-sm">Please wait while we verify your email address...</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
