import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SocialFeature } from './components/SocialFeature';
import { VibeCheck } from './components/VibeCheck';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate asset loading / chaos calibration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 seconds of chaos

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-neon selection:text-black relative">
      <Preloader isLoading={isLoading} />
      <Hero />
      <Features />
      <SocialFeature />
      <VibeCheck />
      <Footer />
    </main>
  );
};

export default App;