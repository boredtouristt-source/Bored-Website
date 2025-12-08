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
          
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
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

            <p className="text-xl text-gray-400 font-medium mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Stop taking screenshots you'll never look at again. 
              Share any reel or post from Instagram or TikTok directly to Bored Tourist, 
              and our AI instantly builds the itinerary for you.
            </p>

            <button 
              onClick={scrollToSignup} 
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-wider hover:bg-neon transition-all hover:scale-105"
            >
              Get Early Access
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right: Visual */}
          <div className="flex-1 relative order-1 lg:order-2 flex justify-center">
             {/* Decorative Elements */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-neon/20 to-transparent blur-3xl rounded-full pointer-events-none"></div>

             {/* Phone Mockup */}
             <div className="relative h-[650px] w-[320px] rounded-[3.5rem] border-[8px] border-zinc-800 bg-black shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-700">
                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-28 bg-black rounded-b-2xl z-30"></div>
                
                {/* Screen Content */}
                <div className="h-full w-full bg-zinc-900 rounded-[3rem] overflow-hidden relative group">
                  <video 
                     className="h-full w-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                     autoPlay 
                     muted 
                     loop 
                     playsInline
                   >
                     {/* Placeholder for social video - reusing the loop for now */}
                     <source src="https://storage.googleapis.com/bored_tourist_media/videos/Lisbon_Tourist_Loop_Video.mp4" type="video/mp4" />
                   </video>

                   {/* UI Overlay: Simulating "Saved" state */}
                   <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none">
                      {/* Fake Social UI Header */}
                      <div className="absolute top-12 left-6 right-6 flex justify-between items-center text-white/80">
                         <div className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-md"></div>
                         <div className="h-1 w-12 rounded-full bg-white/20 backdrop-blur-md"></div>
                      </div>

                      {/* The "Magic" Notification */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
                         <div className="bg-zinc-900/90 backdrop-blur-xl border border-neon/50 p-4 rounded-2xl shadow-2xl transform translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                            <div className="flex items-center gap-3 mb-3">
                               <div className="bg-neon text-black p-2 rounded-lg">
                                  <ShareIcon className="h-5 w-5" />
                               </div>
                               <div>
                                  <p className="text-white font-bold text-sm leading-tight">Imported from Instagram</p>
                                  <p className="text-gray-400 text-xs">Analysis complete</p>
                               </div>
                            </div>
                            <div className="bg-black/50 p-3 rounded-lg border border-white/10">
                               <p className="text-neon text-xs font-bold uppercase mb-1">Added to Itinerary</p>
                               <p className="text-white text-sm font-semibold truncate">Hidden Rooftop Bar, Lisbon...</p>
                            </div>
                         </div>
                      </div>

                      {/* Fake Social UI Footer */}
                      <div className="absolute bottom-10 left-6 text-white">
                         <p className="font-bold text-sm mb-1">@lisbon_secrets</p>
                         <p className="text-xs text-gray-300 max-w-[200px] truncate">You have to try this spot! The view is insane...</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};