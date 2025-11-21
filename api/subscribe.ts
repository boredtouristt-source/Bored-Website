
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase (Server-side)
const supabaseUrl = process.env.SUPABASE_URL || 'https://hpfudnucopawxfoxeotv.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZnVkbnVjb3Bhd3hmb3hlb3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Nzk0MTEsImV4cCI6MjA3OTI1NTQxMX0.J0x62lQi4Rg7A-LfiS1YmC-TBv1H8FT_1IR9arAZTq8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Helper to validate email format
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export default async function handler(req: any, res: any) {
  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { email } = body;

    // 1. Immediate Validation
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }

    // 2. Save to Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email, status: 'subscribed' }]);

    // Handle duplicate emails gracefully (ignore error if already subscribed)
    if (dbError && dbError.code !== '23505') {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save to database');
    }

    // 3. Send Email via Resend
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing.");
        return res.status(500).json({ error: 'Missing RESEND_API_KEY config.' });
    }

    const EMAIL_TEMPLATE_HTML = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
<head>
  <meta content="width=device-width" name="viewport" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
</head>
<body style="background-color:#000000; color: white; font-family: sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <img src="https://storage.googleapis.com/bored_tourist_media/images/gallery/fotomail.png" width="100%" style="border-radius: 8px;" />
    <h1 style="color: #ccff00; text-transform: uppercase; font-weight: 900;">You're in.</h1>
    <p style="font-size: 18px; line-height: 1.6; color: #dddddd;">
      You’ve just taken the first step towards ditching the usual travel clichés. 
      Nobody wants to be the "bored tourist," and we’re building the antidote.
    </p>
    <p style="font-size: 16px; color: #999;">
      We'll keep you updated. See you soon.
    </p>
  </div>
</body>
</html>
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Bored Tourist <bookings@boredtourist.com>',
      to: email,
      subject: 'Take Your Antidote to Boredom 🔥',
      html: EMAIL_TEMPLATE_HTML, 
    });

    if (emailError) {
      // INTELLIGENT HANDLING:
      // Even in production, we keep this check just in case the domain verification fails temporarily,
      // ensuring the user still sees a "Success" message on the frontend if their data is safe in the DB.
      if (emailError.message?.includes('only send testing emails') || emailError.message?.includes('verify a domain')) {
        console.warn('Resend Verification Issue: Email failed, but DB save was successful.');
        return res.status(200).json({ message: 'Subscribed (Email skipped due to verification status)' });
      }

      // Real error (like API key wrong, or service down)
      console.error('Resend Error:', emailError);
      return res.status(500).json({ error: `Email Not Sent: ${emailError.message}` });
    }

    return res.status(200).json({ message: 'Success' });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
