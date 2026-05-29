import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, Tag, ChevronRight, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import type { OrderItem } from '../context/UserContext';
import { LoginModal } from '../components/ui/LoginModal';

export const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    applyPromoCode,
    removePromoCode,
    subTotal,
    discountAmount,
    deliveryFee,
    finalTotal
  } = useCart();

  const { isAuthenticated, placeOrder } = useUser();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');

    if (!promoInput.trim()) return;

    const success = applyPromoCode(promoInput);
    if (success) {
      setPromoSuccess(`Promo code "${promoInput.toUpperCase()}" applied successfully!`);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try "SHOP20" or "DISCOUNT10".');
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }

    // Place Order
    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.product.id,
      productName: item.product.name,
      image: item.product.image,
      color: item.selectedColor,
      size: item.selectedSize,
      price: item.product.price,
      quantity: item.quantity
    }));

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    placeOrder(orderItems, finalTotal);

    // Save order status locally for visual display
    setPlacedOrderId(orderId);
    setOrderCompleted(true);

    // Clear Cart
    clearCart();
  };

  if (orderCompleted) {
    return (
      <div className="container mx-auto px-4 md:px-8 py-20 text-center flex flex-col items-center justify-center max-w-xl">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-brand-black mb-3">Order Placed!</h2>
        <p className="text-brand-darkGray text-sm md:text-base mb-2">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>
        <div className="bg-brand-gray px-5 py-3 rounded-xl font-bold text-brand-black text-sm mb-8">
          Order Reference: {placedOrderId}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            to="/profile"
            className="flex-1 py-3.5 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full text-center text-sm transition-colors"
          >
            Track Order
          </Link>
          <Link
            to="/shop"
            className="flex-1 py-3.5 border border-brand-black/10 hover:bg-brand-gray text-brand-black font-semibold rounded-full text-center text-sm transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="cart-page" data-testid="cart-page" className="container mx-auto px-4 md:px-8 py-8 w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-brand-darkGray/60 mb-6 md:mb-8" data-testid="breadcrumbs">
        <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-black font-semibold truncate" data-testid="breadcrumb-active">Cart</span>
      </div>

      <h1 className="text-3xl md:text-4.5xl font-black text-brand-black tracking-tight mb-8" data-testid="cart-title">
        YOUR CART
      </h1>

      {cartItems.length === 0 ? (
        <div className="w-full py-20 text-center flex flex-col items-center justify-center bg-brand-gray/20 border border-dashed border-brand-gray rounded-[20px] px-4">
          <ShoppingBag className="w-14 h-14 text-brand-darkGray/40 mb-4" />
          <h2 className="text-2xl font-bold text-brand-black mb-1">Your cart is empty</h2>
          <p className="text-sm text-brand-darkGray max-w-sm mb-8">
            Looks like you haven't added anything to your cart yet. Head over to our catalog to find premium clothing items.
          </p>
          <Link
            to="/shop"
            className="px-10 py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full text-sm transition-all"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start w-full">
          {/* LEFT COLUMN: Cart Items list */}
          <div
            id="cart-items-container"
            data-testid="cart-items-container"
            className="flex-1 w-full flex flex-col border border-brand-gray rounded-[20px] p-5 md:p-6 bg-white gap-5"
          >
            {cartItems.map((item, index) => {
              const { id, name, price, image } = item.product;
              const { selectedSize, selectedColor, quantity } = item;

              return (
                <div key={`${id}-${selectedSize}-${selectedColor}`}>
                  {index > 0 && <hr className="border-brand-gray mb-5" />}
                  <div
                    className="flex gap-4 items-stretch"
                    data-testid={`cart-item-${id}`}
                  >
                    {/* Item Thumbnail */}
                    <div className="w-24 md:w-32 aspect-square bg-brand-gray rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={image} alt={name} className="object-cover w-full h-full" />
                    </div>

                    {/* Item Info details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3
                            className="font-bold text-base md:text-lg text-brand-black hover:text-brand-darkGray transition-colors line-clamp-1"
                            data-testid={`cart-item-title-${id}`}
                          >
                            <Link to={`/product/${id}`}>{name}</Link>
                          </h3>
                          <p className="text-xs md:text-sm text-brand-darkGray mt-1">
                            Size:{' '}
                            <span className="font-semibold text-brand-black" data-testid={`cart-item-size-${id}`}>
                              {selectedSize}
                            </span>
                          </p>
                          <div className="flex items-center gap-1.5 text-xs md:text-sm text-brand-darkGray mt-1">
                            <span>Color:</span>
                            <span
                              style={{ backgroundColor: selectedColor }}
                              className="w-3.5 h-3.5 rounded-full border border-brand-black/10"
                              data-testid={`cart-item-color-${id}`}
                            />
                          </div>
                        </div>

                        {/* Delete Button */}
                        <button
                          data-testid={`cart-item-delete-${id}`}
                          onClick={() => removeFromCart(id, selectedSize, selectedColor)}
                          className="text-brand-red hover:opacity-80 p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Pricing + Qty selector */}
                      <div className="flex items-end justify-between mt-2">
                        <span className="font-bold text-lg md:text-xl text-brand-black" data-testid={`cart-item-price-${id}`}>
                          ${price}
                        </span>

                        {/* Quantity controls */}
                        <div
                          className="flex items-center justify-between bg-brand-gray px-3.5 py-1.5 rounded-full w-24 md:w-28"
                          data-testid={`cart-item-qty-${id}`}
                        >
                          <button
                            onClick={() => updateQuantity(id, selectedSize, selectedColor, quantity - 1)}
                            className="text-brand-black hover:opacity-75 focus:outline-none"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-bold text-xs md:text-sm text-brand-black select-none">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(id, selectedSize, selectedColor, quantity + 1)}
                            className="text-brand-black hover:opacity-75 focus:outline-none"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Order Summary panel */}
          <aside
            id="order-summary-panel"
            data-testid="order-summary-panel"
            className="w-full lg:w-96 border border-brand-gray rounded-[20px] p-5 md:p-6 bg-white flex flex-col gap-5 lg:sticky lg:top-36"
          >
            <h2 className="text-xl md:text-2xl font-bold text-brand-black pb-1.5">Order Summary</h2>

            {/* Calculations Row */}
            <div className="flex flex-col gap-4 text-sm md:text-base font-normal">
              <div className="flex justify-between items-center text-brand-darkGray">
                <span>Subtotal</span>
                <span className="font-bold text-brand-black" data-testid="summary-subtotal">
                  ${subTotal}
                </span>
              </div>
              <div className="flex justify-between items-center text-brand-darkGray">
                <span>Discount</span>
                <span className="font-bold text-brand-red" data-testid="summary-discount">
                  -${discountAmount}
                </span>
              </div>
              <div className="flex justify-between items-center text-brand-darkGray">
                <span>Delivery Fee</span>
                <span className="font-bold text-brand-black" data-testid="summary-delivery">
                  {deliveryFee === 0 ? 'Free' : `$${deliveryFee}`}
                </span>
              </div>
              <hr className="border-brand-gray" />
              <div className="flex justify-between items-center text-base md:text-lg">
                <span className="font-bold text-brand-black">Total</span>
                <span className="font-extrabold text-brand-black" data-testid="summary-total">
                  ${finalTotal}
                </span>
              </div>
            </div>

            {/* Promo Code input form */}
            <div className="flex flex-col gap-2 pt-2 border-t border-brand-gray">
              <form onSubmit={handleApplyPromo} className="flex gap-2" id="promo-form" data-testid="promo-form">
                <div className="relative flex-1">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-darkGray/60">
                    <Tag className="w-4 h-4" />
                  </span>
                  <input
                    id="promo-code-input"
                    name="promoCode"
                    data-testid="promo-code-input"
                    type="text"
                    placeholder="Add promo code"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-brand-gray border border-transparent rounded-full text-xs font-semibold focus:border-brand-black focus:bg-white outline-none transition-all"
                  />
                </div>
                <button
                  id="promo-apply-btn"
                  data-testid="promo-apply-btn"
                  type="submit"
                  className="px-5 py-2.5 bg-brand-black text-white hover:bg-brand-black/90 text-xs font-bold rounded-full transition-colors"
                >
                  Apply
                </button>
              </form>

              {/* Promo states feedback */}
              {promoError && (
                <p className="text-xs font-semibold text-brand-red" data-testid="promo-error">
                  {promoError}
                </p>
              )}
              {promoSuccess && (
                <p className="text-xs font-semibold text-emerald-600" data-testid="promo-success">
                  {promoSuccess}
                </p>
              )}
              {promoCode && (
                <div className="flex items-center justify-between bg-emerald-50 text-emerald-700 px-3.5 py-2 rounded-xl text-xs font-semibold mt-1">
                  <span>Code: {promoCode} applied</span>
                  <button onClick={removePromoCode} className="text-brand-red font-bold underline ml-2">
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Checkout Button */}
            <button
              id="checkout-btn"
              data-testid="checkout-btn"
              onClick={handleCheckout}
              className="w-full py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full text-center text-sm transition-colors mt-2"
            >
              Go to Checkout
            </button>
          </aside>
        </div>
      )}

      {/* Login Modal if unauthenticated checkout triggers */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </div>
  );
};

export default Cart;
