
import React, { useState } from 'react';
import { ArrowRightIcon } from './Icons';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

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
             Don't miss it.
           </h2>
           
           <p className="relative z-10 mx-auto mb-12 max-w-2xl text-lg md:text-xl font-medium text-black/80 leading-relaxed">
             We are launching in Lisbon early next year. Get early access, beta features, and a free drink on us when you book your first experience.
           </p>

           {status === 'success' ? (
              <div className="relative z-10 mx-auto max-w-md rounded-lg bg-black p-8 text-white animate-pulse shadow-2xl">
                <p className="text-2xl font-black uppercase text-neon mb-2">You're on the list! ⚡</p>
                <p className="text-sm text-gray-300">Check your inbox. We just sent some chaos.</p>
              </div>
           ) : (
             <form onSubmit={handleSubmit} className="relative z-10 mx-auto flex max-w-md flex-col gap-4 md:flex-row">
               <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'submitting'}
                  placeholder="enter your email" 
                  className="flex-1 rounded-lg border-2 border-black/10 bg-black/5 px-6 py-4 text-black placeholder-black/50 focus:border-black focus:outline-none focus:bg-transparent font-bold transition-colors disabled:opacity-50"
               />
               <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="flex items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 font-black uppercase tracking-wider text-white hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-70 min-w-[160px]"
               >
                 {status === 'submitting' ? 'Saving...' : 'Get Access'} 
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
             Limited Spots Available For Beta
           </p>
        </div>
      </div>

      {/* Bottom Legal */}
      <div className="bg-black py-12 px-6 border-t border-zinc-900">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
           <a href="https://boredtourist.com" className="text-2xl font-black tracking-tighter text-white uppercase hover:text-neon transition-colors">
             Bored Tourist
           </a>
           
           <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-gray-500 items-center">
              <a href="https://instagram.com/bored_tourist" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
              <span className="text-gray-700">|</span>
              <span className="text-gray-700">Lisbon, Portugal</span>
           </div>
        </div>
      </div>
    </footer>
  );
};
