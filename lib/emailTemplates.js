// lib/emailTemplates.js

/**
 * Email HTML is not web HTML. Outlook renders with the Word engine, which
 * ignores flexbox, grid, and most modern CSS. So: tables for layout, inline
 * styles only, no external stylesheets, 600px max width, system fonts.
 */

const GOLD = '#c9a84c'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'
const LINE = '#e5e2dc'

// Escape order matters: ampersand first, or you double-escape the entities
// the later replacements produce.
export function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Strips CR/LF so a crafted name can't inject extra mail headers.
export function sanitizeHeader(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function timestamp() {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Dhaka',
  }).format(new Date())
}

/**
 * The notification that lands in your inbox.
 */
export function buildNotification({ name, email, message }) {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
  const sent = timestamp()

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>New portfolio enquiry</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f2ee;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f2ee;padding:32px 16px;">
<tr>
<td align="center">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid ${LINE};border-radius:6px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<tr><td style="height:3px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:28px 32px 20px;border-bottom:1px solid ${LINE};">
<p style="margin:0 0 4px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};">New enquiry</p>
<p style="margin:0;font-size:19px;font-weight:600;color:${INK};">${safeName}</p>
<p style="margin:4px 0 0;font-size:14px;color:${MUTED};">
<a href="mailto:${safeEmail}" style="color:${MUTED};text-decoration:none;">${safeEmail}</a>
</p>
</td>
</tr>

<tr>
<td style="padding:24px 32px;">
<p style="margin:0 0 10px;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:${MUTED};">Message</p>
<p style="margin:0;font-size:15px;line-height:1.65;color:${INK};">${safeMessage}</p>
</td>
</tr>

<tr>
<td style="padding:0 32px 28px;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0">
<tr>
<td style="background-color:${INK};border-radius:4px;">
<a href="mailto:${safeEmail}?subject=Re:%20your%20message" style="display:inline-block;padding:11px 22px;font-size:14px;font-weight:500;color:#ffffff;text-decoration:none;">Reply to ${safeName}</a>
</td>
</tr>
</table>
</td>
</tr>

<tr>
<td style="padding:16px 32px;background-color:#faf9f7;border-top:1px solid ${LINE};">
<p style="margin:0;font-size:12px;color:${MUTED};">Sent ${sent} (Dhaka) via itsmerashed.vercel.app</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`

  // Always send a plain-text part. Some clients prefer it, spam filters
  // penalise HTML-only mail, and it's the fallback when images are blocked.
  const text = [
    'NEW ENQUIRY',
    '',
    `From:    ${name}`,
    `Email:   ${email}`,
    `Sent:    ${sent} (Dhaka)`,
    '',
    '---',
    '',
    message,
    '',
    '---',
    'Sent via itsmerashed.vercel.app',
  ].join('\n')

  return { html, text }
}

/**
 * Optional auto-reply to the visitor. This is the piece that actually reads as
 * professional — it confirms delivery instead of leaving them wondering.
 */
export function buildAutoReply({ name }) {
  const safeName = escapeHtml(name)

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
<title>Thanks for getting in touch</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f2ee;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f2ee;padding:32px 16px;">
<tr>
<td align="center">

<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border:1px solid ${LINE};border-radius:6px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">

<tr><td style="height:3px;background-color:${GOLD};font-size:0;line-height:0;">&nbsp;</td></tr>

<tr>
<td style="padding:32px 32px 8px;">
<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${INK};">Hi ${safeName},</p>
<p style="margin:0 0 16px;font-size:16px;line-height:1.65;color:${INK};">Thanks for reaching out. Your message came through and I&rsquo;ll get back to you within a couple of days.</p>
<p style="margin:0;font-size:16px;line-height:1.65;color:${INK};">Best,<br />Rashedul Alam</p>
</td>
</tr>

<tr>
<td style="padding:24px 32px 28px;">
<p style="margin:0;font-size:13px;color:${MUTED};">
Computer Science &amp; Engineering, AIUB &middot;
<a href="https://itsmerashed.vercel.app" style="color:${MUTED};">itsmerashed.vercel.app</a>
</p>
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>`

  const text = [
    `Hi ${name},`,
    '',
    "Thanks for reaching out. Your message came through and I'll get back to you within a couple of days.",
    '',
    'Best,',
    'Rashedul Alam',
    '',
    '--',
    'Computer Science & Engineering, AIUB',
    'itsmerashed.vercel.app',
  ].join('\n')

  return { html, text }
}