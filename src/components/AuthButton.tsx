import React from 'react';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useFirebase } from '../context/FirebaseContext';

export default function AuthButton() {
  const { user, loading, login, logout } = useFirebase();

  if (loading) {
    return <div className="w-8 h-8 rounded-full border-2 border-gold border-t-transparent animate-spin"></div>;
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-beige text-[11px] uppercase tracking-wider">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full border border-gold/50" />
          ) : (
            <UserIcon size={14} />
          )}
          <span className="hidden sm:inline">{user.displayName || 'Traveler'}</span>
        </div>
        <button 
          onClick={logout}
          className="frosted-glass p-2 rounded-full text-gold hover:bg-white/10 transition-colors"
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={login}
      className="frosted-glass px-4 py-2 rounded-full flex items-center gap-2 text-gold hover:bg-white/10 transition-colors text-[11px] uppercase tracking-wider"
    >
      <LogIn size={14} /> Login
    </button>
  );
}
