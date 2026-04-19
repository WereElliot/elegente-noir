import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';

const Header: React.FC<{ onCartClick: () => void }> = ({ onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed-nav transition-all duration-500 ${
      isScrolled ? 'glass py-4' : 'py-8'
    }`}>
      <div className="max-w-wide px-8 flex-between">
        <Link to="/" style={{ fontSize: '2rem', letterSpacing: '-2px' }} className="serif">
          Elegente
        </Link>

        <div className="hidden-mobile flex gap-12 text-xs uppercase tracking-[0.3em] font-light text-white/60">
          <Link to="/" className="hover-white">The House</Link>
          <Link to="/collection" className="hover-white">Curation</Link>
          <Link to="/heritage" className="hover-white">Heritage</Link>
          <Link to="/contact" className="hover-white">Contact</Link>
        </div>

        <div className="flex items-center gap-6">
          <button 
            onClick={onCartClick}
            style={{ position: 'relative', padding: '0.5rem' }}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                backgroundColor: 'var(--primary)',
                color: 'black',
                fontSize: '10px',
                fontWeight: 'bold',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button className="mobile-only">
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <style>{`
        .hidden-mobile { display: flex; }
        .hover-white:hover { color: white; transition: color 0.3s; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Header;
