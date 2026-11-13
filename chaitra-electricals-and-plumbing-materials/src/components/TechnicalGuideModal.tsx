import React from 'react';
import { X, BookOpen, AlertTriangle, Zap, Droplets } from 'lucide-react';
import { WIRE_GAUGE_GUIDE, PIPE_SELECTION_GUIDE } from '../data/inventory';

interface TechnicalGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TechnicalGuideModal: React.FC<TechnicalGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white shadow-2xl border border-[#e6e4e1] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#221f1c] text-white flex items-center justify-between border-b border-[#322d28] shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#e85d52]" />
            <div>
              <h3 className="text-base font-bold uppercase tracking-wider font-display">Electrical & Plumbing Sizing Guide</h3>
              <p className="text-xs text-[#a39b93]">Quick Reference for Homes & Agriculture</p>
            </div>
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
        <div className="p-6 overflow-y-auto space-y-8 text-xs">
          
          {/* Wire Guide */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-[#c92a22]" />
              <h4 className="text-sm font-bold text-[#221f1c] uppercase tracking-wider">
                1. Copper Wire Gauge Selection (sq.mm)
              </h4>
            </div>
            <p className="text-[#554f48] mb-3">
              Selecting undersized cables causes voltage drops and overheating. Standard Bureau of Indian Standards (BIS) reference:
            </p>

            <div className="border border-[#e6e4e1] overflow-hidden bg-[#f8f7f6]">
              <div className="grid grid-cols-12 bg-[#efedea] px-4 py-2 font-bold text-[#221f1c] uppercase tracking-wider">
                <span className="col-span-3">Wire Gauge</span>
                <span className="col-span-3">Max Safe Load</span>
                <span className="col-span-6">Standard Application</span>
              </div>
              <div className="divide-y divide-[#e6e4e1]">
                {WIRE_GAUGE_GUIDE.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 px-4 py-2.5 bg-white items-center">
                    <span className="col-span-3 font-mono font-bold text-[#221f1c]">{row.gauge}</span>
                    <span className="col-span-3 font-semibold text-[#c85242]">{row.load}</span>
                    <span className="col-span-6 text-[#554f48]">{row.uses}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipe Guide */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="w-4 h-4 text-[#221f1c]" />
              <h4 className="text-sm font-bold text-[#221f1c] uppercase tracking-wider">
                2. Pipe Material Selection (CPVC vs uPVC vs Agri)
              </h4>
            </div>
            <p className="text-[#554f48] mb-3">
              Ensure you do not mix cold water uPVC for hot water solar lines:
            </p>

            <div className="border border-[#e6e4e1] overflow-hidden bg-[#f8f7f6]">
              <div className="grid grid-cols-12 bg-[#efedea] px-4 py-2 font-bold text-[#221f1c] uppercase tracking-wider">
                <span className="col-span-4">Pipe Material</span>
                <span className="col-span-2">Max Temp</span>
                <span className="col-span-2">Pressure</span>
                <span className="col-span-4">Intended Usage</span>
              </div>
              <div className="divide-y divide-[#e6e4e1]">
                {PIPE_SELECTION_GUIDE.map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 px-4 py-2.5 bg-white items-center">
                    <span className="col-span-4 font-semibold text-[#221f1c]">{row.material}</span>
                    <span className="col-span-2 text-[#554f48] font-medium">{row.temp}</span>
                    <span className="col-span-2 text-[#554f48] font-mono">{row.pressure}</span>
                    <span className="col-span-4 text-[#554f48]">{row.application}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#fdf3f2] border border-[#f5cbc7] flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#c92a22] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-[#221f1c]">Need specific pressure or head loss calculations?</p>
              <p className="text-[#554f48] text-[11px] mt-0.5">
                Visit our B.H. Road showroom in Kargal or message us with your borewell depth and delivery distance. Our staff will calculate the exact pump horsepower and pipe schedule needed.
              </p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#f8f7f6] border-t border-[#e6e4e1] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#221f1c] hover:bg-[#c92a22] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
