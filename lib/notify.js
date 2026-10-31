'use strict';

/**
 * Optional notifications for new leads.
 * - LEAD_WEBHOOK_URL: posts the lead as JSON (works with Slack workflows, Zapier, Make, n8n...).
 * - SMTP_HOST (+ SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO): sends an email,
 *   if you have installed nodemailer (`npm install nodemailer`).
 * Failures are logged and never block the visitor's form submission.
 */
async function notifyLead(lead) {
  const tasks = [];

  if (process.env.LEAD_WEBHOOK_URL) {
    tasks.push(
      fetch(process.env.LEAD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: `New enquiry from ${lead.name} (${lead.email})`, lead })
      })
    );
  }

  if (process.env.SMTP_HOST && process.env.LEAD_EMAIL_TO) {
    let nodemailer;
    try {
      nodemailer = require('nodemailer');
    } catch {
      console.warn('[notify] SMTP_HOST is set but nodemailer is not installed. Run: npm install nodemailer');
    }
    if (nodemailer) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
      });
      const body = Object.entries(lead)
        .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
        .join('\n');
      tasks.push(
        transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: process.env.LEAD_EMAIL_TO,
          replyTo: lead.email,
          subject: `New enquiry: ${lead.name} – ${lead.company || 'no company'}`,
          text: body
        })
      );
    }
  }

  const results = await Promise.allSettled(tasks);
  results
    .filter((r) => r.status === 'rejected')
    .forEach((r) => console.error('[notify] failed:', r.reason && r.reason.message));
}

module.exports = { notifyLead };
