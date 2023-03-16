import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/ui/button"
import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader mainNavItem={marketingConfig.mainNav}>
        <Link
          href="/login"
          className={cn(buttonVariants({ size: "sm" }), "px-4")}
        >
          Login
        </Link>
      </SiteHeader>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
