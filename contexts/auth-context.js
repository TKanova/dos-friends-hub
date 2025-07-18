"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: true,
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        isAuthenticated: true,
        isLoading: false,
      }
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
        refreshToken: null,
        isAuthenticated: false,
        isLoading: false,
      }
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "UPDATE_VERIFICATION":
      return {
        ...state,
        user: {
          ...state.user,
          is_verified: action.payload.is_verified,
        },
      }
    default:
      return state
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for stored auth data on app load
    const token = localStorage.getItem("access_token")
    const refreshToken = localStorage.getItem("refresh_token")
    const userData = localStorage.getItem("user_data")

    if (token && refreshToken && userData) {
      try {
        const user = JSON.parse(userData)
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            access_token: token,
            refresh_token: refreshToken,
            user: user,
          },
        })
      } catch (error) {
        console.error("Error parsing stored user data:", error)
        logout()
      }
    } else {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }, [])

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Login failed")
      }

      // Store tokens and user data
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      localStorage.setItem("user_data", JSON.stringify(data.user))

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const register = async (username, email, password, confirmPassword) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Registration failed")
      }

      // Store tokens and user data
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("refresh_token", data.refresh_token)
      localStorage.setItem("user_data", JSON.stringify(data.user))

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data,
      })

      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    localStorage.removeItem("user_data")
    dispatch({ type: "LOGOUT" })
  }

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token")
      if (!refreshToken) {
        throw new Error("No refresh token available")
      }

      const response = await fetch("http://localhost:8000/api/auth/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error("Token refresh failed")
      }

      localStorage.setItem("access_token", data.access_token)
      return data.access_token
    } catch (error) {
      logout()
      throw error
    }
  }

  const apiCall = async (url, options = {}) => {
    const token = localStorage.getItem("access_token")

    const config = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    }

    try {
      let response = await fetch(url, config)

      // If token expired, try to refresh
      if (response.status === 401 && token) {
        try {
          const newToken = await refreshAccessToken()
          config.headers.Authorization = `Bearer ${newToken}`
          response = await fetch(url, config)
        } catch (refreshError) {
          logout()
          throw new Error("Session expired. Please login again.")
        }
      }

      return response
    } catch (error) {
      throw error
    }
  }

  const updateVerificationStatus = (isVerified) => {
    dispatch({
      type: "UPDATE_VERIFICATION",
      payload: { is_verified: isVerified },
    })

    // Update localStorage
    if (state.user) {
      const updatedUser = { ...state.user, is_verified: isVerified }
      localStorage.setItem("user_data", JSON.stringify(updatedUser))
    }
  }

  const value = {
    ...state,
    login,
    register,
    logout,
    apiCall,
    updateVerificationStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
