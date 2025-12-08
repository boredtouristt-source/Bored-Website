
import React, { useState } from 'react';
import { ArrowRightIcon } from './Icons';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Legal Modal State
  const [activeLegal, setActiveLegal] = useState<'terms' | 'privacy' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setErrorMessage('');

    try {
      // Call our serverless function (api/subscribe.ts)
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setStatus('success');
      setEmail('');
      
      // Reset status after a few seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error: any) {
      console.error('Subscription Error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <footer className="w-full">
      {/* Main Launch Section */}
      <div id="signup" className="w-full bg-neon py-24 md:py-32 px-6 overflow-hidden relative">
        
         {/* Scrolling Marquee Background */}
         <div className="absolute top-0 left-0 w-full overflow-hidden opacity-10 pointer-events-none select-none">
            <div className="flex whitespace-nowrap">
               <div className="flex animate-marquee">
                  <span className="text-[10vw] leading-none font-black uppercase text-black mx-4">BOREDTOURIST.COM</span>
                  <span className="text-[10vw] leading-none font-black uppercase text-black mx-4">BOREDTOURIST.COM</span>
               </div>
               <div className="flex animate-marquee">
                  <span className="text-[10vw] leading-none font-black uppercase text-black mx-4">BOREDTOURIST.COM</span>
                  <span className="text-[10vw] leading-none font-black uppercase text-black mx-4">BOREDTOURIST.COM</span>
               </div>
            </div>
         </div>

        <div className="container mx-auto max-w-5xl text-center relative">
           <h2 className="relative z-10 mb-6 text-6xl md:text-8xl font-black uppercase tracking-tighter text-black">
             {t.footer.title}
           </h2>
           
           <p className="relative z-10 mx-auto mb-12 max-w-2xl text-lg md:text-xl font-medium text-black/80 leading-relaxed">
             {t.footer.description}
           </p>

           {status === 'success' ? (
              <div className="relative z-10 mx-auto max-w-md rounded-lg bg-black p-8 text-white animate-pulse shadow-2xl">
                <p className="text-2xl font-black uppercase text-neon mb-2">{t.footer.emailSuccess}</p>
                <p className="text-sm text-gray-300">{t.footer.emailSuccessDesc}</p>
              </div>
           ) : (
             <form onSubmit={handleSubmit} className="relative z-10 mx-auto flex max-w-md flex-col gap-4 md:flex-row">
               <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  placeholder={t.footer.emailPlaceholder}
                  className="flex-1 rounded-lg border-2 border-black/10 bg-black/5 px-6 py-4 text-black placeholder-black/50 focus:border-black focus:outline-none focus:bg-transparent font-bold transition-colors disabled:opacity-50"
               />
               <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="flex items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 font-black uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-70 min-w-[160px]"
               >
                 {status === 'submitting' ? t.footer.submitting : t.footer.emailButton} 
                 {status !== 'submitting' && <ArrowRightIcon className="h-4 w-4" />}
               </button>
             </form>
           )}
           
           {status === 'error' && (
             <p className="relative z-10 mt-4 text-sm font-bold text-red-600 bg-red-100 inline-block px-4 py-2 rounded-md border border-red-200">
               {errorMessage}
             </p>
           )}

           <p className="relative z-10 mt-6 text-[10px] font-black uppercase tracking-widest text-black/60">
             {t.footer.limitedSpots}
           </p>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="bg-black py-12 px-6 border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <a href="https://boredtourist.com" className="text-2xl font-black tracking-tighter text-white uppercase hover:text-neon transition-colors">
             Bored Tourist
           </a>
           
           <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-gray-500 items-center flex-wrap">
              <a href="https://instagram.com/bored_tourist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t.footer.instagram}</a>
              <span className="text-gray-700">|</span>
              <button onClick={() => setActiveLegal('terms')} className="hover:text-white transition-colors uppercase">{t.footer.terms}</button>
              <button onClick={() => setActiveLegal('privacy')} className="hover:text-white transition-colors uppercase">{t.footer.privacy}</button>
              <span className="text-gray-700">|</span>
              <span className="text-gray-700">{t.footer.location}</span>
           </div>
        </div>
      </div>

      {/* Legal Modal Overlay */}
      {activeLegal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setActiveLegal(null)}>
          <div className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setActiveLegal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {activeLegal === 'terms' && (
              <div className="prose prose-invert prose-sm">
                <h2 className="text-2xl font-black text-neon uppercase mb-6">Terms & Conditions</h2>
                
                <h3 className="text-white font-bold">1. Introduction and Scope</h3>
                <p>Bored Tourist is a digital marketplace that connects travellers with hosts and local experience providers. By using our platform, users agree to abide by these Terms & Conditions.</p>

                <h3 className="text-white font-bold">2. Role of Bored Tourist</h3>
                <p>Bored Tourist acts solely as a marketplace and technology facilitator. We do not operate or manage any experiences directly, unless explicitly stated otherwise, nor do we accept responsibility or liability for the actions of hosts or the nature/quality of the experiences provided.</p>

                <h3 className="text-white font-bold">3. Booking and Payments</h3>
                <p>When booking an activity, the user enters into an agreement directly with the experience provider (host/partner). Payment is processed via our platform, and confirmation is provided upon completion of payment.</p>

                <h3 className="text-white font-bold">4. User Responsibilities</h3>
                <p>Users are responsible for providing accurate information during booking and for respecting the host’s activity requirements (e.g., arrival time, dress code). Any breach may result in denied access or cancellation without refund.</p>

                <h3 className="text-white font-bold">5. Hosts’/Partners’ Responsibilities</h3>
                <p>Hosts are responsible for delivering the experience as described, unless a legitimate reason for cancellation arises. Hosts reserve the right to cancel activities and are responsible for informing Bored Tourist and affected users in a timely manner.</p>

                <h3 className="text-white font-bold">6. Cancellation and Refund Policy</h3>
                <p>See specific activity details for cancellation policies.</p>

                <h3 className="text-white font-bold">7. Limitation of Liability</h3>
                <p>Bored Tourist does not assume liability for injuries, losses, or damages sustained during any experience, nor for expenses related to travel, accommodation, or other bookings made in connection with an activity.</p>

                <h3 className="text-white font-bold">8. Changes and Force Majeure</h3>
                <p>Bored Tourist and its partners reserve the right to alter, reschedule, or cancel activities due to unforeseen circumstances or force majeure. Where possible, alternatives or full refunds will be offered for affected bookings.</p>

                <h3 className="text-white font-bold">9. Data Protection</h3>
                <p>Personal information will be processed according to our Privacy Policy, compliant with the applicable GDPR standards.</p>

                <h3 className="text-white font-bold">10. Governing Law</h3>
                <p>These Terms & Conditions are governed by the laws of Portugal, except where superseded by EU statutory regulations.</p>
              </div>
            )}

            {activeLegal === 'privacy' && (
              <div className="prose prose-invert prose-sm">
                <h2 className="text-2xl font-black text-neon uppercase mb-6">Privacy Policy</h2>
                <p className="text-xs text-gray-500 mb-4">Last updated: November 22, 2025</p>

                <h3 className="text-white font-bold">1. Information We Collect</h3>
                <p>We collect information that you provide directly to us, including: Name and contact information, Email address, Payment information, Booking history, Reviews and ratings, and Location data (with your permission).</p>

                <h3 className="text-white font-bold">2. How We Use Your Information</h3>
                <p>We use the information we collect to: Process your bookings and payments, Send booking confirmations and updates, Provide customer support, Personalize your experience, Send marketing communications (with your consent), and Improve our services.</p>

                <h3 className="text-white font-bold">3. Information Sharing</h3>
                <p>We share your information with: Experience providers to facilitate your bookings, Payment processors to handle transactions, Service providers who assist in operating our platform, and Law enforcement when required by law.</p>

                <h3 className="text-white font-bold">4. Data Security</h3>
                <p>We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.</p>

                <h3 className="text-white font-bold">5. Your Rights</h3>
                <p>You have the right to: Access your personal information, Correct inaccurate data, Request deletion of your data, Object to processing of your data, and Withdraw consent at any time.</p>

                <h3 className="text-white font-bold">6. Cookies and Tracking</h3>
                <p>We use cookies and similar technologies to enhance your experience, analyze usage patterns, and deliver personalized content.</p>

                <h3 className="text-white font-bold">7. Children's Privacy</h3>
                <p>Our Service is not intended for children under 16. We do not knowingly collect personal information from children under 16.</p>

                <h3 className="text-white font-bold">8. Changes to This Policy</h3>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>

                <h3 className="text-white font-bold">9. Contact Us</h3>
                <p>If you have questions about this Privacy Policy, please contact us at: <a href="mailto:bookings@boredtourist.com" className="text-neon">bookings@boredtourist.com</a></p>
              </div>
            )}
            
          </div>
        </div>
      )}
    </footer>
  );
};
