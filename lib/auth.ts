import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"
import prisma, { IdentityProvider } from "@/lib/db"
import { verifyPassword } from "@/lib/password"

if (
  process.env.GITHUB_CLIENT_ID === undefined ||
  process.env.GITHUB_CLIENT_SECRET === undefined
) {
  throw new Error("Missing GITHUB environnment!")
}

interface ProacticeNextAuthOptions extends NextAuthOptions {
  pages: {
    signIn: string
  }
}

export const authOptions: ProacticeNextAuthOptions = {
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Proactice",
      type: "credentials",
      credentials: {
        email: {
          label: "Email Address",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your super secure password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          console.error(`For some reason credentials are missing`)
          throw new Error("ErrorCode.InternalServerError")
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email.toLowerCase(),
          },
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            identityProvider: true,
            password: true,
          },
        })

        // Don't leak information about it being username or password that is invalid
        if (!user) {
          throw new Error("ErrorCode.IncorrectUsernamePassword")
        }

        if (user.identityProvider !== IdentityProvider.PROACTICE) {
          throw new Error("ErrorCode.ThirdPartyIdentityProviderEnabled")
        }

        if (!user.password) {
          throw new Error("ErrorCode.IncorrectUsernamePassword")
        }

        const isCorrectPassword = await verifyPassword(
          credentials.password,
          user.password
        )

        if (!isCorrectPassword) {
          throw new Error("ErrorCode.IncorrectUsernamePassword")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (!account) {
        console.error(`For some reason account is missing`)
        throw new Error("ErrorCode.InternalServerError")
      }

      // In this case we've already verified the credentials
      // in the authorize callback so we can sign the user in.
      if (account.type === "credentials") {
        return true
      }

      if (!user.email || account.type !== "oauth") {
        return false
      }

      if (account.provider) {
        const idP: IdentityProvider = IdentityProvider.GITHUB
        // Only github oauth on this path
        const provider = account.provider.toUpperCase() as IdentityProvider
        // check if accounts for this provider / account Id already exists
        const existingUser = await prisma.user.findFirst({
          include: {
            accounts: {
              where: {
                provider: account.provider,
              },
            },
          },
          where: {
            identityProvider: provider,
            identityProviderId: account.providerAccountId,
          },
        })

        if (existingUser) {
          // User with this provider found
          // check if email still the same
          if (existingUser.email === user.email) {
            return true
          }

          // If the email address doesn't match, check if an account already exists
          // with the new email address. If it does, for now we return an error. If
          // not, update the email of their account and log them in.
          const userWithNewEmail = await prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true },
          })

          if (!userWithNewEmail) {
            await prisma.user.update({
              where: { id: existingUser.id },
              data: { email: user.email },
            })
            return true
          } else {
            return "/auth/error?error=new-email-conflict"
          }
        }

        // If there's no existing user for this identity provider and id, create
        // a new account. If an account already exists with the incoming email
        // address return an error for now.
        const existingUserWithEmail = await prisma.user.findUnique({
          where: { email: user.email },
          select: { identityProvider: true },
        })

        if (existingUserWithEmail) {
          // User signs up with email/password and then tries to login with Github using the same email
          if (
            existingUserWithEmail.identityProvider ===
              IdentityProvider.PROACTICE &&
            idP === IdentityProvider.GITHUB
          ) {
            return true
          } else if (
            existingUserWithEmail.identityProvider ===
            IdentityProvider.PROACTICE
          ) {
            return "/auth/error?error=use-password-login"
          }

          return "/auth/error?error=use-email-login"
        }

        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            emailVerified: new Date(Date.now()),
            image: user.image,
            identityProvider: idP,
            identityProviderId: String(user.id),
            accounts: {
              create: [{ ...account }],
            },
          },
        })

        return true
      }

      return false
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
      }

      return session
    },
    async jwt({ token }) {
      if (!token.email) {
        return token
      }

      const existingUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      })

      if (!existingUser) {
        return token
      }

      return {
        ...existingUser,
        ...token,
      }
    },
  },
}
