import React, { useState } from 'react';
import { X, Star, CheckCircle, Send } from 'lucide-react';
import { Testimonial } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Testimonial) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('Kargal');
  const [projectType, setProjectType] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !quote.trim()) return;

    const newReview: Testimonial = {
      id: `review-${Date.now()}`,
      author: author.trim(),
      role: role.trim() || 'Verified Customer',
      location: location.trim(),
      projectType: projectType.trim() || 'Residential / Commercial Supply',
      quote: quote.trim(),
      rating,
      verifiedCustomer: true,
      date: 'Just now',
    };

    onSubmitReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setAuthor('');
      setRole('');
      setProjectType('');
      setQuote('');
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div 
        className="bg-white shadow-2xl border border-[#e6e4e1] w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        <div className="px-6 py-4 bg-[#221f1c] text-white flex items-center justify-between border-b border-[#322d28]">
          <div>
            <h3 className="text-base font-bold uppercase tracking-wider font-display">Share Your Store Experience</h3>
            <p className="text-xs text-[#a39b93]">Chaitra Electricals & Plumbing Materials</p>
          </div>
          <button type="button" onClick={onClose} className="p-1 text-[#a39b93] hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-700 mx-auto" />
            <h4 className="text-lg font-bold text-[#221f1c]">Thank You for Your Feedback!</h4>
            <p className="text-xs text-[#666059]">
              Your testimonial has been added to our local customer showcase.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#221f1c] mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Suresh Bhat"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-[#d8d4cf] focus:outline-none focus:border-[#c92a22]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-[#221f1c] mb-1">Your Role / Trade</label>
                <input
                  type="text"
                  placeholder="e.g. Electrician / Homeowner"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d8d4cf] focus:outline-none focus:border-[#c92a22]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#221f1c] mb-1">Your Town / Area</label>
                <input
                  type="text"
                  placeholder="e.g. Kargal / Sagar"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-[#d8d4cf] focus:outline-none focus:border-[#c92a22]"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#221f1c] mb-1">Project or Materials Purchased</label>
              <input
                type="text"
                placeholder="e.g. Borewell pump and CPVC pipes for new house"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 border border-[#d8d4cf] focus:outline-none focus:border-[#c92a22]"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#221f1c] mb-1">Rating</label>
              <div className="flex items-center gap-1.5 py-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setRating(num)}
                    className="p-1 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        num <= rating ? 'fill-[#c92a22] text-[#c92a22]' : 'text-[#d8d4cf]'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#221f1c] mb-1">Your Review / Experience *</label>
              <textarea
                rows={3}
                required
                placeholder="Share how our pricing, stock availability, or staff assistance helped your project..."
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                className="w-full px-3 py-2 border border-[#d8d4cf] focus:outline-none focus:border-[#c92a22]"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#d8d4cf] text-[#4a4540] font-semibold hover:bg-[#f8f7f6] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c92a22] hover:bg-[#b0221b] text-white font-bold uppercase tracking-wider cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
