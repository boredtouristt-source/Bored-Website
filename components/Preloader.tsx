import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoading }) => {
  const [text, setText] = useState('loading chaos...');

  // Simple typing/glitch effect for the loading text
  useEffect(() => {
    if (!isLoading) return;
    
    const texts = [
      'calibrating vibe...',
      'ignoring generic tours...',
      'waking up the ai...',
      'loading chaos...'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setText(texts[i]);
      i = (i + 1) % texts.length;
      // Stop cycling and land on "loading chaos" before finish
      if (i === texts.length - 1) clearInterval(interval);
    }, 600);

    return () => clearInterval(interval);
  }, [isLoading]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex h-screen w-screen flex-col items-center justify-center bg-neon text-black transition-transform duration-1000 cubic-bezier(0.76, 0, 0.24, 1) ${
        !isLoading ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Custom Spinner */}
      <div className="mb-8 relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-black/30 border-t-black"></div>
      </div>

      {/* Branding */}
      <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
        BORED TOURIST
      </h1>

      {/* Dynamic Loading Text */}
      <p className="font-mono text-sm md:text-base font-bold tracking-widest uppercase animate-pulse">
        {text}
      </p>
    </div>
  );
};