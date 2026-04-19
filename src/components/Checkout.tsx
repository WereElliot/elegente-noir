import React, { useState } from 'react';
import { useCart } from '../CartContext';
import { ArrowLeft, CheckCircle2, Globe, ShieldCheck, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const [status, setStatus] = useState<'idle' | 'processing' | 'brokering' | 'success'>('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    
    // Step 1: Internal validation
    await new Promise(r => setTimeout(r, 1500));
    
    // Step 2: Automated Brokering Simulation
    const brokeredItems = cart.filter(item => item.externalSourceUrl);
    if (brokeredItems.length > 0) {
      setStatus('brokering');
      console.log('Automated Brokering Triggered for:', brokeredItems.map(i => i.externalSourceUrl));
      await new Promise(r => setTimeout(r, 3000));
    }
    
    setStatus('success');
    setTimeout(() => {
      clearCart();
      navigate('/');
    }, 4000);
  };

  if (status === 'success') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', backgroundColor: 'var(--bg)' }} className="animate-fade-in">
        <CheckCircle2 size={100} style={{ color: 'var(--primary)' }} strokeWidth={1} />
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Acquisition Confirmed</h2>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '11px' }}>Your selection has been secured through our global network.</p>
        </div>
      </div>
    );
  }

  if (status === 'processing' || status === 'brokering') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', backgroundColor: 'var(--bg)' }} className="animate-fade-in">
        <div className="loader-container">
          <div className="loader-ring"></div>
          {status === 'brokering' ? <Globe size={40} className="pulse-icon" /> : <ShieldCheck size={40} className="pulse-icon" />}
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text)' }}>
            {status === 'brokering' ? 'Coordinating with Global Boutiques...' : 'Securing Secure Transaction...'}
          </h2>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '11px' }}>
            {status === 'brokering' ? 'Automated brokering in progress' : 'Verifying allocation'}
          </p>
        </div>
        <style>{`
          .loader-container { position: relative; display: flex; align-items: center; justify-content: center; }
          .loader-ring { width: 100px; height: 100px; border: 2px solid rgba(0,0,0,0.05); border-top: 2px solid var(--primary); border-radius: 50%; animation: spin 2s linear infinite; position: absolute; }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .pulse-icon { color: var(--primary); animation: pulse 2s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.1); } }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '8rem', paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1500px', margin: '0 auto', backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-muted)', marginBottom: '5rem', fontWeight: 500 }} className="hover-primary">
        <ArrowLeft size={16} />
        Back to Gallery
      </Link>

      <div className="checkout-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
             <Zap size={14} style={{ color: 'var(--primary)' }} />
             <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--primary)', fontWeight: 600 }}>Automated Global Brokering Enabled</span>
          </div>
          <h1 className="serif" style={{ fontSize: '5rem', marginBottom: '4rem', color: 'var(--text)' }}>Acquisition</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--primary)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.5rem', fontWeight: 600 }}>Delivery Logistics</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <input required placeholder="First Name" className="input-noir" />
                <input required placeholder="Last Name" className="input-noir" />
              </div>
              <input required placeholder="Shipping Address" className="input-noir" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <input required placeholder="City / State" className="input-noir" />
                <input required placeholder="Postal Code" className="input-noir" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--primary)', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '1.5rem', fontWeight: 600 }}>Payment Method</h3>
              <input required placeholder="Secure Card Entry" className="input-noir" />
            </div>

            <button type="submit" className="pay-btn">
              Pay Total — ${totalPrice.toLocaleString()}
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h3 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--text-muted)', fontWeight: 600 }}>Selection Summary</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ width: '4rem', height: '5rem', backgroundColor: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0,0,0,0.03)' }}>
                      <img src={item.image} alt={item.name} style={{ width: '80%', height: '80%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <p className="serif" style={{ fontSize: '1.2rem', color: 'var(--text)' }}>{item.name}</p>
                      <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>QTY: {item.quantity}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 300, color: 'var(--text)' }}>${(item.price * item.quantity).toLocaleString()}</p>
                </div>
                {item.externalSourceUrl && (
                  <div style={{ marginLeft: '5.5rem', fontSize: '9px', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Globe size={10} /> Brokered through Partner Boutique
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '3rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
               <span>Subtotal</span>
               <span>${totalPrice.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '1rem' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', color: 'var(--text)', fontWeight: 600 }}>Total</span>
              <span className="serif" style={{ fontSize: '3rem', color: 'var(--primary)' }}>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 10rem; }
        .input-noir {
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(0,0,0,0.1);
          padding: 1.5rem 0;
          outline: none;
          color: var(--text);
          font-size: 1rem;
          transition: all 0.4s ease;
          font-family: 'Outfit', sans-serif;
        }
        .input-noir:focus { border-color: var(--primary); padding-left: 0.5rem; }
        .pay-btn {
          width: 100%;
          background-color: var(--text);
          color: white;
          padding: 2rem;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          font-weight: 700;
          transition: all 0.6s ease;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .pay-btn:hover { background-color: var(--primary); transform: translateY(-5px); box-shadow: 0 25px 50px rgba(197, 160, 89, 0.3); }
        .order-summary {
          background-color: var(--white);
          padding: 4rem;
          height: fit-content;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          border: 1px solid rgba(0,0,0,0.03);
          box-shadow: 0 30px 60px rgba(0,0,0,0.02);
        }
        .hover-primary:hover { color: var(--primary) !important; transition: color 0.3s; }
        @media (max-width: 1100px) {
          .checkout-grid { grid-template-columns: 1fr; gap: 6rem; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
