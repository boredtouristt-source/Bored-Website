# 🚀 Deployment Checklist

Follow this checklist to deploy your email subscription backend:

## ☑️ Before Deployment

### 1. Supabase Setup
- [ ] Created Supabase account at supabase.com
- [ ] Created new project "bored-tourist"
- [ ] Ran SQL schema from `database/schema.sql` in SQL Editor
- [ ] Verified `subscribers` table exists in Table Editor
- [ ] Copied Project URL
- [ ] Copied anon (public) key
- [ ] Copied service_role key (kept secure!)

### 2. Resend Setup
- [ ] Created Resend account at resend.com
- [ ] Added domain: boredtourist.com
- [ ] Added all DNS records to domain registrar:
  - [ ] SPF (TXT)
  - [ ] DKIM (TXT)  
  - [ ] DMARC (TXT)
- [ ] Verified domain is fully verified (all green checkmarks)
- [ ] Created API key
- [ ] Saved API key securely

### 3. Environment Variables

#### Local Development:
- [ ] Created `.env` file in project root
- [ ] Added `VITE_SUPABASE_URL`
- [ ] Added `VITE_SUPABASE_ANON_KEY`
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Added `RESEND_API_KEY`
- [ ] Verified `.env` is in `.gitignore`

#### Vercel Production:
- [ ] Logged into Vercel dashboard
- [ ] Selected boredtourist.com project
- [ ] Went to Settings → Environment Variables
- [ ] Added `VITE_SUPABASE_URL` (all environments)
- [ ] Added `VITE_SUPABASE_ANON_KEY` (all environments)
- [ ] Added `SUPABASE_SERVICE_ROLE_KEY` (all environments)
- [ ] Added `RESEND_API_KEY` (all environments)

## ☑️ Deploy

### 1. Commit Changes
```bash
cd "/Users/francisalbu/Documents/Bored Tourist Website"
git add .
git commit -m "Add email subscription backend with Supabase and Resend"
git push
```

### 2. Verify Deployment
- [ ] Check Vercel dashboard for successful deployment
- [ ] No build errors
- [ ] All environment variables showing in Vercel

## ☑️ Testing

### 1. Test Locally First
```bash
npm run dev
```
- [ ] Navigate to http://localhost:3000
- [ ] Scroll to footer newsletter section
- [ ] Enter your email
- [ ] Click "Get Access"
- [ ] Should see success message
- [ ] Check Supabase table for new entry
- [ ] Check email inbox for welcome email

### 2. Test Production
- [ ] Visit https://boredtourist.com
- [ ] Test newsletter signup with different email
- [ ] Verify success message appears
- [ ] Check Supabase dashboard for new subscriber
- [ ] Check Resend dashboard for sent email
- [ ] Verify email arrives in inbox

### 3. Test Edge Cases
- [ ] Try submitting same email twice (should show "already subscribed")
- [ ] Try invalid email format (should show error)
- [ ] Try empty email (should show validation error)

## ☑️ Monitoring

### Set Up Monitoring
- [ ] Bookmark Supabase dashboard
- [ ] Bookmark Resend dashboard
- [ ] Check subscriber count daily
- [ ] Monitor email delivery rate

### First Week Checks
- [ ] Day 1: Verify test emails work
- [ ] Day 2: Check first real signups
- [ ] Day 3: Verify all emails delivered
- [ ] Day 7: Review subscriber stats

## ☑️ Optional Enhancements

### Nice to Have
- [ ] Add unsubscribe link to email template
- [ ] Set up Supabase backup schedule
- [ ] Create subscriber export script
- [ ] Add email analytics tracking
- [ ] Set up Resend webhook for delivery status
- [ ] Create admin dashboard to view subscribers

## 🆘 Troubleshooting

If something doesn't work:

1. **Check Vercel Logs:**
   - Vercel Dashboard → Your Project → Deployments → Latest → Logs

2. **Check Supabase Logs:**
   - Supabase Dashboard → Logs → Filter by "Error"

3. **Check Resend Logs:**
   - Resend Dashboard → Emails → Check status

4. **Common Issues:**
   - Environment variables not set → Add them in Vercel
   - Domain not verified → Wait for DNS propagation
   - Email not sending → Check sender email uses verified domain
   - Database error → Verify SQL schema was run

## 📊 Success Metrics

After 1 week, you should have:
- ✅ At least 1 successful test subscription
- ✅ Welcome email delivered successfully
- ✅ No errors in Vercel logs
- ✅ Database storing emails correctly
- ✅ Frontend showing success messages

## 🎉 You're Done!

Once all checkboxes are marked, your backend is live and working!

**Next Steps:**
- Share your website
- Monitor signups
- Prepare for launch
- Send updates to subscribers

---

**Questions?** Check `SETUP.md` for detailed instructions or `README_BACKEND.md` for an overview.
