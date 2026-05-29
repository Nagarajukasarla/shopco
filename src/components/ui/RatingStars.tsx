import React from 'react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number; // size in pixels
  idPrefix?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 18,
  idPrefix = 'star'
}) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (rating >= i) {
      // Full star
      stars.push(
        <svg
          key={i}
          className="text-[#FFC700] fill-current"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          data-testid={`${idPrefix}-full`}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    } else if (rating >= i - 0.5) {
      // Half star using gradient mask or simple half star SVG path
      stars.push(
        <div key={i} className="relative" style={{ width: size, height: size }}>
          {/* Background star (gray) */}
          <svg
            className="text-gray-300 fill-current absolute top-0 left-0"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            data-testid={`${idPrefix}-empty-base`}
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          {/* Foreground half-star */}
          <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
            <svg
              className="text-[#FFC700] fill-current"
              width={size}
              height={size}
              viewBox="0 0 24 24"
              data-testid={`${idPrefix}-half`}
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>
      );
    } else {
      // Empty star
      stars.push(
        <svg
          key={i}
          className="text-gray-200 fill-current"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          data-testid={`${idPrefix}-empty`}
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      );
    }
  }

  return (
    <div className="flex items-center gap-0.5" data-testid="rating-stars">
      {stars}
      <span className="text-xs text-brand-darkGray ml-1.5 font-medium" data-testid="rating-value">
        {rating}/5
      </span>
    </div>
  );
};
export default RatingStars;
