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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <h2 className="serif" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>The Basket</h2>
          <button onClick={onClose} style={{ padding: '0.5rem', color: 'var(--text-muted)' }} className="hover-primary">
            <X size={28} strokeWidth={1} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)', gap: '2rem' }}>
              <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em' }}>Your selection is empty</p>
              <button onClick={onClose} style={{ color: 'var(--text)', borderBottom: '1px solid var(--text)', paddingBottom: '4px', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Return to House</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item animate-fade-in">
                <div style={{ width: '7rem', height: '9rem', backgroundColor: 'var(--white)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 className="serif" style={{ fontSize: '1.4rem', color: 'var(--text)' }}>{item.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: 'var(--text-muted)', transition: 'all 0.3s ease' }}
                        className="hover-primary"
                      >
                        <Trash2 size={18} strokeWidth={1} />
                      </button>
                    </div>
                    <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--text-muted)', marginTop: '0.5rem' }}>{item.category}</p>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 400 }}>QTY: {item.quantity}</p>
                    <p style={{ color: 'var(--text)', fontWeight: 400, fontSize: '1.1rem' }}>${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div style={{ marginTop: '3rem', paddingTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-muted)' }}>Total Estimation</span>
              <span className="serif" style={{ fontSize: '2.5rem', color: 'var(--text)' }}>${totalPrice.toLocaleString()}</span>
            </div>
            <button 
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
              className="checkout-btn"
            >
              Continue to Payment
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(26, 26, 26, 0.4);
          backdrop-filter: blur(8px);
          z-index: 2000;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .overlay.active { opacity: 1; pointer-events: auto; }
        
        .cart-sidebar {
          position: fixed;
          top: 0;
          right: 0;
          height: 100%;
          width: 100%;
          max-width: 500px;
          background-color: var(--bg);
          z-index: 2001;
          border-left: 1px solid rgba(0,0,0,0.05);
          padding: 4rem;
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 1s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: -20px 0 60px rgba(0,0,0,0.05);
        }
        .cart-sidebar.active { transform: translateX(0); }
        
        .cart-items { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 3rem; }
        .cart-item { display: flex; gap: 2rem; }
        
        .checkout-btn {
          width: 100%;
          background-color: var(--text);
          color: white;
          padding: 1.8rem;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.5s ease;
        }
        .checkout-btn:hover { background-color: var(--primary); transform: translateY(-4px); box-shadow: 0 10px 30px rgba(197, 160, 89, 0.2); }
        .hover-primary:hover { color: var(--primary) !important; }
      `}</style>
    </>
  );
};

export default Cart;
