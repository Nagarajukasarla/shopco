import React, { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useUser } from '../../context/UserContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login, register } = useUser();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLoginView) {
        const success = await login(email, password);
        if (success) {
          onClose();
        } else {
          setError('Invalid email or password.');
        }
      } else {
        if (!name.trim()) {
          setError('Name is required.');
          setLoading(false);
          return;
        }
        const success = await register(name, email, password);
        if (success) {
          onClose();
        } else {
          setError('Failed to create account.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="login-modal-overlay"
      data-testid="login-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        id="login-modal-container"
        data-testid="login-modal-container"
        className="relative w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-login-modal"
          data-testid="close-login-modal"
          onClick={onClose}
          className="absolute top-5 right-5 text-brand-darkGray hover:text-brand-black transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Brand/Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-black mb-2">
            SHOP.CO
          </h2>
          <p className="text-sm text-brand-darkGray">
            {isLoginView ? 'Welcome back! Sign in to continue shopping.' : 'Create an account to track orders and checkout faster.'}
          </p>
        </div>

        {/* Views Toggle tab */}
        <div className="flex border-b border-brand-gray mb-6">
          <button
            id="modal-tab-login"
            data-testid="modal-tab-login"
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
              isLoginView
                ? 'border-brand-black text-brand-black'
                : 'border-transparent text-brand-darkGray'
            }`}
            onClick={() => {
              setIsLoginView(true);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            id="modal-tab-register"
            data-testid="modal-tab-register"
            className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all ${
              !isLoginView
                ? 'border-brand-black text-brand-black'
                : 'border-transparent text-brand-darkGray'
            }`}
            onClick={() => {
              setIsLoginView(false);
              setError('');
            }}
          >
            Create Account
          </button>
        </div>

        {/* Error Block */}
        {error && (
          <div
            id="login-error-message"
            data-testid="login-error-message"
            className="mb-4 text-xs font-semibold bg-brand-lightRed text-brand-red p-3.5 rounded-xl text-center"
          >
            {error}
          </div>
        )}

        {/* Authentication Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!isLoginView && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="modal-name-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                  <User className="w-5 h-5" />
                </span>
                <input
                  id="modal-name-input"
                  name="name"
                  data-testid="modal-name-input"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
                />
              </div>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-email-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                <Mail className="w-5 h-5" />
              </span>
              <input
                id="modal-email-input"
                name="email"
                data-testid="modal-email-input"
                type="email"
                placeholder="example@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="modal-password-input" className="text-xs font-bold text-brand-black uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                <Lock className="w-5 h-5" />
              </span>
              <input
                id="modal-password-input"
                name="password"
                data-testid="modal-password-input"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-brand-gray border border-transparent rounded-xl focus:border-brand-black focus:bg-white outline-none transition-all text-sm font-medium"
              />
            </div>
          </div>

          <button
            id="modal-submit-btn"
            data-testid="modal-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full mt-4 py-3.5 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full transition-colors flex items-center justify-center text-sm disabled:opacity-50"
          >
            {loading ? 'Processing...' : isLoginView ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
