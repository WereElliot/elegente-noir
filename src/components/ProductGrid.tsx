import React from 'react';
import { products } from '../types';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  return (
    <section style={{ padding: '6rem 5vw' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '4rem', 
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <h2 className="serif" style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', tracking: '-0.02em', marginBottom: '1rem' }}>
            The Collection
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 300, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.3em' }}>
            Curated objects of desire and artisanal craftsmanship.
          </p>
        </div>
        <div className="filter-tabs">
          <button className="active">All Items</button>
          <button>Fragrance</button>
          <button>Timepieces</button>
          <button>Accessories</button>
        </div>
      </div>

      <div className="grid-products">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        .filter-tabs {
          display: flex;
          gap: 1.5rem;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255,255,255,0.4);
        }
        .filter-tabs button {
          transition: color 0.3s;
          padding-bottom: 0.25rem;
        }
        .filter-tabs button:hover { color: white; }
        .filter-tabs button.active {
          color: white;
          border-bottom: 1px solid white;
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
