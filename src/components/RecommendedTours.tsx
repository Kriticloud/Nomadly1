import React, { useState } from 'react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Calendar, Clock, Tag, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface Tour {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  type: 'tour' | 'hotel' | 'activity';
}

const MOCK_TOURS: Record<string, Tour[]> = {
  amalfi: [
    { id: 'amalfi-1', title: 'Private Boat Sunset Cruise', description: 'Experience the coast from the water with prosecco and local snacks.', price: '$450', duration: '3 Hours', type: 'activity' },
    { id: 'amalfi-2', title: 'Lemon Grove Cooking Class', description: 'Learn to make authentic limoncello and pasta in a historic grove.', price: '$180', duration: '4 Hours', type: 'activity' },
  ],
  kyoto: [
    { id: 'kyoto-1', title: 'Tea Ceremony in Gion', description: 'A meditative traditional tea ceremony in the heart of the geisha district.', price: '$85', duration: '1.5 Hours', type: 'activity' },
    { id: 'kyoto-2', title: 'Arashiyama Bamboo Forest Walk', description: 'Guided sunrise walk through the iconic bamboo groves and temples.', price: '$120', duration: '3 Hours', type: 'tour' },
  ],
  default: [
    { id: 'def-1', title: 'Hidden Gems Walking Tour', description: 'Explore the secret spots only locals know about with an expert guide.', price: '$95', duration: '4 Hours', type: 'tour' },
    { id: 'def-2', title: 'Luxury Boutique Stay', description: 'A curated selection of the finest accommodations in the region.', price: '$350/night', duration: 'Flexible', type: 'hotel' },
  ]
};

interface RecommendedToursProps {
  destinationId: string;
}

export default function RecommendedTours({ destinationId }: RecommendedToursProps) {
  const { user, login } = useFirebase();
  const [bookingStatus, setBookingStatus] = useState<Record<string, 'idle' | 'loading' | 'success'>>({});

  const tours = MOCK_TOURS[destinationId] || MOCK_TOURS.default;

  const handleBook = async (tour: Tour) => {
    if (!user) {
      login();
      return;
    }

    setBookingStatus(prev => ({ ...prev, [tour.id]: 'loading' }));
    
    try {
      await addDoc(collection(db, 'bookings'), {
        userId: user.uid,
        targetId: tour.id,
        targetName: tour.title,
        type: tour.type,
        date: new Date().toISOString().split('T')[0], // Mock date
        status: 'confirmed',
        price: tour.price,
        createdAt: serverTimestamp(),
      });
      
      setBookingStatus(prev => ({ ...prev, [tour.id]: 'success' }));
      setTimeout(() => {
        setBookingStatus(prev => ({ ...prev, [tour.id]: 'idle' }));
      }, 3000);
    } catch (error) {
      console.error("Booking failed:", error);
      setBookingStatus(prev => ({ ...prev, [tour.id]: 'idle' }));
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-serif italic text-gold mb-8">Recommended Experiences</h2>
      <div className="grid grid-cols-1 gap-6">
        {tours.map((tour) => (
          <div key={tour.id} className="frosted-glass overflow-hidden rounded-2xl flex flex-col md:flex-row group">
            <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/${tour.id}/400/400`} 
                alt={tour.title} 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 frosted-glass px-2 py-1 rounded-md text-[9px] uppercase tracking-widest text-gold flex items-center gap-1">
                <Tag size={10} /> {tour.type}
              </div>
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif text-beige group-hover:text-gold transition-colors">{tour.title}</h3>
                  <span className="text-lg font-bold text-gold">{tour.price}</span>
                </div>
                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {tour.description}
                </p>
                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-white/30">
                  <span className="flex items-center gap-1"><Clock size={12} /> {tour.duration}</span>
                  <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Instant Confirmation</span>
                </div>
              </div>
              <button
                onClick={() => handleBook(tour)}
                disabled={bookingStatus[tour.id] === 'loading' || bookingStatus[tour.id] === 'success'}
                className={cn(
                  "mt-6 w-full md:w-auto self-end px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all",
                  bookingStatus[tour.id] === 'success' 
                    ? "bg-green-500 text-white" 
                    : "bg-white/5 text-gold border border-gold/30 hover:bg-gold hover:text-navy"
                )}
              >
                {bookingStatus[tour.id] === 'loading' ? 'Processing...' : 
                 bookingStatus[tour.id] === 'success' ? 'Booked!' : 'Book Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
