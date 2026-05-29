import React from 'react';
import { RatingStars } from './RatingStars';
import { Check } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  rating: number;
  content: string;
  date: string;
  verified?: boolean;
  id?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  name,
  rating,
  content,
  date,
  verified = true,
  id
}) => {
  return (
    <div
      id={id}
      data-testid="review-card"
      className="flex flex-col bg-white border border-brand-gray rounded-[20px] p-6 md:p-8 min-w-[280px] md:min-w-[350px] shadow-sm hover:shadow-md transition-shadow duration-300 h-full justify-between"
    >
      <div className="flex flex-col gap-3 md:gap-4">
        {/* Stars */}
        <div data-testid="review-stars">
          <RatingStars rating={rating} idPrefix={`review-${name.replace(/\s+/g, '')}`} />
        </div>

        {/* User Name & Verification Status */}
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-base md:text-lg text-brand-black" data-testid="review-author">
            {name}
          </span>
          {verified && (
            <span
              className="flex items-center justify-center bg-emerald-500 text-white rounded-full p-0.5 w-4.5 h-4.5"
              data-testid="verified-badge"
              title="Verified Buyer"
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </span>
          )}
        </div>

        {/* Content */}
        <p className="text-sm md:text-base text-brand-darkGray leading-relaxed font-normal" data-testid="review-content">
          {content}
        </p>
      </div>

      {/* Date */}
      <div className="mt-4 text-xs md:text-sm font-medium text-brand-darkGray/60" data-testid="review-date">
        Posted on {date}
      </div>
    </div>
  );
};

export default ReviewCard;
