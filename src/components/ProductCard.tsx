import { Product } from '../types';
import { Star } from 'lucide-react';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-card-bg rounded-2xl p-3">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-32 object-cover rounded-xl mb-2"
        />
        <div className="flex items-center gap-1 mb-1">
          <Star className="w-4 h-4 fill-yellow-btn text-yellow-btn" />
          <span className="text-sm">{product.rating}</span>
        </div>
        <h3 className="text-white text-sm mb-1">{product.title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-white">${product.price}</span>
          <button className="w-6 h-6 bg-card-bg rounded-full flex items-center justify-center border border-gray-600">
            +
          </button>
        </div>
      </div>
    </Link>
  );
}
