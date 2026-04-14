import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFirebase } from '../context/FirebaseContext';
import { User, MapPin, Calendar, Clock, ChevronRight, Settings, Heart, Briefcase } from 'lucide-react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { Booking, SavedDestination } from '../types';

export default function Profile() {
  const { user, loading } = useFirebase();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [savedDestinations, setSavedDestinations] = useState<SavedDestination[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'saved'>('bookings');

  useEffect(() => {
    if (!user) return;

    const bookingsQ = query(
      collection(db, 'bookings'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const savedQ = query(
      collection(db, 'saved_destinations'),
      where('userId', '==', user.uid),
      orderBy('savedAt', 'desc')
    );

    const unsubBookings = onSnapshot(bookingsQ, (snapshot) => {
      setBookings(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Booking[]);
    }, (err) => console.error(err));

    const unsubSaved = onSnapshot(savedQ, (snapshot) => {
      setSavedDestinations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SavedDestination[]);
    }, (err) => console.error(err));

    return () => {
      unsubBookings();
      unsubSaved();
    };
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-gold border-t-transparent animate-spin"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="h-[80vh] flex flex-col items-center justify-center text-center px-4">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-8">
            <User size={48} className="text-white/20" />
          </div>
          <h1 className="text-4xl font-serif italic text-beige mb-4">Your Journey Awaits</h1>
          <p className="text-white/60 max-w-md mb-8">
            Log in to manage your bookings, saved destinations, and personalized travel itineraries.
          </p>
          <button className="bg-gold text-navy px-12 py-4 rounded-full font-bold uppercase text-sm tracking-widest hover:scale-105 transition-transform">
            Connect Account
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        {/* Header */}
        <div className="flex items-end gap-8 mb-16">
          <div className="w-32 h-32 rounded-3xl border-2 border-gold/30 overflow-hidden frosted-glass p-1">
            {user.photoURL ? (
              <img src={user.photoURL} alt={user.displayName || ''} className="w-full h-full object-cover rounded-2xl" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-navy/40 rounded-2xl">
                <User size={48} className="text-gold/30" />
              </div>
            )}
          </div>
          <div className="flex-1 pb-2">
            <h1 className="text-5xl font-serif italic text-beige mb-2">{user.displayName || 'Traveler'}</h1>
            <div className="flex items-center gap-4 text-white/40 text-xs uppercase tracking-[2px]">
              <span className="flex items-center gap-1"><MapPin size={12} /> Global Nomad</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock size={12} /> Member since {user.metadata.creationTime ? new Date(user.metadata.creationTime).getFullYear() : '2024'}</span>
            </div>
          </div>
          <button className="frosted-glass p-4 rounded-2xl text-white/60 hover:text-gold transition-colors mb-2">
            <Settings size={20} />
          </button>
        </div>

        <div className="grid grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="col-span-1 flex flex-col gap-4">
            <button 
              onClick={() => setActiveTab('bookings')}
              className={cn(
                "flex items-center gap-3 p-4 rounded-2xl transition-all text-sm uppercase tracking-widest font-medium",
                activeTab === 'bookings' ? "frosted-glass text-gold" : "text-white/40 hover:text-white/60"
              )}
            >
              <Briefcase size={18} /> My Bookings
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={cn(
                "flex items-center gap-3 p-4 rounded-2xl transition-all text-sm uppercase tracking-widest font-medium",
                activeTab === 'saved' ? "frosted-glass text-gold" : "text-white/40 hover:text-white/60"
              )}
            >
              <Heart size={18} /> Saved Places
            </button>
          </div>

          {/* Content */}
          <div className="col-span-3">
            {activeTab === 'bookings' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif italic text-gold mb-8">Booking History</h2>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <div key={booking.id} className="frosted-glass p-6 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-xl overflow-hidden">
                          <img src={`https://picsum.photos/seed/${booking.targetId}/200/200`} alt="" className="w-full h-full object-cover opacity-60" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase tracking-widest text-gold bg-gold/10 px-2 py-0.5 rounded-full">{booking.type}</span>
                            <span className={cn(
                              "text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full",
                              booking.status === 'confirmed' ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10"
                            )}>{booking.status}</span>
                          </div>
                          <h3 className="text-xl font-serif text-beige">{booking.targetName}</h3>
                          <div className="flex items-center gap-3 text-white/40 text-xs mt-1">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {booking.date}</span>
                            <span>•</span>
                            <span>{booking.price}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight size={20} className="text-white/20 group-hover:text-gold transition-colors" />
                    </div>
                  ))
                ) : (
                  <div className="frosted-glass p-12 rounded-3xl text-center border-dashed border-white/10 bg-transparent">
                    <p className="text-white/40 italic">No bookings found. Start your next adventure today.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <h2 className="text-2xl font-serif italic text-gold mb-8">Saved Destinations</h2>
                <div className="grid grid-cols-2 gap-6">
                  {savedDestinations.length > 0 ? (
                    savedDestinations.map((saved) => (
                      <div key={saved.id} className="frosted-glass-heavy rounded-2xl overflow-hidden group cursor-pointer">
                        <div className="h-40 relative">
                          <img src={`https://picsum.photos/seed/${saved.destinationId}/400/300`} alt="" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" referrerPolicy="no-referrer" />
                          <button className="absolute top-3 right-3 p-2 rounded-full bg-navy/60 text-gold backdrop-blur-md">
                            <Heart size={14} fill="currentColor" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="text-lg font-serif text-beige mb-1">{saved.name}</h3>
                          <p className="text-xs text-white/40 flex items-center gap-1 uppercase tracking-widest">
                            <MapPin size={10} /> {saved.country}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-2 frosted-glass p-12 rounded-3xl text-center border-dashed border-white/10 bg-transparent">
                      <p className="text-white/40 italic">Your wishlist is empty. Explore and save your favorite spots.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
