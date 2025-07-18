"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DosMembershipProvider } from "@/contexts/dos-membership-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="DOS – Friend's Hub: Find your perfect DOS for events and connect with like-minded individuals."
        />
        <link rel="apple-touch-icon" href="/oslogo.png" />
        <link rel="manifest" href="/manifest.json" />
        <title>DOS – Friend's Hub</title>
        <meta property="og:title" content="DOS – Friend's Hub" />
        <meta
          property="og:description"
          content="Find your perfect DOS for events and connect with like-minded individuals."
        />
        <meta property="og:image" content="/oslogo.png" />
        <meta property="og:url" content="https://www.dosfriendshub.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DOS – Friend's Hub" />
        <meta
          name="twitter:description"
          content="Find your perfect DOS for events and connect with like-minded individuals."
        />
        <meta name="twitter:image" content="/oslogo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </head>
      <body className={inter.className}>
        <noscript>
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f8d7da",
              color: "#721c24",
              border: "1px solid #f5c6cb",
              borderRadius: "5px",
            }}
          >
            Please enable JavaScript to run this app.
          </div>
        </noscript>
        <div
          id="loading-spinner"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999,
            display: "none",
          }}
        >
          <div
            style={{
              border: "8px solid #f3f3f3",
              borderTop: "8px solid #3498db",
              borderRadius: "50%",
              width: "60px",
              height: "60px",
              animation: "spin 2s linear infinite",
            }}
          ></div>
        </div>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <DosMembershipProvider>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </DosMembershipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
