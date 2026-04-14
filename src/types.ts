export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: any;
  bio?: string;
  location?: string;
}

export interface Review {
  id?: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  targetId: string;
  rating: number;
  comment: string;
  createdAt: any;
}

export interface Booking {
  id?: string;
  userId: string;
  targetId: string;
  targetName: string;
  type: 'tour' | 'hotel' | 'activity';
  date: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  price: string;
  createdAt: any;
}

export interface SavedDestination {
  id?: string;
  userId: string;
  destinationId: string;
  name: string;
  country: string;
  savedAt: any;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  rating: number;
  price: string;
  meta: string;
  description?: string;
}
