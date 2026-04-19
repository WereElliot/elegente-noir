import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { CartProvider } from './CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <div style={{ minHeight: '100vh', backgroundColor: 'black', color: 'white' }}>
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductGrid />
                <footer style={{ padding: '6rem 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
                  <div className="serif" style={{ fontSize: '12vw', color: 'rgba(255,255,255,0.03)', letterSpacing: '-0.05em', lineHeight: 1, marginBottom: '3rem' }}>
                    ELEGANTE
                  </div>
                  <div className="footer-bottom">
                    <span>EST. 2026</span>
                    <div style={{ display: 'flex', gap: '3rem' }}>
                      <a href="#" className="hover-white">Instagram</a>
                      <a href="#" className="hover-white">Privacy</a>
                      <a href="#" className="hover-white">Terms</a>
                    </div>
                    <span>NOIR EDITORIAL</span>
                  </div>
                </footer>
              </>
            } />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
      </Router>

      <style>{`
        .footer-bottom {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 2rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: rgba(255,255,255,0.3);
        }
        @media (max-width: 768px) {
          .footer-bottom { flex-direction: column; }
        }
        .hover-white:hover { color: white; transition: color 0.3s; }
      `}</style>
    </CartProvider>
  );
}

export default App;
