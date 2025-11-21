
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

    // Improved HTML Template specifically designed to look good even if images are blocked
    const EMAIL_TEMPLATE_HTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <style>
    /* Reset & Basics */
    body { background-color: #000000; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    
    /* Typography */
    h1 { color: #ccff00; text-transform: uppercase; font-weight: 900; font-size: 32px; margin-bottom: 24px; letter-spacing: -1px; line-height: 1.1; }
    p { font-size: 18px; line-height: 1.6; color: #cccccc; margin-bottom: 24px; }
    
    /* Image Handling - Makes it look good even if blocked */
    .image-wrapper { 
      background-color: #1a1a1a; /* Dark grey placeholder */
      border-radius: 12px; 
      overflow: hidden; 
      margin-bottom: 32px;
      border: 1px solid #333333;
    }
    img { 
      width: 100%; 
      height: auto; 
      display: block; 
      border: 0; 
      outline: none; 
      /* Styling the Alt Text if image is broken */
      color: #ccff00; 
      font-size: 20px; 
      font-weight: bold; 
      text-align: center; 
      background-color: #1a1a1a;
      font-family: monospace;
    }

    /* Footer */
    .footer { font-size: 12px; color: #666666; margin-top: 60px; border-top: 1px solid #333333; padding-top: 20px; }
    .footer a { color: #888888; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Image Wrapper with Background Color for robustness -->
    <div class="image-wrapper">
      <img 
        src="https://storage.googleapis.com/bored_tourist_media/images/gallery/fotomail.png" 
        alt="BORED TOURIST: WELCOME TO THE CHAOS" 
        width="600" 
        height="300"
      />
    </div>
    
    <h1>You're in.</h1>
    
    <p>
      You’ve just taken the first step towards ditching the usual travel clichés. 
      Nobody wants to be the "bored tourist," and we’re building the antidote.
    </p>
    
    <p>
      We'll keep you updated on the beta launch in Lisbon. Expect invites, chaos, and zero tourist traps.
    </p>

    <div class="footer">
      <p style="margin-bottom: 8px;">Bored Tourist | Lisbon, Portugal</p>
      <p>You received this because you swiped right on adventure.</p>
    </div>
  </div>
</body>
</html>
    `;

    // Plain Text Version (Important for Spam Filters & Deliverability)
    const EMAIL_TEXT = `
BORED TOURIST: WELCOME TO THE CHAOS

You're in.

You’ve just taken the first step towards ditching the usual travel clichés. Nobody wants to be the "bored tourist," and we’re building the antidote.

We'll keep you updated on the beta launch in Lisbon. Expect invites, chaos, and zero tourist traps.

--
Bored Tourist | Lisbon, Portugal
You received this because you swiped right on adventure.
    `;

    const { error: emailError } = await resend.emails.send({
      from: 'Bored Tourist <bookings@boredtourist.com>',
      to: email,
      subject: 'Take Your Antidote to Boredom 🔥',
      html: EMAIL_TEMPLATE_HTML,
      text: EMAIL_TEXT, // <-- Adding this text version helps Gmail trust you more
    });

    if (emailError) {
      if (emailError.message?.includes('only send testing emails') || emailError.message?.includes('verify a domain')) {
        console.warn('Resend Verification Issue: Email failed, but DB save was successful.');
        return res.status(200).json({ message: 'Subscribed (Email skipped due to verification status)' });
      }
      console.error('Resend Error:', emailError);
      return res.status(500).json({ error: `Email Not Sent: ${emailError.message}` });
    }

    return res.status(200).json({ message: 'Success' });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
