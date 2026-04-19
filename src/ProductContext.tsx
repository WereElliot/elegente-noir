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
    let baseProducts = [...(initialProducts as Product[])];
    
    if (saved) {
      try {
        const savedProducts = JSON.parse(saved) as Product[];
        // Only keep items from localStorage that aren't in the new large initialProducts list
        // This ensures we get the 700+ new items while keeping user-added listings.
        const userListings = savedProducts.filter(sp => 
          sp.isPrivateListing && !baseProducts.find(bp => bp.id === sp.id)
        );
        return [...userListings, ...baseProducts];
      } catch (e) {
        return baseProducts;
      }
    }
    return baseProducts;
  });

  useEffect(() => {
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
