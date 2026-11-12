import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { name, email, projectTypes, message, honeypot } = req.body || {};

    // 1. Bot honeypot check
    if (honeypot) {
      return res.status(200).json({ ok: true });
    }

    // 2. Input validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 5) {
      return res.status(400).json({ error: 'Message must be at least 5 characters long' });
    }

    // Sanitize length
    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 100);
    const cleanTypes = Array.isArray(projectTypes) ? projectTypes.slice(0, 5) : ['General Inquiry'];
    const cleanMessage = message.trim().slice(0, 2000);

    // In production, you can forward this to Resend, SendGrid, or Telegram Bot webhook.
    // For now, log sanitized payload securely:
    console.log(`[Contact Submission] from: ${cleanName} <${cleanEmail}> | types: ${cleanTypes.join(', ')}`);

    return res.status(200).json({
      ok: true,
      message: 'Message successfully sent. Prakhar will reply within 24 hours.',
    });
  } catch (err) {
    console.error('Contact form submission error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

