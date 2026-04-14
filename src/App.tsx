/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseProvider } from './context/FirebaseContext';
import Home from './pages/Home';
import Destination from './pages/Destination';
import Destinations from './pages/Destinations';
import Experience from './pages/Experience';
import Journal from './pages/Journal';
import Itinerary from './pages/Itinerary';

export default function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/destinations/:id" element={<Destination />} />
          <Route path="/itineraries" element={<Itinerary />} />
          {/* Add more routes here as needed */}
        </Routes>
      </Router>
    </FirebaseProvider>
  );
}
