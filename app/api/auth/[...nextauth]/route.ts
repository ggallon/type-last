import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export async function HEAD() {
  // Request is from Company Firewall
  return new Response("", {
    status: 200,
    headers: {
      "Content-Length": "0",
    },
  })
}
