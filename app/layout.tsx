import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@/components/analytics"
import { Help } from "@/components/help"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn(fontSans.variable, "antialiased")}>
      <head />
      <body className="min-h-screen bg-background font-sans">
        {children}
        <Analytics />
        {process.env.NODE_ENV === "production" && <Help />}
        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
