import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import type { Address } from '../context/UserContext';
import { Mail, Lock, User, Plus, MapPin, Package, Calendar, ShieldCheck, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Profile: React.FC = () => {
  const {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    addAddress,
    orders
  } = useUser();

  // Auth local states
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Address form states
  const [isAddressFormOpen, setIsAddressFormOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      if (isLoginTab) {
        const success = await login(email, password);
        if (!success) {
          setAuthError('Invalid email or password credentials.');
        }
      } else {
        if (!name.trim()) {
          setAuthError('Please enter your full name.');
          setAuthLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (!success) {
          setAuthError('Registration failed. Try again.');
        }
      }
    } catch (err) {
      setAuthError('An error occurred during authentication.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleAddAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !street.trim() || !city.trim() || !zipCode.trim()) return;

    const newAddress: Address = {
      fullName,
      street,
      city,
      state: stateName,
      zipCode,
      country
    };

    addAddress(newAddress);

    // Reset Form
    setFullName('');
    setStreet('');
    setCity('');
    setStateName('');
    setZipCode('');
    setCountry('United States');
    setIsAddressFormOpen(false);
  };

  // 1. Unauthenticated Dual-Panel Fallback Form
  if (!isAuthenticated) {
    return (
      <div id="profile-page-unauth" data-testid="profile-page-unauth" className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-lg bg-white border border-brand-gray rounded-[32px] p-8 md:p-12 shadow-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4.5xl font-black text-brand-black tracking-tight mb-2">
              MY ACCOUNT
            </h1>
            <p className="text-sm text-brand-darkGray">
              Sign in to view your profile dashboard, manage shipping locations, and view purchase history logs.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex border-b border-brand-gray mb-8">
            <button
              id="profile-tab-login"
              data-testid="profile-tab-login"
              className={`flex-1 pb-3 text-sm md:text-base font-bold border-b-2 transition-all ${
                isLoginTab
                  ? 'border-brand-black text-brand-black'
                  : 'border-transparent text-brand-darkGray'
              }`}
              onClick={() => {
                setIsLoginTab(true);
                setAuthError('');
              }}
            >
              Sign In
            </button>
            <button
              id="profile-tab-register"
              data-testid="profile-tab-register"
              className={`flex-1 pb-3 text-sm md:text-base font-bold border-b-2 transition-all ${
                !isLoginTab
                  ? 'border-brand-black text-brand-black'
                  : 'border-transparent text-brand-darkGray'
              }`}
              onClick={() => {
                setIsLoginTab(false);
                setAuthError('');
              }}
            >
              Create Account
            </button>
          </div>

          {authError && (
            <div
              id="profile-auth-error"
              data-testid="profile-auth-error"
              className="mb-5 text-xs font-semibold bg-brand-lightRed text-brand-red p-3.5 rounded-xl text-center"
            >
              {authError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4">
            {!isLoginTab && (
              <div className="flex flex-col gap-1.5">
                <label htmlFor="profile-name-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                    <User className="w-5 h-5" />
                  </span>
                  <input
                    id="profile-name-input"
                    name="name"
                    data-testid="profile-name-input"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-email-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  id="profile-email-input"
                  name="email"
                  data-testid="profile-email-input"
                  type="email"
                  placeholder="example@mail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="profile-password-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  id="profile-password-input"
                  name="password"
                  data-testid="profile-password-input"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>

            <button
              id="profile-auth-submit"
              data-testid="profile-auth-submit"
              type="submit"
              disabled={authLoading}
              className="w-full mt-4 py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full transition-colors flex items-center justify-center text-sm disabled:opacity-50"
            >
              {authLoading ? 'Signing in...' : isLoginTab ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated User Profile Dashboard
  return (
    <div id="profile-page-auth" data-testid="profile-page-auth" className="container mx-auto px-4 md:px-8 py-8 w-full">
      <div className="flex items-center justify-between border-b border-brand-gray pb-6 mb-8 gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl md:text-4.5xl font-black text-brand-black tracking-tight" data-testid="profile-title">
            ACCOUNT DASHBOARD
          </h1>
          <p className="text-xs md:text-sm text-brand-darkGray mt-1" data-testid="profile-welcome">
            Hello, <span className="font-bold text-brand-black">{user?.name}</span>! Welcome back to your dashboard.
          </p>
        </div>
        <button
          id="profile-logout-btn"
          data-testid="profile-logout-btn"
          onClick={logout}
          className="px-6 py-3 border border-brand-red text-brand-red font-bold rounded-full text-xs md:text-sm hover:bg-brand-lightRed/20 transition-colors"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
        {/* LEFT COLUMN: User Details & Shipping Addresses */}
        <div className="flex flex-col gap-6 lg:col-span-1 w-full">
          {/* Card: Personal Details */}
          <div className="border border-brand-gray rounded-[20px] p-6 bg-white shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-brand-black flex items-center gap-2 border-b border-brand-gray pb-3">
              <ShieldCheck className="w-5 h-5 text-brand-darkGray" /> Account Details
            </h2>
            <div className="flex flex-col gap-3 font-normal text-sm">
              <div>
                <span className="text-brand-darkGray text-xs font-bold block uppercase tracking-wider mb-0.5">Full Name</span>
                <span className="font-semibold text-brand-black text-base" data-testid="profile-details-name">{user?.name}</span>
              </div>
              <div>
                <span className="text-brand-darkGray text-xs font-bold block uppercase tracking-wider mb-0.5">Email Address</span>
                <span className="font-semibold text-brand-black text-base" data-testid="profile-details-email">{user?.email}</span>
              </div>
            </div>
          </div>

          {/* Card: Shipping Addresses */}
          <div className="border border-brand-gray rounded-[20px] p-6 bg-white shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-brand-gray pb-3">
              <h2 className="text-lg font-bold text-brand-black flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-darkGray" /> Shipping Addresses
              </h2>
              {!isAddressFormOpen && (
                <button
                  id="add-address-toggle"
                  data-testid="add-address-toggle"
                  onClick={() => setIsAddressFormOpen(true)}
                  className="text-brand-black hover:opacity-70"
                  aria-label="Add address"
                >
                  <Plus className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* List addresses */}
            <div className="flex flex-col gap-4.5" data-testid="addresses-list">
              {user?.addresses.length === 0 ? (
                <p className="text-xs text-brand-darkGray font-medium">
                  No addresses saved. Click (+) to add a location.
                </p>
              ) : (
                user?.addresses.map((addr, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-brand-gray/50 rounded-xl border border-brand-gray text-xs md:text-sm font-medium text-brand-black flex flex-col gap-1"
                    data-testid={`address-card-${idx}`}
                  >
                    <p className="font-bold text-brand-black text-sm">{addr.fullName}</p>
                    <p className="text-brand-darkGray">{addr.street}</p>
                    <p className="text-brand-darkGray">
                      {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                    <p className="text-brand-darkGray">{addr.country}</p>
                  </div>
                ))
              )}
            </div>

            {/* Hidden Add Address Form */}
            {isAddressFormOpen && (
              <form
                id="add-address-form"
                data-testid="add-address-form"
                onSubmit={handleAddAddressSubmit}
                className="flex flex-col gap-3.5 border-t border-brand-gray pt-4.5 mt-2 animate-slide-down"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-brand-black">Add New Location</h3>
                  <button
                    type="button"
                    onClick={() => setIsAddressFormOpen(false)}
                    className="text-xs text-brand-red font-bold underline"
                  >
                    Cancel
                  </button>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="addr-name" className="text-[10px] font-bold text-brand-darkGray uppercase">Full Name</label>
                  <input
                    id="addr-name"
                    name="fullName"
                    data-testid="addr-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="addr-street" className="text-[10px] font-bold text-brand-darkGray uppercase">Street Address</label>
                  <input
                    id="addr-street"
                    name="street"
                    data-testid="addr-street"
                    type="text"
                    required
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="addr-city" className="text-[10px] font-bold text-brand-darkGray uppercase">City</label>
                    <input
                      id="addr-city"
                      name="city"
                      data-testid="addr-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="addr-state" className="text-[10px] font-bold text-brand-darkGray uppercase">State</label>
                    <input
                      id="addr-state"
                      name="state"
                      data-testid="addr-state"
                      type="text"
                      required
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="addr-zip" className="text-[10px] font-bold text-brand-darkGray uppercase">Zip Code</label>
                    <input
                      id="addr-zip"
                      name="zipCode"
                      data-testid="addr-zip"
                      type="text"
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="addr-country" className="text-[10px] font-bold text-brand-darkGray uppercase">Country</label>
                    <input
                      id="addr-country"
                      name="country"
                      data-testid="addr-country"
                      type="text"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-3.5 py-2 bg-brand-gray rounded-lg text-xs outline-none focus:bg-white border border-transparent focus:border-brand-black"
                    />
                  </div>
                </div>

                <button
                  id="addr-submit-btn"
                  data-testid="addr-submit-btn"
                  type="submit"
                  className="w-full py-2.5 bg-brand-black text-white font-bold rounded-lg text-xs transition-colors"
                >
                  Save Address
                </button>
              </form>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Order History Log */}
        <div className="flex flex-col gap-6 lg:col-span-2 w-full">
          <div className="border border-brand-gray rounded-[20px] p-6 bg-white shadow-sm flex flex-col gap-6 w-full">
            <h2 className="text-xl font-bold text-brand-black flex items-center gap-2 border-b border-brand-gray pb-3.5">
              <Package className="w-6 h-6 text-brand-darkGray" /> Order History Log
            </h2>

            <div className="flex flex-col gap-5 w-full" data-testid="orders-feed">
              {orders.length === 0 ? (
                <div className="text-center py-14 flex flex-col items-center">
                  <Calendar className="w-12 h-12 text-brand-darkGray/30 mb-3" />
                  <p className="text-sm font-semibold text-brand-black mb-1">No Orders Found</p>
                  <p className="text-xs text-brand-darkGray max-w-xs mb-5">
                    You haven't placed any purchases yet. Complete a checkout in your cart.
                  </p>
                  <Link
                    to="/shop"
                    className="px-6 py-2.5 bg-brand-black text-white text-xs font-bold rounded-full hover:opacity-90"
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="border border-brand-gray rounded-[16px] overflow-hidden p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow"
                    data-testid={`order-card-${order.id}`}
                  >
                    {/* Order metadata banner */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pb-3 border-b border-brand-gray text-xs md:text-sm font-bold text-brand-black">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-brand-darkGray font-medium">Order ID</span>
                        <span>{order.id}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-brand-darkGray font-medium">Date Placed</span>
                        <span>{order.date}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase text-brand-darkGray font-medium">Total Paid</span>
                        <span>${order.total}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] uppercase text-brand-darkGray font-medium">Status</span>
                        <span className="text-emerald-600 flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 stroke-[3]" /> {order.status}
                        </span>
                      </div>
                    </div>

                    {/* Order items feed */}
                    <div className="flex flex-col gap-3.5">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-3.5 items-stretch">
                          {/* Item Thumbnail */}
                          <div className="w-16 h-16 bg-brand-gray rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <img src={item.image} alt={item.productName} className="object-cover w-full h-full" />
                          </div>
                          {/* Details */}
                          <div className="flex-1 flex flex-col justify-between text-xs md:text-sm font-medium">
                            <div className="flex justify-between gap-1 items-start">
                              <p className="font-bold text-brand-black truncate max-w-[200px] md:max-w-md">
                                {item.productName}
                              </p>
                              <span className="font-bold text-brand-black">${item.price}</span>
                            </div>
                            <div className="flex items-center justify-between text-[11px] text-brand-darkGray mt-1">
                              <span>
                                Size: <span className="font-bold text-brand-black">{item.size}</span> | Color:{' '}
                                <span
                                  style={{ backgroundColor: item.color }}
                                  className="w-2.5 h-2.5 rounded-full inline-block border border-brand-black/10 align-middle"
                                />
                              </span>
                              <span>
                                Qty: <span className="font-bold text-brand-black">{item.quantity}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
