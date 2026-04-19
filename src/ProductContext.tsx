import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from './types';
import { products as initialProducts } from './types';

interface ProductContextType {
  allProducts: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allProducts, setAllProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('elegente_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('elegente_products', JSON.stringify(allProducts));
  }, [allProducts]);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const id = Math.max(...allProducts.map(p => p.id), 0) + 1;
    setAllProducts(prev => [...prev, { ...newProduct, id }]);
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
