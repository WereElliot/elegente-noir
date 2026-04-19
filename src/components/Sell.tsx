import React, { useState } from 'react';
import { useProducts } from '../ProductContext';
import { ArrowLeft, CheckCircle2, Upload } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Sell: React.FC = () => {
  const { addProduct } = useProducts();
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'Jewelry',
    price: '',
    description: '',
    image: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      description: formData.description,
      image: formData.image || 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070&auto=format&fit=crop' // Default premium jewelry image if none provided
    });
    setIsSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '3rem', backgroundColor: 'var(--bg)' }} className="animate-fade-in">
        <CheckCircle2 size={100} style={{ color: 'var(--primary)' }} strokeWidth={1} />
        <div style={{ textAlign: 'center' }}>
          <h2 className="serif" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: 'var(--text)' }}>Listing Created</h2>
          <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.4em', fontSize: '11px' }}>Your artifact is now part of the curation.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '10rem', paddingBottom: '8rem', paddingLeft: '8vw', paddingRight: '8vw', maxWidth: '1200px', margin: '0 auto', backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.8rem', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-muted)', marginBottom: '5rem', fontWeight: 500 }} className="hover-primary">
        <ArrowLeft size={16} />
        Back to House
      </Link>

      <div className="sell-container">
        <div style={{ maxWidth: '600px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>
            PRIVATE LISTING
          </p>
          <h1 className="serif" style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '3rem', color: 'var(--text)' }}>
            Consign your Artifact
          </h1>
          <p style={{ color: 'var(--text-muted)', fontWeight: 300, fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '4rem' }}>
            Elegente provides a platform for individuals to list their high-end jewelry and timepieces independently. Submit your curation for inclusion in our digital gallery.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
          <div className="input-group">
            <label>Title of the Piece</label>
            <input 
              required 
              placeholder="e.g. Victorian Diamond Pendant" 
              className="input-noir"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div className="input-group">
              <label>Category</label>
              <select 
                className="input-noir"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value})}
              >
                <option>Jewelry</option>
                <option>Timepiece</option>
                <option>Fragrance</option>
                <option>Accessory</option>
              </select>
            </div>
            <div className="input-group">
              <label>Valuation (USD)</label>
              <input 
                required 
                type="number" 
                placeholder="2500" 
                className="input-noir"
                value={formData.price}
                onChange={e => setFormData({...formData, price: e.target.value})}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Image URL (High Resolution)</label>
            <div style={{ position: 'relative' }}>
              <input 
                placeholder="https://..." 
                className="input-noir"
                value={formData.image}
                onChange={e => setFormData({...formData, image: e.target.value})}
              />
              <Upload size={16} style={{ position: 'absolute', right: 0, bottom: '1.5rem', color: 'var(--text-muted)' }} />
            </div>
          </div>

          <div className="input-group">
            <label>The Story / Provenance</label>
            <textarea 
              required 
              placeholder="Describe the history and condition..." 
              className="input-noir"
              style={{ minHeight: '120px', resize: 'vertical' }}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit for Curation
          </button>
        </form>
      </div>

      <style>{`
        .sell-container { display: grid; grid-template-columns: 1fr 1fr; gap: 8rem; align-items: flex-start; }
        .sell-form { display: flex; flexDirection: column; gap: 3rem; background: var(--white); padding: 4rem; border: 1px solid rgba(0,0,0,0.03); box-shadow: 0 40px 80px rgba(0,0,0,0.02); }
        .input-group { display: flex; flex-direction: column; gap: 1rem; }
        .input-group label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.3em; color: var(--text-muted); font-weight: 600; }
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
        .submit-btn {
          width: 100%;
          background-color: var(--text);
          color: white;
          padding: 2rem;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5em;
          font-weight: 700;
          transition: all 0.6s ease;
          margin-top: 2rem;
        }
        .submit-btn:hover { background-color: var(--primary); transform: translateY(-5px); box-shadow: 0 20px 40px rgba(197, 160, 89, 0.3); }
        .hover-primary:hover { color: var(--primary) !important; transition: color 0.3s; }
        
        @media (max-width: 1100px) {
          .sell-container { grid-template-columns: 1fr; gap: 6rem; }
        }
      `}</style>
    </div>
  );
};

export default Sell;
