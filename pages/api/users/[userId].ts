import type { NextApiRequest, NextApiResponse } from "next"
import { withCurrentUser } from "@/lib/api-middlewares/with-current-user"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withValidation } from "@/lib/api-middlewares/with-validation"
import prisma from "@/lib/db"
import { userSchema } from "@/lib/validations/user"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        ...req.body,
      },
    })

    return res.end()
  } catch (error) {
    console.error("[API]/users/[userId] error: ", error.message)
    return res.status(422).end()
  }
}

export default withMethods(
  ["PATCH"],
  withCurrentUser(withValidation(userSchema, handler))
)
