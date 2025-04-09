import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import RecommendationSection from './components/landing/RecommendationSection';
import AboutSection from './components/landing/AboutSection';
import TestimonialsSection from './components/landing/TestimonialsSection';
import Footer from './components/landing/Footer';

import Login from './pages/login';
import Register from './pages/register';
import Dashboard from './pages/dashboard'; 

const App = () => {
  return (
    <Routes>
      {/* Halaman utama */}
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <RecommendationSection />
            <AboutSection />
            <TestimonialsSection />
            <Footer />
          </>
        }
      />

      {/* Halaman login dan register*/}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Halaman dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default App;
