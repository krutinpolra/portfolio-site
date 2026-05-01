import { Resend } from 'resend';
import { NextApiRequest, NextApiResponse } from 'next';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email, message } = req.body;

  try {
    // ✅ Email to YOU
    await resend.emails.send({
      from: `${name} <krutin@krutinpolra.com>`,
      to: 'krutinpolra1444@gmail.com',
      subject: `📩 New Message from ${name || 'Anonymous'}`,
      replyTo: email,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Sender:</strong> ${name || 'Anonymous'}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // ✅ Auto-reply to USER
    await resend.emails.send({
      from: 'Krutin <noreply@krutinpolra.com>',
      to: email,
      subject: '🌟 Thanks for reaching out to Krutin!',
      html: `
        <div style="background: #0f172a; padding: 40px; font-family: 'Segoe UI', sans-serif; color: #f1f5f9; border-radius: 16px; max-width: 600px; margin: auto; box-shadow: 0 0 25px rgba(99, 102, 241, 0.4);">
          <h2 style="color: #c084fc;">Hey ${name || 'there'} 👋</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thanks a ton for dropping a message! 🙌 I truly appreciate your time and interest. I’ve received your note and will personally get back to you as soon as I can.
          </p>
    
          <div style="background: #1e293b; padding: 20px; border-radius: 12px; margin-top: 24px;">
            <h4 style="margin-bottom: 8px; color: #93c5fd;">💬 Your Message</h4>
            <p style="font-style: italic; color: #e2e8f0;">"${message}"</p>
          </div>
    
          <p style="margin-top: 24px;">
            Meanwhile, feel free to check out some of my recent work or connect with me directly. Always open to chat about tech, ideas, or even your favorite snacks 🍕.
          </p>
    
          <a href="https://www.linkedin.com/in/krutinpolra1444/" style="display: inline-block; margin-top: 20px; padding: 12px 20px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: bold;">
            🔗 Let’s Stay Connected
          </a>
    
          <p style="margin-top: 32px; font-size: 14px; color: #94a3b8;">
            Talk soon!<br/>
            — Krutin 👨‍💻<br/>
            <a href="https://krutin.dev" style="color: #c084fc;">https://krutin.dev</a>
          </p>
        </div>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({
      error: err instanceof Error ? err.message : 'An unknown error occurred',
    });
  }
}
