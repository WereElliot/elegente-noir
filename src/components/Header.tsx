import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed-nav transition-all duration-700 ${
      isScrolled ? 'glass py-4 shadow-sm' : 'py-10'
    }`}>
      <div className="max-w-wide px-10 flex-between">
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ fontSize: '2.2rem', letterSpacing: '-2px', color: 'var(--text)' }} className="serif">
          Elegente
        </Link>

        <div className="hidden-mobile" style={{ display: 'flex', gap: '4rem', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.4em', fontWeight: 500, color: 'var(--text-muted)' }}>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="nav-link">The House</button>
          <button onClick={() => scrollToSection('collection')} className="nav-link">Curation</button>
          <button onClick={() => scrollToSection('heritage')} className="nav-link">Heritage</button>
          <Link to="/consign" className="nav-link">Consign</Link>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={onCartClick}
            className="cart-trigger"
          >
            <ShoppingBag size={22} strokeWidth={1} />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </button>
          <button className="mobile-only">
            <Menu size={22} strokeWidth={1} />
          </button>
        </div>
      </div>

      <style>{`
        .nav-link { 
          position: relative; 
          color: var(--text-muted); 
          transition: color 0.4s ease; 
        }
        .nav-link:hover { color: var(--text); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: var(--primary);
          transition: width 0.4s ease;
        }
        .nav-link:hover::after { width: 100%; }
        
        .cart-trigger { position: relative; padding: 0.5rem; transition: opacity 0.3s; }
        .cart-trigger:hover { opacity: 0.6; }
        
        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--text);
          color: white;
          font-size: 9px;
          font-weight: 500;
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .hidden-mobile { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Header;
