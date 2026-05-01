import { Resend } from 'resend';
import type { NextApiRequest, NextApiResponse } from 'next';

type SendEmailResponse = { success: true } | { error: string };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getStringValue(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SendEmailResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const name = getStringValue(req.body?.name);
  const email = getStringValue(req.body?.email);
  const message = getStringValue(req.body?.message);

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ error: 'Name, email, and message are required' });
  }

  if (!emailPattern.test(email)) {
    return res
      .status(400)
      .json({ error: 'Please provide a valid email address' });
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');
  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: 'Portfolio Contact <krutin@krutinpolra.com>',
      to: 'krutinpolra1444@gmail.com',
      subject: `New portfolio message from ${name}`,
      replyTo: email,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Sender:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong><br />${safeMessage}</p>
      `,
    });

    await resend.emails.send({
      from: 'Krutin <noreply@krutinpolra.com>',
      to: email,
      subject: 'Thanks for reaching out to Krutin',
      html: `
        <div style="background: #0f172a; padding: 40px; font-family: Arial, sans-serif; color: #f1f5f9; border-radius: 16px; max-width: 600px; margin: auto;">
          <h2 style="color: #c084fc;">Hey ${safeName || 'there'}</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thanks for reaching out. I received your message and will get back to you as soon as I can.
          </p>
          <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-top: 24px;">
            <h4 style="margin-bottom: 8px; color: #93c5fd;">Your Message</h4>
            <p style="font-style: italic; color: #e2e8f0;">${safeMessage}</p>
          </div>
          <p style="margin-top: 24px;">
            You can also connect with me on LinkedIn:
          </p>
          <a href="https://www.linkedin.com/in/krutinpolra1444/" style="display: inline-block; margin-top: 12px; padding: 12px 20px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            Connect on LinkedIn
          </a>
          <p style="margin-top: 32px; font-size: 14px; color: #94a3b8;">
            Talk soon,<br />
            Krutin<br />
            <a href="https://krutin.com" style="color: #c084fc;">https://krutin.com</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return res.status(500).json({ error: 'Unable to send message right now' });
  }
}
