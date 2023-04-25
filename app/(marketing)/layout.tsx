import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "px-4"
          )}
        >
          Login
        </Link>
      </SiteHeader>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
