import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read URL query params
  const initialSearch = searchParams.get('search') || '';
  const initialStyle = searchParams.get('style') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  // Local filter states
  const [searchVal, setSearchVal] = useState(initialSearch);
  const [selectedStyle, setSelectedStyle] = useState(initialStyle);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortBy, setSortBy] = useState(initialSort);

  // Layout states
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isPriceExpanded, setIsPriceExpanded] = useState(true);
  const [isColorsExpanded, setIsColorsExpanded] = useState(true);
  const [isSizesExpanded, setIsSizesExpanded] = useState(true);
  const [isStylesExpanded, setIsStylesExpanded] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync state if URL changes
  useEffect(() => {
    setSearchVal(searchParams.get('search') || '');
    setSelectedStyle(searchParams.get('style') || '');
    setSelectedCategory(searchParams.get('category') || '');
    setSortBy(searchParams.get('sort') || 'popular');
    setCurrentPage(1);
  }, [searchParams]);

  // Unique lists from data
  const colorsList = useMemo(() => {
    const colors = new Set<string>();
    MOCK_PRODUCTS.forEach((p) => p.colors.forEach((c) => colors.add(c)));
    return Array.from(colors);
  }, []);

  const sizesList = ['Small', 'Medium', 'Large', 'X-Large', 'XX-Large'];
  const categoriesList = ['T-Shirts', 'Shirts', 'Jeans', 'Dresses', 'Jackets', 'Hoodies', 'Shorts', 'Pants', 'Formal Wear'];

  // Apply filters handler - updates search params
  const handleApplyFilters = () => {
    const params: Record<string, string> = {};
    if (searchVal) params.search = searchVal;
    if (selectedStyle) params.style = selectedStyle;
    if (selectedCategory) params.category = selectedCategory;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
    setIsFilterSidebarOpen(false);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchVal('');
    setSelectedStyle('');
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedSize('');
    setPriceRange([0, 500]);
    setSortBy('popular');
    setSearchParams({});
    setCurrentPage(1);
  };

  // Perform filtration in memory
  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    // Search query matching
    if (searchVal) {
      const q = searchVal.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Dress Style filter
    if (selectedStyle) {
      result = result.filter((p) => p.style.toLowerCase() === selectedStyle.toLowerCase());
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Color filter
    if (selectedColor) {
      result = result.filter((p) => p.colors.includes(selectedColor));
    }

    // Size filter
    if (selectedSize) {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price range filter
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sorting
    if (sortBy === 'newest') {
      // Mock newest by reversing order or styling
      result.reverse();
    } else if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchVal, selectedStyle, selectedCategory, selectedColor, selectedSize, priceRange, sortBy]);

  // Paginated display
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;

  // Breadcrumbs text helper
  const breadcrumbText = () => {
    if (selectedStyle) return selectedStyle;
    if (selectedCategory) return selectedCategory;
    if (searchVal) return `Search: "${searchVal}"`;
    return 'All Products';
  };

  return (
    <div id="shop-page" data-testid="shop-page" className="container mx-auto px-4 md:px-8 py-8 w-full">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-sm font-medium text-brand-darkGray/60 mb-6 md:mb-8" data-testid="breadcrumbs">
        <Link to="/" className="hover:text-brand-black transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/shop" className="hover:text-brand-black transition-colors" onClick={handleResetFilters}>Shop</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-brand-black font-semibold truncate" data-testid="breadcrumb-active">
          {breadcrumbText()}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
        {/* ================= LEFT SIDEBAR (Filter Desktop / Mobile overlay) ================= */}
        <aside
          id="filter-sidebar"
          data-testid="filter-sidebar"
          className={`lg:w-72 w-full lg:sticky lg:top-36 bg-white border border-brand-gray rounded-[20px] p-6 flex-shrink-0 transition-all duration-300 ${
            isFilterSidebarOpen
              ? 'fixed inset-0 top-[96px] z-30 overflow-y-auto block rounded-none border-0'
              : 'hidden lg:block'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-brand-gray mb-5">
            <span className="text-xl font-bold text-brand-black flex items-center gap-2">
              Filters
            </span>
            <div className="flex items-center gap-2">
              <button
                id="reset-filters-btn"
                data-testid="reset-filters-btn"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-brand-darkGray/80 hover:text-brand-black transition-colors underline"
              >
                Clear All
              </button>
              {isFilterSidebarOpen && (
                <button
                  id="close-filters-btn"
                  data-testid="close-filters-btn"
                  onClick={() => setIsFilterSidebarOpen(false)}
                  className="lg:hidden text-brand-black"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {/* Categories */}
            <div className="border-b border-brand-gray pb-5">
              <button
                onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                className="w-full flex items-center justify-between font-bold text-base text-brand-black mb-3 focus:outline-none"
              >
                Categories
                {isCategoriesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isCategoriesExpanded && (
                <div className="flex flex-col gap-2.5 mt-1.5 pl-1.5" data-testid="filter-categories-list">
                  <button
                    onClick={() => setSelectedCategory('')}
                    className={`text-sm font-semibold text-left transition-colors ${
                      selectedCategory === '' ? 'text-brand-black font-extrabold' : 'text-brand-darkGray hover:text-brand-black'
                    }`}
                  >
                    All Categories
                  </button>
                  {categoriesList.map((cat) => (
                    <button
                      key={cat}
                      data-testid={`filter-category-${cat}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-sm font-semibold text-left transition-colors ${
                        selectedCategory.toLowerCase() === cat.toLowerCase()
                          ? 'text-brand-black font-extrabold'
                          : 'text-brand-darkGray hover:text-brand-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price slider */}
            <div className="border-b border-brand-gray pb-5">
              <button
                onClick={() => setIsPriceExpanded(!isPriceExpanded)}
                className="w-full flex items-center justify-between font-bold text-base text-brand-black mb-3 focus:outline-none"
              >
                Price Range
                {isPriceExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isPriceExpanded && (
                <div className="flex flex-col gap-3 mt-1.5" data-testid="filter-price-slider">
                  <div className="flex items-center justify-between text-xs font-bold text-brand-darkGray mb-1">
                    <span>Min: ${priceRange[0]}</span>
                    <span>Max: ${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
                    className="w-full accent-brand-black h-1 bg-brand-gray rounded-lg appearance-none cursor-pointer"
                    id="price-range-input"
                    data-testid="price-range-input"
                  />
                </div>
              )}
            </div>

            {/* Color circles */}
            <div className="border-b border-brand-gray pb-5">
              <button
                onClick={() => setIsColorsExpanded(!isColorsExpanded)}
                className="w-full flex items-center justify-between font-bold text-base text-brand-black mb-3 focus:outline-none"
              >
                Colors
                {isColorsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isColorsExpanded && (
                <div className="flex flex-wrap gap-2.5 mt-2" data-testid="filter-colors-grid">
                  {colorsList.map((color) => (
                    <button
                      key={color}
                      data-testid={`filter-color-${color}`}
                      onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                      style={{ backgroundColor: color }}
                      className={`w-9 h-9 rounded-full border relative transition-transform hover:scale-105 ${
                        selectedColor === color
                          ? 'border-brand-black ring-2 ring-brand-black/20 scale-105'
                          : 'border-brand-black/10'
                      }`}
                      aria-label={`Select color ${color}`}
                    >
                      {selectedColor === color && (
                        <span
                          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs ${
                            color === '#E5E4E2' || color === '#E5D5C5' || color === '#D1D5DB' || color === '#FFD700'
                              ? 'text-brand-black'
                              : 'text-white'
                          }`}
                        >
                          ✓
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="border-b border-brand-gray pb-5">
              <button
                onClick={() => setIsSizesExpanded(!isSizesExpanded)}
                className="w-full flex items-center justify-between font-bold text-base text-brand-black mb-3 focus:outline-none"
              >
                Sizes
                {isSizesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isSizesExpanded && (
                <div className="flex flex-wrap gap-2 mt-2" data-testid="filter-sizes-grid">
                  {sizesList.map((size) => (
                    <button
                      key={size}
                      data-testid={`filter-size-${size}`}
                      onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                      className={`px-5 py-2.5 text-sm font-semibold rounded-full border transition-all ${
                        selectedSize === size
                          ? 'bg-brand-black text-white border-brand-black'
                          : 'bg-brand-gray/40 text-brand-darkGray border-brand-gray hover:border-brand-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dress Style */}
            <div>
              <button
                onClick={() => setIsStylesExpanded(!isStylesExpanded)}
                className="w-full flex items-center justify-between font-bold text-base text-brand-black mb-3 focus:outline-none"
              >
                Dress Style
                {isStylesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {isStylesExpanded && (
                <div className="flex flex-col gap-2.5 mt-1.5 pl-1.5" data-testid="filter-styles-list">
                  {['Casual', 'Formal', 'Party', 'Gym'].map((style) => (
                    <button
                      key={style}
                      data-testid={`filter-style-${style}`}
                      onClick={() => setSelectedStyle(selectedStyle.toLowerCase() === style.toLowerCase() ? '' : style)}
                      className={`text-sm font-semibold text-left transition-colors ${
                        selectedStyle.toLowerCase() === style.toLowerCase()
                          ? 'text-brand-black font-extrabold'
                          : 'text-brand-darkGray hover:text-brand-black'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Apply filters Button */}
            <button
              id="apply-filters-btn"
              data-testid="apply-filters-btn"
              onClick={handleApplyFilters}
              className="w-full py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full transition-colors text-center text-sm mt-4"
            >
              Apply Filter
            </button>
          </div>
        </aside>

        {/* ================= RIGHT PRODUCT GRID ================= */}
        <main className="flex-1 w-full">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-brand-black tracking-tight" data-testid="shop-page-title">
                {selectedStyle ? `${selectedStyle} Wear` : selectedCategory ? selectedCategory : 'All Products'}
              </h2>
              <p className="text-xs md:text-sm text-brand-darkGray mt-1" data-testid="showing-results-count">
                Showing {filteredProducts.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}-
                {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
              </p>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              {/* Mobile Filter Toggle */}
              <button
                id="mobile-filter-btn"
                data-testid="mobile-filter-btn"
                onClick={() => setIsFilterSidebarOpen(true)}
                className="flex lg:hidden items-center gap-2 px-4 py-2.5 bg-brand-gray border border-transparent rounded-full text-sm font-semibold text-brand-black focus:outline-none hover:bg-brand-gray/75"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-brand-darkGray hidden sm:inline">Sort by:</span>
                <select
                  id="sort-select"
                  data-testid="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    const params = new URLSearchParams(searchParams);
                    params.set('sort', e.target.value);
                    setSearchParams(params);
                  }}
                  className="px-3.5 py-2.5 bg-white border border-brand-gray rounded-full text-brand-black text-sm font-semibold focus:border-brand-black focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Arrivals</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product grid */}
          {filteredProducts.length === 0 ? (
            <div className="w-full py-20 text-center flex flex-col items-center justify-center bg-brand-gray/20 border border-dashed border-brand-gray rounded-[20px] px-4">
              <SlidersHorizontal className="w-12 h-12 text-brand-darkGray/40 mb-4" />
              <h3 className="text-xl font-bold text-brand-black mb-1">No Products Found</h3>
              <p className="text-sm text-brand-darkGray max-w-sm mb-6">
                We couldn't find any products matching your current filters. Try removing some filters or resetting them.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-8 py-3 bg-brand-black text-white font-bold rounded-full text-xs hover:bg-brand-black/90 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div
              id="products-grid"
              data-testid="products-grid"
              className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10"
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination bar */}
          {totalPages > 1 && (
            <div
              id="pagination-container"
              data-testid="pagination-container"
              className="flex items-center justify-between border-t border-brand-gray pt-6 mt-12"
            >
              <button
                id="pagination-prev"
                data-testid="pagination-prev"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4.5 py-2.5 border border-brand-black/10 hover:bg-brand-gray/30 disabled:opacity-40 disabled:hover:bg-transparent text-sm font-semibold rounded-xl text-brand-black transition-colors"
              >
                Previous
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    data-testid={`pagination-page-${page}`}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 text-sm font-bold rounded-lg flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? 'bg-brand-black text-white'
                        : 'text-brand-darkGray/60 hover:bg-brand-gray/40 hover:text-brand-black'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                id="pagination-next"
                data-testid="pagination-next"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4.5 py-2.5 border border-brand-black/10 hover:bg-brand-gray/30 disabled:opacity-40 disabled:hover:bg-transparent text-sm font-semibold rounded-xl text-brand-black transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
