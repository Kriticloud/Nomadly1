import React from 'react';
import Hero from '../components/Hero';
import Trending from '../components/Trending';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Trending />
    </Layout>
  );
}
