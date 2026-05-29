import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Plus, Minus, Check, Star } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { RatingStars } from '../components/ui/RatingStars';
import { ReviewCard } from '../components/ui/ReviewCard';
import { ProductCard } from '../components/ui/ProductCard';
import { useCart } from '../context/CartContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  // Find active product
  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === id) || MOCK_PRODUCTS[0];
  }, [id]);

  const {
    name,
    price,
    originalPrice,
    discountPercent,
    rating,
    images,
    colors,
    sizes,
    description
  } = product;

  // Active configurations state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0] || '');
  const [selectedSize, setSelectedSize] = useState(sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [cartFeedback, setCartFeedback] = useState('');

  // Tabs state
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'faqs'>('reviews');

  // Reviews state (initialized with mock reviews + local custom ones)
  const [reviewsList, setReviewsList] = useState(() => {
    return [...MOCK_REVIEWS];
  });

  // Review Form state
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [reviewSort, setReviewSort] = useState('latest');

  // Reset page parameters when product ID changes
  useEffect(() => {
    setActiveImageIndex(0);
    if (colors.length > 0) setSelectedColor(colors[0]);
    if (sizes.length > 0) setSelectedSize(sizes[0]);
    setQuantity(1);
    setCartFeedback('');
    window.scrollTo(0, 0);
  }, [id, colors, sizes]);

  // Quantity updates
  const handleQuantityIncrement = () => setQuantity((prev) => prev + 1);
  const handleQuantityDecrement = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Add to Cart triggered
  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setCartFeedback(`Added ${quantity} item(s) to cart successfully!`);
    setTimeout(() => setCartFeedback(''), 4000);
  };

  // Submit new review
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewContent.trim()) return;

    const newReview = {
      id: 'rev-' + Date.now(),
      name: newReviewName,
      rating: newReviewRating,
      verified: true,
      content: `"${newReviewContent}"`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    setReviewsList((prev) => [newReview, ...prev]);
    // Clear state
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewContent('');
    setIsWriteReviewOpen(false);
  };

  // Sorted reviews list
  const sortedReviews = useMemo(() => {
    const list = [...reviewsList];
    if (reviewSort === 'highest') {
      return list.sort((a, b) => b.rating - a.rating);
    } else if (reviewSort === 'lowest') {
      return list.sort((a, b) => a.rating - b.rating);
    }
    // 'latest' as default
    return list;
  }, [reviewsList, reviewSort]);

  // Recommendation products (same style/category, excluding current item)
  const recommendations = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => p.id !== product.id && (p.style === product.style || p.category === product.category)).slice(0, 4);
  }, [product]);

  return (
    <div id="product-details-page" data-testid="product-details-page" className="container mx-auto px-4 md:px-8 py-8 w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-brand-darkGray/60 mb-8" data-testid="breadcrumbs">
        <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-brand-black transition-colors">Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-black font-semibold truncate" data-testid="breadcrumb-active">
          {name}
        </span>
      </div>

      {/* Main product showcase panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 pb-14 border-b border-brand-gray w-full">
        {/* LEFT COLUMN: Gallery */}
        <div className="flex flex-col-reverse md:flex-row gap-4.5 w-full">
          {/* Thumbnails list */}
          <div className="flex md:flex-col gap-3.5 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-32 flex-shrink-0">
            {images.map((img, idx) => (
              <button
                key={idx}
                data-testid={`thumbnail-img-${idx}`}
                onClick={() => setActiveImageIndex(idx)}
                className={`aspect-square w-20 md:w-full rounded-2xl overflow-hidden bg-brand-gray border-2 transition-all flex items-center justify-center flex-shrink-0 ${
                  activeImageIndex === idx ? 'border-brand-black' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Preview ${idx + 1}`} className="object-cover w-full h-full" />
              </button>
            ))}
          </div>

          {/* Large display main image */}
          <div className="flex-1 aspect-square rounded-[20px] overflow-hidden bg-brand-gray flex items-center justify-center border border-brand-gray">
            <img
              src={images[activeImageIndex] || images[0]}
              alt={name}
              className="object-cover w-full h-full animate-fade-in"
              data-testid="main-product-image"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: details block */}
        <div className="flex flex-col gap-5 md:gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5.5xl font-black tracking-tight text-brand-black mb-3" data-testid="product-details-title">
              {name}
            </h1>
            <div data-testid="product-details-rating">
              <RatingStars rating={rating} idPrefix="details" />
            </div>
          </div>

          {/* Price details */}
          <div className="flex items-center gap-3" data-testid="product-details-price">
            <span className="text-2xl md:text-3xl font-bold text-brand-black">
              ${price}
            </span>
            {originalPrice && (
              <>
                <span className="text-2xl md:text-3xl font-bold text-brand-darkGray line-through opacity-40">
                  ${originalPrice}
                </span>
                <span className="text-sm font-semibold px-3 py-1 rounded-full bg-brand-lightRed text-brand-red">
                  -{discountPercent}%
                </span>
              </>
            )}
          </div>

          <p className="text-sm md:text-base text-brand-darkGray leading-relaxed font-normal" data-testid="product-details-desc">
            {description}
          </p>

          <hr className="border-brand-gray" />

          {/* Color Selector */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-brand-darkGray uppercase tracking-wider">Select Color</span>
            <div className="flex items-center gap-3.5" data-testid="color-selector">
              {colors.map((color) => (
                <button
                  key={color}
                  data-testid={`color-select-${color}`}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-9 h-9 rounded-full border relative transition-transform hover:scale-105 ${
                    selectedColor === color
                      ? 'border-brand-black ring-2 ring-brand-black/20 scale-105'
                      : 'border-brand-black/10'
                  }`}
                  aria-label={`Color option ${color}`}
                >
                  {selectedColor === color && (
                    <span
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${
                        color === '#E5E4E2' || color === '#E5D5C5' || color === '#D1D5DB' || color === '#FFD700'
                          ? 'text-brand-black'
                          : 'text-white'
                      }`}
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-brand-gray" />

          {/* Size Selector */}
          <div className="flex flex-col gap-3">
            <span className="text-sm font-bold text-brand-darkGray uppercase tracking-wider">Choose Size</span>
            <div className="flex flex-wrap gap-3" data-testid="size-selector">
              {sizes.map((size) => (
                <button
                  key={size}
                  data-testid={`size-select-${size}`}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-3 text-sm font-semibold rounded-full border transition-all ${
                    selectedSize === size
                      ? 'bg-brand-black text-white border-brand-black'
                      : 'bg-brand-gray/50 text-brand-darkGray border-brand-gray hover:border-brand-black'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-brand-gray" />

          {/* Add to Cart panel (qty counter + button) */}
          <div className="flex items-stretch gap-5 mt-2">
            {/* Quantity Counter */}
            <div
              className="flex items-center justify-between bg-brand-gray px-5 py-3.5 rounded-full w-32 md:w-36 flex-shrink-0"
              data-testid="quantity-counter"
            >
              <button
                id="quantity-decrement"
                data-testid="quantity-decrement"
                onClick={handleQuantityDecrement}
                className="text-brand-black hover:opacity-70 focus:outline-none"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4.5 h-4.5" />
              </button>
              <span className="font-bold text-base text-brand-black select-none" data-testid="quantity-value">
                {quantity}
              </span>
              <button
                id="quantity-increment"
                data-testid="quantity-increment"
                onClick={handleQuantityIncrement}
                className="text-brand-black hover:opacity-70 focus:outline-none"
                aria-label="Increase quantity"
              >
                <Plus className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Add to Cart button */}
            <button
              id="add-to-cart-btn"
              data-testid="add-to-cart-btn"
              onClick={handleAddToCart}
              className="flex-1 py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full transition-colors text-center text-sm"
            >
              Add to Cart
            </button>
          </div>

          {/* Feedback banner */}
          {cartFeedback && (
            <div
              id="cart-feedback-message"
              data-testid="cart-feedback-message"
              className="mt-3 text-xs font-bold text-center bg-emerald-50 text-emerald-600 p-3.5 rounded-xl border border-emerald-200"
            >
              {cartFeedback}
            </div>
          )}
        </div>
      </div>

      {/* ================= TABS SYSTEM (Details / Reviews / FAQs) ================= */}
      <section className="py-12 md:py-16 border-b border-brand-gray w-full">
        {/* Tab triggers */}
        <div className="flex border-b border-brand-gray mb-10 w-full" data-testid="details-tabs-header">
          <button
            id="tab-details-trigger"
            data-testid="tab-details-trigger"
            onClick={() => setActiveTab('details')}
            className={`flex-1 pb-4 text-center font-semibold text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-brand-black text-brand-black'
                : 'border-transparent text-brand-darkGray/60 hover:text-brand-black'
            }`}
          >
            Product Details
          </button>
          <button
            id="tab-reviews-trigger"
            data-testid="tab-reviews-trigger"
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 pb-4 text-center font-semibold text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'reviews'
                ? 'border-brand-black text-brand-black'
                : 'border-transparent text-brand-darkGray/60 hover:text-brand-black'
            }`}
          >
            Rating & Reviews
          </button>
          <button
            id="tab-faqs-trigger"
            data-testid="tab-faqs-trigger"
            onClick={() => setActiveTab('faqs')}
            className={`flex-1 pb-4 text-center font-semibold text-sm sm:text-base border-b-2 transition-colors ${
              activeTab === 'faqs'
                ? 'border-brand-black text-brand-black'
                : 'border-transparent text-brand-darkGray/60 hover:text-brand-black'
            }`}
          >
            FAQs
          </button>
        </div>

        {/* Tab Contents */}
        <div id="details-tabs-content" data-testid="details-tabs-content" className="w-full">
          {activeTab === 'details' && (
            <div className="max-w-3xl flex flex-col gap-5 text-brand-darkGray font-normal leading-relaxed text-sm md:text-base">
              <h3 className="text-xl font-bold text-brand-black">Detailed Specifications</h3>
              <p>
                Crafted specifically for design enthusiasts, this product details classic tailoring infused with modern aesthetics. Ideal for casual, multi-layer wardrobe edits. Fits comfortably across seasons.
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2">
                <li>Material: 95% Organic Cotton, 5% Lycra blend</li>
                <li>Fit style: Relaxed-tailored silhouette</li>
                <li>Care: Machine wash cold, dry flat to retain shape</li>
                <li>Weight: Medium weight breathable fabric (220 GSM)</li>
                <li>Country of origin: Made in Italy</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-8 w-full">
              {/* Header inside reviews tab */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-baseline gap-2">
                  <h3 className="text-lg md:text-xl font-bold text-brand-black">All Reviews</h3>
                  <span className="text-xs md:text-sm text-brand-darkGray font-medium">({reviewsList.length})</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Reviews Sorting */}
                  <select
                    id="reviews-sort-select"
                    data-testid="reviews-sort-select"
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value)}
                    className="px-4 py-2.5 bg-brand-gray border border-transparent rounded-full text-brand-black text-xs md:text-sm font-semibold focus:border-brand-black focus:outline-none cursor-pointer"
                  >
                    <option value="latest">Latest</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>

                  {/* Write a Review trigger */}
                  <button
                    id="write-review-toggle"
                    data-testid="write-review-toggle"
                    onClick={() => setIsWriteReviewOpen(!isWriteReviewOpen)}
                    className="px-5 py-2.5 bg-brand-black text-white hover:bg-brand-black/90 text-xs md:text-sm font-semibold rounded-full transition-colors"
                  >
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Collapsible Write a Review Form */}
              {isWriteReviewOpen && (
                <form
                  id="write-review-form"
                  data-testid="write-review-form"
                  onSubmit={handleReviewSubmit}
                  className="bg-brand-gray/40 border border-brand-gray rounded-[20px] p-6 max-w-xl flex flex-col gap-4.5 animate-slide-down"
                >
                  <h4 className="text-base font-bold text-brand-black">Share your feedback</h4>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="review-name-input" className="text-xs font-bold text-brand-black">Your Name</label>
                    <input
                      id="review-name-input"
                      name="name"
                      data-testid="review-name-input"
                      type="text"
                      placeholder="e.g. John Smith"
                      required
                      value={newReviewName}
                      onChange={(e) => setNewReviewName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-brand-black/10 rounded-xl focus:border-brand-black focus:outline-none text-sm"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="review-rating-select" className="text-xs font-bold text-brand-black">Rating (1-5 Stars)</label>
                    <div className="flex items-center gap-1" id="review-stars-picker">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReviewRating(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReviewRating ? 'text-[#FFC700] fill-current' : 'text-gray-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="review-content-textarea" className="text-xs font-bold text-brand-black">Review Details</label>
                    <textarea
                      id="review-content-textarea"
                      name="content"
                      data-testid="review-content-textarea"
                      placeholder="Write your review here..."
                      rows={4}
                      required
                      value={newReviewContent}
                      onChange={(e) => setNewReviewContent(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-brand-black/10 rounded-xl focus:border-brand-black focus:outline-none text-sm"
                    />
                  </div>

                  <button
                    id="review-submit-btn"
                    data-testid="review-submit-btn"
                    type="submit"
                    className="w-full py-3 bg-brand-black text-white font-bold rounded-full text-xs hover:opacity-90 transition-opacity"
                  >
                    Submit Review
                  </button>
                </form>
              )}

              {/* Reviews Feed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 w-full" data-testid="reviews-feed">
                {sortedReviews.map((rev) => (
                  <ReviewCard
                    key={rev.id}
                    name={rev.name}
                    rating={rev.rating}
                    content={rev.content}
                    date={rev.date}
                    verified={rev.verified}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'faqs' && (
            <div className="max-w-3xl flex flex-col gap-4" data-testid="faqs-list">
              <div className="bg-brand-gray/30 p-5 rounded-2xl">
                <h4 className="font-bold text-base text-brand-black mb-1.5">What is the return policy?</h4>
                <p className="text-sm text-brand-darkGray font-normal">
                  We offer a 30-day money-back guarantee. If you are unsatisfied with your product, return it in original condition for a full refund.
                </p>
              </div>
              <div className="bg-brand-gray/30 p-5 rounded-2xl">
                <h4 className="font-bold text-base text-brand-black mb-1.5">How long does shipping take?</h4>
                <p className="text-sm text-brand-darkGray font-normal">
                  Standard shipping takes 3-5 business days. Express shipping takes 1-2 business days. Free shipping is automatically applied on orders over $200.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= RELATED PRODUCTS ("You Might Also Like") ================= */}
      {recommendations.length > 0 && (
        <section className="py-16 w-full">
          <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight uppercase text-brand-black">
            YOU MIGHT ALSO LIKE
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
