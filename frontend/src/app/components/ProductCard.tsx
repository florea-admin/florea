import { useState } from 'react';
import { Heart, Star, Clock, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  delivery: string;
  description: string;
  occasions?: string[];
}

interface ProductCardProps {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToBag: (id: number) => void;
  onView?: (id: number) => void;
}

export function ProductCard({ product, isFavorited, onToggleFavorite, onAddToBag, onView }: ProductCardProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="group">
      <div
        onClick={() => onView?.(product.id)}
        className="relative overflow-hidden rounded-xl mb-3 aspect-[4/5] cursor-pointer"
        style={{ backgroundColor: '#FAF7F2' }}
      >
        <ImageWithFallback
          key={active}
          src={product.images[active]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />

        {/* Hover veil */}
        <div className="absolute inset-0 bg-[#5B3F2B]/0 group-hover:bg-[#5B3F2B]/10 transition-colors duration-500 pointer-events-none" />

        <div className="absolute top-3 left-3">
          <div
            className="px-2.5 py-1 rounded-full text-[10px] tracking-wide flex items-center gap-1"
            style={{ backgroundColor: 'rgba(91, 63, 43, 0.92)', color: '#FAF7F2' }}
          >
            <Clock className="w-2.5 h-2.5" strokeWidth={2} />
            <span>{product.delivery}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          aria-label={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
          aria-pressed={isFavorited}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center transition-transform hover:bg-white hover:scale-110"
        >
          <Heart
            className="w-4 h-4 transition-colors"
            style={{
              color: '#5B3F2B',
              fill: isFavorited ? '#5B3F2B' : 'transparent',
            }}
            strokeWidth={1.5}
          />
        </button>

        {/* Hover Quick Add */}
        <div className="absolute inset-x-3 bottom-12 flex justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToBag(product.id);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs tracking-wide shadow-lg backdrop-blur-sm transition-colors"
            style={{ backgroundColor: 'rgba(91, 63, 43, 0.95)', color: '#FAF7F2' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#5B3F2B')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'rgba(91, 63, 43, 0.95)')
            }
          >
            <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.75} />
            Quick Add
          </button>
        </div>

        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/85 backdrop-blur-sm">
          {product.images.map((_, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActive(i);
              }}
              aria-label={`View image ${i + 1}`}
              className="transition-all"
              style={{
                width: i === active ? 16 : 6,
                height: 6,
                borderRadius: 999,
                backgroundColor: i === active ? '#5B3F2B' : '#BEAF9A',
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-1">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star className="w-3 h-3" style={{ fill: '#BEAF9A', color: '#BEAF9A' }} />
          <span className="text-xs" style={{ color: '#5B3F2B' }}>{product.rating}</span>
          <span className="text-xs" style={{ color: '#8D7760' }}>({product.reviews})</span>
        </div>

        <h3
          onClick={() => onView?.(product.id)}
          className="mb-1 leading-tight cursor-pointer hover:opacity-70 transition-opacity"
          style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem' }}
        >
          {product.name}
        </h3>
        <p className="text-xs mb-3 line-clamp-1" style={{ color: '#8D7760' }}>
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.25rem' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => onAddToBag(product.id)}
            className="px-4 py-2 rounded-full text-xs tracking-wide transition-colors"
            style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8D7760')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B3F2B')}
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
