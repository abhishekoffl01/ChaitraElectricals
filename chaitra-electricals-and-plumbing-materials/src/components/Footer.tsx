import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Star, ExternalLink, Zap, Droplets } from 'lucide-react';
import { STORE_INFO, PRODUCTS } from '../data/inventory';
import { Product, Testimonial } from '../types';

interface FooterProps {
  testimonials: Testimonial[];
  onSelectProduct: (product: Product) => void;
  onOpenQuoteModal: () => void;
  onOpenSpecsGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  testimonials,
  onSelectProduct,
  onOpenQuoteModal,
  onOpenSpecsGuide,
}) => {
  const highlightProducts = PRODUCTS.filter((p) => p.popular).slice(0, 3);
  const recentReviews = testimonials.slice(0, 3);

  return (
    <footer id="contact" className="bg-[#1b1917] text-[#c7c0b8] border-t border-[#2c2723]">
      
      {/* Signature 3-Column Dark Showcase Band matching Reference Theme */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Column 1: WHOLESALE HIGHLIGHTS (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white font-display pb-2 border-b border-[#2c2723]">
              Popular Wholesale Stock
            </h3>

            <div className="space-y-4">
              {highlightProducts.map((prod) => (
                <button
                  key={prod.id}
                  type="button"
                  onClick={() => onSelectProduct(prod)}
                  className="w-full flex items-center gap-3.5 text-left group cursor-pointer"
                >
                  {/* Crisp White Mini Thumbnail Frame matching reference */}
                  <div className="w-16 h-16 bg-white shrink-0 border border-[#3a342e] overflow-hidden flex items-center justify-center p-1">
                    {prod.image ? (
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      prod.category === 'pumps' ? (
                        <Droplets className="w-6 h-6 text-[#221f1c]" />
                      ) : (
                        <Zap className="w-6 h-6 text-[#c92a22]" />
                      )
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#e85d52] transition-colors line-clamp-2">
                      {prod.name}
                    </p>
                    <p className="text-sm font-bold font-mono text-[#c85242] mt-1 tabular-nums">
                      ₹{prod.estimatedPrice.toLocaleString('en-IN')}
                      <span className="text-[10px] text-[#8b847c] font-sans font-normal ml-1">
                        / {prod.unit}
                      </span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: RECENT CUSTOMER REVIEWS (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white font-display pb-2 border-b border-[#2c2723]">
              Recent Customer Reviews
            </h3>

            <div className="space-y-4">
              {recentReviews.map((rev) => (
                <a
                  key={rev.id}
                  href="#testimonials"
                  className="flex items-start gap-3.5 group"
                >
                  <div className="w-16 h-16 bg-white shrink-0 border border-[#3a342e] overflow-hidden flex items-center justify-center">
                    {rev.avatarUrl ? (
                      <img
                        src={rev.avatarUrl}
                        alt={rev.author}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-lg font-bold text-[#221f1c] font-display">
                        {rev.author.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wide text-white group-hover:text-[#e85d52] transition-colors">
                      {rev.projectType}
                    </p>
                    <div className="flex items-center gap-0.5 my-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-[#c92a22] text-[#c92a22]" />
                      ))}
                    </div>
                    <p className="text-[11px] text-[#8b847c]">
                      by {rev.author} · {rev.location}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: ABOUT STORE & CONTACT (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white font-display pb-2 border-b border-[#2c2723]">
              About Store & Contact
            </h3>

            <p className="text-xs text-[#a39b93] leading-relaxed">
              <strong className="text-white">Chaitra Electricals and Plumbing Materials</strong> has served electricians, plumbers, plantation estates, and builders across Kargal, Sagar, and Shimoga since 1998 with genuine ISI-certified electricals and plumbing hardware.
            </p>

            <div className="space-y-2 text-xs pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#c92a22] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">{STORE_INFO.address}</p>
                  <p className="text-[#8b847c]">{STORE_INFO.town}, {STORE_INFO.taluk}, {STORE_INFO.district} - {STORE_INFO.pincode}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#c92a22] shrink-0" />
                <div className="space-x-2 font-mono">
                  <a href={`tel:${STORE_INFO.phonePrimary.replace(/\s+/g, '')}`} className="text-white hover:text-[#e85d52]">
                    {STORE_INFO.phonePrimary}
                  </a>
                  <span className="text-[#4a443d]">/</span>
                  <a href={`tel:${STORE_INFO.phoneSecondary.replace(/\s+/g, '')}`} className="text-white hover:text-[#e85d52]">
                    {STORE_INFO.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#c92a22] shrink-0" />
                <a href={`mailto:${STORE_INFO.email}`} className="text-[#c7c0b8] hover:text-white">
                  {STORE_INFO.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-3.5 h-3.5 text-[#c92a22] shrink-0" />
                <span className="text-[#a39b93]">{STORE_INFO.hours.weekdays}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="text-white underline underline-offset-4 decoration-[#c92a22] hover:text-[#e85d52] font-semibold cursor-pointer"
              >
                Request Quick Quote
              </button>
              <button
                type="button"
                onClick={onOpenSpecsGuide}
                className="text-[#a39b93] hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Sizing Guides
              </button>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${STORE_INFO.coordinates.lat},${STORE_INFO.coordinates.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#a39b93] hover:text-white inline-flex items-center gap-1"
              >
                <span>GPS Map</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Dark Strip with Copyright & Social Media Icons */}
      <div className="bg-[#12100e] border-t border-[#26221e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7c756d]">
          <p>
            © {new Date().getFullYear()} Chaitra Electricals and Plumbing Materials · GSTIN {STORE_INFO.gstin} · B.H. Road, Kargal
          </p>

          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-[#1b1917] border border-[#2f2a26] text-emerald-400 hover:border-emerald-500 transition-colors inline-flex items-center gap-1.5 text-[11px] font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-[#1b1917] border border-[#2f2a26] text-[#c7c0b8] hover:text-white hover:border-[#c92a22] transition-colors text-[11px] font-semibold"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-[#1b1917] border border-[#2f2a26] text-[#c7c0b8] hover:text-white hover:border-[#c92a22] transition-colors text-[11px] font-semibold"
            >
              Instagram
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 bg-[#1b1917] border border-[#2f2a26] text-[#c7c0b8] hover:text-white hover:border-[#c92a22] transition-colors text-[11px] font-semibold"
            >
              YouTube
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};
