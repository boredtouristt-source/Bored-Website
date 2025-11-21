-- Bored Tourist Database Schema
-- Run this in your Supabase SQL Editor

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

-- Optional: Add a view to see subscriber statistics
CREATE OR REPLACE VIEW subscriber_stats AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(CASE WHEN status = 'active' THEN 1 END) as active_subscribers,
  DATE_TRUNC('day', subscribed_at) as subscription_date,
  COUNT(*) as daily_signups
FROM subscribers
GROUP BY DATE_TRUNC('day', subscribed_at)
ORDER BY subscription_date DESC;
