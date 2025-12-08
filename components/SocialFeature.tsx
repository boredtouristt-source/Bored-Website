import React from 'react';
import { ArrowRightIcon, InstagramIcon, ShareIcon } from './Icons';

export const SocialFeature: React.FC = () => {
  const scrollToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('signup');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-900">
      {/* Background Ambience */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] bg-neon/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          
          {/* Title Section - Order 1 on mobile */}
          <div className="w-full text-center lg:text-left order-1 lg:order-1 lg:flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-neon/30 bg-neon/10 px-4 py-1.5 mb-6 backdrop-blur-md">
              <InstagramIcon className="h-4 w-4 text-neon" />
              <span className="text-xs font-black uppercase text-neon tracking-widest">The Game Changer</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-[0.9]">
              See it on <br />
              <span className="text-neon">Socials.</span> <br />
              Do it in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Real Life.</span>
            </h2>

            {/* Description and CTA - visible on desktop, hidden on mobile */}
            <div className="hidden lg:block">
              <p className="text-xl text-gray-400 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Stop taking screenshots you'll never look at again. 
                Share any reel or post from Instagram or TikTok directly to Bored Tourist, 
                and our AI instantly match it to bookable adventures near you.
              </p>

              <button 
                onClick={scrollToSignup} 
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-neon transition-all hover:scale-105"
              >
                Get Early Access
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Phone Mockup - Order 2 on mobile */}
          <div className="flex-1 relative order-2 lg:order-2 flex justify-center animate-subtle-wiggle">
             {/* Phone Mockup */}
             <div className="relative h-[650px] w-[320px] rounded-[3.5rem] border-[8px] border-zinc-800 bg-black shadow-2xl">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-30"></div>
                
                {/* Screen Content */}
                <div className="h-full w-full bg-zinc-900 rounded-[3rem] overflow-hidden relative">
                  <video 
                     className="h-full w-full object-cover" 
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                     webkit-playsinline="true"
                   >
                     <source src="https://storage.googleapis.com/bored_tourist_media/Website/example1%202.mov" type="video/mp4" />
                   </video>
                   
                   {/* Top overlay to hide status bar from screen recording */}
                   <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
                </div>
             </div>
          </div>

          {/* Description and CTA - Order 3 on mobile, hidden on desktop */}
          <div className="w-full text-center lg:hidden order-3">
            <p className="text-xl text-gray-400 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
              Stop taking screenshots you'll never look at again. 
              Share any reel or post from Instagram or TikTok directly to Bored Tourist, 
              and our AI instantly match it to bookable adventures near you.
            </p>

            <button 
              onClick={scrollToSignup} 
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-neon transition-all hover:scale-105"
            >
              Get Early Access
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};