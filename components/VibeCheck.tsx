import React, { useState } from 'react';
import { SparklesIcon } from './Icons';
import { getVibeCheckRecommendation } from '../services/geminiService';
import { VibeType } from '../types';
import ReactMarkdown from 'react-markdown';

export const VibeCheck: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVibeSelect = (vibe: string) => {
    setInputValue(`I want ${vibe.toLowerCase()}`);
    setResult(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIsLoading(true);
    setResult(null);
    
    const response = await getVibeCheckRecommendation(inputValue);
    
    setResult(response);
    setIsLoading(false);
  };

  return (
    <section id="vibecheck" className="relative w-full bg-zinc-950 py-32">
      {/* Radial Gradient Background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-neon/5 blur-[120px]"></div>

      <div className="container relative z-10 mx-auto px-6 text-center max-w-4xl">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-neon px-4 py-1">
          <span className="text-xs font-black uppercase text-black tracking-wider">Powered by BORED AI</span>
        </div>
        
        <h2 className="mb-4 text-6xl md:text-8xl font-black uppercase tracking-tighter text-white">
          Your Moment of <span className="text-gray-600">Madness</span>
        </h2>
        
        <p className="mb-12 text-lg text-gray-400 font-medium">
          Don't know what to do? Tell our sassy AI how you're feeling, and get a non-boring recommendation instantly.
        </p>

        <div className="mx-auto max-w-2xl">
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="relative mb-12">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="e.g. I want to eat vegetarian but make it cool..." 
              className="w-full rounded-full border border-zinc-800 bg-zinc-900/50 px-8 py-6 text-lg text-white placeholder-zinc-500 focus:border-neon focus:outline-none focus:ring-1 focus:ring-neon backdrop-blur-sm transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="absolute right-2 top-2 bottom-2 aspect-square rounded-full bg-neon flex items-center justify-center hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              {isLoading ? (
                 <div className="h-6 w-6 animate-spin rounded-full border-2 border-black border-t-transparent"></div>
              ) : (
                <SparklesIcon className="h-6 w-6 text-black" />
              )}
            </button>
          </form>

          {/* Result Box */}
          {(result || isLoading) && (
             <div className={`relative mx-auto mb-12 max-w-2xl rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 md:p-12 shadow-2xl transition-all duration-500 ${isLoading ? 'animate-pulse' : ''}`}>
                {isLoading && <p className="text-zinc-500 italic">Judging your vibe...</p>}
                
                {result && (
                  <>
                    <div className="absolute -right-2 -top-4 rotate-6 bg-neon px-3 py-1 shadow-lg">
                        <span className="text-xs font-black uppercase text-black">AI CHOICE</span>
                    </div>
                    <div className="font-marker text-2xl md:text-3xl leading-relaxed text-white">
                        <ReactMarkdown 
                          components={{
                            strong: ({node, ...props}) => <span className="text-neon" {...props} />
                          }}
                        >
                          {`"${result}"`}
                        </ReactMarkdown>
                    </div>
                  </>
                )}
             </div>
          )}

          {/* Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            {Object.values(VibeType).map((vibe) => (
              <button
                key={vibe}
                onClick={() => handleVibeSelect(vibe)}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2 text-sm font-medium text-gray-400 hover:border-neon hover:text-white transition-colors"
              >
                {vibe}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};