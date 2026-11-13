import React from 'react';
import { Phone, MessageSquare, ShoppingBag } from 'lucide-react';
import { STORE_INFO } from '../data/inventory';

interface MobileQuickBarProps {
  quoteCount: number;
  onOpenQuoteModal: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  quoteCount,
  onOpenQuoteModal,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#1c1a17]/95 backdrop-blur-md border-t border-[#322d28] px-3 py-2 shadow-lg flex items-center justify-between gap-2 max-h-16">
      <a
        href={`tel:${STORE_INFO.phonePrimary.replace(/\s+/g, '')}`}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-[#2a2622] hover:bg-[#38322d] text-white text-xs font-semibold transition-colors"
      >
        <Phone className="w-3.5 h-3.5 text-[#e85d52]" />
        <span>Call</span>
      </a>

      <a
        href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=Hello%20Chaitra%20Electricals%2C%20I%20would%20like%20to%20inquire%20about%20materials.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

      <button
        type="button"
        onClick={onOpenQuoteModal}
        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 bg-[#c92a22] hover:bg-[#b0221b] text-white text-xs font-bold transition-colors relative"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Quote</span>
        {quoteCount > 0 && (
          <span className="w-4 h-4 bg-white text-[#c92a22] text-[10px] font-black rounded-full flex items-center justify-center font-mono">
            {quoteCount}
          </span>
        )}
      </button>
    </div>
  );
};
