import React, { useState, useMemo } from 'react';
import { useProducts } from '../ProductContext';
import ProductCard from './ProductCard';

const ProductGrid: React.FC = () => {
  const { allProducts } = useProducts();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(12);

  const categories = useMemo(() => {
    return ['All', ...new Set(allProducts.map(p => p.category))];
  }, [allProducts]);

  const filteredProducts = useMemo(() => {
    return activeCategory === 'All' 
      ? allProducts 
      : allProducts.filter(p => p.category === activeCategory);
  }, [allProducts, activeCategory]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

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
            THE CURATION ({filteredProducts.length} ARTIFACTS)
          </p>
          <h2 className="serif" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: 'var(--text)', lineHeight: 1.1 }}>
            Exquisite Artifacts
          </h2>
        </div>
        
        <div className="category-filter" style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(12); // Reset count on category change
              }}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-products">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleCount < filteredProducts.length && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10rem' }}>
          <button 
            onClick={() => setVisibleCount(prev => prev + 12)}
            className="load-more-btn"
          >
            Explore More Artifacts
          </button>
        </div>
      )}

      <style>{`
        .grid-products {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 8rem 4rem;
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
        .load-more-btn {
          padding: 2rem 5rem;
          border: 1px solid var(--text);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.4em;
          font-weight: 600;
          transition: all 0.5s ease;
          background: transparent;
          color: var(--text);
        }
        .load-more-btn:hover {
          background-color: var(--text);
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        @media (max-width: 900px) {
          .category-filter { gap: 1.5rem; }
        }
      `}</style>
    </section>
  );
};

export default ProductGrid;
