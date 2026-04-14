import React from 'react';
import Layout from '../components/Layout';

export default function Journal() {
  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <h1 className="text-6xl font-serif italic text-beige mb-6">Travel Journal</h1>
        <p className="text-white/60 uppercase tracking-widest text-xs mb-12">Stories from the road</p>
        
        <div className="flex flex-col gap-12 max-w-4xl">
          {[1, 2, 3].map((i) => (
            <article key={i} className="frosted-glass p-12 rounded-3xl flex gap-12 items-center group cursor-pointer hover:bg-white/5 transition-colors">
              <div className="w-1/3 aspect-square rounded-2xl overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/journal${i}/400/400`} 
                  alt="Journal" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <div className="text-gold uppercase text-[10px] tracking-widest mb-4">October {10 + i}, 2024</div>
                <h2 className="text-3xl font-serif italic mb-4 group-hover:text-gold transition-colors">
                  {i === 1 ? 'Finding Serenity in the Heart of Kyoto' : i === 2 ? 'The Untamed Beauty of Patagonia' : 'A Culinary Adventure in Amalfi'}
                </h2>
                <p className="text-white/60 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="mt-6 text-beige text-xs uppercase tracking-widest border-b border-beige inline-block pb-1">Read Story</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
}
