import type { Metadata } from "next"
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
