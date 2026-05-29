import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Settings } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { LoginModal } from './ui/LoginModal';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { user, isAuthenticated, logout } = useUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    }
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white border-b border-brand-gray">
        {/* Promotion Top Banner */}
        <div
          id="top-banner"
          data-testid="top-banner"
          className="w-full bg-brand-black text-white py-2 text-center text-xs md:text-sm font-medium transition-all duration-300"
        >
          <div className="container mx-auto px-4 flex items-center justify-center gap-2">
            <span>Sign up and get 20% off your first order.</span>
            <button
              id="top-banner-cta"
              data-testid="top-banner-cta"
              onClick={() => !isAuthenticated && setIsLoginModalOpen(true)}
              className="underline font-semibold hover:text-white/80 transition-colors"
            >
              Sign Up Now
            </button>
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between gap-4 md:gap-8">
          {/* Burger Menu Button (Mobile) */}
          <button
            id="mobile-menu-toggle"
            data-testid="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="block lg:hidden text-brand-black focus:outline-none hover:opacity-85"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link
            id="brand-logo"
            data-testid="brand-logo"
            to="/"
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-black select-none hover:opacity-90"
          >
            SHOP.CO
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="hidden lg:flex items-center gap-6 text-sm md:text-base font-normal text-brand-black">
            <li className="relative group">
              <Link
                id="nav-shop"
                data-testid="nav-shop"
                to="/shop"
                className="flex items-center gap-1 hover:text-brand-darkGray transition-colors py-1"
              >
                Shop <ChevronDown className="w-4 h-4" />
              </Link>
            </li>
            <li>
              <Link id="nav-on-sale" data-testid="nav-on-sale" to="/shop?filter=on-sale" className="hover:text-brand-darkGray transition-colors">
                On Sale
              </Link>
            </li>
            <li>
              <Link id="nav-new-arrivals" data-testid="nav-new-arrivals" to="/shop?sort=newest" className="hover:text-brand-darkGray transition-colors">
                New Arrivals
              </Link>
            </li>
            <li>
              <a href="#brands-section" className="hover:text-brand-darkGray transition-colors">
                Brands
              </a>
            </li>
          </ul>

          {/* Search Bar (Desktop) */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
            id="desktop-search-form"
            data-testid="desktop-search-form"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60 pointer-events-none">
              <Search className="w-5 h-5" />
            </span>
            <input
              id="desktop-search-input"
              name="search"
              data-testid="desktop-search-input"
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-transparent rounded-full focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
            />
          </form>

          {/* Action Items (Cart, Profile, Search for Mobile) */}
          <div className="flex items-center gap-3.5 md:gap-4.5">
            {/* Search Icon for Mobile/Tablet */}
            <button
              id="mobile-search-toggle"
              data-testid="mobile-search-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              className="block md:hidden text-brand-black hover:opacity-80"
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>

            {/* Cart Icon with badge */}
            <Link
              id="navbar-cart-link"
              data-testid="navbar-cart-link"
              to="/cart"
              className="relative text-brand-black hover:opacity-80 transition-opacity"
              aria-label="View Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span
                  id="cart-badge-count"
                  data-testid="cart-badge-count"
                  className="absolute -top-1.5 -right-1.5 bg-brand-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse"
                >
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                id="navbar-profile-btn"
                data-testid="navbar-profile-btn"
                onClick={handleProfileClick}
                className="text-brand-black hover:opacity-80 transition-opacity focus:outline-none flex items-center gap-0.5"
                aria-label="User Profile"
              >
                <User className="w-6 h-6" />
              </button>

              {/* Profile Dropdown Panel */}
              {isAuthenticated && isProfileDropdownOpen && (
                <div
                  id="profile-dropdown-card"
                  data-testid="profile-dropdown-card"
                  className="absolute right-0 mt-3 w-56 bg-white border border-brand-gray rounded-2xl shadow-xl py-2.5 z-50 animate-slide-up"
                >
                  <div className="px-4 py-2 border-b border-brand-gray mb-1.5">
                    <p className="text-xs text-brand-darkGray font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-brand-black truncate" data-testid="dropdown-username">
                      {user?.name}
                    </p>
                  </div>
                  <Link
                    id="dropdown-profile-link"
                    data-testid="dropdown-profile-link"
                    to="/profile"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-brand-black hover:bg-brand-gray transition-colors"
                  >
                    <Settings className="w-4 h-4 text-brand-darkGray" />
                    My Profile
                  </Link>
                  <button
                    id="dropdown-logout-btn"
                    data-testid="dropdown-logout-btn"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-brand-red hover:bg-brand-lightRed/30 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div
            id="mobile-drawer-overlay"
            data-testid="mobile-drawer-overlay"
            className="fixed inset-0 top-[96px] md:top-[104px] z-30 bg-black/50 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              id="mobile-drawer-container"
              data-testid="mobile-drawer-container"
              className="w-4/5 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col justify-between animate-slide-right"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-6">
                {/* Mobile Search Bar */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex md:hidden relative w-full"
                  id="mobile-search-form"
                  data-testid="mobile-search-form"
                >
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                    <Search className="w-5 h-5" />
                  </span>
                  <input
                    id="mobile-search-input"
                    name="search"
                    data-testid="mobile-search-input"
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-transparent rounded-full focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </form>

                {/* Navigation Links */}
                <ul className="flex flex-col gap-5 text-lg font-semibold text-brand-black">
                  <li>
                    <Link
                      id="mobile-nav-shop"
                      data-testid="mobile-nav-shop"
                      to="/shop"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 hover:text-brand-darkGray transition-colors"
                    >
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link
                      id="mobile-nav-on-sale"
                      data-testid="mobile-nav-on-sale"
                      to="/shop?filter=on-sale"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 hover:text-brand-darkGray transition-colors"
                    >
                      On Sale
                    </Link>
                  </li>
                  <li>
                    <Link
                      id="mobile-nav-new-arrivals"
                      data-testid="mobile-nav-new-arrivals"
                      to="/shop?sort=newest"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 hover:text-brand-darkGray transition-colors"
                    >
                      New Arrivals
                    </Link>
                  </li>
                  <li>
                    <a
                      href="#brands-section"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-1 hover:text-brand-darkGray transition-colors"
                    >
                      Brands
                    </a>
                  </li>
                </ul>
              </div>

              {/* Mobile Auth Status Block */}
              <div className="border-t border-brand-gray pt-6 mb-12">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-xs text-brand-darkGray font-medium">Logged in as</p>
                      <p className="text-base font-bold text-brand-black">{user?.name}</p>
                    </div>
                    <Link
                      id="mobile-drawer-profile"
                      data-testid="mobile-drawer-profile"
                      to="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full py-3 bg-brand-gray text-brand-black text-center font-bold rounded-full block text-sm"
                    >
                      View Profile
                    </Link>
                    <button
                      id="mobile-drawer-logout"
                      data-testid="mobile-drawer-logout"
                      onClick={handleLogout}
                      className="w-full py-3 bg-brand-lightRed text-brand-red font-bold rounded-full text-sm hover:bg-brand-red/10 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    id="mobile-drawer-login"
                    data-testid="mobile-drawer-login"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                    className="w-full py-3.5 bg-brand-black text-white font-bold rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    Sign In / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login / Register Popup Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
};

export default Navbar;
