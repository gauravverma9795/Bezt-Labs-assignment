// src/pages/products/[id].tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { Product } from '../../types';
import { ArrowLeft, Star, Minus, Plus } from 'lucide-react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import Head from 'next/head';
import Image from 'next/image';

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError('');
      api.getProduct(id as string)
        .then(data => {
          setProduct(data);
          setSelectedImage(data.thumbnail);
        })
        .catch(() => setError('Failed to load product'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleAddToCart = () => {
    toast.success('Added to cart!');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found" />;

  return (
    <>
      <Head>
        <title>{product.title} | E-commerce</title>
      </Head>

      <div className="py-6">
        <button 
          onClick={() => router.back()}
          className="text-white mb-6 flex items-center gap-2 hover:text-yellow-btn"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </button>

        <div className="flex flex-col">
          <div className="relative w-full h-64 mb-4">
            <Image 
              src={selectedImage}
              alt={product.title}
              fill
              className="rounded-xl object-contain"
            />
          </div>

          {/* Image Gallery */}
          <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 
                  ${selectedImage === image ? 'ring-2 ring-yellow-btn' : ''}`}
              >
                <Image 
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-btn text-yellow-btn" />
                <span>{product.rating}</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              {product.description}
            </p>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button 
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center
                    hover:border-yellow-btn"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{quantity}</span>
                <button 
                  className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center
                    hover:border-yellow-btn"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xl font-bold">${product.price}</span>
            </div>

            <button 
              className="w-full bg-yellow-btn text-black py-4 rounded-xl font-semibold
                hover:bg-yellow-btn/90 transition-colors"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}