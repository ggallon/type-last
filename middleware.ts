import { NextResponse } from "next/server"
import { encodeRFC3986URI } from "@/utils/encodeRFC3986URI"
import { siteConfig } from "@/config/site"
import {
  type NextRequestWithAuth,
  withAuth,
} from "@/lib/api-middlewares/with-auth"

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api/|_next/|_static|_vercel|[\\w-]+\\.\\w+).*)",
    "/api/auth/error",
    "/api/auth/signin",
  ],
}

async function middleware(request: NextRequestWithAuth) {
  const domain = request.headers.get("host")
  const pathname = request.nextUrl.pathname

  if (
    domain === `cdn.${siteConfig.domain}` ||
    domain === "cdn.localhost:3000"
  ) {
    if ("/avatar" === pathname) {
      return new Response("", { status: 404 })
    }

    let from = pathname
    if (request.nextUrl.search) {
      from += encodeRFC3986URI(request.nextUrl.search)
    }

    return NextResponse.rewrite(new URL(`/api${from}`, request.url))
  }
}

export default withAuth(middleware, {
  callbacks: {
    async authorized({ req, token }) {
      const pathname = req.nextUrl.pathname
      const appRoutes = ["/account", "/dashboard", "/editor"]

      if (!token && appRoutes.some((route) => pathname.startsWith(route))) {
        return false
      }

      return true
    },
  },
})
