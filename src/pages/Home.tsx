import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ui/ProductCard';
import { ReviewCard } from '../components/ui/ReviewCard';

export const Home: React.FC = () => {
    // Let's filter products for "New Arrivals" (say, first 4 items) and "Top Selling" (say, next 4 items)
    const newArrivals = MOCK_PRODUCTS.slice(0, 4);
    const topSelling = MOCK_PRODUCTS.slice(4, 8);

    const reviewsContainerRef = useRef<HTMLDivElement>(null);

    const scrollReviews = (direction: 'left' | 'right') => {
        if (reviewsContainerRef.current) {
            const scrollAmount = 380; // card width + gap
            reviewsContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div id="home-page" data-testid="home-page" className="w-full">
            {/* 1. Hero Section */}
            <section className="bg-brand-gray w-full pt-8 md:pt-16 pb-12 md:pb-24">
                <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* Hero Content */}
                    <div className="flex flex-col gap-6 md:gap-8 max-w-xl">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tighter text-brand-black">
                            FIND CLOTHES THAT MATCH YOUR STYLE
                        </h1>
                        <p className="text-sm md:text-base text-brand-darkGray leading-relaxed font-normal">
                            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                        </p>
                        <Link
                            id="hero-shop"
                            data-testid="hero-shop"
                            to="/shop"
                            className="w-full sm:w-fit px-12 py-4 bg-brand-black text-white hover:bg-brand-black/90 font-bold rounded-full text-center text-base transition-colors"
                        >
                            Shop Now
                        </Link>

                        {/* Statistics */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-brand-black/10">
                            <div className="flex flex-col">
                                <span className="text-2xl md:text-4xl font-extrabold text-brand-black">200+</span>
                                <span className="text-xs md:text-sm text-brand-darkGray">International Brands</span>
                            </div>
                            <div className="flex flex-col border-l border-brand-black/10 pl-6 sm:pl-8">
                                <span className="text-2xl md:text-4xl font-extrabold text-brand-black">2,000+</span>
                                <span className="text-xs md:text-sm text-brand-darkGray">High-Quality Products</span>
                            </div>
                            <div className="flex flex-col col-span-2 sm:col-span-1 border-t sm:border-t-0 sm:border-l border-brand-black/10 pt-4 sm:pt-0 sm:pl-8">
                                <span className="text-2xl md:text-4xl font-extrabold text-brand-black">30,000+</span>
                                <span className="text-xs md:text-sm text-brand-darkGray">Happy Customers</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=80"
                            alt="Fashion Showcase"
                            className="object-cover w-full h-full"
                        />
                        {/* Ambient decorative elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </section>

            {/* 2. Brands Banner */}
            <section
                id="brands-section"
                data-testid="brands-section"
                className="bg-brand-black py-8 md:py-11 w-full overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-8 flex flex-wrap items-center justify-center lg:justify-between gap-8 md:gap-12 text-white font-serif font-black text-2xl md:text-3.5xl tracking-widest uppercase">
                    <span className="hover:opacity-80 transition-opacity cursor-pointer">VERSACE</span>
                    <span className="hover:opacity-80 transition-opacity cursor-pointer">ZARA</span>
                    <span className="hover:opacity-80 transition-opacity cursor-pointer">GUCCI</span>
                    <span className="hover:opacity-80 transition-opacity cursor-pointer">PRADA</span>
                    <span className="hover:opacity-80 transition-opacity cursor-pointer">CALVIN KLEIN</span>
                </div>
            </section>

            {/* 3. New Arrivals Row */}
            <section id="new-arrivals" className="container mx-auto px-4 md:px-8 py-16 md:py-24 border-b border-brand-gray">
                <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight uppercase">
                    NEW ARRIVALS
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="flex justify-center mt-10 md:mt-14">
                    <Link
                        id="view-all-new-arrivals"
                        data-testid="view-all-new-arrivals"
                        to="/shop?sort=newest"
                        className="px-14 py-4 border border-brand-black/10 hover:bg-brand-gray/30 text-brand-black font-semibold rounded-full transition-colors text-center text-sm"
                    >
                        View All
                    </Link>
                </div>
            </section>

            {/* 4. Top Selling Row */}
            <section id="top-selling" className="container mx-auto px-4 md:px-8 py-16 md:py-24">
                <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight uppercase">
                    TOP SELLING
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
                    {topSelling.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                <div className="flex justify-center mt-10 md:mt-14">
                    <Link
                        id="view-all-top-selling"
                        data-testid="view-all-top-selling"
                        to="/shop?sort=popular"
                        className="px-14 py-4 border border-brand-black/10 hover:bg-brand-gray/30 text-brand-black font-semibold rounded-full transition-colors text-center text-sm"
                    >
                        View All
                    </Link>
                </div>
            </section>

            {/* 5. Browse by Dress Style category grid */}
            <section className="container mx-auto px-4 md:px-8 py-8">
                <div className="bg-brand-gray rounded-[40px] px-6 py-14 md:p-16 flex flex-col items-center">
                    <h2 className="text-3xl md:text-5xl font-black text-center mb-12 tracking-tight uppercase text-brand-black">
                        BROWSE BY DRESS STYLE
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">
                        {/* Casual - width 1 col */}
                        <Link
                            to="/shop?style=Casual"
                            id="style-casual"
                            data-testid="style-casual"
                            className="relative group h-64 md:h-72 rounded-[20px] overflow-hidden md:col-span-1"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80"
                                alt="Casual Style"
                                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-6 left-6 font-bold text-2.5xl text-brand-black">Casual</span>
                        </Link>

                        {/* Formal - width 2 col */}
                        <Link
                            to="/shop?style=Formal"
                            id="style-formal"
                            data-testid="style-formal"
                            className="relative group h-64 md:h-72 rounded-[20px] overflow-hidden md:col-span-2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1479064555552-3ef4979f8908?w=800&auto=format&fit=crop&q=80"
                                alt="Formal Style"
                                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-6 left-6 font-bold text-2.5xl text-brand-black">Formal</span>
                        </Link>

                        {/* Party - width 2 col */}
                        <Link
                            to="/shop?style=Party"
                            id="style-party"
                            data-testid="style-party"
                            className="relative group h-64 md:h-72 rounded-[20px] overflow-hidden md:col-span-2"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=800&auto=format&fit=crop&q=80"
                                alt="Party Style"
                                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-6 left-6 font-bold text-2.5xl text-brand-black">Party</span>
                        </Link>

                        {/* Gym - width 1 col */}
                        <Link
                            to="/shop?style=Gym"
                            id="style-gym"
                            data-testid="style-gym"
                            className="relative group h-64 md:h-72 rounded-[20px] overflow-hidden md:col-span-1"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1483721310020-03333e577076?w=600&auto=format&fit=crop&q=80"
                                alt="Gym Style"
                                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-6 left-6 font-bold text-2.5xl text-brand-black">Gym</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. Happy Customer Reviews Carousel */}
            <section className="container mx-auto px-4 md:px-8 py-16 md:py-24">
                <div className="flex items-end justify-between mb-10">
                    <h2 className="text-3xl md:text-5xl font-black text-brand-black uppercase tracking-tight leading-tight max-w-xl">
                        OUR HAPPY CUSTOMERS
                    </h2>
                    <div className="flex items-center gap-3">
                        <button
                            id="reviews-prev-btn"
                            data-testid="reviews-prev-btn"
                            onClick={() => scrollReviews('left')}
                            className="w-11 h-11 bg-white border border-brand-gray hover:bg-brand-gray/30 rounded-full flex items-center justify-center text-brand-black transition-colors focus:outline-none"
                            aria-label="Previous reviews"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                            id="reviews-next-btn"
                            data-testid="reviews-next-btn"
                            onClick={() => scrollReviews('right')}
                            className="w-11 h-11 bg-white border border-brand-gray hover:bg-brand-gray/30 rounded-full flex items-center justify-center text-brand-black transition-colors focus:outline-none"
                            aria-label="Next reviews"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Row container */}
                <div
                    ref={reviewsContainerRef}
                    className="flex items-stretch gap-5 md:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-1 py-3"
                    data-testid="reviews-scroller"
                >
                    {MOCK_REVIEWS.map((review) => (
                        <ReviewCard
                            key={review.id}
                            name={review.name}
                            rating={review.rating}
                            content={review.content}
                            date={review.date}
                            verified={review.verified}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
