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
        <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
          <Header onCartClick={() => setIsCartOpen(true)} />
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <ProductGrid />
                
                {/* Heritage Section */}
                <section id="heritage" style={{ padding: '15rem 8vw', backgroundColor: 'var(--bg)' }}>
                  <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '2rem' }}>
                      OUR HERITAGE
                    </p>
                    <h2 className="serif" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.1, marginBottom: '3rem' }}>
                      Crafted with Intention,<br/>Defined by Time
                    </h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', fontWeight: 300, lineHeight: 1.8 }}>
                      Elegente was born from a desire to strip away the noise of modern excess. We believe that true luxury isn't found in the loudest expression, but in the quietest detail. Every piece in our curation is a testament to the artisans who understand that perfection is a journey, not a destination.
                    </p>
                  </div>
                </section>

                <footer id="contact" style={{ padding: '8rem 8vw', backgroundColor: 'var(--white)', borderTop: '1px solid rgba(0,0,0,0.03)' }}>
                  <div className="serif" style={{ fontSize: '15vw', color: 'rgba(0,0,0,0.02)', letterSpacing: '-0.05em', lineHeight: 0.8, marginBottom: '6rem', textAlign: 'center' }}>
                    ELEGANTE
                  </div>
                  <div className="footer-bottom">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text)' }}>EST. 2026</span>
                      <span style={{ color: 'var(--text-muted)' }}>LONDON / PARIS / MILAN</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4rem' }}>
                      <a href="#" className="hover-primary">Instagram</a>
                      <a href="#" className="hover-primary">Concierge</a>
                      <a href="#" className="hover-primary">Press</a>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ color: 'var(--text-muted)' }}>&copy; ALL RIGHTS RESERVED</p>
                      <p style={{ fontWeight: 600, color: 'var(--text)' }}>NOIR EDITORIAL</p>
                    </div>
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
          align-items: flex-end;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
        }
        @media (max-width: 900px) {
          .footer-bottom { flex-direction: column; align-items: center; text-align: center; gap: 4rem; }
          .footer-bottom div { align-items: center; text-align: center; }
        }
        .hover-primary:hover { color: var(--primary) !important; transition: color 0.3s ease; }
      `}</style>
    </CartProvider>
  );
}

export default App;
