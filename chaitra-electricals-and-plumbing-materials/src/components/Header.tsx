import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Phone, MessageSquare, Search } from 'lucide-react';
import { STORE_INFO } from '../data/inventory';

interface HeaderProps {
  quoteCount: number;
  onOpenQuoteModal: () => void;
  onOpenSpecsGuide: () => void;
  onQuickSearchClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  quoteCount,
  onOpenQuoteModal,
  onOpenSpecsGuide,
  onQuickSearchClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<'home' | 'catalog' | 'packages' | 'location' | 'reviews'>('home');

  return (
    <header className="sticky top-0 z-40 bg-[#221f1c] text-white border-b border-[#322d28] shadow-md">
      
      {/* Slim Dark Top Utility Strip matching theme */}
      <div className="bg-[#141210] text-[#9b948c] text-[11px] py-1.5 px-4 border-b border-[#292521] hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span>B.H. Road, Kargal, Sagar, Shimoga</span>
            <span aria-hidden="true" className="text-[#4a443d]">·</span>
            <span>Mon–Sat: 8:30 AM – 8:30 PM</span>
          </div>

          <div className="flex items-center gap-5">
            <a href={`tel:${STORE_INFO.phonePrimary.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
              Call {STORE_INFO.phonePrimary}
            </a>
            <a href="#location" className="hover:text-white transition-colors">
              Store Map
            </a>
            <button
              type="button"
              onClick={onOpenSpecsGuide}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Sizing Guides
            </button>
            <button
              type="button"
              onClick={onOpenQuoteModal}
              className="text-white hover:text-[#e04f44] font-semibold transition-colors cursor-pointer"
            >
              Quote Slip ({quoteCount})
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-stretch justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark */}
        <a 
          href="#" 
          onClick={() => setActiveNav('home')}
          className="flex flex-col justify-center shrink-0 group py-2"
        >
          <span className="text-xl md:text-2xl font-bold tracking-tight text-white whitespace-nowrap font-display leading-none group-hover:text-[#e85d52] transition-colors">
            Chaitra Electricals
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#a39b93] mt-1 whitespace-nowrap">
            & Plumbing Materials · Kargal
          </span>
        </a>

        {/* Zone 2: Clean Single-Line Nav Links with Signature Red Active Block */}
        <nav className="hidden lg:flex items-stretch text-sm font-medium">
          <a 
            href="#" 
            onClick={() => setActiveNav('home')}
            className={`px-5 flex items-center whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'home' 
                ? 'bg-[#c92a22] text-white font-semibold' 
                : 'text-[#d1cbc4] hover:text-white hover:bg-[#2c2824]'
            }`}
          >
            Home
          </a>
          <a 
            href="#catalog" 
            onClick={() => setActiveNav('catalog')}
            className={`px-5 flex items-center whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'catalog' 
                ? 'bg-[#c92a22] text-white font-semibold' 
                : 'text-[#d1cbc4] hover:text-white hover:bg-[#2c2824]'
            }`}
          >
            Catalog
          </a>
          <a 
            href="#packages" 
            onClick={() => setActiveNav('packages')}
            className={`px-5 flex items-center whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'packages' 
                ? 'bg-[#c92a22] text-white font-semibold' 
                : 'text-[#d1cbc4] hover:text-white hover:bg-[#2c2824]'
            }`}
          >
            Packages
          </a>
          <a 
            href="#location" 
            onClick={() => setActiveNav('location')}
            className={`px-5 flex items-center whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'location' 
                ? 'bg-[#c92a22] text-white font-semibold' 
                : 'text-[#d1cbc4] hover:text-white hover:bg-[#2c2824]'
            }`}
          >
            Location
          </a>
          <a 
            href="#testimonials" 
            onClick={() => setActiveNav('reviews')}
            className={`px-5 flex items-center whitespace-nowrap shrink-0 transition-colors ${
              activeNav === 'reviews' 
                ? 'bg-[#c92a22] text-white font-semibold' 
                : 'text-[#d1cbc4] hover:text-white hover:bg-[#2c2824]'
            }`}
          >
            Reviews
          </a>
        </nav>

        {/* Zone 3: Search & Signature Red Circular Quote Button */}
        <div className="flex items-center gap-3 shrink-0 my-auto">
          <button
            type="button"
            onClick={onQuickSearchClick}
            className="hidden sm:flex w-9 h-9 rounded-full bg-[#141210] border border-[#38322d] text-[#c7c0b8] hover:text-white hover:border-[#595048] items-center justify-center transition-colors cursor-pointer"
            aria-label="Search Catalog"
            title="Search Inventory"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenQuoteModal}
            className="relative inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#c92a22] hover:bg-[#b0221b] rounded-full transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Quick Quote</span>
            {quoteCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 bg-white text-[#c92a22] text-[11px] font-black rounded-full font-mono tabular-nums">
                {quoteCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#d1cbc4] hover:text-white lg:hidden rounded-lg hover:bg-[#2e2a26]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#322d28] bg-[#1c1a17] px-4 pt-3 pb-5 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-1 text-sm font-medium text-[#d1cbc4]">
            <a
              href="#catalog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#2a2622] hover:text-white transition-colors"
            >
              Inventory Catalog
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#2a2622] hover:text-white transition-colors"
            >
              Turnkey Packages
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#2a2622] hover:text-white transition-colors"
            >
              Store Location & Directions
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[#2a2622] hover:text-white transition-colors"
            >
              Customer Reviews
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSpecsGuide();
              }}
              className="text-left px-3 py-2.5 rounded-lg hover:bg-[#2a2622] hover:text-white transition-colors"
            >
              Wire & Pipe Sizing Guides
            </button>
          </nav>

          <div className="pt-3 border-t border-[#322d28] flex flex-col gap-2">
            <a
              href={`tel:${STORE_INFO.phonePrimary.replace(/\s+/g, '')}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold bg-[#2a2622] text-white rounded-lg"
            >
              <Phone className="w-3.5 h-3.5 text-[#e85d52]" />
              <span>Call: {STORE_INFO.phonePrimary}</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-semibold bg-[#1d4ed8]/20 text-emerald-400 border border-emerald-700/50 rounded-lg"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Store Desk</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
