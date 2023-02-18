import nodemailer, {
  type SendMailOptions as NodeMailerSendMailOptions,
} from "nodemailer"
import { siteConfig } from "@/config/site"

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASS,
  },
})

interface SendMailOptions
  extends Pick<
    NodeMailerSendMailOptions,
    "from" | "to" | "subject" | "text" | "html" | "priority"
  > {}

export async function sendMail({
  from,
  to,
  subject,
  text,
  html,
  priority = "normal",
}: SendMailOptions) {
  const sender = from ?? siteConfig.defaultFrom
  const info = await transporter.sendMail({
    from: sender, // sender address
    to, // list of receivers
    subject, // Subject line
    text,
    html,
    priority, // "high" | "normal" | "low"
  })

  return info
}
