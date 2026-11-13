/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BrandAuthorityRibbon } from './components/BrandAuthorityRibbon';
import { ProductCatalog } from './components/ProductCatalog';
import { ProjectPackageEstimator } from './components/ProjectPackageEstimator';
import { FacilityAndStandards } from './components/FacilityAndStandards';
import { StoreLocationMap } from './components/StoreLocationMap';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { MobileQuickBar } from './components/MobileQuickBar';
import { ProductDetailModal } from './components/ProductDetailModal';
import { QuoteInquiryModal } from './components/QuoteInquiryModal';
import { TechnicalGuideModal } from './components/TechnicalGuideModal';
import { Product, ProductCategory, QuoteCartItem, Testimonial } from './types';
import { TESTIMONIALS } from './data/inventory';

export default function App() {
  const [quoteCart, setQuoteCart] = useState<QuoteCartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isSpecsGuideOpen, setIsSpecsGuideOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddToQuote = (product: Product, quantity: number = 1) => {
    setQuoteCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const handleLoadPackageToQuote = (products: Product[]) => {
    setQuoteCart((prevCart) => {
      const updated = [...prevCart];
      products.forEach((prod) => {
        const idx = updated.findIndex((item) => item.product.id === prod.id);
        if (idx > -1) {
          updated[idx] = {
            ...updated[idx],
            quantity: updated[idx].quantity + 1,
          };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      });
      return updated;
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setQuoteCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setQuoteCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setQuoteCart([]);
  };

  const handleSelectCategoryFromHero = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSearchClick = () => {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 450);
    }
  };

  const handleAddReview = (newReview: Testimonial) => {
    setTestimonials((prev) => [newReview, ...prev]);
  };

  const cartProductIds = new Set(quoteCart.map((item) => item.product.id));
  const totalQuoteItemsCount = quoteCart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-[#221f1c] flex flex-col font-sans pb-16 md:pb-0">
      
      {/* Top Navigation */}
      <Header
        quoteCount={totalQuoteItemsCount}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenSpecsGuide={() => setIsSpecsGuideOpen(true)}
        onQuickSearchClick={handleQuickSearchClick}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
          onSelectCategoryFromHero={handleSelectCategoryFromHero}
        />

        {/* Featured Inventory 4-Column Crisp White Catalog */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchInputRef={searchInputRef}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToQuote={handleAddToQuote}
          cartProductIds={cartProductIds}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Authorized Brand Partners */}
        <BrandAuthorityRibbon />

        {/* Turnkey Project BOQ Packages & Estimator */}
        <ProjectPackageEstimator
          onLoadPackageToQuote={handleLoadPackageToQuote}
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Showroom & Warehouse Showcase */}
        <FacilityAndStandards
          onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        />

        {/* Interactive Store Map & Distance Estimator */}
        <StoreLocationMap />

        {/* Verified Client Testimonials */}
        <TestimonialsSection
          testimonials={testimonials}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Signature 3-Column Dark Showcase Footer */}
      <Footer
        testimonials={testimonials}
        onSelectProduct={(product) => setSelectedProduct(product)}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
        onOpenSpecsGuide={() => setIsSpecsGuideOpen(true)}
      />

      {/* Mobile Sticky Quick Navigation */}
      <MobileQuickBar
        quoteCount={totalQuoteItemsCount}
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToQuote={handleAddToQuote}
        isInCart={selectedProduct ? cartProductIds.has(selectedProduct.id) : false}
      />

      <QuoteInquiryModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        cart={quoteCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <TechnicalGuideModal
        isOpen={isSpecsGuideOpen}
        onClose={() => setIsSpecsGuideOpen(false)}
      />

    </div>
  );
}
