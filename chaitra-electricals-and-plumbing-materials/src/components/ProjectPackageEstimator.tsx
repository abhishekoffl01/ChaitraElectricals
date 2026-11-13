import React, { useState } from 'react';
import { Calculator, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import { PROJECT_TEMPLATES, PRODUCTS } from '../data/inventory';
import { ProjectTemplate, Product } from '../types';

interface ProjectPackageEstimatorProps {
  onLoadPackageToQuote: (products: Product[]) => void;
  onOpenQuoteModal: () => void;
}

export const ProjectPackageEstimator: React.FC<ProjectPackageEstimatorProps> = ({
  onLoadPackageToQuote,
  onOpenQuoteModal,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ProjectTemplate>(PROJECT_TEMPLATES[0]);
  const [transferredNotice, setTransferredNotice] = useState(false);

  const handleTransfer = () => {
    const matchedProducts = PRODUCTS.filter((p) =>
      selectedTemplate.recommendedProductIds.includes(p.id)
    );
    onLoadPackageToQuote(matchedProducts);
    setTransferredNotice(true);
    setTimeout(() => {
      setTransferredNotice(false);
      onOpenQuoteModal();
    }, 1000);
  };

  return (
    <section id="packages" className="py-14 md:py-20 bg-[#f7f6f5] border-t border-[#e6e4e1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 pb-5 border-b border-[#e2dfdb]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c92a22] mb-1">
              <Calculator className="w-3.5 h-3.5" />
              <span>Project Bill of Quantities (BOQ) · Turnkey Estimates</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#221f1c] font-display">
              Turnkey Sourcing Packages & Estimators
            </h2>
            <p className="mt-1.5 text-sm text-[#666059] max-w-2xl">
              Pre-calculated material schedules tailored for Malnad home construction, deep borewells, and arecanut irrigation.
            </p>
          </div>

          <div className="text-xs text-[#666059]">
            <span>Engineering Desk: </span>
            <span className="font-mono font-bold text-[#221f1c]">+91 98452 71049</span>
          </div>
        </div>

        {/* Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {PROJECT_TEMPLATES.map((tmpl) => {
            const active = tmpl.id === selectedTemplate.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => setSelectedTemplate(tmpl)}
                className={`p-4 text-left transition-colors border cursor-pointer ${
                  active
                    ? 'bg-[#221f1c] text-white border-[#221f1c]'
                    : 'bg-white text-[#221f1c] border-[#e6e4e1] hover:border-[#c92a22]'
                }`}
              >
                <p className={`text-[10px] font-bold uppercase tracking-wider ${active ? 'text-[#e85d52]' : 'text-[#c92a22]'}`}>
                  {tmpl.subtitle}
                </p>
                <p className="text-sm font-bold mt-1 uppercase tracking-wide">
                  {tmpl.name.split(' Package')[0].split(' Kit')[0]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Package Details */}
        <div className="bg-white border border-[#e6e4e1] overflow-hidden shadow-sm">
          <div className="p-6 bg-[#221f1c] text-white flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#322d28]">
            <div>
              <span className="text-[11px] font-semibold text-[#e85d52] uppercase tracking-[0.18em]">
                {selectedTemplate.subtitle}
              </span>
              <h3 className="text-xl font-bold mt-1 text-white uppercase tracking-wide font-display">
                {selectedTemplate.name}
              </h3>
              <p className="text-xs text-[#c7c0b8] mt-1 max-w-xl">
                {selectedTemplate.tagline}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
              <div className="p-3 bg-[#161412] border border-[#3a342e]">
                <p className="text-[10px] uppercase font-bold text-[#a39b93]">Indicative Budget</p>
                <p className="text-lg font-bold text-[#e85d52] font-mono mt-0.5">
                  {selectedTemplate.estimatedBudget}
                </p>
              </div>

              <button
                type="button"
                onClick={handleTransfer}
                className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  transferredNotice
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#c92a22] hover:bg-[#b0221b] text-white'
                }`}
              >
                {transferredNotice ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Loaded to Quote!</span>
                  </>
                ) : (
                  <>
                    <PackageCheck className="w-4 h-4" />
                    <span>Load Package to Quote</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="p-6">
            <div className="border border-[#e6e4e1] overflow-hidden divide-y divide-[#efedea] text-xs">
              <div className="grid grid-cols-12 bg-[#f8f7f6] px-4 py-2.5 font-bold uppercase tracking-wider text-[#4a4540]">
                <span className="col-span-5 sm:col-span-4">Specification & Item</span>
                <span className="col-span-3 sm:col-span-3 font-mono">Recommended Qty</span>
                <span className="col-span-4 sm:col-span-5">Application</span>
              </div>

              {selectedTemplate.materialsBreakdown.map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 px-4 py-3 bg-white hover:bg-[#faf9f8] items-center">
                  <span className="col-span-5 sm:col-span-4 font-semibold text-[#221f1c]">
                    {row.item}
                  </span>
                  <span className="col-span-3 sm:col-span-3 font-mono font-bold text-[#c85242] tabular-nums">
                    {row.qty}
                  </span>
                  <span className="col-span-4 sm:col-span-5 text-[#666059]">
                    {row.spec}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666059] pt-4 border-t border-[#f0eeec]">
              <p>
                *Quantities reflect typical Sagar / Kargal site requirements. Customize directly in our Quote Builder.
              </p>
              <button
                type="button"
                onClick={handleTransfer}
                className="font-bold text-[#c92a22] hover:underline inline-flex items-center gap-1 uppercase tracking-wider cursor-pointer shrink-0"
              >
                <span>Customize in Quote Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
