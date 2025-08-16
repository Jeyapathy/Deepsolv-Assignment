
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ImagePlaceholder: React.FC = () => (
    <div className="w-full h-48 bg-slate-200 flex items-center justify-center">
        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
    </div>
);

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <a href={product.url} target="_blank" rel="noopener noreferrer" className="border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-white">
      {product.image_url ? (
        <img src={product.image_url} alt={product.title} className="w-full h-48 object-cover" loading="lazy" />
      ) : (
        <ImagePlaceholder />
      )}
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-xs text-slate-500 uppercase tracking-wider">{product.vendor}</p>
        <h4 className="font-semibold text-slate-800 mt-1 flex-grow">{product.title}</h4>
      </div>
    </a>
  );
};
