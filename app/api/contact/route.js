// app/api/contact/route.js
//
// Do not add `export const runtime = 'edge'` — Nodemailer needs Node's net/tls.

import nodemailer from 'nodemailer'
import {
  buildNotification,
  buildAutoReply,
  sanitizeHeader,
} from '@/lib/emailTemplates'

const attempts = new Map()
const WINDOW_MS = 15 * 60 * 1000
const MAX_PER_WINDOW = 3

function rateLimited(ip) {
  const now = Date.now()
  const record = attempts.get(ip) ?? { count: 0, start: now }

  if (now - record.start > WINDOW_MS) {
    attempts.set(ip, { count: 1, start: now })
    return false
  }

  record.count += 1
  attempts.set(ip, record)
  return record.count > MAX_PER_WINDOW
}

function validate({ name, email, message }) {
  if (!name || name.trim().length < 2) return 'Please enter your name.'
  if (name.length > 100) return 'That name is too long.'

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email ?? '')
  if (!emailOk) return 'Please enter a valid email address.'

  if (!message || message.trim().length < 10)
    return 'Please write at least 10 characters.'
  if (message.length > 5000) return 'That message is too long.'

  return null
}

export async function POST(request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

    if (rateLimited(ip)) {
      return Response.json(
        { error: 'Too many messages. Please try again later.' },
        { status: 429 }
      )
    }

    const { name, email, message, website } = await request.json()

    if (website) return Response.json({ ok: true })

    const invalid = validate({ name, email, message })
    if (invalid) return Response.json({ error: invalid }, { status: 400 })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    const safeName = sanitizeHeader(name)
    const safeEmail = sanitizeHeader(email)

    const notification = buildNotification({ name, email, message })

    await transporter.sendMail({
      // From must be your own address — Gmail rejects spoofed senders, and a
      // mismatched From is the fastest route to the spam folder.
      from: `"Portfolio" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO ?? process.env.SMTP_USER,
      replyTo: `"${safeName}" <${safeEmail}>`,
      subject: `Portfolio enquiry — ${safeName}`,
      text: notification.text,
      html: notification.html,
    })

    // Auto-reply is best-effort. If it fails, the visitor still got through,
    // so don't fail the request over it.
    try {
      const reply = buildAutoReply({ name })
      await transporter.sendMail({
        from: `"Rashedul Alam" <${process.env.SMTP_USER}>`,
        to: `"${safeName}" <${safeEmail}>`,
        subject: 'Thanks for getting in touch',
        text: reply.text,
        html: reply.html,
      })
    } catch (replyError) {
      console.error('[contact] auto-reply failed', replyError)
    }

    return Response.json({ ok: true })
  } catch (error) {
    console.error('[contact]', error)
    return Response.json(
      { error: "Couldn't send your message. Please email me directly." },
      { status: 500 }
    )
  }
}