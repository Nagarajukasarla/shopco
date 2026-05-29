import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../data/products';
import { RatingStars } from './RatingStars';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { id, name, price, originalPrice, discountPercent, rating, image } = product;

  return (
    <Link
      to={`/product/${id}`}
      id={`product-card-${id}`}
      data-testid={`product-card-${id}`}
      className="group flex flex-col w-full bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Product Image Wrapper */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-gray flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          data-testid={`product-image-${id}`}
        />
        {discountPercent && (
          <span
            className="absolute top-3 left-3 bg-brand-lightRed text-brand-red text-xs font-bold px-2.5 py-1 rounded-full"
            data-testid={`product-discount-${id}`}
          >
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-col mt-4 px-1 pb-2">
        <h3
          className="text-base md:text-lg font-bold text-brand-black truncate group-hover:text-brand-darkGray transition-colors duration-200"
          data-testid={`product-title-${id}`}
        >
          {name}
        </h3>

        {/* Rating Row */}
        <div className="mt-2" data-testid={`product-rating-${id}`}>
          <RatingStars rating={rating} idPrefix={`product-${id}`} />
        </div>

        {/* Pricing Row */}
        <div className="flex items-center gap-2.5 mt-2.5" data-testid={`product-price-${id}`}>
          <span className="text-xl md:text-2xl font-bold text-brand-black">
            ${price}
          </span>
          {originalPrice && (
            <>
              <span className="text-xl md:text-2xl font-bold text-brand-darkGray line-through opacity-40">
                ${originalPrice}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-lightRed text-brand-red">
                -{discountPercent}%
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
