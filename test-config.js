// Test script to verify all configurations
// Run with: node test-config.js

async function testSupabase() {
  console.log('🔍 Testing Supabase connection...');
  
  const { createClient } = require('@supabase/supabase-js');
  
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  console.log('URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
  console.log('Key:', supabaseKey ? '✅ Set' : '❌ Missing');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Supabase env vars missing!');
    return false;
  }
  
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test table exists
    const { data, error } = await supabase
      .from('subscribers')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ Supabase error:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connected successfully!');
    return true;
  } catch (err) {
    console.error('❌ Supabase connection failed:', err.message);
    return false;
  }
}

async function testResend() {
  console.log('\n📧 Testing Resend configuration...');
  
  const { Resend } = require('resend');
  
  const resendKey = process.env.RESEND_API_KEY;
  
  console.log('API Key:', resendKey ? '✅ Set' : '❌ Missing');
  
  if (!resendKey) {
    console.error('❌ Resend API key missing!');
    return false;
  }
  
  try {
    const resend = new Resend(resendKey);
    
    // Test API key is valid (this will fail but tells us if key is valid)
    const { data, error } = await resend.domains.list();
    
    if (error && error.message.includes('Invalid API key')) {
      console.error('❌ Invalid Resend API key!');
      return false;
    }
    
    console.log('✅ Resend API key is valid!');
    
    if (data && data.length > 0) {
      console.log('📋 Your domains:', data.map(d => `${d.name} (${d.status})`).join(', '));
    }
    
    return true;
  } catch (err) {
    console.error('❌ Resend error:', err.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting configuration tests...\n');
  
  const supabaseOk = await testSupabase();
  const resendOk = await testResend();
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTS:');
  console.log('Supabase:', supabaseOk ? '✅ OK' : '❌ FAILED');
  console.log('Resend:', resendOk ? '✅ OK' : '❌ FAILED');
  console.log('='.repeat(50));
  
  if (supabaseOk && resendOk) {
    console.log('\n✅ All systems go! Your backend should work.');
  } else {
    console.log('\n❌ Fix the failed items above.');
  }
}

runTests().catch(console.error);
