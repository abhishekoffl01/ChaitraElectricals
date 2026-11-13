import React from 'react';
import { ShieldCheck, Award } from 'lucide-react';
import { BRAND_PARTNERS } from '../data/inventory';

export const BrandAuthorityRibbon: React.FC = () => {
  return (
    <section className="bg-[#f7f6f5] border-b border-[#e6e4e1] py-10 text-[#221f1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#e2dfdb]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c92a22] mb-1">
              Authorized Trade Stockist · Since 1998
            </p>
            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#221f1c] font-display">
              Official Partner For India’s Leading Engineering Brands
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#666059] shrink-0">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#c92a22]" />
              <span>100% Factory Invoiced</span>
            </div>
            <span aria-hidden="true" className="text-[#ccc6bf]">·</span>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#221f1c]" />
              <span>Full Manufacturer Warranties</span>
            </div>
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 pt-6">
          {BRAND_PARTNERS.map((brand) => (
            <div
              key={brand.name}
              className="p-4 bg-white border border-[#e6e4e1] hover:border-[#c92a22]/60 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-[#8b847c] uppercase tracking-wider">
                  {brand.certification}
                </span>
                <h3 className="text-sm font-bold uppercase tracking-wide text-[#221f1c] mt-1 font-display">
                  {brand.name}
                </h3>
                <p className="text-[11px] text-[#666059] mt-0.5 line-clamp-1">
                  {brand.categories}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-[#f0eeec] text-[10px] font-bold text-[#c85242] uppercase tracking-wider">
                {brand.tier}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
