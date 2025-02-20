// src/store/store.ts
import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()((set) => ({
  items: [],
  
  addItem: (product, quantity) => 
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      
      return {
        items: [...state.items, { ...product, quantity }],
      };
    }),
  
  removeItem: (productId) => 
    set((state) => ({
      items: state.items.filter(item => item.id !== productId),
    })),
  
  updateQuantity: (productId, quantity) => 
    set((state) => ({
      items: state.items.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ),
    })),
  
  clearCart: () => set({ items: [] }),
}));