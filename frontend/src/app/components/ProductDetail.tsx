import { useState } from 'react';
import {
  ChevronLeft,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  Gem,
  Leaf,
  Award,
  Minus,
  Plus,
  Check,
  ShoppingBag,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { Product } from './ProductCard';

interface ProductDetailProps {
  product: Product;
  isFavorited: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToBag: (id: number) => void;
  onBack: () => void;
}

const addOns = [
  { id: 'choc', label: 'Belgian Chocolate Box', price: 899, img: 'https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'card', label: 'Handwritten Card', price: 199, img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'vase', label: 'Crystal Vase', price: 1499, img: 'https://images.unsplash.com/photo-1602748828300-1c11d31ddc15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
  { id: 'teddy', label: 'Plush Teddy Bear', price: 1299, img: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400' },
];

export function ProductDetail({
  product,
  isFavorited,
  onToggleFavorite,
  onAddToBag,
  onBack,
}: ProductDetailProps) {
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [pincode, setPincode] = useState('');
  const [pinStatus, setPinStatus] = useState<null | { ok: boolean; msg: string }>(null);

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const checkPincode = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setPinStatus({ ok: false, msg: 'Please enter a valid 6-digit pincode' });
      return;
    }
    const sameDay = ['110', '400', '560', '600', '700'].some((p) => pincode.startsWith(p));
    setPinStatus(
      sameDay
        ? { ok: true, msg: `Same-day delivery available · Order by 3 PM` }
        : { ok: true, msg: `Standard delivery in 2–3 business days` }
    );
  };

  const addOnTotal = selectedAddOns.reduce(
    (sum, id) => sum + (addOns.find((a) => a.id === id)?.price ?? 0),
    0
  );
  const total = product.price * qty + addOnTotal;

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>
      {/* Breadcrumb */}
      <div
        className="border-b"
        style={{ borderColor: '#E8DBC8', backgroundColor: '#FAF7F2' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70"
            style={{ color: '#5B3F2B' }}
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />
            <span className="tracking-wide">Back to Collection</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div
              className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              <ImageWithFallback
                key={activeImg}
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onToggleFavorite(product.id)}
                aria-label={isFavorited ? 'Remove from favourites' : 'Add to favourites'}
                className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:scale-105 transition-transform"
              >
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: '#5B3F2B',
                    fill: isFavorited ? '#5B3F2B' : 'transparent',
                  }}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-full text-[11px] tracking-[0.15em] uppercase"
                style={{ backgroundColor: 'rgba(91, 63, 43, 0.92)', color: '#FAF7F2' }}
              >
                {product.delivery}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className="relative overflow-hidden rounded-lg aspect-square transition-all"
                  style={{
                    border: `2px solid ${i === activeImg ? '#5B3F2B' : 'transparent'}`,
                  }}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-4"
              style={{ backgroundColor: '#FAF7F2', color: '#8D7760' }}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span className="text-[10px] tracking-[0.2em] uppercase">Signature Collection</span>
            </div>

            <h1
              className="mb-3 leading-tight"
              style={{
                color: '#5B3F2B',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '2.75rem',
              }}
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4" style={{ fill: '#BEAF9A', color: '#BEAF9A' }} />
                <span style={{ color: '#5B3F2B' }}>{product.rating}</span>
                <span className="text-sm" style={{ color: '#8D7760' }}>
                  ({product.reviews} reviews)
                </span>
              </div>
              <span style={{ color: '#E8DBC8' }}>·</span>
              <span className="text-sm" style={{ color: '#8D7760' }}>
                {product.occasions?.join(' · ') ?? 'For every occasion'}
              </span>
            </div>

            <p
              className="mb-6 leading-relaxed"
              style={{
                color: '#5B3F2B',
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '1.25rem',
              }}
            >
              {product.description}. A handcrafted arrangement composed by our master florists,
              each stem hand-selected at dawn for unmatched freshness and presented in our
              signature wrap.
            </p>

            <div
              className="flex items-baseline gap-3 pb-6 mb-6 border-b"
              style={{ borderColor: '#E8DBC8' }}
            >
              <span
                style={{
                  color: '#5B3F2B',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '2rem',
                }}
              >
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-sm" style={{ color: '#8D7760' }}>
                inclusive of all taxes
              </span>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <p
                className="text-[11px] tracking-[0.25em] uppercase mb-2.5"
                style={{ color: '#8D7760' }}
              >
                Quantity
              </p>
              <div
                className="inline-flex items-center rounded-full border"
                style={{ borderColor: '#E8DBC8' }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center transition-opacity hover:opacity-60"
                  style={{ color: '#5B3F2B' }}
                >
                  <Minus className="w-4 h-4" strokeWidth={1.75} />
                </button>
                <span
                  className="w-12 text-center"
                  style={{
                    color: '#5B3F2B',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.25rem',
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center transition-opacity hover:opacity-60"
                  style={{ color: '#5B3F2B' }}
                >
                  <Plus className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            {/* Pincode */}
            <div className="mb-6">
              <p
                className="text-[11px] tracking-[0.25em] uppercase mb-2.5"
                style={{ color: '#8D7760' }}
              >
                Delivery
              </p>
              <div className="flex items-center gap-2">
                <div className="relative flex-1 max-w-xs">
                  <MapPin
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: '#8D7760' }}
                  />
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter pincode"
                    className="w-full pl-11 pr-4 py-3 rounded-full border focus:outline-none"
                    style={{
                      borderColor: '#E8DBC8',
                      backgroundColor: '#FAF7F2',
                      color: '#5B3F2B',
                    }}
                  />
                </div>
                <button
                  onClick={checkPincode}
                  className="px-5 py-3 rounded-full text-sm tracking-wide transition-colors"
                  style={{
                    border: '1px solid #5B3F2B',
                    color: '#5B3F2B',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#5B3F2B';
                    e.currentTarget.style.color = '#FAF7F2';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#5B3F2B';
                  }}
                >
                  Check
                </button>
              </div>
              {pinStatus && (
                <div className="flex items-center gap-1.5 mt-2.5 text-sm">
                  {pinStatus.ok ? (
                    <Check className="w-4 h-4" style={{ color: '#5B3F2B' }} strokeWidth={2} />
                  ) : null}
                  <span style={{ color: pinStatus.ok ? '#5B3F2B' : '#a43c3c' }}>
                    {pinStatus.msg}
                  </span>
                </div>
              )}
            </div>

            {/* Add-ons */}
            <div className="mb-7">
              <p
                className="text-[11px] tracking-[0.25em] uppercase mb-3"
                style={{ color: '#8D7760' }}
              >
                Make it Memorable
              </p>
              <div className="grid grid-cols-2 gap-3">
                {addOns.map((a) => {
                  const selected = selectedAddOns.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAddOn(a.id)}
                      className="flex items-center gap-3 p-3 rounded-xl border transition-all text-left"
                      style={{
                        borderColor: selected ? '#5B3F2B' : '#E8DBC8',
                        backgroundColor: selected ? '#FAF7F2' : '#FFFFFF',
                      }}
                    >
                      <div
                        className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ backgroundColor: '#FAF7F2' }}
                      >
                        <ImageWithFallback
                          src={a.img}
                          alt={a.label}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="truncate"
                          style={{
                            color: '#5B3F2B',
                            fontFamily: '"Cormorant Garamond", serif',
                            fontSize: '1.05rem',
                          }}
                        >
                          {a.label}
                        </p>
                        <p className="text-xs" style={{ color: '#8D7760' }}>
                          + ₹{a.price.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: selected ? '#5B3F2B' : 'transparent',
                          border: `1.5px solid ${selected ? '#5B3F2B' : '#BEAF9A'}`,
                        }}
                      >
                        {selected && (
                          <Check className="w-3 h-3" style={{ color: '#FAF7F2' }} strokeWidth={3} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total + CTA */}
            <div
              className="flex items-center justify-between pt-5 mb-5 border-t"
              style={{ borderColor: '#E8DBC8' }}
            >
              <div>
                <p className="text-xs tracking-wide" style={{ color: '#8D7760' }}>
                  Total
                </p>
                <p
                  style={{
                    color: '#5B3F2B',
                    fontFamily: '"Cormorant Garamond", serif',
                    fontSize: '1.75rem',
                  }}
                >
                  ₹{total.toLocaleString('en-IN')}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => onToggleFavorite(product.id)}
                  aria-label="Toggle favourite"
                  className="w-12 h-12 rounded-full border flex items-center justify-center transition-colors"
                  style={{ borderColor: '#5B3F2B', color: '#5B3F2B' }}
                >
                  <Heart
                    className="w-5 h-5"
                    style={{ fill: isFavorited ? '#5B3F2B' : 'transparent' }}
                    strokeWidth={1.5}
                  />
                </button>
                <button
                  onClick={() => {
                    for (let i = 0; i < qty; i++) onAddToBag(product.id);
                  }}
                  className="flex items-center gap-2 px-7 py-3 rounded-full transition-colors"
                  style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#8D7760')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#5B3F2B')}
                >
                  <ShoppingBag className="w-4 h-4" strokeWidth={1.75} />
                  <span className="tracking-wide">Add to Bag</span>
                </button>
              </div>
            </div>

            {/* Trust Strip */}
            <div
              className="grid grid-cols-2 gap-3 p-4 rounded-xl"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              {[
                { Icon: Truck, label: 'Same-day delivery available' },
                { Icon: Leaf, label: 'Farm-fresh, hand-selected stems' },
                { Icon: Gem, label: 'Premium signature wrap' },
                { Icon: ShieldCheck, label: '100% freshness guarantee' },
              ].map(({ Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 flex-shrink-0" style={{ color: '#5B3F2B' }} strokeWidth={1.5} />
                  <span className="text-xs" style={{ color: '#5B3F2B' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Care Guide */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              Icon: Leaf,
              title: 'Care Guide',
              body: 'Trim stems at an angle and refresh water every two days for blooms that last up to ten days.',
            },
            {
              Icon: Award,
              title: 'Master Florist Crafted',
              body: 'Every arrangement is hand-tied by our seasoned floral artisans, never assembled by machine.',
            },
            {
              Icon: Sparkles,
              title: 'Signature Unboxing',
              body: 'Presented in our hand-finished gift box with silk ribbon and a personalised note card.',
            },
          ].map(({ Icon, title, body }) => (
            <div
              key={title}
              className="p-6 rounded-2xl"
              style={{ backgroundColor: '#FAF7F2', border: '1px solid #E8DBC8' }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DBC8' }}
              >
                <Icon className="w-5 h-5" style={{ color: '#5B3F2B' }} strokeWidth={1.5} />
              </div>
              <h3
                className="mb-2"
                style={{
                  color: '#5B3F2B',
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '1.4rem',
                }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8D7760' }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
