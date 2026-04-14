import React from 'react';
import { Link } from 'react-router-dom';

import AuthButton from './AuthButton';

export default function Navbar() {
  return (
    <header className="px-16 py-8 flex justify-between items-center relative z-10">
      <Link to="/" className="text-3xl font-serif italic font-bold text-gold tracking-wider hover:opacity-80 transition-opacity no-underline">
        Nomadly.
      </Link>
      <nav className="flex items-center gap-12">
        <ul className="flex gap-8 list-none">
          {['Destinations', 'Experience', 'Itineraries', 'Journal', 'Profile'].map((item) => (
            <li key={item}>
              <Link
                to={`/${item.toLowerCase()}`}
                className="text-beige no-underline uppercase text-[11px] tracking-[2px] opacity-80 hover:opacity-100 transition-opacity"
              >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <AuthButton />
      </nav>
    </header>
  );
}
