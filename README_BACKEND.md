# Bored Tourist - Email Subscription Backend

## 🎉 What's Been Set Up

Your website now has a complete email subscription system that:
1. ✅ Stores subscriber emails in a database (Supabase)
2. ✅ Sends automated welcome emails to new subscribers (Resend)
3. ✅ Prevents duplicate subscriptions
4. ✅ Is fully integrated with Vercel hosting

## 📁 Files Created/Updated

### New Files:
- `SETUP.md` - Complete setup guide with step-by-step instructions
- `database/schema.sql` - Database schema for Supabase
- `vercel.json` - Vercel configuration
- `.env.example` - Template for environment variables
- `.gitignore` - Updated to exclude sensitive files

### Updated Files:
- `api/subscribe.ts` - Backend API endpoint (completely rewritten)
- `services/supabaseClient.ts` - Supabase client initialization
- `package.json` - Added Supabase and Resend dependencies

## 🚀 Next Steps

### 1. Set Up Supabase (Database)
Go to [supabase.com](https://supabase.com):
- Create a new project
- Run the SQL from `database/schema.sql` in SQL Editor
- Get your API keys from Project Settings → API

### 2. Set Up Resend (Email)
Go to [resend.com](https://resend.com):
- Create an account
- Add and verify your domain: `boredtourist.com`
- Get your API key

### 3. Configure Environment Variables

#### Locally (.env file):
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_api_key
```

#### Vercel Dashboard:
Add the same variables in Settings → Environment Variables

### 4. Deploy
```bash
git add .
git commit -m "Add email subscription backend"
git push
```

Vercel will automatically deploy your changes.

## 📧 How It Works

### Frontend (Your existing form):
User enters their email → Calls `/api/subscribe`

### Backend (`api/subscribe.ts`):
1. Validates the email format
2. Checks if email already exists in database
3. If new: Saves to Supabase database
4. Sends beautiful welcome email via Resend
5. Returns success/error response

### Welcome Email:
- Professional HTML template with your branding
- Gradient header with "Welcome to Bored Tourist! 🌍"
- Call-to-action button
- Sent from: `onboarding@boredtourist.com`

## 💰 Cost

Both services have generous free tiers:

**Supabase Free Tier:**
- 500 MB database
- 50,000 monthly active users
- Perfect for getting started

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Plenty for a growing site

## 📊 Monitoring

### View Subscribers:
Supabase Dashboard → Table Editor → `subscribers` table

### View Sent Emails:
Resend Dashboard → Emails

### Database Stats:
Run in Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM subscribers WHERE status = 'active';
```

## 🔒 Security

✅ Environment variables stored securely in Vercel
✅ Service role key never exposed to frontend
✅ Email validation on server-side
✅ Duplicate prevention
✅ CORS properly configured
✅ Row Level Security enabled in database

## 🎨 Customization

### Change Welcome Email:
Edit the HTML template in `api/subscribe.ts` (line ~90)

### Add More Fields:
1. Update database schema in Supabase
2. Modify the API to accept additional fields
3. Update the frontend form

### Change Sender Email:
Modify the `from` field in `api/subscribe.ts` (must be @boredtourist.com)

## 🐛 Troubleshooting

### "Server misconfiguration" error:
- Check all environment variables are set in Vercel
- Redeploy after adding variables

### Emails not sending:
- Verify domain in Resend (all DNS records must be green)
- Check Resend dashboard for error logs
- Ensure sender email uses verified domain

### Database errors:
- Confirm schema was created in Supabase
- Check Supabase logs in dashboard
- Verify service role key is correct

## 📝 Full Documentation

See `SETUP.md` for detailed step-by-step instructions.

## ✨ Features

- ✅ Email validation
- ✅ Duplicate prevention
- ✅ Beautiful welcome emails
- ✅ Database storage
- ✅ Error handling
- ✅ CORS support
- ✅ TypeScript
- ✅ Serverless architecture
- ✅ Production-ready

---

**Need help?** Check the detailed `SETUP.md` guide!
