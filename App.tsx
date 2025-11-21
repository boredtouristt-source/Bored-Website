import React from 'react';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { VibeCheck } from './components/VibeCheck';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-neon selection:text-black">
      <Hero />
      <Features />
      <VibeCheck />
      <Footer />
    </main>
  );
};

export default App;