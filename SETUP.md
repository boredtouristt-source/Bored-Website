# Bored Tourist Backend Setup Guide

This guide will help you set up the email subscription system with database storage and automated welcome emails.

## Prerequisites

You'll need accounts for:
1. **Supabase** (Free tier) - For database storage
2. **Resend** (Free tier) - For sending emails

---

## Step 1: Set Up Supabase Database

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/log in
2. Click "New Project"
3. Fill in:
   - Project name: `bored-tourist`
   - Database password: (create a strong password)
   - Region: Choose closest to your users
4. Click "Create new project" and wait for it to initialize

### 1.2 Create the Subscribers Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL:

```sql
-- Create subscribers table
CREATE TABLE subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster email lookups
CREATE INDEX idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for API)
CREATE POLICY "Allow insert for service role" ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow select for service role
CREATE POLICY "Allow select for service role" ON subscribers
  FOR SELECT
  USING (true);
```

4. Click "Run" to execute the query

### 1.3 Get Your Supabase Keys

1. Go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the left menu
3. Copy these values:
   - **Project URL** → This is your `SUPABASE_URL`
   - **anon public** key → This is your `VITE_SUPABASE_ANON_KEY`
   - **service_role** key (click "Reveal" first) → This is your `SUPABASE_SERVICE_ROLE_KEY`

⚠️ **Important**: Never commit the service_role key to Git! It has full database access.

---

## Step 2: Set Up Resend for Emails

### 2.1 Create a Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email address

### 2.2 Add and Verify Your Domain

1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter: `boredtourist.com`
4. You'll get DNS records to add. Go to your domain registrar (where you bought boredtourist.com)
5. Add these DNS records:
   - **SPF** record (TXT)
   - **DKIM** records (TXT)
   - **DMARC** record (TXT)
6. Wait for verification (usually 5-30 minutes)

### 2.3 Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Name it: `Bored Tourist Production`
4. Select permission: "Sending access"
5. Copy the API key → This is your `RESEND_API_KEY`

---

## Step 3: Configure Environment Variables

### 3.1 Local Development

1. Create a `.env` file in your project root:

```bash
# Gemini API (existing)
GEMINI_API_KEY=your_gemini_api_key_here

# Supabase Configuration
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Resend Email API
RESEND_API_KEY=re_xxxxx
```

2. Make sure `.env` is in your `.gitignore` file

### 3.2 Vercel Production

1. Go to your Vercel dashboard
2. Select your `boredtourist.com` project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `RESEND_API_KEY`
   - `GEMINI_API_KEY` (if not already there)

5. Make sure to select all environments: Production, Preview, Development

---

## Step 4: Update Your Code

The following files have been updated:

✅ `api/subscribe.ts` - Backend API handler
✅ `services/supabaseClient.ts` - Supabase client initialization
✅ `vercel.json` - Vercel configuration
✅ `.env.example` - Environment variables template

---

## Step 5: Test Locally

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Test the subscription form on your website

---

## Step 6: Deploy to Vercel

1. Commit your changes:
```bash
git add .
git commit -m "Add email subscription backend with Supabase and Resend"
git push
```

2. Vercel will automatically deploy your changes

---

## Customizing the Welcome Email

The welcome email template is in `api/subscribe.ts` around line 90. You can customize:
- The subject line
- The HTML content
- The sender name (currently "Bored Tourist")
- The sender email (currently "onboarding@boredtourist.com")

**Note**: The sender email must be `@boredtourist.com` since that's your verified domain in Resend.

---

## Monitoring

### Check Subscribers
1. Go to Supabase Dashboard
2. Click **Table Editor**
3. Select `subscribers` table
4. You'll see all subscribers with their emails and subscription dates

### Check Email Delivery
1. Go to Resend Dashboard
2. Click **Emails** in sidebar
3. You'll see all sent emails with delivery status

---

## Troubleshooting

### "Server misconfiguration" error
- Check that all environment variables are set in Vercel
- Make sure you deployed after adding the variables

### Email not sending
- Verify your domain in Resend is fully verified (all DNS records green)
- Check Resend dashboard for failed emails and error messages
- Make sure the sender email uses your verified domain

### Database errors
- Check that you created the `subscribers` table in Supabase
- Verify the SQL policies were created correctly
- Check Supabase logs in the dashboard

---

## Free Tier Limits

### Supabase Free Tier:
- 500 MB database storage
- 50,000 monthly active users
- 2 GB bandwidth

### Resend Free Tier:
- 3,000 emails per month
- 100 emails per day

These limits should be more than enough to get started!

---

## Security Notes

✅ **Service role key** is only used on the backend (Vercel serverless function)
✅ **Anon key** is safe to use in frontend code
✅ Never commit `.env` files to Git
✅ Email validation is done server-side
✅ Duplicate emails are prevented
✅ CORS is properly configured

---

## Support

If you have any issues:
1. Check Vercel deployment logs
2. Check Supabase logs in dashboard
3. Check Resend email logs
4. Verify all environment variables are set correctly

---

Happy coding! 🚀
