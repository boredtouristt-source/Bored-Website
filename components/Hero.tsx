import React from 'react';
import { LogoIcon, PlayIcon } from './Icons';

export const Hero: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden font-sans">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          className="h-full w-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
        >
          <source src="https://storage.googleapis.com/bored_tourist_media/Website/example1%202.mov" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="https://boredtourist.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <LogoIcon className="h-10 w-10 text-xl" />
          <span className="text-xl font-black tracking-tighter text-white">BORED TOURIST</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-white">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-neon transition-colors cursor-pointer">HOW IT WORKS</a>
          <a href="#vibecheck" onClick={(e) => scrollToSection(e, 'vibecheck')} className="hover:text-neon transition-colors cursor-pointer">VIBE CHECK</a>
          <button 
            onClick={(e) => scrollToSection(e, 'signup')} 
            className="bg-white text-black px-6 py-3 font-black uppercase tracking-wider hover:bg-neon transition-colors clip-path-polygon cursor-pointer"
          >
            Get Early Access
          </button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center mt-[-80px]">
        {/* Travelers Pill */}
        <div className="mb-6 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20">
          <div className="flex -space-x-2">
             <img className="h-6 w-6 rounded-full border border-black" src="https://picsum.photos/id/64/50/50" alt="User" />
             <img className="h-6 w-6 rounded-full border border-black" src="https://picsum.photos/id/91/50/50" alt="User" />
             <img className="h-6 w-6 rounded-full border border-black" src="https://picsum.photos/id/177/50/50" alt="User" />
          </div>
          <span className="text-xs font-bold text-white tracking-wider">JOIN 2,400+ TRAVELERS</span>
        </div>

        {/* Main Heading */}
        <h1 className="mb-4 text-7xl font-black uppercase tracking-tighter text-white md:text-9xl drop-shadow-2xl">
          BORED<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon to-green-400">TOURIST</span>
        </h1>

        {/* Subheading */}
        <p className="mb-10 max-w-xl text-lg md:text-xl text-gray-200 font-medium">
          Boredom Is a Choice. We Are The Cure.
        </p>

        {/* CTA Group */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <button 
            onClick={(e) => scrollToSection(e, 'signup')} 
            className="bg-neon text-black px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
          >
            Join The Waitlist
          </button>
          <button 
            onClick={(e) => scrollToSection(e, 'vibecheck')}
            className="flex items-center gap-3 border border-white/30 bg-black/40 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm hover:bg-black/60 transition-all cursor-pointer"
          >
            <PlayIcon className="h-4 w-4" />
            Watch the Vibe
          </button>
        </div>
      </div>
    </div>
  );
};