import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next"

export type HTTP_METHODS =
  | "OPTIONS"
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"

export function withMethods(
  allowedMethods: HTTP_METHODS[],
  handler: NextApiHandler
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const methods = allowedMethods.includes("OPTIONS")
      ? allowedMethods
      : [...allowedMethods, "OPTIONS"]

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
