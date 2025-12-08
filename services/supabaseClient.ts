
import { createClient } from '@supabase/supabase-js';

// Ensure these are set in your Vercel Environment Variables or local .env file
// Fallback provided for URL, but KEY must be correct (starts with eyJ...)
const supabaseUrl = process.env.SUPABASE_URL || 'https://hpfudnucopawxfoxeotv.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhwZnVkbnVjb3Bhd3hmb3hlb3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2Nzk0MTEsImV4cCI6MjA3OTI1NTQxMX0.J0x62lQi4Rg7A-LfiS1YmC-TBv1H8FT_1IR9arAZTq8';

if (!supabaseKey) {
  console.warn('Supabase Anon Key is missing. Check your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseKey);
