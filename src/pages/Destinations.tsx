import React, { useState, useMemo } from 'react';
import Layout from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, Filter, X } from 'lucide-react';
import { cn } from '../lib/utils';

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
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedMeta, setSelectedMeta] = useState<string | null>(null);

  const countries = useMemo(() => 
    Array.from(new Set(ALL_DESTINATIONS.map(d => d.country))).sort(), 
  []);
  
  const metas = useMemo(() => 
    Array.from(new Set(ALL_DESTINATIONS.map(d => d.meta))).sort(), 
  []);

  const filteredDestinations = useMemo(() => {
    return ALL_DESTINATIONS.filter(dest => {
      const countryMatch = !selectedCountry || dest.country === selectedCountry;
      const metaMatch = !selectedMeta || dest.meta === selectedMeta;
      return countryMatch && metaMatch;
    });
  }, [selectedCountry, selectedMeta]);

  const clearFilters = () => {
    setSelectedCountry(null);
    setSelectedMeta(null);
  };

  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h1 className="text-6xl font-serif italic text-beige mb-4">Explore Destinations</h1>
            <p className="text-white/60 uppercase tracking-widest text-xs">Curated journeys across the globe</p>
          </div>
          
          {(selectedCountry || selectedMeta) && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-2 text-gold/60 hover:text-gold transition-colors text-[10px] uppercase tracking-widest"
            >
              <X size={14} /> Clear Filters
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="mb-12 flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2 text-white/40 mr-4">
            <Filter size={16} />
            <span className="text-[10px] uppercase tracking-widest font-medium">Filter by:</span>
          </div>

          {/* Country Filter */}
          <div className="flex flex-wrap gap-2">
            {countries.map(country => (
              <button
                key={country}
                onClick={() => setSelectedCountry(selectedCountry === country ? null : country)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all border",
                  selectedCountry === country 
                    ? "bg-gold border-gold text-navy font-bold" 
                    : "frosted-glass border-white/10 text-white/60 hover:border-white/30"
                )}
              >
                {country}
              </button>
            ))}
          </div>

          <div className="w-px h-6 bg-white/10 mx-2 hidden md:block"></div>

          {/* Experience Type Filter */}
          <div className="flex flex-wrap gap-2">
            {metas.map(meta => (
              <button
                key={meta}
                onClick={() => setSelectedMeta(selectedMeta === meta ? null : meta)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest transition-all border",
                  selectedMeta === meta 
                    ? "bg-gold border-gold text-navy font-bold" 
                    : "frosted-glass border-white/10 text-white/60 hover:border-white/30"
                )}
              >
                {meta}
              </button>
            ))}
          </div>
        </div>

        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map((dest) => (
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
        ) : (
          <div className="py-32 text-center frosted-glass rounded-3xl">
            <p className="text-white/40 italic text-xl">No destinations match your selected filters.</p>
            <button 
              onClick={clearFilters}
              className="mt-6 text-gold uppercase tracking-[2px] text-xs border-b border-gold pb-1"
            >
              Show all destinations
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
