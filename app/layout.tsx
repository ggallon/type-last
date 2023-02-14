import { Inter as FontSans } from "@next/font/google"

import { Analytics } from "@/components/analytics"
import { Help } from "@/components/help"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { cn } from "@/lib/utils"
import { Toaster } from "@/ui/toast"

import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: {
    default: "Proactice",
    template: "%s | Proactice",
  },
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-white font-sans text-slate-900 antialiased",
        fontSans.variable
      )}
    >
      <head />
      <body className="min-h-screen">
        {children}
        <Analytics />
        {process.env.NODE_ENV === "production" && <Help />}
        <Toaster position="bottom-right" />
        <TailwindIndicator />
      </body>
    </html>
  )
}
