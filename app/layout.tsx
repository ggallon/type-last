import { Inter as FontSans } from "next/font/google"
import { Analytics } from "@/components/analytics"
import { Help } from "@/components/help"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { Toaster } from "@/ui/toast"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import "@/styles/globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={cn("antialiased", fontSans.variable)}>
      <head />
      <body className="min-h-screen bg-white font-sans text-slate-900 dark:bg-slate-900 dark:text-slate-50">
        {children}
        <Analytics />
        {process.env.NODE_ENV === "production" && <Help />}
        <Toaster position="bottom-right" />
        <TailwindIndicator />
      </body>
    </html>
  )
}
