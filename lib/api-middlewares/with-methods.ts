import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"
import type { NextRequest, NextResponse } from "next/server"

export type HTTP_METHODS =
  | "OPTIONS"
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"

const checkMethods = (allowedMethods: HTTP_METHODS[]) =>
  allowedMethods.includes("OPTIONS")
    ? allowedMethods
    : [...allowedMethods, "OPTIONS"]

export function withMethods(
  allowedMethods: HTTP_METHODS[],
  handler: NextApiHandler
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const methods = checkMethods(allowedMethods)

    if (!req.method || !methods.includes(req.method)) {
      res.setHeader("Allow", methods)
      return res
        .status(405)
        .send(`The HTTP ${req.method} method is not supported.`)
    }

    if ("OPTIONS" === req.method) {
      res.setHeader("Allow", methods)
      res.setHeader("Content-Length", 0)
      return res.status(204).end()
    }

    return handler(req, res)
  }
}

type NextEdgeHandler = (
  req: NextRequest,
  res: NextResponse
) => unknown | Promise<unknown>

export function withMethodsEdge(
  allowedMethods: HTTP_METHODS[],
  handler: NextEdgeHandler
) {
  return async function (req: NextRequest, res: NextResponse) {
    const methods = checkMethods(allowedMethods)

    if (!req.method || !methods.includes(req.method)) {
      return new Response(`The HTTP ${req.method} method is not supported.`, {
        status: 405,
        headers: {
          Allow: methods.join(", "),
        },
      })
    }

    if ("OPTIONS" === req.method) {
      return new Response("", {
        status: 204,
        headers: {
          Allow: methods.join(", "),
          "Content-Length": "0",
        },
      })
    }

    return handler(req, res)
  }
}
