import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Aditya Nair's Portfolio",
  description: "Full Stack Developer | React, Next.js, Node.js | Building scalable web applications",
  keywords: ["Aditya Nair", "Full Stack Developer", "React", "Next.js", "Node.js", "Portfolio", "Web Developer"],
  authors: [{ name: "Aditya Nair" }],
  creator: "Aditya Nair",
  openGraph: {
    title: "Aditya Nair's Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies",
    url: "https://adityanair.dev",
    siteName: "Aditya Nair's Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Nair's Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies",
  },
    generator: 'Next.js'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
