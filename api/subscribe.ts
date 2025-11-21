import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

// Initialize Supabase (Server-side)
// Using fallbacks from your client config so it works immediately even without Env Vars set in Vercel
const supabaseUrl = process.env.SUPABASE_URL || 'https://hpfudnucopawxfoxeotv.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZnVkbnVjb3Bhd3hmb3hlb3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Nzk0MTEsImV4cCI6MjA3OTI1NTQxMX0.J0x62lQi4Rg7A-LfiS1YmC-TBv1H8FT_1IR9arAZTq8';
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  try {
    // Parse body safely for Vercel serverless environment
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { email } = body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('subscribers')
      .insert([{ email, status: 'subscribed' }]);

    // Handle duplicate emails gracefully (ignore error if already subscribed)
    if (dbError && dbError.code !== '23505') {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save to database');
    }

    // 2. Send Email via Resend (Only if we have an API Key)
    if (process.env.RESEND_API_KEY) {
      
      // Paste your Resend Template HTML here
      const EMAIL_TEMPLATE_HTML = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">

<head>
  <meta content="width=device-width" name="viewport" />
  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta content="IE=edge" http-equiv="X-UA-Compatible" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta content="telephone=no,address=no,email=no,date=no,url=no" name="format-detection" />
</head>

<body>
  <!--$--><!--html--><!--head--><!--body-->
  <table border="0" width="100%" cellpadding="0" cellspacing="0" role="presentation" align="center">
    <tbody>
      <tr>
        <td>
          <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:1.0769230769230769em;min-height:100%;line-height:155%">
            <tbody>
              <tr>
                <td>
                  <table align="left" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="align:left;width:100%;padding-left:0px;padding-right:0px;line-height:155%;max-width:600px;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif">
                    <tbody>
                      <tr>
                        <td>
                          <div></div>
                          <div>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="#f0f1f5" style="background-color:#f0f1f5">
                              <tbody>
                                <tr>
                                  <td style="background-color:#f0f1f5">
                                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;margin:0 auto;background-color:#000000">
                                      <tbody>
                                        <tr>
                                          <td style="padding:10px
           0px
           10px
           0px">
                                            <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
                                              <tbody>
                                                <tr>
                                                  <td style="padding:10px 0 10px 0">
                                                    <table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="color:#000;font-style:normal;font-weight:normal;font-size:16px;line-height:1.4;letter-spacing:0;text-align:left;direction:ltr;border-collapse:collapse;font-family:Arial, Helvetica, sans-serif;white-space:normal;word-wrap:break-word;word-break:break-word">
                                                      <tbody>
                                                        <tr>
                                                          <td>
                                                            <table cellpadding="0" cellspacing="0" border="0" style="width:100%">
                                                              <tbody>
                                                                <tr>
                                                                  <td align="center">
                                                                    <table cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
                                                                      <tbody>
                                                                        <tr>
                                                                          <td style="width:100%;padding:0">
                                                                            <img src="https://storage.googleapis.com/bored_tourist_media/images/gallery/fotomail.png" width="600" height="684" style="display:block;width:100%;height:auto;max-width:100%" />
                                                                          </td>
                                                                        </tr>
                                                                      </tbody>
                                                                    </table>
                                                                  </td>
                                                                </tr>
                                                              </tbody>
                                                            </table>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td style="font-size:0;height:16px" height="16">
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td dir="ltr" style="font-size:16px;font-family:Helvetica, Arial, sans-serif;text-align:center;padding:0px 20px">
                                                            <span style="font-size:18.6666px;font-weight:700;color:#ffffff;white-space:pre-wrap">
                                                            </span><span style="font-size:18.6666px;color:#ffffff;white-space:pre-wrap">You’ve just
                                                              taken the first
                                                              step towards
                                                              ditching the
                                                              usual travel
                                                              clichés. Nobody
                                                              wants to be the
                                                              "bored tourist,"
                                                              and we’re
                                                              building the
                                                              antidote to that
                                                              boredom.</span><span style="font-size:18.6666px;color:#faf6f1;white-space:pre-wrap">
                                                            </span><span style="font-size:18.6666px;color:#faf6f1;white-space:pre-wrap"><br /><br /></span><span style="font-size:19.3332px;color:#ffffff;white-space:pre-wrap">
                                                              We'll keep you
                                                              updated with the
                                                              latest
                                                              developments
                                                              and, when our
                                                              app is ready,
                                                              you’ll be the
                                                              first to
                                                              know</span><span style="font-size:19.3332px;color:#ffffff;white-space:pre-wrap"><br /></span>
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td style="font-size:0;height:16px" height="16">
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td dir="ltr" style="color:#ffffff;font-size:19.3332px;font-weight:300;font-family:Helvetica, Arial, sans-serif;white-space:pre-wrap;text-align:center;padding:0px 20px">
                                                            <br />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td style="font-size:0;height:16px" height="16">
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td dir="ltr" style="color:#ffffff;font-size:19.3332px;font-weight:300;font-family:Helvetica, Arial, sans-serif;white-space:pre-wrap;text-align:center;padding:0px 20px">
                                                            See you soon,
                                                            Bored Tourist<br />
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td style="font-size:0;height:16px" height="16">
                                                            &nbsp;
                                                          </td>
                                                        </tr>
                                                        <tr>
                                                          <td dir="ltr" style="font-size:16px;white-space:pre-wrap;text-align:left;padding:0px 20px">
                                                            <br />
                                                          </td>
                                                        </tr>
                                                      </tbody>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <p style="margin:0;padding:0;font-size:1em;padding-top:0.5em;padding-bottom:0.5em">
                            <br />
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
  <!--/$-->
</body>
</html>
      `;

      const { error: emailError } = await resend.emails.send({
        // NOTE: Using 'onboarding@resend.dev' ensures it works for testing before you verify your domain.
        // Once you verify 'boredtourist.com' on Resend, change this to 'Bored Tourist <bookings@boredtourist.com>'
        from: 'Bored Tourist <onboarding@resend.dev>',
        to: email,
        subject: 'Take Your Antidote to Boredom 🔥',
        html: EMAIL_TEMPLATE_HTML, 
      });

      if (emailError) {
        console.error('Resend Error:', emailError);
        // We continue even if email fails, as user is saved in DB
      }
    }

    return res.status(200).json({ message: 'Success' });

  } catch (error: any) {
    console.error('API Error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}