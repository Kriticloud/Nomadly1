import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const JOURNEYS = [
  {
    id: 'amalfi',
    meta: 'Luxury Adventure',
    title: 'Midnight Sun & Fjords Exploration',
    rating: '4.9',
    reviews: '124',
    price: '$4,200',
    hasDot: true,
  },
  {
    id: 'kyoto',
    meta: 'Culinary Heritage',
    title: 'The Ancient Flavors of Kyoto',
    rating: '5.0',
    reviews: '88',
    price: '$2,850',
    hasDot: false,
  },
  {
    id: 'sanctuary',
    meta: 'Remote Living',
    title: 'High Desert Sanctuary Retreat',
    rating: '4.8',
    reviews: '210',
    price: '$3,100',
    hasDot: false,
  },
  {
    id: 'patagonia',
    meta: 'Nature Immersion',
    title: 'Patagonia\'s Blue Glaciers Trek',
    rating: '4.9',
    reviews: '156',
    price: '$5,400',
    hasDot: true,
  },
];

export default function Trending() {
  const navigate = useNavigate();

  return (
    <section className="mt-20 w-full px-16 relative z-10">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-serif italic text-beige">Featured Journeys</h2>
        <div 
          onClick={() => navigate('/destinations')}
          className="text-[11px] uppercase tracking-[2px] text-gold border-b border-gold cursor-pointer pb-1 hover:opacity-80 transition-opacity"
        >
          View Collection
        </div>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {JOURNEYS.map((journey) => (
          <div 
            key={journey.id} 
            onClick={() => navigate(`/destinations/${journey.id}`)}
            className="frosted-glass-heavy rounded-2xl h-[280px] p-6 flex flex-col justify-end relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
          >
            <div className="absolute top-0 left-0 right-0 h-3/5 bg-gradient-to-b from-white/5 to-transparent"></div>
            {journey.hasDot && (
              <div className="absolute top-6 right-6 w-2 h-2 bg-gold rounded-full shadow-[0_0_10px_var(--color-gold)]"></div>
            )}
            <div className="text-[10px] text-gold uppercase tracking-wider mb-2">{journey.meta}</div>
            <h3 className="text-xl font-serif leading-tight mb-4 group-hover:text-gold transition-colors">
              {journey.title}
            </h3>
            <div className="flex justify-between items-center border-t border-white/10 pt-3 text-[12px]">
              <span className="text-gold flex items-center gap-1">
                <Star size={12} fill="currentColor" /> {journey.rating} ({journey.reviews})
              </span>
              <span className="font-bold text-beige">{journey.price} pp</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
