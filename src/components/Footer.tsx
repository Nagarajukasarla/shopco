import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="relative bg-brand-gray pt-36 pb-12 mt-32 w-full text-brand-black">
      {/* Newsletter Signup Absolute Banner */}
      <div
        id="newsletter-banner"
        data-testid="newsletter-banner"
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-6xl bg-brand-black rounded-[20px] px-6 py-9 md:px-16 md:py-11 flex flex-col lg:flex-row items-center justify-between gap-8 z-10 shadow-xl"
      >
        <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight text-left max-w-lg leading-tight">
          STAY UP TO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row w-full lg:w-auto items-stretch gap-3.5 max-w-md flex-1"
          id="newsletter-form"
          data-testid="newsletter-form"
        >
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray">
              <Mail className="w-5 h-5" />
            </span>
            <input
              id="newsletter-email"
              name="newsletterEmail"
              data-testid="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white text-brand-black border border-transparent rounded-full focus:outline-none focus:bg-white text-sm font-medium"
            />
          </div>
          <button
            id="newsletter-submit"
            data-testid="newsletter-submit"
            type="submit"
            className="px-6 py-3 bg-white text-brand-black hover:bg-brand-gray transition-colors text-sm font-bold rounded-full text-center whitespace-nowrap"
          >
            {subscribed ? 'Subscribed!' : 'Subscribe to Newsletter'}
          </button>
        </form>
      </div>

      {/* Main Footer Links */}
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-brand-black/10">
        {/* Brand Information & Socials */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          <span className="text-3xl font-extrabold tracking-tight text-brand-black">SHOP.CO</span>
          <p className="text-sm text-brand-darkGray leading-relaxed max-w-xs">
            We have clothes that suit your style and which you’re proud to wear. From women to men.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-brand-black/10 bg-white flex items-center justify-center hover:bg-brand-black hover:text-white transition-all text-brand-black"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-brand-black/10 bg-white flex items-center justify-center hover:bg-brand-black hover:text-white transition-all text-brand-black"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-brand-black/10 bg-white flex items-center justify-center hover:bg-brand-black hover:text-white transition-all text-brand-black"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-brand-black/10 bg-white flex items-center justify-center hover:bg-brand-black hover:text-white transition-all text-brand-black"
              aria-label="Github"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.162 22 16.418 22 12c0-5.523-4.48-10-10-10z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link Column 1 */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">Company</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-darkGray font-normal">
            <li><a href="#about" className="hover:text-brand-black transition-colors">About</a></li>
            <li><a href="#features" className="hover:text-brand-black transition-colors">Features</a></li>
            <li><a href="#works" className="hover:text-brand-black transition-colors">Works</a></li>
            <li><a href="#career" className="hover:text-brand-black transition-colors">Career</a></li>
          </ul>
        </div>

        {/* Link Column 2 */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">Help</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-darkGray font-normal">
            <li><a href="#support" className="hover:text-brand-black transition-colors">Customer Support</a></li>
            <li><a href="#delivery" className="hover:text-brand-black transition-colors">Delivery Details</a></li>
            <li><a href="#terms" className="hover:text-brand-black transition-colors">Terms & Conditions</a></li>
            <li><a href="#privacy" className="hover:text-brand-black transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Link Column 3 */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">FAQ</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-darkGray font-normal">
            <li><a href="#account" className="hover:text-brand-black transition-colors">Account</a></li>
            <li><a href="#deliveries" className="hover:text-brand-black transition-colors">Manage Deliveries</a></li>
            <li><a href="#orders" className="hover:text-brand-black transition-colors">Orders</a></li>
            <li><a href="#payments" className="hover:text-brand-black transition-colors">Payments</a></li>
          </ul>
        </div>

        {/* Link Column 4 */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h3 className="text-sm font-bold text-brand-black uppercase tracking-wider">Resources</h3>
          <ul className="flex flex-col gap-3 text-sm text-brand-darkGray font-normal">
            <li><a href="#ebooks" className="hover:text-brand-black transition-colors">Free eBooks</a></li>
            <li><a href="#tutorials" className="hover:text-brand-black transition-colors">Development Tutorial</a></li>
            <li><a href="#blog" className="hover:text-brand-black transition-colors">How to - Blog</a></li>
            <li><a href="#youtube" className="hover:text-brand-black transition-colors">Youtube Playlist</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom copyright & pay badges */}
      <div className="container mx-auto px-4 md:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs md:text-sm font-medium text-brand-darkGray text-center md:text-left" data-testid="copyright">
          Shop.co © 2000-2026, All Rights Reserved
        </p>
        {/* Payment Methods */}
        <div className="flex items-center gap-2" data-testid="payment-badges">
          <img
            src="https://cdn-icons-png.flaticon.com/128/349/349221.png"
            alt="Visa"
            className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded border border-brand-black/5"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/349/349228.png"
            alt="Mastercard"
            className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded border border-brand-black/5"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/196/196565.png"
            alt="Paypal"
            className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded border border-brand-black/5"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/6124/6124997.png"
            alt="Apple Pay"
            className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded border border-brand-black/5"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/128/6125/6125001.png"
            alt="Google Pay"
            className="h-7 w-auto object-contain bg-white px-1.5 py-0.5 rounded border border-brand-black/5"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
