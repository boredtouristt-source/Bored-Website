# Bored Tourist - Backend Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│                    (React + Tailwind CSS)                        │
│                                                                   │
│  User visits boredtourist.com                                    │
│       ↓                                                          │
│  Scrolls to footer newsletter section                            │
│       ↓                                                          │
│  Enters email & clicks "Get Access"                              │
│       ↓                                                          │
│  POST /api/subscribe { email: "user@example.com" }              │
└───────────────────────────────┬─────────────────────────────────┘
                                 │
                                 │ HTTP Request
                                 ↓
┌─────────────────────────────────────────────────────────────────┐
│                   VERCEL SERVERLESS FUNCTION                     │
│                      (api/subscribe.ts)                          │
│                                                                   │
│  1. Validate email format ✓                                      │
│  2. Check for duplicate ──────────┐                              │
│  3. Store in database ────────────┤                              │
│  4. Send welcome email ───────────┼──┐                           │
│  5. Return success response       │  │                           │
└───────────────────────────────────┼──┼───────────────────────────┘
                                    │  │
                    ┌───────────────┘  └──────────────┐
                    │                                  │
                    ↓                                  ↓
    ┌──────────────────────────┐      ┌──────────────────────────┐
    │       SUPABASE           │      │        RESEND            │
    │    (PostgreSQL DB)       │      │    (Email Service)       │
    │                          │      │                          │
    │  subscribers table:      │      │  Sends welcome email:    │
    │  - id (UUID)             │      │  - From: onboarding@     │
    │  - email                 │      │    boredtourist.com      │
    │  - subscribed_at         │      │  - To: user@example.com  │
    │  - status                │      │  - Subject: Welcome!     │
    │  - created_at            │      │  - HTML template         │
    │                          │      │                          │
    │  Free Tier:              │      │  Free Tier:              │
    │  • 500MB storage         │      │  • 3,000 emails/month    │
    │  • 50k users             │      │  • 100 emails/day        │
    └──────────────────────────┘      └──────────────────────────┘
```

## Data Flow

### Successful Subscription Flow

```
1. User Input
   └─> "user@example.com" + Click "Get Access"

2. Frontend (Footer.tsx)
   └─> POST /api/subscribe
       Headers: { Content-Type: application/json }
       Body: { email: "user@example.com" }

3. Backend (api/subscribe.ts)
   ├─> Validate email format
   │   └─> ✓ Pass: Continue
   │       ✗ Fail: Return 400 "Invalid email format"
   │
   ├─> Check Supabase for existing email
   │   └─> Exists: Return 200 "Already subscribed!"
   │       Not exists: Continue
   │
   ├─> Insert into Supabase
   │   └─> INSERT INTO subscribers (email, subscribed_at, status)
   │       VALUES ('user@example.com', NOW(), 'active')
   │
   ├─> Send email via Resend
   │   └─> POST to Resend API
   │       From: onboarding@boredtourist.com
   │       To: user@example.com
   │       Subject: Welcome to Bored Tourist! 🌍
   │       Body: [Beautiful HTML template]
   │
   └─> Return success
       Response: { success: true, message: "Successfully subscribed!" }

4. Frontend Updates
   └─> Show success message: "You're on the list! ⚡"
       └─> "Check your inbox. We just sent some love."
```

### Duplicate Subscription Flow

```
1. User tries to subscribe with existing email
   └─> "existing@example.com"

2. Backend checks Supabase
   └─> Email found in database

3. Skip insert and email sending
   └─> Return: { success: true, message: "Already subscribed!" }

4. Frontend shows success
   └─> User knows they're already on the list
