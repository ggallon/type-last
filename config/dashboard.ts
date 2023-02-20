import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Pages",
      href: "/",
      icon: "page",
      disabled: true,
    },
    {
      title: "Media",
      href: "/",
      icon: "media",
      disabled: true,
    },
  ],
  accountSidebarNav: [
    {
      title: "General",
      href: "/account",
      icon: "settings",
    },
    {
      title: "Billing",
      href: "/account/billing",
      icon: "billing",
    },
    {
      title: "Teams",
      href: "/account/teams",
      icon: "teams",
    },
  ],
}
