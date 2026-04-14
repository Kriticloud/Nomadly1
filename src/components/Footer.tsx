import React from 'react';

export default function Footer() {
  return (
    <footer className="absolute bottom-8 w-full px-16 flex justify-between items-center opacity-50 text-[10px] tracking-wider uppercase z-10">
      <div>&copy; 2024 Nomadly Collective</div>
      <div className="flex gap-6">
        <span className="cursor-pointer hover:opacity-100">Privacy</span>
        <span className="cursor-pointer hover:opacity-100">Terms</span>
        <span className="cursor-pointer hover:opacity-100">Instagram</span>
      </div>
    </footer>
  );
}
