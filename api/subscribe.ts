
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
  // Set CORS headers to allow requests from both www and non-www
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
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

    // Improved HTML Template: Mobile Optimized & High Contrast
    const EMAIL_TEMPLATE_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You're in.</title>
  <style>
    /* Client-specific resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    
    /* General Styles */
    body {
      margin: 0;
      padding: 0;
      background-color: #ffffff;
      color: #000000;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      width: 100% !important;
    }
    
    .wrapper {
      width: 100%;
      table-layout: fixed;
      background-color: #ffffff;
      padding-bottom: 40px;
    }

    .content {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
    }

    /* Typography - Optimized for Readability */
    h1 {
      font-size: 36px;
      line-height: 1.1;
      font-weight: 900;
      color: #000000;
      text-transform: uppercase;
      letter-spacing: -1px;
      margin-top: 0;
      margin-bottom: 24px;
    }

    p {
      font-size: 18px; /* Large size for mobile readability */
      line-height: 1.6;
      color: #000000;
      margin: 0 0 24px 0;
    }

    /* Image Handling */
    .image-container {
      background-color: #f4f4f5;
      border-radius: 12px;
      overflow: hidden;
      margin-bottom: 32px;
      border: 1px solid #e4e4e7;
    }
    
    img.hero-img {
      width: 100%;
      height: auto;
      display: block;
      background-color: #f4f4f5;
      color: #000000; /* Alt text color */
      font-family: monospace;
      font-weight: bold;
      text-align: center;
      min-height: 100px;
    }

    /* Footer */
    .footer {
      border-top: 2px solid #000000;
      padding-top: 24px;
      margin-top: 40px;
    }
    
    .footer p {
      font-size: 14px;
      color: #666666;
      margin-bottom: 8px;
    }
    
    /* Mobile specific adjustments */
    @media only screen and (max-width: 480px) {
      h1 { font-size: 32px !important; }
      p { font-size: 18px !important; }
      .content { padding: 16px !important; }
    }
  </style>
</head>
<body>
  <center class="wrapper">
    <div class="content">
      
      <!-- Header Image -->
      <div class="image-container">
        <img 
          class="hero-img"
          src="https://storage.googleapis.com/bored_tourist_media/images/gallery/fotomail.png" 
          alt="BORED TOURIST: WELCOME TO THE CHAOS" 
          width="600"
        />
      </div>

      <!-- Main Content -->
      <h1>You're in.</h1>
      
      <p>
        You’ve just taken the first step towards ditching the usual travel clichés. 
        Nobody wants to be the "bored tourist," and we’re building the antidote.
      </p>
      
      <p>
        We'll keep you updated on the beta launch in Lisbon. Expect invites, chaos, and zero tourist traps.
      </p>

      <!-- Footer -->
      <div class="footer">
        <p style="color: #000000; font-weight: bold;">Bored Tourist | Lisbon, Portugal</p>
        <p>You received this because you swiped right on adventure.</p>
      </div>
      
    </div>
  </center>
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
      text: EMAIL_TEXT, 
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
