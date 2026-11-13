import React from 'react';
import { Award, CheckCircle2, ChevronRight } from 'lucide-react';
import { STORE_INFO } from '../data/inventory';
import { ASSETS } from '../assets';

interface FacilityAndStandardsProps {
  onOpenQuoteModal: () => void;
}

export const FacilityAndStandards: React.FC<FacilityAndStandardsProps> = ({
  onOpenQuoteModal,
}) => {
  return (
    <section className="py-14 md:py-20 bg-[#1c1a17] text-white border-t border-[#2d2824]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl pb-6 mb-10 border-b border-[#322d28]">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e85d52] mb-1">
            <Award className="w-3.5 h-3.5" />
            <span>The Chaitra Supply Standard · Estd. 1998</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white font-display">
            B.H. Road Showroom, Loading Bay & Central Warehouse
          </h2>
          <p className="mt-2 text-sm text-[#c7c0b8] leading-relaxed">
            Built for heavy infrastructure, residential builds, and agricultural scale across Kargal, Sagar, and Shivamogga.
          </p>
        </div>

        {/* 2-Column Facility Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-10 items-stretch">
          <div className="lg:col-span-7 bg-[#141210] border border-[#322d28] flex flex-col group">
            <div className="relative h-64 sm:h-76 overflow-hidden">
              <img
                src={ASSETS.brandFlagshipStorefront}
                alt="Chaitra Electricals and Plumbing Flagship Showroom on B.H. Road Kargal"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#c92a22] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Highway Hub · NH 206
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white font-display">
                  Trade Showroom & Dedicated Loading Bay
                </h3>
                <p className="mt-2 text-xs text-[#b8b0a7] leading-relaxed">
                  Ample frontage on B.H. Road equipped for rapid tempo loading of 20-foot PVC pipes and heavy submersible pumps with zero congestion.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-[#2a2521] text-xs text-[#c7c0b8]">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e85d52]" />
                  <span>Direct Tempo Loading</span>
                </span>
                <span aria-hidden="true" className="text-[#4a443d]">·</span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#e85d52]" />
                  <span>GST E-Invoicing</span>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#141210] border border-[#322d28] flex flex-col group">
            <div className="relative h-64 sm:h-76 overflow-hidden">
              <img
                src={ASSETS.brandWarehouseRacks}
                alt="High-Capacity Central Storage Warehouse for Electrical and Plumbing Supplies"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141210] via-transparent to-transparent" />
              <div className="absolute top-3 left-3 bg-[#221f1c] border border-[#4a443d] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                Ready Warehouse Stock
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold uppercase tracking-wide text-white font-display">
                  Elevated Pipe & Copper Wire Racks
                </h3>
                <p className="mt-2 text-xs text-[#b8b0a7] leading-relaxed">
                  10,000+ meters of copper coils and 5,000+ pipe lengths stored on dry steel racks to preserve manufacturer insulation and coatings.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#2a2521] text-xs">
                <span className="text-[#9b948c] font-mono">GSTIN: {STORE_INFO.gstin}</span>
                <button
                  type="button"
                  onClick={onOpenQuoteModal}
                  className="text-[#e85d52] hover:text-white font-bold uppercase tracking-wider inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Request Bulk Lot</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Supply Standards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { num: '01', title: '100% Annealed Copper', desc: 'Class-5 electrolytic copper conductors tested to IS 694 standards.' },
            { num: '02', title: 'Monsoon Weatherproof', desc: 'High dielectric strength, anti-fungal PVC & UV-stabilized conduits for Malnad rain.' },
            { num: '03', title: 'Contractor Trade Rates', desc: 'Transparent wholesale margins for electricians, plumbers & builders.' },
            { num: '04', title: 'Site Tempo Delivery', desc: 'Scheduled tempo dispatch directly to sites across Kargal & Sagar taluk.' },
          ].map((item) => (
            <div key={item.num} className="p-5 bg-[#141210] border border-[#2c2723] space-y-2">
              <span className="text-xs font-mono font-bold text-[#c92a22]">{item.num}.</span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white font-display">
                {item.title}
              </h4>
              <p className="text-xs text-[#a39b93] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
