import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Account from './pages/Account';
import ResetPassword from './pages/ResetPassword';
import { AuthProvider } from './lib/AuthContext';
import './styles/global.css';

export default function App() {
  return (
    <AuthProvider>
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 5000,
            style: { background: '#ff6a00', color: '#fff', fontWeight: '600' },
          },
          error: {
            duration: 5000,
            style: { background: '#dc2626', color: '#fff', fontWeight: '600' },
          },
        }}
      />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
      <Footer />
    </Router>
    </AuthProvider>
  );
}
