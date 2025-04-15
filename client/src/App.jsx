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

import ProtectedRoute from './ProtectedRoute';
import GuestOnlyRoute from './GuestOnlyRoute';

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

      {/* Halaman login dan register (hanya bisa diakses jika belum login) */}
      <Route
        path="/login"
        element={
          <GuestOnlyRoute>
            <Login />
          </GuestOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <GuestOnlyRoute>
            <Register />
          </GuestOnlyRoute>
        }
      />

      {/* Halaman dashboard (hanya untuk yang sudah login) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
