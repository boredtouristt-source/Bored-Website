import React from 'react';
import { LightningIcon, UsersIcon, ArrowRightIcon, DownloadIcon, PinIcon, BrainIcon } from './Icons';

export const Features: React.FC = () => {
  const scrollToSignup = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('signup');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="relative w-full bg-zinc-950 py-24 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-neon">The App</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            Swipe. Discover. <span className="text-gray-500 italic">Actually</span> Have Fun.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 items-center">
          
          {/* Left Feature Column */}
          <div className="flex flex-col gap-12">
            {/* Feature 1 */}
            <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <LightningIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Doomscroll for Adventure</h3>
              <p className="text-gray-400 leading-relaxed">
                The interface you know (TikTok style), applied to the world around you. Watch 15s clips of experiences, not just read boring reviews.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <UsersIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Curated by Locals, Not Agencies</h3>
              <p className="text-gray-400 leading-relaxed">
                We filter out the boring stuff. No generic "Yellow Bus" tours. Only authentic, high-energy experiences verified by our team.
              </p>
            </div>

            {/* Feature 3 (New) */}
            <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <DownloadIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">1 Tap Save from Socials</h3>
              <p className="text-gray-400 leading-relaxed">
                Import any experience you see on social media (Instagram, TikTok, etc.) with a single click.
              </p>
            </div>
          </div>

          {/* Center Phone Mockup */}
          <div className="relative flex justify-center z-10 animate-subtle-wiggle">
            {/* Floating stickers */}
            <div className="absolute -left-4 top-20 z-20 rotate-[-6deg] rounded bg-white px-4 py-2 shadow-xl animate-pulse">
              <div className="flex items-center gap-2">
                 <span className="text-xs font-black uppercase text-black">Video First</span>
              </div>
            </div>
            
            <div className="absolute -right-10 bottom-20 z-20 rotate-[3deg] bg-neon px-4 py-1 shadow-xl">
               <span className="text-xs font-black uppercase text-black">⚡ Instant Booking</span>
            </div>

            {/* Phone Body */}
            <div className="relative h-[600px] w-[300px] rounded-[3rem] border-[8px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="h-full w-full bg-zinc-800 relative overflow-hidden rounded-[2.5rem]">
                 <video 
                   className="h-full w-full object-cover scale-[1.02] origin-bottom" 
                   autoPlay 
                   muted 
                   loop 
                   playsInline
                 >
                   <source src="https://storage.googleapis.com/bored_tourist_media/videos/boredvideo.mov" type="video/mp4" />
                 </video>
                 
                 <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Right Feature Column */}
          <div className="flex flex-col gap-12">
            {/* Feature 4 (Replaced Tech-Powered with Context-Aware) */}
             <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <BrainIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Context-Aware Algorithmic Discovery</h3>
              <p className="text-gray-400 leading-relaxed">
                Our AI instantly builds perfect adventure recommendations by analyzing real-time local weather, the user's current mood, and immediate host availability.
              </p>
            </div>

            {/* Feature 5 (New) */}
             <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <PinIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">Live Adventure Map</h3>
              <p className="text-gray-400 leading-relaxed">
                A real-time, interactive map view showing pinned locations of high-rated experiences and where other Bored Tourist users are currently checking in.
              </p>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl bg-zinc-900 p-8 border border-zinc-800 hover:border-neon transition-colors">
              <h3 className="mb-4 text-xl font-bold text-white">Ready to ditch the guide book?</h3>
              <button onClick={scrollToSignup} className="group flex items-center gap-2 text-neon font-black uppercase tracking-wide text-sm hover:gap-4 transition-all cursor-pointer">
                Join The Waitlist <ArrowRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};