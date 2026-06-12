import { useState } from 'react';
import { Search, ShoppingBag, Heart, User, Clock, Truck, Cake, Flower2, Feather, PartyPopper, Sparkles, ShieldCheck, Gem, X, Menu, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { FloreaIcon } from './components/FloreaIcon';
import { FloreaWordmark } from './components/FloreaWordmark';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import heroBanner from '../imports/EXF-vCwIaelaSKa_gN9eIhrSilXWM9MQvHCQXazAE70RgzSed5TfGyJKhDBQQ4hgZ5CuhbLQ4T6A45jlnBoCqG57cF7jD9-4Eor1K8M9edC0Il-KhwL2kk1oSFUWHVpqwGgt2Z7k_FHE6ZMCQCAq3mryBXBSY1_jCWAW5PiQsTKYa8Oh-ac6aLMPYM4KlVKT.jpeg';

export default function App() {
  const u = (id: string) =>
    `https://images.unsplash.com/photo-${id}?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=900`;

  const products = [
    {
      id: 1,
      name: "Romance in Bloom",
      price: 10999,
      rating: 4.9,
      reviews: 234,
      images: [
        u('1572454591674-2739f30d8c40'),
        u('1561181286-d5c92b600bf1'),
        u('1487530811176-3780de880c2d'),
        u('1518895949257-7621c3c786d7'),
      ],
      delivery: "Same Day",
      description: "Elegant mix of roses and seasonal blooms",
      occasions: ["Anniversary", "Just Because"]
    },
    {
      id: 2,
      name: "Golden Sunrise",
      price: 7999,
      rating: 4.8,
      reviews: 189,
      images: [
        u('1647157201967-4f7520cab994'),
        u('1561181286-d5c92b600bf1'),
        u('1490750967868-88aa4486c946'),
        u('1508808787-d4ce5e3ed7f3'),
      ],
      delivery: "90-Min",
      description: "Radiant yellow roses in crystal vase",
      occasions: ["Birthday", "Congratulations"]
    },
    {
      id: 3,
      name: "Timeless Grace",
      price: 12499,
      rating: 5.0,
      reviews: 312,
      images: [
        u('1571990306521-cf96e6858f2a'),
        u('1487530811176-3780de880c2d'),
        u('1561181286-d5c92b600bf1'),
        u('1518895949257-7621c3c786d7'),
      ],
      delivery: "Same Day",
      description: "Premium beige roses with delicate accents",
      occasions: ["Wedding", "Anniversary"]
    },
    {
      id: 4,
      name: "Pink Perfection",
      price: 9499,
      rating: 4.9,
      reviews: 267,
      images: [
        u('1533793241176-a270e75ef2ad'),
        u('1458061406101-2ab686f68cb1'),
        u('1561181286-d5c92b600bf1'),
        u('1487530811176-3780de880c2d'),
      ],
      delivery: "Same Day",
      description: "Lush pink roses in premium arrangement",
      occasions: ["Birthday", "Anniversary"]
    },
    {
      id: 5,
      name: "Garden Whispers",
      price: 11499,
      rating: 4.8,
      reviews: 198,
      images: [
        u('1458061406101-2ab686f68cb1'),
        u('1533793241176-a270e75ef2ad'),
        u('1487530811176-3780de880c2d'),
        u('1518895949257-7621c3c786d7'),
      ],
      delivery: "90-Min",
      description: "Soft pink roses with garden charm",
      occasions: ["Just Because", "Birthday"]
    },
    {
      id: 6,
      name: "Passion Symphony",
      price: 14999,
      rating: 5.0,
      reviews: 421,
      images: [
        u('1539346254710-b6d86e095035'),
        u('1572454591674-2739f30d8c40'),
        u('1561181286-d5c92b600bf1'),
        u('1487530811176-3780de880c2d'),
      ],
      delivery: "Same Day",
      description: "Rich red and pink roses arrangement",
      occasions: ["Anniversary", "Congratulations"]
    },
    {
      id: 7,
      name: "Ivory Elegance",
      price: 13499,
      rating: 4.9,
      reviews: 156,
      images: [
        u('1487530811176-3780de880c2d'),
        u('1518895949257-7621c3c786d7'),
        u('1571990306521-cf96e6858f2a'),
        u('1561181286-d5c92b600bf1'),
      ],
      delivery: "Same Day",
      description: "Pristine white blooms in cream tones",
      occasions: ["Wedding", "Sympathy"]
    },
    {
      id: 8,
      name: "Velvet Reverie",
      price: 8999,
      rating: 4.7,
      reviews: 142,
      images: [
        u('1518895949257-7621c3c786d7'),
        u('1539346254710-b6d86e095035'),
        u('1487530811176-3780de880c2d'),
        u('1572454591674-2739f30d8c40'),
      ],
      delivery: "90-Min",
      description: "Soft burgundy petals, garden inspired",
      occasions: ["Just Because", "Sympathy"]
    }
  ];

  const occasions = [
    { name: "Birthday", Icon: Cake },
    { name: "Anniversary", Icon: Heart },
    { name: "Wedding", Icon: Flower2 },
    { name: "Sympathy", Icon: Feather },
    { name: "Congratulations", Icon: PartyPopper },
    { name: "Just Because", Icon: Sparkles }
  ];

  const [occasionFilter, setOccasionFilter] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [bag, setBag] = useState<{ id: number; qty: number }[]>([]);
  const [openMenu, setOpenMenu] = useState<'profile' | 'fav' | 'bag' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [viewProductId, setViewProductId] = useState<number | null>(null);

  const viewProduct = (id: number) => {
    setViewProductId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const closeProduct = () => {
    setViewProductId(null);
    setTimeout(() => scrollToCollection(), 50);
  };
  const viewedProduct = products.find((p) => p.id === viewProductId);

  const toggleFavorite = (id: number) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const addToBag = (id: number) =>
    setBag((b) => {
      const existing = b.find((i) => i.id === id);
      return existing
        ? b.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...b, { id, qty: 1 }];
    });

  const removeFromBag = (id: number) => setBag((b) => b.filter((i) => i.id !== id));

  const bagCount = bag.reduce((sum, i) => sum + i.qty, 0);
  const bagTotal = bag.reduce(
    (sum, i) => sum + i.qty * (products.find((p) => p.id === i.id)?.price ?? 0),
    0
  );
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));
  const bagItems = bag.map((i) => ({
    ...i,
    product: products.find((p) => p.id === i.id)!,
  }));

  const scrollToCollection = () => {
    document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToDelivery = () => {
    document.getElementById('delivery')?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleOccasionClick = (name: string) => {
    setOccasionFilter((cur) => (cur === name ? null : name));
    setTimeout(() => scrollToCollection(), 50);
  };

  const filteredProducts = occasionFilter
    ? products.filter((p) => p.occasions.includes(occasionFilter))
    : products;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="sticky top-0 backdrop-blur-md border-b z-50"
        style={{ backgroundColor: 'rgba(250, 247, 242, 0.45)', borderColor: 'rgba(232, 219, 200, 0.5)' }}
      >
        <div className="mx-auto px-6 py-2.5">
          <div className="grid grid-cols-3 items-center">
            {/* Left: Menu */}
            <div className="flex items-center" style={{ color: '#5B3F2B' }}>
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="flex items-center gap-2 transition-opacity hover:opacity-70"
              >
                <Menu className="w-6 h-6" strokeWidth={1.75} />
                <span className="hidden md:inline text-sm tracking-[0.2em] uppercase">Menu</span>
              </button>
            </div>

            {/* Centered Logo */}
            <div className="flex items-center justify-center gap-3">
              <FloreaIcon className="h-[3.25rem] w-auto" style={{ color: '#5B3F2B' }} />
              <FloreaWordmark className="h-7 w-auto" color="#5B3F2B" />
            </div>

            {/* Actions */}
            <div className="relative flex items-center justify-end gap-6" style={{ color: '#5B3F2B' }}>
              <div
                className="overflow-hidden transition-all duration-300 ease-out"
                style={{ width: searchOpen ? 260 : 0 }}
              >
                <div className="relative">
                  <input
                    autoFocus={searchOpen}
                    type="text"
                    placeholder="Search flowers, occasions..."
                    className="w-full pl-4 pr-9 py-2 rounded-full border focus:outline-none text-sm"
                    style={{
                      borderColor: '#E8DBC8',
                      backgroundColor: '#FFFFFF',
                      color: '#5B3F2B',
                    }}
                  />
                  {searchOpen && (
                    <button
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2"
                      style={{ color: '#8D7760' }}
                    >
                      <X className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  setSearchOpen((s) => !s);
                  setOpenMenu(null);
                }}
                aria-label="Search"
                className="transition-opacity hover:opacity-70"
              >
                <Search className="w-6 h-6" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setOpenMenu((m) => (m === 'fav' ? null : 'fav'))}
                aria-label="Favourites"
                className="relative transition-opacity hover:opacity-70"
              >
                <Heart
                  className="w-6 h-6"
                  style={{ fill: favorites.length ? '#5B3F2B' : 'transparent' }}
                  strokeWidth={1.75}
                />
                {favorites.length > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-[10px] w-4 h-4 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                  >
                    {favorites.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setOpenMenu((m) => (m === 'profile' ? null : 'profile'))}
                aria-label="Profile"
                className="transition-opacity hover:opacity-70"
              >
                <User className="w-6 h-6" strokeWidth={1.75} />
              </button>
              <button
                onClick={() => setOpenMenu((m) => (m === 'bag' ? null : 'bag'))}
                aria-label="Bag"
                className="relative transition-opacity hover:opacity-70"
              >
                <ShoppingBag className="w-6 h-6" strokeWidth={1.75} />
                {bagCount > 0 && (
                  <span
                    className="absolute -top-2 -right-2 text-[10px] w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                  >
                    {bagCount}
                  </span>
                )}
              </button>

              {/* Dropdown panels */}
              {openMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenu(null)}
                    aria-hidden
                  />
                  <div
                    className="absolute right-0 top-full mt-3 w-80 rounded-2xl shadow-xl z-50 overflow-hidden"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DBC8' }}
                  >
                    {openMenu === 'profile' && (
                      <div className="p-5">
                        <div className="flex items-center gap-3 pb-4 mb-4 border-b" style={{ borderColor: '#E8DBC8' }}>
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#FAF7F2', color: '#5B3F2B' }}
                          >
                            <User className="w-6 h-6" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}>
                              Welcome
                            </p>
                            <p className="text-xs" style={{ color: '#8D7760' }}>Sign in to view your account</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {['My Account', 'Order History', 'Saved Addresses', 'Subscriptions', 'Help & Support'].map((label) => (
                            <button
                              key={label}
                              className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors"
                              style={{ color: '#5B3F2B' }}
                              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF7F2')}
                              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                        <button
                          className="w-full mt-4 py-2.5 rounded-full text-sm transition-colors"
                          style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                        >
                          Sign In
                        </button>
                      </div>
                    )}

                    {openMenu === 'fav' && (
                      <div>
                        <div className="px-5 py-4 border-b" style={{ borderColor: '#E8DBC8' }}>
                          <p style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}>
                            Favourites ({favorites.length})
                          </p>
                        </div>
                        {favoriteProducts.length === 0 ? (
                          <p className="px-5 py-8 text-center text-sm" style={{ color: '#8D7760' }}>
                            No favourites yet. Tap the heart on any bloom.
                          </p>
                        ) : (
                          <div className="max-h-80 overflow-y-auto">
                            {favoriteProducts.map((p) => (
                              <div key={p.id} className="flex items-center gap-3 px-5 py-3 border-b last:border-0" style={{ borderColor: '#FAF7F2' }}>
                                <ImageWithFallback
                                  src={p.images[0]}
                                  alt={p.name}
                                  className="w-14 h-14 rounded-lg object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="truncate text-sm" style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>
                                    {p.name}
                                  </p>
                                  <p className="text-xs" style={{ color: '#8D7760' }}>
                                    ₹{p.price.toLocaleString('en-IN')}
                                  </p>
                                </div>
                                <button
                                  onClick={() => addToBag(p.id)}
                                  className="text-xs px-3 py-1.5 rounded-full"
                                  style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                                >
                                  Add
                                </button>
                                <button
                                  onClick={() => toggleFavorite(p.id)}
                                  aria-label="Remove from favourites"
                                  style={{ color: '#8D7760' }}
                                >
                                  <X className="w-4 h-4" strokeWidth={1.5} />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {openMenu === 'bag' && (
                      <div>
                        <div className="px-5 py-4 border-b" style={{ borderColor: '#E8DBC8' }}>
                          <p style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}>
                            Shopping Bag ({bagCount})
                          </p>
                        </div>
                        {bagItems.length === 0 ? (
                          <p className="px-5 py-8 text-center text-sm" style={{ color: '#8D7760' }}>
                            Your bag is empty.
                          </p>
                        ) : (
                          <>
                            <div className="max-h-72 overflow-y-auto">
                              {bagItems.map(({ id, qty, product }) => (
                                <div key={id} className="flex items-center gap-3 px-5 py-3 border-b last:border-0" style={{ borderColor: '#FAF7F2' }}>
                                  <ImageWithFallback
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-14 h-14 rounded-lg object-cover"
                                  />
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm" style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1rem' }}>
                                      {product.name}
                                    </p>
                                    <p className="text-xs" style={{ color: '#8D7760' }}>
                                      Qty {qty} · ₹{(product.price * qty).toLocaleString('en-IN')}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => removeFromBag(id)}
                                    aria-label="Remove from bag"
                                    style={{ color: '#8D7760' }}
                                  >
                                    <X className="w-4 h-4" strokeWidth={1.5} />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <div className="px-5 py-4 border-t" style={{ borderColor: '#E8DBC8', backgroundColor: '#FAF7F2' }}>
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm" style={{ color: '#8D7760' }}>Subtotal</span>
                                <span style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}>
                                  ₹{bagTotal.toLocaleString('en-IN')}
                                </span>
                              </div>
                              <button
                                className="w-full py-2.5 rounded-full text-sm"
                                style={{ backgroundColor: '#5B3F2B', color: '#FAF7F2' }}
                              >
                                Checkout
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </header>

      {/* Side Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60]">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
            aria-hidden
          />
          <aside
            className="absolute left-0 top-0 h-full w-[88%] max-w-sm shadow-2xl flex flex-col"
            style={{ backgroundColor: '#FAF7F2' }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: '#E8DBC8' }}>
              <div className="flex items-center gap-2">
                <FloreaIcon className="h-9 w-auto" style={{ color: '#5B3F2B' }} />
                <FloreaWordmark className="h-5 w-auto" color="#5B3F2B" />
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                style={{ color: '#5B3F2B' }}
              >
                <X className="w-5 h-5" strokeWidth={1.75} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-2 py-4">
              {[
                {
                  title: 'Shop',
                  items: [
                    { label: 'All Arrangements', section: 'bestsellers' },
                    { label: 'Roses', section: 'bestsellers' },
                    { label: 'Bouquets', section: 'bestsellers' },
                    { label: 'Plants', section: 'bestsellers' },
                  ],
                },
                {
                  title: 'Shop by Occasion',
                  items: occasions.map((o) => ({ label: o.name, occasion: o.name })),
                },
                {
                  title: 'Services',
                  items: [
                    { label: 'Same-Day Delivery', section: 'delivery' },
                    { label: 'Subscriptions', section: 'delivery' },
                    { label: 'Corporate Gifting', section: 'delivery' },
                    { label: 'Wedding Flowers', section: 'delivery' },
                  ],
                },
              ].map((group) => (
                <div key={group.title} className="mb-6">
                  <p
                    className="px-4 mb-2 text-[11px] tracking-[0.25em] uppercase"
                    style={{ color: '#8D7760' }}
                  >
                    {group.title}
                  </p>
                  <div className="space-y-0.5">
                    {group.items.map((item: any) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          if (item.occasion) {
                            setOccasionFilter(item.occasion);
                            setTimeout(() => scrollToCollection(), 50);
                          } else if (item.section) {
                            setOccasionFilter(null);
                            setTimeout(
                              () =>
                                document
                                  .getElementById(item.section)
                                  ?.scrollIntoView({ behavior: 'smooth' }),
                              50
                            );
                          }
                          setDrawerOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-colors group"
                        style={{ color: '#5B3F2B' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E8DBC8')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <span
                          style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '1.15rem' }}
                        >
                          {item.label}
                        </span>
                        <ChevronRight
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            <div
              className="px-6 py-5 border-t"
              style={{ borderColor: '#E8DBC8', backgroundColor: '#FFFFFF' }}
            >
              <div className="flex items-center gap-2 text-xs mb-1" style={{ color: '#8D7760' }}>
                <Clock className="w-4 h-4" strokeWidth={1.5} />
                <span>Order by 3 PM for Same-Day Delivery</span>
              </div>
              <p className="text-xs" style={{ color: '#BEAF9A' }}>
                Need help? Call +91 98765 43210
              </p>
            </div>
          </aside>
        </div>
      )}

      {viewedProduct ? (
        <ProductDetail
          product={viewedProduct}
          isFavorited={favorites.includes(viewedProduct.id)}
          onToggleFavorite={toggleFavorite}
          onAddToBag={addToBag}
          onBack={closeProduct}
        />
      ) : (
      <>
      {/* Hero Banner */}
      <section className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroBanner}
            alt="Luxury roses"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4" />
                <span>Order by 3 PM for Same-Day Delivery</span>
              </div>
            </div>

            <h2 className="text-6xl mb-6 tracking-tight">
              Flowers That<br />Speak from the Heart
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Handcrafted arrangements delivered with care.<br />
              Experience luxury florals that create lasting memories.
            </p>

            <div className="flex gap-4">
              <button
                onClick={scrollToCollection}
                className="px-8 py-4 bg-white rounded-full hover:bg-[#FAF7F2] transition-colors"
                style={{ color: '#5B3F2B' }}
              >
                Shop Collection
              </button>
              <button
                onClick={scrollToDelivery}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/30 hover:bg-white/20 transition-colors"
              >
                Same-Day Delivery
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-10 border-b" style={{ borderColor: '#E8DBC8', backgroundColor: '#FAF7F2' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-center flex-wrap gap-2 md:gap-4">
            {occasions.map(({ name, Icon }) => {
              const active = occasionFilter === name;
              return (
                <button
                  key={name}
                  onClick={() => handleOccasionClick(name)}
                  className="group flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-colors hover:bg-white/70"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: active ? '#5B3F2B' : '#FFFFFF',
                      border: '1px solid #E8DBC8',
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: active ? '#FAF7F2' : '#5B3F2B' }}
                      strokeWidth={1.25}
                    />
                  </div>
                  <span className="text-xs tracking-wide" style={{ color: '#5B3F2B' }}>{name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bestselling Blooms */}
      <section id="bestsellers" className="py-20" style={{ backgroundColor: '#FCFAF6' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 shadow-sm"
              style={{
                backgroundColor: '#5B3F2B',
                color: '#FAF7F2',
                border: '1px solid #5B3F2B',
              }}
            >
              <Sparkles className="w-4 h-4" strokeWidth={1.5} style={{ color: '#E8DBC8' }} />
              <span className="text-xs tracking-[0.2em] uppercase">Curated Selection</span>
            </div>
            <h2 className="text-5xl mb-3" style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif' }}>
              {occasionFilter ? `${occasionFilter} Blooms` : 'Bestselling Blooms'}
            </h2>
            <p style={{ color: '#8D7760' }}>
              {occasionFilter
                ? `Showing arrangements for ${occasionFilter.toLowerCase()}`
                : 'Our most loved arrangements, crafted with care'}
            </p>
            {occasionFilter && (
              <button
                onClick={() => setOccasionFilter(null)}
                className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs transition-colors"
                style={{ backgroundColor: '#FAF7F2', color: '#5B3F2B', border: '1px solid #E8DBC8' }}
              >
                <X className="w-3 h-3" strokeWidth={1.5} />
                Clear filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorited={favorites.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                onAddToBag={addToBag}
                onView={viewProduct}
              />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <p className="text-center py-12" style={{ color: '#8D7760' }}>
              No arrangements yet for this occasion.
            </p>
          )}

          <div className="text-center mt-14">
            <button
              className="px-8 py-4 rounded-full border transition-colors"
              style={{ borderColor: '#BEAF9A', color: '#5B3F2B', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FAF7F2')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              View All Arrangements
            </button>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section id="delivery" className="py-12 border-y" style={{ backgroundColor: '#FAF7F2', borderColor: '#E8DBC8' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {[
              { Icon: Truck, title: '90-Minute Delivery', desc: 'Rush delivery available' },
              { Icon: Gem, title: 'Premium Quality', desc: 'Handpicked fresh flowers' },
              { Icon: ShieldCheck, title: 'Satisfaction Guaranteed', desc: '100% happiness promise' },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E8DBC8' }}
                >
                  <Icon className="w-5 h-5" style={{ color: '#5B3F2B' }} strokeWidth={1.25} />
                </div>
                <div>
                  <h3 className="mb-0.5" style={{ color: '#5B3F2B', fontFamily: '"Cormorant Garamond", serif' }}>{title}</h3>
                  <p className="text-xs tracking-wide" style={{ color: '#8D7760' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </>
      )}

      {/* Footer */}
      <footer className="bg-stone-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FloreaIcon className="h-14 w-auto text-white" />
                <FloreaWordmark className="h-7 w-auto" color="#ffffff" />
              </div>
              <p className="text-stone-400 text-sm">
                Premium florals delivered with care. Creating memories that last forever.
              </p>
            </div>

            <div>
              <h4 className="mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">All Flowers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roses</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bouquets</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Plants</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">Same-Day Delivery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Subscriptions</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Corporate Gifting</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Wedding Flowers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-stone-800 text-center text-sm text-stone-400">
            <p>© 2026 Floréa. Crafted with love for flower enthusiasts.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}