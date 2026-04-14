import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

export default function Destination() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <div className="h-[60vh] rounded-3xl overflow-hidden relative mb-12 frosted-glass border-none">
          <img 
            src={`https://picsum.photos/seed/${id}/1920/1080`} 
            alt="Destination" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-9xl font-serif italic text-beige mb-4 capitalize">{id}</h1>
            <p className="text-xl max-w-2xl text-white/80">
              Discover the hidden gems and breathtaking landscapes of this extraordinary destination.
            </p>
          </div>
        </div>

        <section className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            <h2 className="text-3xl font-serif italic text-gold mb-6">Overview</h2>
            <div className="frosted-glass p-8 rounded-2xl text-lg leading-relaxed text-white/90">
              <p className="mb-4">
                This destination offers a unique blend of culture, history, and natural beauty. From the vibrant streets to the serene landscapes, every corner tells a story waiting to be explored.
              </p>
              <p>
                Whether you're seeking adventure or relaxation, you'll find it here. Our curated experiences ensure you see the best of what this region has to offer.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-serif italic text-gold mb-6">Quick Facts</h2>
            <div className="frosted-glass-heavy p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gold uppercase text-[10px] tracking-widest">Best Time</span>
                <span className="text-sm">May - September</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gold uppercase text-[10px] tracking-widest">Currency</span>
                <span className="text-sm">Local Currency</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-gold uppercase text-[10px] tracking-widest">Language</span>
                <span className="text-sm">Official Language</span>
              </div>
              <button 
                onClick={() => navigate('/itineraries')}
                className="mt-4 bg-gold text-navy py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform"
              >
                Plan Itinerary
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
