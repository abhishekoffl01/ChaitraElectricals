import React, { useState } from 'react';
import { X, Check, ShoppingBag, Zap, Droplets } from 'lucide-react';
import { Product } from '../types';
import { STUDIO_WHITE_ASSETS } from '../assets';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToQuote: (product: Product, quantity: number) => void;
  isInCart: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToQuote,
}) => {
  const [qty, setQty] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToQuote(product, qty);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white shadow-2xl border border-[#e6e4e1] w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#221f1c] text-white flex items-center justify-between border-b border-[#322d28] shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#e85d52] font-bold uppercase tracking-wider">{product.categoryLabel}</span>
            <span className="text-[#666059]" aria-hidden="true">·</span>
            <span className="text-[#c7c0b8] font-mono">{product.brand}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#a39b93] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-[#221f1c] uppercase tracking-tight font-display">
              {product.name}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[#666059]">
              <span>SKU: {product.sku}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-emerald-700">{product.stockStatus}</span>
              {product.priceNote && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-[#c92a22] font-medium">{product.priceNote}</span>
                </>
              )}
            </div>
          </div>

          {/* Image & Price Strip */}
          <div className="flex flex-col sm:flex-row gap-6 p-4 bg-[#f8f7f6] border border-[#e6e4e1] items-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className={`w-full sm:w-44 h-36 border border-[#e6e4e1] bg-white ${
                  STUDIO_WHITE_ASSETS.has(product.image) ? 'object-contain p-2' : 'object-cover'
                }`}
              />
            ) : (
              <div className="w-full sm:w-44 h-36 bg-white border border-[#e6e4e1] flex flex-col items-center justify-center">
                {product.category === 'plumbing' || product.category === 'pumps' ? (
                  <Droplets className="w-8 h-8 text-[#221f1c]" />
                ) : (
                  <Zap className="w-8 h-8 text-[#c92a22]" />
                )}
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#221f1c] mt-2">
                  {product.brand}
                </span>
              </div>
            )}
            <div className="flex-1 space-y-2">
              <p className="text-xs text-[#7c756d] uppercase tracking-wider font-semibold">Indicative Unit Rate</p>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold font-mono text-[#c85242] tabular-nums">
                  ₹{product.estimatedPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#554f48] font-medium">/ {product.unit}</span>
              </div>
              <p className="text-xs text-[#554f48] leading-relaxed">
                {product.shortDesc}
              </p>
            </div>
          </div>

          {/* Full description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#221f1c] mb-2">
              Technical Description
            </h3>
            <p className="text-sm text-[#4a4540] leading-relaxed">
              {product.fullDesc}
            </p>
          </div>

          {/* Specifications table */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#221f1c] mb-3">
              Engineering Specifications
            </h3>
            <div className="bg-[#f8f7f6] border border-[#e6e4e1] overflow-hidden text-xs">
              {Object.entries(product.specifications).map(([key, val], idx) => (
                <div
                  key={key}
                  className={`flex justify-between py-2.5 px-4 ${
                    idx !== 0 ? 'border-t border-[#e6e4e1]' : ''
                  }`}
                >
                  <span className="text-[#666059] font-medium">{key}</span>
                  <span className="text-[#221f1c] font-semibold text-right max-w-[60%]">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suitable applications */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#221f1c] mb-2">
              Recommended Applications
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {product.applications.map((app, i) => (
                <span key={i} className="px-3 py-1 bg-[#f4f3f2] border border-[#e6e4e1] text-[#3d3833] font-medium">
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Add to quote controller */}
          <div className="pt-4 border-t border-[#e6e4e1] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#221f1c]">Quantity:</span>
              <div className="flex items-center border border-[#d8d4cf] bg-white">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-[#4a4540] hover:bg-[#f4f3f2] cursor-pointer"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 text-center font-mono font-bold text-xs py-1.5 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-1.5 text-sm font-bold text-[#4a4540] hover:bg-[#f4f3f2] cursor-pointer"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-[#666059]">{product.unit}</span>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                addedNotice
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#c92a22] hover:bg-[#b0221b] text-white'
              }`}
            >
              {addedNotice ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Quote!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {qty} to Quote Request</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
