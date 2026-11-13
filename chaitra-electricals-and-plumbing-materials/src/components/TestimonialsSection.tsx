import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquarePlus } from 'lucide-react';
import { Testimonial } from '../types';
import { ReviewModal } from './ReviewModal';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onAddReview: (review: Testimonial) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onAddReview,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <section id="testimonials" className="py-14 md:py-20 bg-[#f7f6f5] border-t border-[#e6e4e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-5 mb-8 border-b border-[#e2dfdb]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c92a22] mb-1">
              Local Trust & Contractor Reviews · Sagar & Shimoga
            </p>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#221f1c] font-display">
              Trusted by Local Electricians & Builders
            </h2>
            <p className="mt-1.5 text-sm text-[#666059] max-w-2xl">
              Verified feedback from contractors, plantation owners, and residential homebuilders across Kargal and Jog Falls.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsReviewModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#221f1c] hover:bg-[#c92a22] transition-colors shrink-0 cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 md:p-7 border border-[#e6e4e1] flex flex-col justify-between space-y-5 hover:border-[#c92a22]/50 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#c92a22] text-[#c92a22]" />
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Buyer</span>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-[#7c756d] uppercase tracking-wider">
                  Project: {item.projectType}
                </div>

                <p className="text-sm text-[#3d3833] leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#f0eeec] flex items-center gap-3">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-[#e6e4e1]"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#221f1c] text-white font-bold flex items-center justify-center text-sm">
                    {item.author.charAt(0)}
                  </div>
                )}

                <div className="text-xs">
                  <h4 className="font-bold text-[#221f1c] text-sm uppercase tracking-wide">{item.author}</h4>
                  <div className="flex items-center gap-1.5 text-[#7c756d] mt-0.5">
                    <span>{item.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={onAddReview}
      />
    </section>
  );
};
