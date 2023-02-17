import { DashboardConfig } from "types"

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
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
    {
      title: "Billing",
      href: "/account/billing",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/account",
      icon: "settings",
    },
    {
      title: "Teams",
      href: "/account/teams",
      icon: "teams",
    },
  ],
}
