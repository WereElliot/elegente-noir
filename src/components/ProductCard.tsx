import React from 'react';
import type { Product } from '../types';
import { Plus } from 'lucide-react';
import { useCart } from '../CartContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card animate-fade-in" style={{ position: 'relative' }}>
      <div className="aspect-product" style={{ overflow: 'hidden', backgroundColor: 'var(--accent)', position: 'relative' }}>
        <img 
          src={product.image} 
          alt={product.name}
          className="product-card-img"
        />
        <button 
          onClick={() => addToCart(product)}
          className="add-btn"
        >
          <Plus size={20} />
        </button>
      </div>
      
      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', marginBottom: '0.5rem' }}>
            {product.category}
          </p>
          <h3 className="serif" style={{ fontSize: '1.5rem' }}>{product.name}</h3>
        </div>
        <p style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--primary)' }}>${product.price}</p>
      </div>

      <style>{`
        .add-btn {
          position: absolute;
          bottom: 1.5rem;
          right: 1.5rem;
          width: 3rem;
          height: 3rem;
          background-color: white;
          color: black;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          opacity: 0;
          transform: translateY(1rem);
          transition: all 0.5s ease;
        }
        .product-card:hover .add-btn {
          opacity: 1;
          transform: translateY(0);
        }
        .add-btn:hover {
          background-color: var(--primary);
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
