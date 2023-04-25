import type { NextApiResponse } from "next"
import type { NextApiHandlerCustom, NextApiRequestCustom } from "@/types"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export function withAuthentication(handler: NextApiHandlerCustom) {
  return async function (req: NextApiRequestCustom, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if (!session) {
      return res.status(403).end()
    }

    req.session = session

    return handler(req, res)
  }
}
