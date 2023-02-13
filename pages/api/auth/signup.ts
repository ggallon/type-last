import { NextApiRequest, NextApiResponse } from "next"

import { withMethods } from "@/lib/api-middlewares/with-methods"
import { withValidation } from "@/lib/api-middlewares/with-validation"
import prisma, { IdentityProvider } from "@/lib/db"
import { hashPassword } from "@/lib/password"
import { userAuthSchema } from "@/lib/validations/auth"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.NEXT_PUBLIC_DISABLE_SIGNUP === "true") {
    res.status(403).json({ message: "Signup is disabled" })
    return
  }

  const data = req.body
  const { email: userEmail, password } = data

  // There is actually an existingUser if email matches
  const existingUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      id: true,
    },
  })

  if (existingUser) {
    return res
      .status(409)
      .json({ message: "Email address is already registered" })
  }

  try {
    const hashedPassword = await hashPassword(password)
    await prisma.user.create({
      data: {
        email: userEmail,
        password: hashedPassword,
        identityProvider: IdentityProvider.PROACTICE,
      },
      select: {
        id: true,
      },
    })
  } catch (error) {
    console.error(error)
    return res.status(500).end()
  }

  res.status(201).json({ message: "Created user" })
}

export default withMethods(["POST"], withValidation(userAuthSchema, handler))
