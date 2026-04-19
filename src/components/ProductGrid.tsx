import React from 'react';
import { useProducts } from '../ProductContext';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const { allProducts } = useProducts();
  return (
    <section id="collection" style={{ padding: '10rem 8vw', backgroundColor: 'var(--white)' }}>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        marginBottom: '6rem', 
        gap: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ maxWidth: '700px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>
            THE CURATION
          </p>
          <h2 className="serif" style={{ fontSize: 'clamp(3.5rem, 8vw, 6rem)', lineHeight: 1, marginBottom: '2rem', color: 'var(--text)' }}>
            Exquisite Artifacts
          </h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: 300, fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '500px' }}>
            Each piece is selected for its story, craftsmanship, and ability to elevate the mundane into the extraordinary.
          </p>
        </div>
        <div className="filter-tabs">
          <button className="active">All Collections</button>
          <button>Fragrance</button>
          <button>Timepieces</button>
          <button>Accessories</button>
        </div>
      </div>

      <div className="grid-products">
        {allProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        .filter-tabs {
          display: flex;
          gap: 2.5rem;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          font-weight: 500;
        }
        .filter-tabs button {
          transition: all 0.4s ease;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid transparent;
        }
        .filter-tabs button:hover { color: var(--text); }
        .filter-tabs button.active {
          color: var(--text);
          border-bottom: 1px solid var(--primary);
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
