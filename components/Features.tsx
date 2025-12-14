import React from 'react';
import { LightningIcon, UsersIcon, ArrowRightIcon, DownloadIcon, PinIcon, BrainIcon } from './Icons';
import { useLanguage } from '../LanguageContext';

export const Features: React.FC = () => {
  const { t } = useLanguage();
  
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
          <span className="mb-4 inline-block text-sm font-bold uppercase tracking-widest text-neon">{t.features.title}</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white">
            {t.features.heading} <span className="text-gray-500 italic">{t.features.headingItalic}</span> {t.features.headingEnd}
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
              <h3 className="mb-2 text-2xl font-bold text-white">{t.features.feature1Title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t.features.feature1Desc}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <UsersIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t.features.feature2Title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t.features.feature2Desc}
              </p>
            </div>

            {/* Feature 3 (New) */}
            <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <DownloadIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t.features.feature3Title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t.features.feature3Desc}
              </p>
            </div>
          </div>

          {/* Center Phone Mockup */}
          <div className="relative flex justify-center z-10 animate-subtle-wiggle">
            {/* Phone Body */}
            <div className="relative h-[600px] w-[300px] rounded-[3rem] border-[8px] border-zinc-800 bg-zinc-900 shadow-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="h-full w-full bg-zinc-800 relative overflow-hidden rounded-[2.5rem]">
                 <video 
                   className="h-full w-full object-cover" 
                   autoPlay 
                   muted 
                   loop 
                   playsInline
                   webkit-playsinline="true"
                 >
                   <source src="https://storage.googleapis.com/bored_tourist_media/Website/example23.mov" type="video/mp4" />
                 </video>
                 
                 {/* Top overlay to hide status bar from screen recording */}
                 <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black via-black/80 to-transparent z-10"></div>
              </div>
            </div>
          </div>

          {/* Right Feature Column */}
          <div className="flex flex-col gap-12">
            {/* Feature 4 - Live Adventure Map */}
             <div className="group">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 group-hover:bg-neon transition-colors">
                <PinIcon className="h-6 w-6 text-white group-hover:text-black" />
              </div>
              <h3 className="mb-2 text-2xl font-bold text-white">{t.features.feature4Title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {t.features.feature4Desc}
              </p>
            </div>

            {/* CTA Box */}
            <div className="rounded-2xl bg-zinc-900 p-8 border border-zinc-800 hover:border-neon transition-colors">
              <h3 className="mb-4 text-xl font-bold text-white">{t.features.ctaTitle}</h3>
              <a 
                href="https://apps.apple.com/cn/app/bored-tourist/id6755624970"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-neon font-black uppercase tracking-wide text-sm hover:gap-4 transition-all cursor-pointer"
              >
                {t.features.ctaButton} <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};