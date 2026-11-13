import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, MessageSquare, MapPin } from 'lucide-react';
import { ProductCategory } from '../types';
import { STORE_INFO } from '../data/inventory';
import { ASSETS } from '../assets';

interface HeroSectionProps {
  onOpenQuoteModal: () => void;
  onSelectCategoryFromHero: (category: ProductCategory) => void;
}

const HERO_SLIDES = [
  {
    id: 'slide-1',
    image: ASSETS.heroElectricalPlumbingStore,
    eyebrow: 'B.H. Road, Kargal · Sagar, Shimoga',
    title: 'Chaitra Electricals & Plumbing Materials',
    subtitle: 'Authorized wholesale & retail supplier of copper wiring, modular switchgear, CPVC pressure pipes, and submersible pumps.',
    ctaLabel: 'Request Quick Quote',
  },
  {
    id: 'slide-2',
    image: ASSETS.brandFlagshipStorefront,
    eyebrow: 'Serving Kargal, Jog Falls & Sagar Since 1998',
    title: 'Direct Factory Supply & Tempo Delivery',
    subtitle: 'Ample highway loading bay for contractors, plantation owners, and independent homebuilders across the Sharavathi valley.',
    ctaLabel: 'Get Site Estimate',
  },
  {
    id: 'slide-3',
    image: ASSETS.catPlumbingSupplies,
    eyebrow: 'Complete Plumbing & Sanitary Inventory',
    title: 'Ashirvad CPVC, Astral uPVC & Jaquar Fittings',
    subtitle: 'High-pressure pipes, forged brass ball valves, and chrome bathroom fixtures kept in ready stock.',
    ctaLabel: 'Build Material Slip',
  },
];

const CATEGORY_TILES: {
  category: ProductCategory;
  line1: string;
  line2: string;
  sub: string;
  image: string;
  objectPos: string;
}[] = [
  {
    category: 'electrical',
    line1: 'WIRES &',
    line2: 'CABLES',
    sub: 'Polycab · Havells · Finolex',
    image: ASSETS.catElectricalMaterials,
    objectPos: 'object-right',
  },
  {
    category: 'plumbing',
    line1: 'CPVC & PVC',
    line2: 'PIPES',
    sub: 'Ashirvad · Astral · Supreme',
    image: ASSETS.prodAgriPvcPipes,
    objectPos: 'object-center',
  },
  {
    category: 'pumps',
    line1: 'SUBMERSIBLE',
    line2: 'PUMPS',
    sub: 'Kirloskar · Crompton',
    image: ASSETS.prodSubmersibleWaterPumps,
    objectPos: 'object-center',
  },
  {
    category: 'switchgear',
    line1: 'SWITCHES &',
    line2: 'MCB PANELS',
    sub: 'Anchor Roma · Schneider · Legrand',
    image: ASSETS.prodSwitchesMcbPanel,
    objectPos: 'object-center',
  },
  {
    category: 'lighting',
    line1: 'LED LIGHTS &',
    line2: 'CEILING FANS',
    sub: 'Philips · Crompton',
    image: ASSETS.prodCeilingFanLed,
    objectPos: 'object-center',
  },
  {
    category: 'tools',
    line1: 'VALVES, TAPS',
    line2: '& TOOLS',
    sub: 'Jaquar · Zoloto · Taparia',
    image: ASSETS.prodChromeBibTap,
    objectPos: 'object-center',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenQuoteModal,
  onSelectCategoryFromHero,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section className="bg-[#181614] text-white pb-10 border-b border-[#2b2622]">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        
        {/* Main Framed Showcase Container */}
        <div className="bg-[#12100e] shadow-2xl border-x border-b border-[#2c2723]">
          
          {/* Top Full-Width Hero Banner / Slider */}
          <div className="relative h-[360px] sm:h-[430px] lg:h-[480px] overflow-hidden bg-[#12100e]">
            {HERO_SLIDES.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {/* Rich dark editorial gradient scrim */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#12100e]/95 via-[#12100e]/65 to-[#12100e]/20" />
              </div>
            ))}

            {/* Foreground Copy Overlay */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-10 lg:px-14 max-w-3xl">
              <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85d52] mb-2.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{activeSlide.eyebrow}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-[1.12] font-display">
                {activeSlide.title}
              </h1>

              <p className="mt-3 text-sm sm:text-base text-[#d4cec7] leading-relaxed max-w-xl">
                {activeSlide.subtitle}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="px-5 py-3 bg-[#c92a22] hover:bg-[#b0221b] text-white text-xs sm:text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2 shadow-lg"
                >
                  <span>{activeSlide.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#catalog"
                  className="px-5 py-3 bg-[#221f1c]/90 hover:bg-[#302b27] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider border border-[#453e38] transition-colors"
                >
                  Browse Inventory
                </a>

                <a
                  href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=Hello%20Chaitra%20Electricals%2C%20I%20would%20like%20to%20inquire%20about%20materials.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3 bg-[#141210]/85 hover:bg-[#221f1c] text-emerald-400 text-xs sm:text-sm font-semibold border border-[#36312c] transition-colors inline-flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Subtle Left/Right Controls */}
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-[#c92a22] text-white items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
              className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 bg-black/50 hover:bg-[#c92a22] text-white items-center justify-center transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Bottom-Right Pagination Dots (1 crimson active + white inactive like reference) */}
            <div className="absolute bottom-4 right-5 z-30 flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide
                      ? 'bg-[#c92a22] scale-110 ring-2 ring-white/40'
                      : 'bg-white/80 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Attached 3x2 Category Mosaic Grid directly beneath Hero Banner (Theme signature) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 bg-[#1a1715] border-t border-[#2f2a26]">
            {CATEGORY_TILES.map((tile) => (
              <button
                key={tile.category}
                type="button"
                onClick={() => onSelectCategoryFromHero(tile.category)}
                className="relative h-32 sm:h-40 lg:h-44 overflow-hidden group text-left border-r border-b border-[#2c2723] last:border-r-0 cursor-pointer focus:outline-none"
              >
                <img
                  src={tile.image}
                  alt={`${tile.line1} ${tile.line2}`}
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover ${tile.objectPos} brightness-[0.55] group-hover:brightness-[0.72] group-hover:scale-105 transition-all duration-500`}
                />
                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

                {/* Clean Uppercase Category Typography matching reference */}
                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-center">
                  <span className="text-sm sm:text-xl lg:text-[22px] font-bold uppercase tracking-wide text-white leading-tight font-display group-hover:text-[#ff786e] transition-colors">
                    {tile.line1}
                  </span>
                  <span className="text-sm sm:text-xl lg:text-[22px] font-light uppercase tracking-wider text-[#e2ddd8] leading-tight font-display">
                    {tile.line2}
                  </span>
                  <span className="mt-1.5 text-[10px] sm:text-[11px] text-[#b8b0a7] font-medium tracking-wide truncate">
                    {tile.sub}
                  </span>
                </div>

                {/* Subtle red bottom highlight bar on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c92a22] scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
