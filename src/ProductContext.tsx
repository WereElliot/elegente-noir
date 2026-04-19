import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from './types';
import initialProducts from './data/products.json';

interface ProductContextType {
  allProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('elegente_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return initialProducts as Product[];
      }
    }
    return initialProducts as Product[];
  });

  useEffect(() => {
    // We only persist user-added items to avoid bloating localStorage with 700+ items
    // But for this simulation, we'll just save the whole thing or a subset.
    // Actually, localStorage has a 5MB limit. 720 items is ~300KB, so it's fine.
    localStorage.setItem('elegente_products', JSON.stringify(allProducts));
  }, [allProducts]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...allProducts.map(p => p.id), 0) + 1;
    setAllProducts(prev => [{ ...newProduct, id }, ...prev]);
  };

  return (
    <ProductContext.Provider value={{ allProducts, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within a ProductProvider');
  return context;
};
