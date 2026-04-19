import React from 'react';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../CartContext';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* Overlay */}
      <div 
        className={`overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isOpen ? 'active' : ''}`}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 className="serif" style={{ fontSize: '2rem' }}>Your Selection</h2>
          <button onClick={onClose} style={{ padding: '0.5rem', opacity: 0.5 }}>
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'rgba(255,255,255,0.3)', gap: '1rem' }}>
              <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em' }}>The basket is empty</p>
              <button onClick={onClose} style={{ color: 'white', borderBottom: '1px solid white', paddingBottom: '2px', fontSize: '10px' }}>Explore Collection</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item animate-fade-in">
                <div style={{ width: '6rem', height: '8rem', backgroundColor: 'var(--accent)', flexShrink: 0 }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 className="serif" style={{ fontSize: '1.2rem' }}>{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.3s' }}
                        className="hover-white"
                      >
                        <Trash2 size={16} strokeWidth={1} />
                      </button>
                    </div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginTop: '0.25rem' }}>{item.category}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', fontWeight: 300 }}>QTY: {item.quantity}</p>
                    <p style={{ color: 'var(--primary)', fontWeight: 300 }}>${item.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}>Subtotal</span>
              <span className="serif" style={{ fontSize: '1.5rem' }}>${totalPrice}</span>
            </div>
            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="checkout-btn"
            >
              Secure Checkout
              <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.5s;
        }
        .overlay.active { opacity: 1; pointer-events: auto; }
        
        .cart-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          max-width: 450px;
          background-color: black;
          z-index: 2001;
          border-left: 1px solid rgba(255,255,255,0.05);
          padding: 3rem;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cart-sidebar.active { transform: translateX(0); }
        
        .cart-items { flex: 1; overflow-y: auto; display: flex; flexDirection: column; gap: 2rem; }
        .cart-item { display: flex; gap: 1.5rem; }
        
        .checkout-btn {
          width: 100%;
          background-color: white;
          color: black;
          padding: 1.25rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: background-color 0.3s;
        }
        .checkout-btn:hover { background-color: var(--primary); }
      `}</style>
    </>
  );
};

export default Cart;
