import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, User } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  onSnapshot, 
  serverTimestamp, 
  orderBy 
} from 'firebase/firestore';
import { Review } from '../types';
import { cn } from '../lib/utils';

interface ReviewSectionProps {
  targetId: string;
}

export default function ReviewSection({ targetId }: ReviewSectionProps) {
  const { user } = useFirebase();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, 'reviews'),
      where('targetId', '==', targetId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedReviews = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
    }, (error) => {
      console.error("Error fetching reviews:", error);
      // Fallback to empty if firebase fails
      setReviews([]);
    });

    return () => unsubscribe();
  }, [targetId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !comment.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reviews'), {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userPhoto: user.photoURL,
        targetId,
        rating,
        comment,
        createdAt: serverTimestamp(),
      });
      setComment('');
      setRating(5);
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

  return (
    <div className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif italic text-gold mb-2">Guest Reviews</h2>
          <div className="flex items-center gap-2 text-white/60">
            <div className="flex items-center gap-1 text-gold">
              <Star size={16} fill="currentColor" />
              <span className="text-xl font-bold">{averageRating}</span>
            </div>
            <span>•</span>
            <span>{reviews.length} reviews</span>
          </div>
        </div>
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="frosted-glass p-8 rounded-2xl mb-12">
          <h3 className="text-xl font-serif mb-6">Share your experience</h3>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm uppercase tracking-widest text-white/40">Rating</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className={cn(
                      "p-1 transition-colors",
                      rating >= num ? "text-gold" : "text-white/20"
                    )}
                  >
                    <Star size={24} fill={rating >= num ? "currentColor" : "none"} />
                  </button>
                ))}
              </div>
            </div>
            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review here..."
                className="w-full bg-navy/40 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 min-h-[120px] resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="bg-gold text-navy px-8 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 self-end"
            >
              {isSubmitting ? 'Submitting...' : (
                <>
                  <Send size={14} /> Post Review
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="frosted-glass p-8 rounded-2xl mb-12 text-center">
          <p className="text-white/60 mb-4">Please log in to share your review.</p>
        </div>
      )}

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="frosted-glass-heavy p-8 rounded-2xl">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border border-gold/30 overflow-hidden flex items-center justify-center bg-navy/40">
                    {review.userPhoto ? (
                      <img src={review.userPhoto} alt={review.userName} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <User size={20} className="text-gold/50" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-beige">{review.userName}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">
                      {review.createdAt?.toDate ? review.createdAt.toDate().toLocaleDateString() : 'Recently'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={12} 
                      fill={i < review.rating ? "currentColor" : "none"} 
                      className={i < review.rating ? "" : "text-white/10"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white/80 leading-relaxed italic">"{review.comment}"</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-white/20">
            <MessageSquare size={48} className="mx-auto mb-4 opacity-10" />
            <p className="italic">No reviews yet. Be the first to share your journey.</p>
          </div>
        )}
      </div>
    </div>
  );
}
