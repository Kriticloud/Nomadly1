import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Plus, MapPin, Calendar, Clock, Save, Loader2 } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function Itinerary() {
  const { user, loading: authLoading, login } = useFirebase();
  const [days, setDays] = useState<any[]>([]);
  const [itineraryId, setItineraryId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'itineraries'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const docData = snapshot.docs[0];
        setItineraryId(docData.id);
        setDays(docData.data().days || []);
      } else {
        setDays([{ id: 1, activities: [] }]);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firestore error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const addDay = () => {
    setDays([...days, { id: days.length + 1, activities: [] }]);
  };

  const saveItinerary = async () => {
    if (!user) return;
    setSaving(true);
    try {
      if (itineraryId) {
        await updateDoc(doc(db, 'itineraries', itineraryId), {
          days,
          updatedAt: serverTimestamp(),
        });
      } else {
        const docRef = await addDoc(collection(db, 'itineraries'), {
          userId: user.uid,
          days,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setItineraryId(docRef.id);
      }
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const addActivity = (dayId: number) => {
    const newDays = days.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          activities: [
            ...day.activities,
            { id: Date.now(), time: '12:00 PM', title: 'New Activity', location: 'TBD' }
          ]
        };
      }
      return day;
    });
    setDays(newDays);
  };

  if (authLoading || loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-gold mb-4" size={48} />
          <p className="text-beige uppercase tracking-widest text-sm">Loading your journey...</p>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-4xl font-serif italic text-beige mb-6">Your Journey Starts Here</h1>
          <p className="text-white/60 mb-8 max-w-md">Login to create and save your custom travel itineraries with Nomadly.</p>
          <button 
            onClick={login}
            className="bg-gold text-navy px-12 py-4 rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-transform"
          >
            Login to Start
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="px-16 pt-10 pb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-serif italic text-beige mb-2">Itinerary Planner</h1>
            <p className="text-white/60 uppercase tracking-widest text-xs">Craft your perfect journey</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={saveItinerary}
              disabled={saving}
              className="frosted-glass px-6 py-3 rounded-full flex items-center gap-2 text-gold hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            <button 
              onClick={addDay}
              className="frosted-glass px-6 py-3 rounded-full flex items-center gap-2 text-gold hover:bg-white/10 transition-colors"
            >
              <Plus size={18} /> Add Day
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {days.map((day) => (
            <div key={day.id} className="frosted-glass p-8 rounded-3xl flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <h2 className="text-2xl font-serif italic text-gold">Day {day.id}</h2>
                <Calendar size={18} className="text-white/40" />
              </div>
              
              <div className="flex flex-col gap-4">
                {day.activities.length > 0 ? (
                  day.activities.map((activity: any) => (
                    <div key={activity.id} className="frosted-glass-heavy p-4 rounded-xl flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[10px] text-gold uppercase tracking-widest">
                        <Clock size={12} /> {activity.time}
                      </div>
                      <div className="text-lg font-serif">{activity.title}</div>
                      <div className="flex items-center gap-1 text-xs text-white/50">
                        <MapPin size={12} /> {activity.location}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-white/30 italic text-sm">
                    No activities planned yet
                  </div>
                )}
                
                <button 
                  onClick={() => addActivity(day.id)}
                  className="mt-2 border border-dashed border-white/20 rounded-xl py-3 text-white/40 hover:text-white/60 hover:border-white/40 transition-all text-sm flex justify-center items-center gap-2"
                >
                  <Plus size={16} /> Add Activity
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
