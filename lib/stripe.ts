import Stripe from "stripe"

const STRIPE_API_KEY = process.env.STRIPE_API_KEY ?? "undefined"

export const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2022-11-15",
  typescript: true,
})
