import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="px-16 pt-10 flex flex-col items-center text-center relative z-10">
      <h1 className="text-8xl font-serif font-light leading-[1.1] mb-6 max-w-[800px]">
        Travel Beyond <span className="italic text-beige">Boundaries</span>
      </h1>

      <div className="frosted-glass p-3 pl-8 rounded-full flex items-center gap-6 w-[720px] mt-5 shadow-2xl">
        <div className="flex-1 flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[9px] uppercase tracking-wider text-gold mb-1">Where to?</span>
          <span className="text-sm text-white">Amalfi Coast, Italy</span>
        </div>
        <div className="w-px h-8 bg-glass-border"></div>
        <div className="flex-1 flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[9px] uppercase tracking-wider text-gold mb-1">When</span>
          <span className="text-sm text-white">Sept 14 - Sept 28</span>
        </div>
        <div className="w-px h-8 bg-glass-border"></div>
        <div className="flex-1 flex flex-col items-start cursor-pointer hover:opacity-80 transition-opacity">
          <span className="text-[9px] uppercase tracking-wider text-gold mb-1">Experiences</span>
          <span className="text-sm text-white">Sailing & Culinary</span>
        </div>
        <button 
          onClick={() => navigate('/destinations')}
          className="bg-gold text-navy px-8 py-4 rounded-full font-bold uppercase text-[12px] tracking-wider cursor-pointer hover:scale-105 transition-transform"
        >
          Explore
        </button>
      </div>
    </section>
  );
}
