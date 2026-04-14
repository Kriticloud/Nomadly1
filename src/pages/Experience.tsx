import React from 'react';
import Layout from '../components/Layout';

export default function Experience() {
  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <h1 className="text-6xl font-serif italic text-beige mb-6">Curated Experiences</h1>
        <p className="text-white/60 uppercase tracking-widest text-xs mb-12">Immerse yourself in the extraordinary</p>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="frosted-glass p-12 rounded-3xl flex flex-col gap-6">
            <h2 className="text-4xl font-serif italic text-gold">Culinary Journeys</h2>
            <p className="text-white/80 leading-relaxed">
              From street food tours in Bangkok to Michelin-starred dining in Paris, discover the world through its flavors.
            </p>
            <button className="mt-4 border border-gold text-gold px-8 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-gold hover:text-navy transition-all self-start">
              Explore Culinary
            </button>
          </div>
          <div className="frosted-glass p-12 rounded-3xl flex flex-col gap-6">
            <h2 className="text-4xl font-serif italic text-gold">Adventure & Nature</h2>
            <p className="text-white/80 leading-relaxed">
              Trek through ancient rainforests, sail across crystal-clear fjords, and witness the majesty of the natural world.
            </p>
            <button className="mt-4 border border-gold text-gold px-8 py-3 rounded-full uppercase text-xs tracking-widest hover:bg-gold hover:text-navy transition-all self-start">
              Explore Adventure
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
