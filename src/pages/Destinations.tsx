import React from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

const ALL_DESTINATIONS = [
  { id: 'amalfi', name: 'Amalfi Coast', country: 'Italy', rating: 4.9, price: '$4,200', meta: 'Luxury Adventure' },
  { id: 'kyoto', name: 'Kyoto', country: 'Japan', rating: 5.0, price: '$2,850', meta: 'Culinary Heritage' },
  { id: 'sanctuary', name: 'High Desert', country: 'USA', rating: 4.8, price: '$3,100', meta: 'Remote Living' },
  { id: 'patagonia', name: 'Patagonia', country: 'Argentina', rating: 4.9, price: '$5,400', meta: 'Nature Immersion' },
  { id: 'santorini', name: 'Santorini', country: 'Greece', rating: 4.7, price: '$3,800', meta: 'Romantic Escape' },
  { id: 'bali', name: 'Bali', country: 'Indonesia', rating: 4.9, price: '$2,100', meta: 'Spiritual Wellness' },
];

export default function Destinations() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <div className="mb-12">
          <h1 className="text-6xl font-serif italic text-beige mb-4">Explore Destinations</h1>
          <p className="text-white/60 uppercase tracking-widest text-xs">Curated journeys across the globe</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_DESTINATIONS.map((dest) => (
            <div 
              key={dest.id}
              onClick={() => navigate(`/destinations/${dest.id}`)}
              className="frosted-glass-heavy rounded-3xl overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
            >
              <div className="h-64 relative">
                <img 
                  src={`https://picsum.photos/seed/${dest.id}/800/600`} 
                  alt={dest.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 frosted-glass px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-gold">
                  {dest.meta}
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-serif mb-1 group-hover:text-gold transition-colors">{dest.name}</h3>
                    <div className="flex items-center gap-1 text-white/40 text-sm">
                      <MapPin size={14} /> {dest.country}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-gold">
                    <Star size={14} fill="currentColor" /> {dest.rating}
                  </div>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-4">
                  <span className="text-white/60 text-sm">Starting from</span>
                  <span className="text-xl font-bold text-beige">{dest.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
