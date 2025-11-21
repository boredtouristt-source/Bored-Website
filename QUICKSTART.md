# ⚡ Quick Start Guide

**Get your email subscription backend running in 15 minutes!**

---

## 🚀 Step 1: Supabase (5 minutes)

1. Go to **[supabase.com](https://supabase.com)** → Sign up
2. Click **"New Project"**
   - Name: `bored-tourist`
   - Password: (save this!)
   - Region: Choose closest to your users
3. Wait for project to initialize
4. Go to **SQL Editor** → Click **"New Query"**
5. Copy-paste content from `database/schema.sql`
6. Click **"Run"**
7. Go to **Settings** → **API**
8. Copy these 3 values:
   ```
   Project URL          → Save as SUPABASE_URL
   anon public key      → Save as SUPABASE_ANON_KEY
   service_role key     → Save as SUPABASE_SERVICE_ROLE_KEY
   ```

✅ **Supabase Done!**

---

## 📧 Step 2: Resend (5 minutes)

1. Go to **[resend.com](https://resend.com)** → Sign up
2. Click **"Domains"** → **"Add Domain"**
3. Enter: `boredtourist.com`
4. Copy the DNS records shown
5. Go to your **domain registrar** (where you bought the domain)
6. Add these DNS records:
   - SPF (TXT)
   - DKIM (TXT)
   - DMARC (TXT)
7. Back in Resend, wait for verification (5-30 mins)
8. Go to **"API Keys"** → **"Create API Key"**
   - Name: `Production`
   - Permission: Sending access
9. Copy the key → Save as `RESEND_API_KEY`

✅ **Resend Done!**

---

## 🔑 Step 3: Add Environment Variables (3 minutes)

### Vercel (Production):
1. Go to **[vercel.com](https://vercel.com)** dashboard
2. Select your **boredtourist.com** project
3. Go to **Settings** → **Environment Variables**
4. Add these 4 variables (click "Add" for each):

| Key                          | Value                        | Environment |
|------------------------------|------------------------------|-------------|
| `VITE_SUPABASE_URL`          | Your Supabase Project URL    | All         |
| `VITE_SUPABASE_ANON_KEY`     | Your Supabase anon key       | All         |
| `SUPABASE_SERVICE_ROLE_KEY`  | Your Supabase service key    | All         |
| `RESEND_API_KEY`             | Your Resend API key          | All         |

✅ **Variables Added!**

---

## 🚢 Step 4: Deploy (2 minutes)

### Terminal:
```bash
cd "/Users/francisalbu/Documents/Bored Tourist Website"
git add .
git commit -m "Add email subscription backend"
git push
```

Vercel will automatically:
- ✅ Build your project
- ✅ Deploy serverless functions
- ✅ Make it live at boredtourist.com

✅ **Deployed!**

---

## ✅ Step 5: Test It!

1. Visit **https://boredtourist.com**
2. Scroll to footer
3. Enter your email
4. Click **"Get Access"**
5. Should see: **"You're on the list! ⚡"**
6. Check your **email inbox** for welcome message
7. Check **Supabase dashboard** → Table Editor → `subscribers`

✅ **Working!**

---

## 🎉 You're Done!

Your backend is now:
- ✅ Storing emails in database
- ✅ Sending welcome emails automatically
- ✅ Preventing duplicates
- ✅ Fully secured

---

## 📊 Where to Check Things

| What to Check        | Where to Go                                    |
|---------------------|------------------------------------------------|
| Subscribers         | Supabase → Table Editor → `subscribers`        |
| Email delivery      | Resend → Emails                                |
| Function logs       | Vercel → Your Project → Logs                   |
| Environment vars    | Vercel → Settings → Environment Variables      |

---

## 🆘 Something Not Working?

### Email not arriving?
→ Check Resend dashboard → Make sure domain is verified (green checkmarks)

### Error message on submit?
→ Check Vercel logs → Your Project → Deployments → Latest → Logs

### Database error?
→ Check Supabase → SQL Editor → Make sure schema.sql was run

### "Server misconfiguration"?
→ Check Vercel → Settings → Make sure all 4 environment variables are set

---

## 📚 More Help

- **Detailed Setup:** Read `SETUP.md`
- **System Overview:** Read `README_BACKEND.md`
- **Full Checklist:** Read `DEPLOYMENT_CHECKLIST.md`
- **Architecture:** Read `ARCHITECTURE.md`

---

**That's it! Your backend is live! 🎊**
