import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Initialize Supabase (use non-VITE vars on backend for security)
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase configuration missing', { 
      hasUrl: !!supabaseUrl, 
      hasKey: !!supabaseServiceKey 
    });
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Initialize Resend
  const resendApiKey = process.env.RESEND_API_KEY;
  
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is missing');
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  const resend = new Resend(resendApiKey);

  try {
    // 1. Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('subscribers')
      .select('*')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 means no rows returned, which is fine
      console.error('Database check error:', checkError);
      throw new Error('Database error');
    }

    if (existingUser) {
      return res.status(200).json({ 
        success: true, 
        message: 'You are already subscribed!' 
      });
    }

    // 2. Insert new subscriber
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert([
        { 
          email, 
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ]);

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save subscription');
    }

    // 3. Send welcome email via Resend
    try {
      await resend.emails.send({
        from: 'Bored Tourist <bookings@boredtourist.com>',
        to: email,
        subject: 'Welcome to Bored Tourist! 🌍',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                      <!-- Header -->
                      <tr>
                        <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 40px; text-align: center;">
                          <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">Welcome to Bored Tourist! 🌍</h1>
                        </td>
                      </tr>
                      <!-- Content -->
                      <tr>
                        <td style="padding: 40px;">
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                            Hey there, adventurer!
                          </p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                            Thanks for joining Bored Tourist! We're excited to have you on board. 🎉
                          </p>
                          <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #374151;">
                            Get ready to discover amazing destinations, hidden gems, and unique experiences that will cure your boredom and fuel your wanderlust.
                          </p>
                          <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #374151;">
                            We'll keep you updated with travel inspiration, exclusive tips, and exciting new features.
                          </p>
                          <div style="text-align: center; margin: 30px 0;">
                            <a href="https://boredtourist.com" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                              Start Exploring
                            </a>
                          </div>
                          <p style="margin: 30px 0 0; font-size: 16px; line-height: 1.6; color: #374151;">
                            Happy travels! ✈️<br>
                            <strong>The Bored Tourist Team</strong>
                          </p>
                        </td>
                      </tr>
                      <!-- Footer -->
                      <tr>
                        <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 0 0 10px; font-size: 14px; color: #6b7280;">
                            Bored Tourist - Your adventure starts here
                          </p>
                          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
                            If you no longer wish to receive these emails, you can unsubscribe at any time.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the whole request if email fails
    }

    // 4. Success!
    return res.status(200).json({ 
      success: true, 
      message: 'Successfully subscribed! Check your email.' 
    });

  } catch (error: any) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      message: error.message || 'Internal Server Error' 
    });
  }
}