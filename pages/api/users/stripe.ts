import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { proPlan } from "@/config/subscriptions"
import { withAuthentication } from "@/lib/api-middlewares/with-authentication"
import { withMethods } from "@/lib/api-middlewares/with-methods"
import { authOptions } from "@/lib/auth"
import { stripe } from "@/lib/stripe"
import { getUserSubscriptionPlan } from "@/lib/subscription"
import { absoluteUrl } from "@/lib/utils"

const billingUrl = absoluteUrl("/account/billing")

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const session = await getServerSession(req, res, authOptions)
      const user = session.user
      const subscriptionPlan = await getUserSubscriptionPlan(user.id)

      // The user is on the pro plan.
      // Create a portal session to manage subscription.
      if (subscriptionPlan.isPro) {
        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: subscriptionPlan.stripeCustomerId,
          return_url: billingUrl,
        })

        return res.json({ url: stripeSession.url })
      }

      // The user is on the free plan.
      // Create a checkout session to upgrade.
      const stripeSession = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: proPlan.stripePriceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: billingUrl,
        cancel_url: billingUrl,
        customer_email: user.email,
        metadata: {
          userId: user.id,
        },
        allow_promotion_codes: true,
        automatic_tax: {
          enabled: true,
        },
        billing_address_collection: "auto",
        payment_method_types: ["card"],
      })

      return res.json({ url: stripeSession.url })
    } catch (error) {
      console.error("error", error.message)
      return res.status(500).end()
    }
  }
}

export default withMethods(["GET"], withAuthentication(handler))
