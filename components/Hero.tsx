import React from 'react';
import { LogoIcon, PlayIcon } from './Icons';
import { useLanguage } from '../LanguageContext';

export const Hero: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  
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
          <source src="https://storage.googleapis.com/bored_tourist_media/videos/Lisbon_Tourist_Loop_Video.mp4" type="video/mp4" />
        </video>
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="https://boredtourist.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="https://storage.googleapis.com/bored_tourist_media/Website/splash-logo.png" alt="Bored Tourist" className="h-10 w-10" />
          <span className="text-xl font-black tracking-tighter text-white">BORED TOURIST</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide text-white">
          <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="hover:text-neon transition-colors cursor-pointer">{t.nav.howItWorks}</a>
          {/* Language Selector */}
          <select 
            className="bg-zinc-900/90 backdrop-blur-md border border-white/20 text-white px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer hover:bg-neon/20 transition-colors focus:bg-zinc-900/90"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'pt')}
            style={{ backgroundColor: '#18181b' }}
          >
            <option value="en">🇬🇧 EN</option>
            <option value="pt">🇵🇹 PT</option>
          </select>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center mt-[-80px]">
        {/* Main Heading */}
        <h1 className="mb-4 text-7xl font-black uppercase tracking-tighter text-white md:text-9xl drop-shadow-2xl">
          BORED<br />
          <span className="text-neon">TOURIST</span>
        </h1>

        {/* Subheading */}
        <p className="mb-10 max-w-xl text-lg md:text-xl text-gray-200 font-medium">
          {t.hero.tagline}
        </p>

        {/* CTA Group */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <a 
            href="https://apps.apple.com/pt/app/bored-tourist/id6755624970"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neon text-black px-8 py-4 text-lg font-black uppercase tracking-wider hover:bg-white transition-colors shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
          >
            {t.hero.cta}
          </a>
        </div>
      </div>
    </div>
  );
};