```

## File Structure

```
bored-tourist/
│
├── api/
│   └── subscribe.ts              # Serverless function (backend)
│
├── components/
│   └── Footer.tsx                # Newsletter signup form
│
├── services/
│   └── supabaseClient.ts         # Supabase client config
│
├── database/
│   └── schema.sql                # Database schema
│
├── docs/
│   ├── SETUP.md                  # Setup instructions
│   ├── README_BACKEND.md         # Backend overview
│   ├── DEPLOYMENT_CHECKLIST.md   # Deploy checklist
│   └── ARCHITECTURE.md           # This file
│
├── .env                          # Environment variables (local)
├── .env.example                  # Env template
├── vercel.json                   # Vercel config
└── package.json                  # Dependencies
```

## Environment Variables

### Frontend (VITE_* prefix - safe in browser)
```
VITE_SUPABASE_URL         → Supabase project URL
VITE_SUPABASE_ANON_KEY    → Public key for client-side
```

### Backend (No prefix - server-only)
```
SUPABASE_SERVICE_ROLE_KEY → Full access key (secret!)
RESEND_API_KEY            → Email service key (secret!)
```

## Security Model

### What's Public (Safe to expose):
- ✅ `VITE_SUPABASE_URL` - Just the URL
- ✅ `VITE_SUPABASE_ANON_KEY` - Protected by Row Level Security

### What's Private (Server-only):
- 🔒 `SUPABASE_SERVICE_ROLE_KEY` - Full database access
- 🔒 `RESEND_API_KEY` - Can send emails from your domain

### Protection Layers:
1. **Vercel Serverless** - Environment variables never exposed to browser
2. **Row Level Security** - Supabase policies control data access
3. **Email Validation** - Server-side format checking
4. **CORS** - Only your domain can call the API
5. **Unique Constraint** - Database prevents duplicate emails

## API Endpoints

### POST /api/subscribe

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Successfully subscribed! Check your email."
}
```

**Already Subscribed (200):**
```json
{
  "success": true,
  "message": "You are already subscribed!"
}
```

**Error Response (400):**
```json
{
  "message": "Invalid email format"
}
```

**Error Response (500):**
```json
{
  "message": "Internal Server Error"
}
```

## Database Schema

### subscribers table

| Column         | Type      | Description                    |
|----------------|-----------|--------------------------------|
| id             | UUID      | Primary key (auto-generated)   |
| email          | TEXT      | User email (unique)            |
| subscribed_at  | TIMESTAMP | When user subscribed           |
| status         | TEXT      | 'active' or 'unsubscribed'     |
| created_at     | TIMESTAMP | Record creation time           |

**Indexes:**
- Primary key on `id`
- Unique constraint on `email`
- Index on `email` for fast lookups

**Policies:**
- Service role can INSERT
- Service role can SELECT
- Row Level Security enabled

## Email Template

The welcome email includes:
- 📧 **From:** Bored Tourist <onboarding@boredtourist.com>
- 📝 **Subject:** Welcome to Bored Tourist! 🌍
- 🎨 **Design:**
  - Responsive HTML
  - Gradient header (purple)
  - Welcome message
  - Call-to-action button
  - Footer with branding

**Branding Colors:**
- Primary: `#667eea` → `#764ba2` (gradient)
- Background: `#f3f4f6`
- Text: `#374151`

## Deployment

### Local Development:
```bash
npm run dev           # Start Vite dev server
# Visits: http://localhost:3000
```

### Production (Vercel):
```bash
git push              # Auto-deploys to Vercel
# Live at: https://boredtourist.com
```

### Build Process:
1. Vercel detects push to repo
2. Installs dependencies
3. Builds with Vite
4. Deploys static assets + serverless functions
5. Routes /api/* to serverless functions

## Monitoring

### Supabase Dashboard:
- View all subscribers
- Query database
- Check API usage
- Monitor logs

### Resend Dashboard:
- Email delivery status
- Open/click rates (if enabled)
- Bounces/complaints
- API usage

### Vercel Dashboard:
- Function logs
- Error tracking
- Performance metrics
- Deployment history

## Scaling Considerations

### Current Limits (Free Tiers):
- 🗄️ **Database:** 500MB, 50k users
- 📧 **Emails:** 3,000/month, 100/day
- ⚡ **Functions:** 100GB bandwidth, 100h runtime

### When to Upgrade:
- Database > 500MB → Supabase Pro ($25/mo)
- Emails > 3,000/mo → Resend Scale ($20/mo)
- High traffic → Vercel Pro ($20/mo)

### Performance:
- ⚡ Serverless functions: ~100ms response time
- 📊 Database queries: ~50ms average
- 📧 Email sending: ~200ms API call
- **Total:** ~350ms end-to-end

## Future Enhancements

### Possible Additions:
1. **Unsubscribe Flow**
   - Add unsubscribe link to emails
   - Create unsubscribe page
   - Update status in database

2. **Email Campaigns**
   - Send updates to all subscribers
   - Segment by subscription date
   - Track engagement

3. **Admin Dashboard**
   - View subscriber count
   - Export CSV of emails
   - Send test emails

4. **Analytics**
   - Track signup sources
   - Measure conversion rates
   - Email open rates

5. **Double Opt-in**
   - Send confirmation email
   - Verify email before activation
   - Reduce spam signups

---

**This architecture is:**
- ✅ Scalable
- ✅ Secure
- ✅ Cost-effective
- ✅ Easy to maintain
- ✅ Production-ready
