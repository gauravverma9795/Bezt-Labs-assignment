// src/services/api.ts
import { Product, ProductsResponse } from '../types';

const BASE_URL = 'https://dummyjson.com';

export const api = {
  async getProducts(limit: number = 30, skip: number = 0) {
    try {
      const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data: ProductsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  async getProduct(id: string) {
    try {
      const response = await fetch(`${BASE_URL}/products/${id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data: Product = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  async getCategories() {
    try {
      const response = await fetch(`${BASE_URL}/products/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data: string[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  async getProductsByCategory(category: string) {
    try {
      const response = await fetch(`${BASE_URL}/products/category/${category}`);
      if (!response.ok) throw new Error('Failed to fetch products by category');
      const data: ProductsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  }
};