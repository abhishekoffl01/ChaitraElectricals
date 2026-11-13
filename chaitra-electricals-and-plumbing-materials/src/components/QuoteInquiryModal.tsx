import React, { useState } from 'react';
import { 
  X, Trash2, Plus, Send, CheckCircle2, 
  FileText, MessageSquare, Phone, 
  User, Sparkles, AlertCircle, Printer
} from 'lucide-react';
import { QuoteCartItem, CustomRequirement, QuoteSubmission } from '../types';
import { STORE_INFO } from '../data/inventory';
import confetti from 'canvas-confetti';

interface QuoteInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: QuoteCartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const QuoteInquiryModal: React.FC<QuoteInquiryModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email] = useState('');
  const [location, setLocation] = useState('Kargal / Jog Falls');
  const [customerType, setCustomerType] = useState<QuoteSubmission['customerType']>('General Contractor');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [deliveryNeeded, setDeliveryNeeded] = useState(true);

  const [customItems, setCustomItems] = useState<CustomRequirement[]>([]);
  const [newCustomDesc, setNewCustomDesc] = useState('');
  const [newCustomQty, setNewCustomQty] = useState('');
  const [newCustomUnit] = useState('Pieces');

  const [submittedQuote, setSubmittedQuote] = useState<QuoteSubmission | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomDesc.trim() || !newCustomQty.trim()) return;

    setCustomItems([
      ...customItems,
      {
        id: `custom-${Date.now()}`,
        itemDescription: newCustomDesc.trim(),
        quantity: newCustomQty.trim(),
        unit: newCustomUnit,
      },
    ]);
    setNewCustomDesc('');
    setNewCustomQty('');
  };

  const handleRemoveCustomItem = (id: string) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const totalCatalogEstimate = cart.reduce(
    (sum, item) => sum + item.product.estimatedPrice * item.quantity, 
    0
  );

  const generateWhatsAppMessage = () => {
    let msg = `*QUOTATION INQUIRY - CHAITRA ELECTRICALS & PLUMBING*\n`;
    msg += `-----------------------------------------\n`;
    msg += `Customer: ${customerName || 'Customer'}\n`;
    msg += `Phone: ${phone || 'Not provided'}\n`;
    msg += `Site Location: ${location}\n`;
    msg += `Category: ${customerType}\n`;
    msg += `Delivery to Site Needed: ${deliveryNeeded ? 'Yes' : 'Pickup at Kargal store'}\n\n`;

    msg += `*SELECTED CATALOG MATERIALS:*\n`;
    if (cart.length === 0) {
      msg += `(No catalog items selected)\n`;
    } else {
      cart.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.product.name} [${item.product.brand}]\n   Qty: ${item.quantity} ${item.product.unit} (~₹${(item.product.estimatedPrice * item.quantity).toLocaleString('en-IN')})\n`;
      });
      msg += `\n*Catalog Estimated Subtotal:* ~₹${totalCatalogEstimate.toLocaleString('en-IN')}\n\n`;
    }

    if (customItems.length > 0) {
      msg += `*ADDITIONAL / CUSTOM REQUIREMENTS:*\n`;
      customItems.forEach((c) => {
        msg += `• ${c.itemDescription} - Qty: ${c.quantity} ${c.unit}\n`;
      });
      msg += `\n`;
    }

    if (additionalNotes) {
      msg += `*Project Notes:* ${additionalNotes}\n\n`;
    }

    msg += `Please confirm best wholesale price, stock availability, and delivery dispatch to ${location}. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppInquiry = () => {
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please enter your Name and Phone Number before initiating WhatsApp quote.');
      return;
    }
    setErrorMsg('');
    const waUrl = `https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${generateWhatsAppMessage()}`;
    window.open(waUrl, '_blank');
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setErrorMsg('Please provide your Name and Contact Phone Number.');
      return;
    }

    if (cart.length === 0 && customItems.length === 0) {
      setErrorMsg('Please select at least one material from catalog or add a custom item to request a quote.');
      return;
    }

    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `CE-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const submission: QuoteSubmission = {
        quoteId: generatedId,
        customerName: customerName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        location,
        customerType,
        items: [...cart],
        customRequirements: [...customItems],
        additionalNotes: additionalNotes.trim(),
        deliveryNeeded,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        totalEstimatedAmount: totalCatalogEstimate,
      };

      setSubmittedQuote(submission);
      setIsSubmitting(false);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore confetti failures
      }
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white shadow-2xl border border-[#e6e4e1] w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#221f1c] text-white flex items-center justify-between border-b border-[#322d28] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c92a22] text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider font-display">
                {submittedQuote ? 'Official Commercial Proforma' : 'Quick Quote Builder & Inquiry'}
              </h2>
              <p className="text-xs text-[#a39b93]">
                Chaitra Electricals and Plumbing Materials · B.H. Road, Kargal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#a39b93] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {submittedQuote ? (
            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 border border-emerald-200 text-center">
                <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-[#221f1c]">
                  Quote Request Successfully Registered!
                </h3>
                <p className="text-sm text-[#4a4540] mt-1">
                  Reference ID: <strong className="font-mono text-[#c92a22]">{submittedQuote.quoteId}</strong>
                </p>
                <p className="text-xs text-[#666059] mt-2 max-w-lg mx-auto">
                  Our store manager at B.H. Road, Kargal has logged this quote. We will verify stock availability and contact you at <strong className="text-[#221f1c]">{submittedQuote.phone}</strong> shortly with exact wholesale billing rates.
                </p>
              </div>

              <div className="p-6 md:p-8 bg-[#f8f7f6] border border-[#d8d4cf] space-y-6 print:border-none print:p-0">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2 border-[#221f1c] gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#c92a22]">
                      Official Commercial Proforma Slip
                    </span>
                    <h3 className="text-xl font-black text-[#221f1c] tracking-tight font-display">
                      CHAITRA ELECTRICALS & PLUMBING MATERIALS
                    </h3>
                    <p className="text-xs text-[#666059]">
                      B.H. Road, Near Bus Stand, Kargal - 577421 · Sagar Taluk, Shivamogga District
                    </p>
                    <p className="text-[11px] font-mono font-semibold text-[#4a4540] mt-0.5">
                      GSTIN: {STORE_INFO.gstin} · Authorized Factory Distributor
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-[#7c756d]">Quote Reference</span>
                    <p className="text-lg font-mono font-black text-[#c92a22]">
                      {submittedQuote.quoteId}
                    </p>
                    <p className="text-xs text-[#666059]">{submittedQuote.createdAt}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white p-4 border border-[#e6e4e1] text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7c756d]">Client Name</span>
                    <p className="font-bold text-[#221f1c]">{submittedQuote.customerName}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7c756d]">Trade Category</span>
                    <p className="font-semibold text-[#4a4540]">{submittedQuote.customerType}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7c756d]">Phone / WhatsApp</span>
                    <p className="font-mono font-semibold text-[#221f1c]">{submittedQuote.phone}</p>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#7c756d]">Site Location</span>
                    <p className="font-semibold text-[#221f1c]">{submittedQuote.location}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#221f1c] mb-3">
                    Scheduled Bill of Materials & HSN Classifications
                  </h4>
                  
                  <div className="border border-[#e6e4e1] overflow-hidden divide-y divide-[#e6e4e1] text-xs bg-white">
                    <div className="grid grid-cols-12 bg-[#efedea] px-4 py-2 font-bold text-[#221f1c]">
                      <span className="col-span-1">#</span>
                      <span className="col-span-5 sm:col-span-5">Description & Brand</span>
                      <span className="col-span-2 text-center font-mono">HSN</span>
                      <span className="col-span-2 text-center">Quantity</span>
                      <span className="col-span-2 text-right">Est. Amount</span>
                    </div>

                    {submittedQuote.items.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-4 py-2.5 items-center">
                        <span className="col-span-1 text-[#7c756d] font-mono">{idx + 1}</span>
                        <div className="col-span-5 sm:col-span-5">
                          <p className="font-semibold text-[#221f1c]">{item.product.name}</p>
                          <p className="text-[11px] text-[#7c756d]">{item.product.brand} · SKU: {item.product.sku}</p>
                        </div>
                        <span className="col-span-2 text-center font-mono text-[#666059]">
                          {item.product.category === 'electrical' ? '8544' : item.product.category === 'plumbing' ? '3917' : item.product.category === 'pumps' ? '8413' : '8536'}
                        </span>
                        <span className="col-span-2 text-center font-mono font-bold text-[#221f1c] tabular-nums">
                          {item.quantity} {item.product.unit.split(' ')[0]}
                        </span>
                        <span className="col-span-2 text-right font-mono font-bold text-[#c85242] tabular-nums">
                          ₹{(item.product.estimatedPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}

                    {submittedQuote.customRequirements.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-12 px-4 py-2.5 items-center bg-[#fdf3f2] text-[#221f1c]">
                        <span className="col-span-1 text-[#7c756d] font-mono">C{idx + 1}</span>
                        <span className="col-span-5 sm:col-span-5 font-medium">
                          Custom: {item.itemDescription}
                        </span>
                        <span className="col-span-2 text-center font-mono text-[#7c756d]">—</span>
                        <span className="col-span-2 text-center font-mono font-bold">{item.quantity} {item.unit}</span>
                        <span className="col-span-2 text-right text-[#666059] italic">Upon Dispatch</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-4 border-t border-[#d8d4cf] items-start">
                  <div className="sm:col-span-7 space-y-1.5 text-[11px] text-[#666059]">
                    <p className="font-bold text-[#221f1c] uppercase">Commercial Terms & Guarantees:</p>
                    <p>• Prices include standard factory packaging. Applicable GST tax credit invoice issued on billing.</p>
                    <p>• Site tempo delivery scheduled to {submittedQuote.location} ({submittedQuote.deliveryNeeded ? 'Tempo Delivery Requested' : 'Self Pickup at Kargal'}).</p>
                    <p>• 100% Genuine manufacturer warranty with authorized replacement support.</p>
                  </div>

                  <div className="sm:col-span-5 bg-[#221f1c] text-white p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs text-[#c7c0b8]">
                      <span>Indicative Material Total</span>
                      <span className="font-mono tabular-nums">₹{submittedQuote.totalEstimatedAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-emerald-400">
                      <span>Contractor Trade Margin</span>
                      <span>Verified at Billing</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-[#3a342e] text-sm font-bold text-[#e85d52]">
                      <span>Net Estimated BOQ</span>
                      <span className="text-base font-mono tabular-nums">
                        ₹{submittedQuote.totalEstimatedAmount.toLocaleString('en-IN')}*
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#e6e4e1]">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#221f1c] bg-[#f4f3f2] hover:bg-[#e6e4e1] border border-[#d8d4cf] transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Quotation Slip</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send Slip on WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedQuote(null);
                      onClearCart();
                      onClose();
                    }}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#221f1c] hover:bg-[#f4f3f2] cursor-pointer"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* LEFT COLUMN: Items in Quote (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#221f1c]">
                      Selected Materials ({cart.length})
                    </h3>
                    {cart.length > 0 && (
                      <button
                        type="button"
                        onClick={onClearCart}
                        className="text-xs text-[#c92a22] hover:underline font-semibold cursor-pointer"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {cart.length === 0 ? (
                    <div className="p-8 text-center bg-[#f8f7f6] border border-dashed border-[#d8d4cf]">
                      <p className="text-sm text-[#4a4540] font-medium">No catalog items selected yet.</p>
                      <p className="text-xs text-[#7c756d] mt-1">
                        Browse the inventory and click "+ Add to Quote" or type custom materials below.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                      {cart.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex items-center justify-between p-3 bg-[#f8f7f6] border border-[#e6e4e1] text-xs"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <p className="font-semibold text-[#221f1c] truncate">{item.product.name}</p>
                            <div className="flex items-center gap-2 text-[#666059] mt-0.5">
                              <span>{item.product.brand}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono">~₹{item.product.estimatedPrice} / {item.product.unit}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 shrink-0">
                            <div className="flex items-center border border-[#d8d4cf] bg-white">
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                                className="px-2 py-1 text-[#4a4540] hover:bg-[#f4f3f2] font-bold cursor-pointer"
                              >
                                -
                              </button>
                              <span className="px-2 py-1 font-mono font-bold text-[#221f1c] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-1 text-[#4a4540] hover:bg-[#f4f3f2] font-bold cursor-pointer"
                              >
                                +
                              </button>
                            </div>

                            <span className="font-mono font-bold text-[#c85242] min-w-[70px] text-right tabular-nums">
                              ₹{(item.product.estimatedPrice * item.quantity).toLocaleString('en-IN')}
                            </span>

                            <button
                              type="button"
                              onClick={() => onRemoveItem(item.product.id)}
                              className="p-1 text-[#8b847c] hover:text-[#c92a22] transition-colors cursor-pointer"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="flex justify-between items-center p-3.5 bg-[#fdf3f2] border border-[#f5cbc7] text-xs">
                    <span className="font-bold uppercase tracking-wider text-[#221f1c]">Catalog Estimated Subtotal</span>
                    <span className="font-bold font-mono text-base text-[#c92a22] tabular-nums">
                      ₹{totalCatalogEstimate.toLocaleString('en-IN')}
                    </span>
                  </div>
                )}

                <div className="p-4 bg-[#f8f7f6] border border-[#e6e4e1] space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#221f1c]">
                    <Sparkles className="w-3.5 h-3.5 text-[#c92a22]" />
                    <span>Add Any Custom Material / Specific Brand</span>
                  </div>
                  <p className="text-xs text-[#666059]">
                    Need items not listed above (e.g. GI fittings, drip laterals, 16-gauge GI wire, or 1000L Sintex tanks)? Add them here:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 1-inch Brass Foot Valve (Leader)"
                      value={newCustomDesc}
                      onChange={(e) => setNewCustomDesc(e.target.value)}
                      className="flex-1 text-xs px-3 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Qty (e.g. 5)"
                        value={newCustomQty}
                        onChange={(e) => setNewCustomQty(e.target.value)}
                        className="w-24 text-xs px-3 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomItem}
                        className="px-3 py-2 bg-[#221f1c] hover:bg-[#c92a22] text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {customItems.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      {customItems.map((c) => (
                        <div key={c.id} className="flex items-center justify-between text-xs py-1.5 px-3 bg-white border border-[#e6e4e1]">
                          <span className="text-[#221f1c] font-medium">{c.itemDescription} ({c.quantity} {c.unit})</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomItem(c.id)}
                            className="text-[#8b847c] hover:text-[#c92a22] cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Customer Details & Submission Form (5 cols) */}
              <div className="lg:col-span-5 bg-[#f8f7f6] p-5 border border-[#e6e4e1] space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#221f1c]">
                  Your Details & Site
                </h3>

                {errorMsg && (
                  <div className="p-3 bg-[#fdf3f2] text-[#c92a22] text-xs border border-[#f5cbc7] flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSubmitQuote} className="space-y-3.5 text-xs">
                  <div>
                    <label className="block font-semibold text-[#221f1c] mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-[#8b847c] absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Manjunath Gowda"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#221f1c] mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <div className="relative">
                      <Phone className="w-3.5 h-3.5 text-[#8b847c] absolute left-3 top-2.5" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98452 XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-[#221f1c] mb-1">
                        Site / Delivery Area
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-2.5 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                      >
                        <option value="Kargal / Jog Falls">Kargal / Jog Falls</option>
                        <option value="Sagar Town">Sagar Town</option>
                        <option value="Talaguppa">Talaguppa</option>
                        <option value="Hosanagara">Hosanagara</option>
                        <option value="Gersoppa / Ghats">Gersoppa / Ghats</option>
                        <option value="Bhatkal / Honnavar">Bhatkal / Honnavar</option>
                        <option value="Other Shivamogga area">Other (Shivamogga)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-[#221f1c] mb-1">
                        I am a...
                      </label>
                      <select
                        value={customerType}
                        onChange={(e) => setCustomerType(e.target.value as QuoteSubmission['customerType'])}
                        className="w-full px-2.5 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                      >
                        <option value="General Contractor">Contractor / Builder</option>
                        <option value="Licensed Electrician">Electrician</option>
                        <option value="Plumbing Technician">Plumber</option>
                        <option value="Farmer / Estate Owner">Planter / Farmer</option>
                        <option value="Homeowner">Homeowner</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-[#221f1c] mb-1">
                      Project Notes or Specific Brand Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Need CPVC pipes for 3 bathrooms, delivery required by Saturday morning."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      className="w-full px-3 py-2 border border-[#d8d4cf] bg-white focus:outline-none focus:border-[#c92a22]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="tempoDelivery"
                      checked={deliveryNeeded}
                      onChange={(e) => setDeliveryNeeded(e.target.checked)}
                      className="w-4 h-4 accent-[#c92a22]"
                    />
                    <label htmlFor="tempoDelivery" className="text-[#4a4540] cursor-pointer">
                      Require tempo delivery to site / farm
                    </label>
                  </div>

                  <div className="pt-3 space-y-2">
                    <button
                      type="button"
                      onClick={handleWhatsAppInquiry}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Send Instant Quote on WhatsApp</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#c92a22] hover:bg-[#b0221b] text-white font-bold uppercase tracking-wider transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'Registering...' : 'Submit Quote for Store Callback'}</span>
                    </button>
                  </div>

                  <p className="text-[11px] text-[#7c756d] text-center">
                    Direct showroom phone: {STORE_INFO.phonePrimary} · Fast reply within 30 mins
                  </p>
                </form>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
