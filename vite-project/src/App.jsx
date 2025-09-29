import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import About from './components/About';
import Login from './components/Login';
import Hero from './components/Hero';
import Contact from './components/Contact';
import './styles.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <a href="#main" className="skip">Skip to main content</a>
        <Menu />
        
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Homepage />
            </>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hero" element={<Hero />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App
