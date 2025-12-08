-- Create subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'subscribed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts
CREATE POLICY "Allow public inserts" ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow reads (optional, for admin purposes)
CREATE POLICY "Allow authenticated reads" ON subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
