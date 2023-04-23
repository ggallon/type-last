import type {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server"
import { type JWT, getToken } from "next-auth/jwt"

export type Awaitable<T> = T | PromiseLike<T>

type AuthorizedCallback = (params: {
  token: JWT | null
  req: NextRequest
}) => Awaitable<boolean>

export interface NextAuthMiddlewareOptions {
  callbacks?: {
    /**
     * Callback that receives the user's JWT payload
     * and returns `true` to allow the user to continue.
     *
     * If not it returns `false` instead
     */
    authorized?: AuthorizedCallback
  }
}

async function handleMiddleware(
  req: NextRequest,
  options: NextAuthMiddlewareOptions | undefined = {},
  onSuccess?: (token: JWT | null) => ReturnType<NextMiddleware>
) {
  const { pathname, search, origin, basePath } = req.nextUrl
  const signInPage = "/login"
  const token = await getToken({ req })

  // TODO ?
  // Avoid infinite redirects/invalid response
  // on paths that never require authentication

  // the user is logged in, redirect to the dashboard page
  if (
    !!token &&
    [signInPage, "/signup", "/api/auth/error"].some((page) =>
      pathname.startsWith(page)
    )
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  const isAuthorized =
    (await options?.callbacks?.authorized?.({ req, token })) ?? !!token

  // the user is authorized, let the middleware handle the rest
  if (isAuthorized) return await onSuccess?.(token)

  // the user is not logged in, redirect to the sign-in page
  const signInUrl = new URL(`${basePath}${signInPage}`, origin)
  signInUrl.searchParams.append(
    "callbackUrl",
    `${basePath}${pathname}${search}`
  )
  return NextResponse.redirect(signInUrl)
}

export interface NextRequestWithAuth extends NextRequest {
  nextauth: { token: JWT | null }
}

export type NextMiddlewareWithAuth = (
  request: NextRequestWithAuth,
  event: NextFetchEvent
) => ReturnType<NextMiddleware>

export type WithAuthArgs =
  | [NextRequestWithAuth]
  | [NextRequestWithAuth, NextFetchEvent]
  | [NextRequestWithAuth, NextAuthMiddlewareOptions]
  | [NextMiddlewareWithAuth]
  | [NextMiddlewareWithAuth, NextAuthMiddlewareOptions]
  | [NextAuthMiddlewareOptions]
  | []

export function withAuth(...args: WithAuthArgs) {
  if (!args.length || args[0] instanceof Request) {
    // @ts-expect-error
    return handleMiddleware(...args)
  }

  if (typeof args[0] === "function") {
    const middleware = args[0]
    const options = args[1] as NextAuthMiddlewareOptions | undefined
    return async (...args: Parameters<NextMiddlewareWithAuth>) =>
      await handleMiddleware(args[0], options, async (token) => {
        args[0].nextauth = { token }
        return await middleware(...args)
      })
  }

  const options = args[0]
  return async (...args: Parameters<NextMiddleware>) =>
    await handleMiddleware(args[0], options)
}
