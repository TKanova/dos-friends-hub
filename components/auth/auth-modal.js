"use client"

import { useState } from "react"
import { X } from "lucide-react"
import LoginForm from "./login-form"
import RegisterForm from "./register-form"

export default function AuthModal({ isOpen, onClose, initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-900">{mode === "login" ? "Sign In" : "Sign Up"}</h1>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {mode === "login" ? (
            <LoginForm onSwitchToRegister={() => setMode("register")} onClose={onClose} />
          ) : (
            <RegisterForm onSwitchToLogin={() => setMode("login")} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  )
}
