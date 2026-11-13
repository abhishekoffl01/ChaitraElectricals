import React, { useState, useMemo } from 'react';
import { Search, Plus, Check, Eye, Zap, Droplets, Gauge, ToggleRight, Lightbulb, Wrench } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/inventory';
import { STUDIO_WHITE_ASSETS } from '../assets';

interface ProductCatalogProps {
  selectedCategory: ProductCategory;
  onCategoryChange: (cat: ProductCategory) => void;
  searchInputRef?: React.RefObject<HTMLInputElement | null>;
  onSelectProduct: (product: Product) => void;
  onAddToQuote: (product: Product, quantity?: number) => void;
  cartProductIds: Set<string>;
  onOpenQuoteModal: () => void;
}

const CategoryIcon: React.FC<{ category: Product['category'] }> = ({ category }) => {
  switch (category) {
    case 'electrical':
      return <Zap className="w-9 h-9 text-[#c92a22]" strokeWidth={1.6} />;
    case 'plumbing':
      return <Droplets className="w-9 h-9 text-[#221f1c]" strokeWidth={1.6} />;
    case 'pumps':
      return <Gauge className="w-9 h-9 text-[#c92a22]" strokeWidth={1.6} />;
    case 'switchgear':
      return <ToggleRight className="w-9 h-9 text-[#221f1c]" strokeWidth={1.6} />;
    case 'lighting':
      return <Lightbulb className="w-9 h-9 text-[#c92a22]" strokeWidth={1.6} />;
    case 'tools':
      return <Wrench className="w-9 h-9 text-[#221f1c]" strokeWidth={1.6} />;
  }
};

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  selectedCategory,
  onCategoryChange,
  searchInputRef,
  onSelectProduct,
  onAddToQuote,
  cartProductIds,
  onOpenQuoteModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc'>('recommended');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Extract unique brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => set.add(p.brand));
    return Array.from(set).sort();
  }, []);

  // Filter & sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
      if (onlyInStock && p.stockStatus !== 'Ready Stock' && p.stockStatus !== 'In Stock') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesDesc = p.shortDesc.toLowerCase().includes(q) || p.fullDesc.toLowerCase().includes(q);
        const matchesSpecs = Object.values(p.specifications).some((val) =>
          val.toLowerCase().includes(q)
        );
        if (!matchesName && !matchesBrand && !matchesSku && !matchesDesc && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.estimatedPrice - b.estimatedPrice;
      if (sortBy === 'price-desc') return b.estimatedPrice - a.estimatedPrice;
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [selectedCategory, selectedBrand, onlyInStock, searchQuery, sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToQuote(product, 1);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === product.id ? null : prev));
    }, 1500);
  };

  const categories: { key: ProductCategory; label: string }[] = [
    { key: 'all', label: 'All Inventory' },
    { key: 'electrical', label: 'Wires & Cables' },
    { key: 'plumbing', label: 'Pipes & Fittings' },
    { key: 'pumps', label: 'Water Pumps' },
    { key: 'switchgear', label: 'Switches & Breakers' },
    { key: 'lighting', label: 'Lighting & Fans' },
    { key: 'tools', label: 'Tools & Adhesives' },
  ];

  return (
    <section id="catalog" className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Uppercase Section Heading matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 mb-6 border-b border-[#e6e4e1]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#c92a22] mb-1">
              Chaitra Showroom Inventory · B.H. Road, Kargal
            </p>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#221f1c] font-display">
              Featured Inventory & Materials
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenQuoteModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#c92a22] hover:bg-[#b0221b] text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0 cursor-pointer"
          >
            <span>Open Custom Quote Slip</span>
          </button>
        </div>

        {/* Crisp Filter & Search Toolbar */}
        <div className="bg-[#f8f7f6] p-4 border border-[#e6e4e1] mb-8 space-y-4">
          
          {/* Category Segmented Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => onCategoryChange(cat.key)}
                  className={`px-3.5 py-2 font-semibold uppercase tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#c92a22] text-white'
                      : 'bg-white text-[#4a4540] border border-[#e2dfdb] hover:text-[#221f1c] hover:border-[#221f1c]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search & Dropdown Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 border-t border-[#e6e4e1] text-xs">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-[#7c756d] absolute left-3 top-2.5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search wires, CPVC pipes, 1.5HP pumps, switches, brands, or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-white border border-[#d8d4cf] text-[#221f1c] focus:outline-none focus:border-[#c92a22]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-[#7c756d] hover:text-[#221f1c] font-bold text-sm"
                >
                  ×
                </button>
              )}
            </div>

            <div className="sm:col-span-3">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full py-2 px-3 bg-white border border-[#d8d4cf] text-[#221f1c] focus:outline-none focus:border-[#c92a22]"
              >
                <option value="all">All Brands ({brands.length})</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'recommended' | 'price-asc' | 'price-desc')}
                className="w-full py-2 px-3 bg-white border border-[#d8d4cf] text-[#221f1c] focus:outline-none focus:border-[#c92a22]"
              >
                <option value="recommended">Sort: Popular & Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Count & Stock Filter */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#666059]">
            <div className="flex items-center gap-2">
              <span>Showing <strong className="text-[#221f1c]">{filteredProducts.length}</strong> catalog items</span>
              {(selectedCategory !== 'all' || selectedBrand !== 'all' || searchQuery) && (
                <>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => {
                      onCategoryChange('all');
                      setSelectedBrand('all');
                      setSearchQuery('');
                    }}
                    className="text-[#c92a22] hover:underline font-semibold cursor-pointer"
                  >
                    Reset Filters
                  </button>
                </>
              )}
            </div>

            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-[#c92a22]"
              />
              <span className="text-[#221f1c] font-medium">Ready Stock Only</span>
            </label>
          </div>
        </div>

        {/* 4-Column Crisp White Product Card Grid matching Reference Image */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-[#f8f7f6] border border-[#e6e4e1]">
            <p className="text-base font-semibold text-[#221f1c]">No matching materials found</p>
            <p className="text-xs text-[#666059] mt-1 max-w-md mx-auto">
              We stock thousands of electrical and plumbing parts at our B.H. Road store. Use our Quote Builder to request any specific brand or dimension.
            </p>
            <button
              type="button"
              onClick={() => {
                onCategoryChange('all');
                setSelectedBrand('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#221f1c] text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#c92a22] transition-colors cursor-pointer"
            >
              Show All Materials
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const inCart = cartProductIds.has(product.id);
              const isJustAdded = recentlyAddedId === product.id;

              return (
                <div
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="bg-white border border-[#e6e4e1] hover:border-[#c92a22]/60 hover:shadow-md transition-all flex flex-col cursor-pointer group"
                >
                  {/* Clean Image Container */}
                  <div className="relative h-48 bg-white overflow-hidden border-b border-[#efedea] flex items-center justify-center p-2">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-center group-hover:scale-105 transition-transform duration-500 ${
                          STUDIO_WHITE_ASSETS.has(product.image) ? 'object-contain p-1' : 'object-cover'
                        }`}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#f7f6f4] border border-[#efedea]">
                        <CategoryIcon category={product.category} />
                        <span className="mt-2.5 text-[11px] font-bold uppercase tracking-widest text-[#221f1c]">
                          {product.brand}
                        </span>
                        <span className="text-[10px] text-[#7c756d] uppercase tracking-wider mt-0.5">
                          {product.categoryLabel}
                        </span>
                      </div>
                    )}

                    {/* Quick Specs Peek Icon */}
                    <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="p-1.5 bg-[#221f1c]/90 text-white inline-flex items-center justify-center">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Card Details matching Reference Theme (Red price first, Uppercase Title, Subtle Metadata) */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      {/* Terracotta-Red Price */}
                      <div className="flex items-baseline gap-1.5 mb-1.5">
                        <span className="text-lg font-bold font-mono text-[#c85242] tabular-nums">
                          ₹{product.estimatedPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-[#7c756d]">
                          / {product.unit}
                        </span>
                      </div>

                      {/* Uppercase Product Name */}
                      <h3 className="text-xs font-bold uppercase tracking-wide text-[#221f1c] group-hover:text-[#c92a22] transition-colors line-clamp-2 leading-snug">
                        {product.name}
                      </h3>

                      {/* Clean Unboxed Metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#7c756d] mt-1.5">
                        <span className="font-semibold text-[#4a4540]">{product.brand}</span>
                        <span aria-hidden="true">·</span>
                        <span>{product.stockStatus}</span>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-3 border-t border-[#f0eeec] flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono text-[#8b847c]">
                        {product.sku}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                          isJustAdded
                            ? 'bg-emerald-700 text-white'
                            : inCart
                            ? 'bg-[#c92a22] text-white hover:bg-[#b0221b]'
                            : 'bg-[#221f1c] text-white hover:bg-[#c92a22]'
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>{inCart ? 'Add More' : 'Add to Quote'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
