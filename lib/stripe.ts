import Stripe from "stripe"

const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET ?? "undefined"

export const stripe = new Stripe(STRIPE_KEY_SECRET, {
  apiVersion: "2022-11-15",
  typescript: true,
})
