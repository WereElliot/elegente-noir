import React, { useState } from 'react';
import { useProducts } from '../ProductContext';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const { allProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...new Set(allProducts.map(p => p.category))];

  const filteredProducts = activeCategory === 'All' 
    ? allProducts 
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <section id="collection" style={{ padding: '10rem 8vw', backgroundColor: 'var(--white)' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end',
        marginBottom: '6rem',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        paddingBottom: '3rem'
      }}>
        <div style={{ maxWidth: '600px' }}>
          <p style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.4em', marginBottom: '1.5rem' }}>
            THE CURATION
          </p>
          <h2 className="serif" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--text)', lineHeight: 1.1 }}>
            Exquisite Artifacts
          </h2>
        </div>
        
        {/* Category Filter */}
        <div className="category-filter" style={{ display: 'flex', gap: '3rem' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-products">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <style>{`
        .grid-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 6rem 4rem;
        }
        .filter-btn {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          position: relative;
          padding-bottom: 0.5rem;
          transition: color 0.3s ease;
        }
        .filter-btn:hover { color: var(--text); }
        .filter-btn.active { color: var(--text); font-weight: 600; }
        .filter-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--primary);
        }
        @media (max-width: 900px) {
          .category-filter { 
            display: none !important; /* Simplified for mobile to keep clean luxury feel */
          }
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
