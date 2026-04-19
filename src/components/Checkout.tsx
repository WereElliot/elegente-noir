import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '2rem' }} className="animate-fade-in">
        <CheckCircle2 size={80} style={{ color: 'var(--primary)' }} strokeWidth={1} />
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Order Placed</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '10px' }}>Your selection is being prepared.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', paddingLeft: '5vw', paddingRight: '5vw', maxWidth: '1400px', margin: '0 auto' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '4rem' }} className="hover-white">
        <ArrowLeft size={14} />
        Back to Curation
      </Link>

      <div className="checkout-grid">
        <div>
          <h1 className="serif" style={{ fontSize: '4rem', marginBottom: '3rem' }}>Checkout</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Shipping Information</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <input required placeholder="First Name" className="input-noir" />
                <input required placeholder="Last Name" className="input-noir" />
              </div>
              <input required placeholder="Address" className="input-noir" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <input required placeholder="City" className="input-noir" />
                <input required placeholder="Postal Code" className="input-noir" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>Payment</h3>
              <input required placeholder="Card Number" className="input-noir" />
            </div>

            <button type="submit" className="pay-btn">
              Pay ${totalPrice}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3 style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)' }}>Order Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '3rem', height: '4rem', backgroundColor: 'var(--accent)' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1)' }} />
                  </div>
                  <div>
                    <p className="serif" style={{ fontSize: '0.9rem' }}>{item.name}</p>
                    <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>QTY: {item.quantity}</p>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', fontWeight: 300 }}>${item.price * item.quantity}</p>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)' }}>Total</span>
            <span className="serif" style={{ fontSize: '2rem', color: 'var(--primary)' }}>${totalPrice}</span>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 6rem; }
        .input-noir {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.2);
          padding: 1rem 0;
          outline: none;
          color: white;
          font-size: 0.9rem;
          transition: border-color 0.3s;
        }
        .input-noir:focus { border-color: var(--primary); }
        .pay-btn {
          width: 100%;
          background-color: white;
          color: black;
          padding: 1.5rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-weight: bold;
          transition: background-color 0.3s;
        }
        .pay-btn:hover { background-color: var(--primary); }
        .order-summary {
          background-color: rgba(255,255,255,0.02);
          padding: 3rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          border: 1px solid rgba(255,255,255,0.05);
        }
        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr; gap: 4rem; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
