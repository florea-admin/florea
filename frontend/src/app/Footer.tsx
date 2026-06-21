import { FloreaIcon } from './components/FloreaIcon';
import { FloreaWordmark } from './components/FloreaWordmark';

export function Footer() {
  return (
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
  );
}
