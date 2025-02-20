// src/pages/products/index.tsx
import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Product } from '../../types';
import ProductCard from '../../components/ProductCard';
import CategoryList from '../../components/CategoryList';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Head from 'next/head';

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    api.getCategories()
      .then(setCategories)
      .catch(() => setError('Failed to load categories'));
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');

    const fetchProducts = selectedCategory 
      ? api.getProductsByCategory(selectedCategory)
      : api.getProducts();

    fetchProducts
      .then(data => setProducts(Array.isArray(data) ? data : data.products))
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, [selectedCategory]);

  return (
    <>
      <Head>
        <title>Products | E-commerce</title>
      </Head>

      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <CategoryList 
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        
        {error && <ErrorMessage message={error} />}
        
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}