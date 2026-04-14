import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Cinematic Background */}
      <div className="fixed inset-0 bg-gradient-cinematic -z-10"></div>
      
      {/* Decorative Glows */}
      <div className="glow-gold -top-[100px] -right-[50px]"></div>
      <div className="glow-gold bottom-[50px] -left-[100px]"></div>
      <div className="glow-gold top-[40%] left-[30%] opacity-5"></div>
      <div className="glow-gold top-[10%] left-[10%] opacity-5 blur-[200px]"></div>
      <div className="glow-gold bottom-[20%] right-[20%] opacity-10 blur-[180px]"></div>

      <Navbar />
      <main className="relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
