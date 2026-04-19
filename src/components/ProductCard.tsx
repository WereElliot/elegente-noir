import React from 'react';
import type { Product } from '../types';
import { Plus } from 'lucide-react';
import { useCart } from '../CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card animate-fade-in" style={{ position: 'relative' }}>
      <div className="product-card-img-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card-img"
        />
        <button 
          onClick={() => addToCart(product)}
          className="add-btn"
          aria-label="Add to basket"
        >
          <Plus size={20} strokeWidth={1.5} />
        </button>
      </div>
      
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'var(--text-muted)' }}>
            {product.category}
          </p>
          <h3 className="serif" style={{ fontSize: '1.8rem', color: 'var(--text)' }}>{product.name}</h3>
        </div>
        <p style={{ fontSize: '1.3rem', fontWeight: 300, color: 'var(--primary)' }}>${product.price.toLocaleString()}</p>
      </div>

      <style>{`
        .add-btn {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          width: 3.5rem;
          height: 3.5rem;
          background-color: var(--text);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          opacity: 0;
          transform: translateY(1rem);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .product-card:hover .add-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .add-btn:hover {
          background-color: var(--primary);
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
