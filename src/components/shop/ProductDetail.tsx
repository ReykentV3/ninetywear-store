"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { WCProduct, WCVariation } from "@/services/woocommerce/types";
import { getPrintifyVariantId } from "@/services/woocommerce/products";
import AddToCartButton from "@/components/cart/AddToCartButton";
import type { CartItem } from "@/services/woocommerce/types";

// ─── ProductDetail ────────────────────────────────────────────────────
// Full product page layout: image gallery + variant selector + add to cart.

interface ProductDetailProps {
  product: WCProduct;
  variations: WCVariation[];
}

export default function ProductDetail({ product, variations }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const sizeAttribute = product.attributes.find(
    (a) => a.name.toLowerCase() === "size"
  );
  const colorAttribute = product.attributes.find(
    (a) => a.name.toLowerCase() === "color" || a.name.toLowerCase() === "colour"
  );

  // Find variation matching selected size + color
  const selectedVariation = variations.find((v) =>
    v.attributes.every((attr) => {
      if (attr.name.toLowerCase() === "size") return attr.option === selectedSize;
      if (attr.name.toLowerCase().startsWith("color")) return attr.option === selectedColor;
      return true;
    })
  );

  const currentPrice =
    selectedVariation?.price ?? product.price;
  const isAvailable =
    selectedVariation?.stock_status === "instock" ||
    (!selectedVariation && product.stock_status === "instock");

  const cartItem: Omit<CartItem, "qty"> = {
    productId: product.id,
    variationId: selectedVariation?.id ?? null,
    printifyVariantId: selectedVariation
      ? getPrintifyVariantId(selectedVariation)
      : null,
    name: product.name,
    price: currentPrice,
    image: product.images[selectedImage]?.src ?? "",
    size: selectedSize,
    color: selectedColor,
    slug: product.slug,
  };

  const canAddToCart =
    isAvailable &&
    (!sizeAttribute || selectedSize !== "") &&
    (!colorAttribute || selectedColor !== "");

  return (
    <article className="min-h-screen">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16">
          {/* ── Image Gallery ── */}
          <div className="space-y-3">
            {/* Main Image */}
            <div
              className="relative aspect-[3/4] bg-carbon border border-ash overflow-hidden cursor-zoom-in"
              onClick={() => setLightboxOpen(true)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {product.images[selectedImage] && (
                    <Image
                      src={product.images[selectedImage].src}
                      alt={product.images[selectedImage].alt || product.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Decorative corner */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-digital z-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-digital z-10" />

              {/* Zoom hint */}
              <div className="absolute bottom-4 right-4 z-10 px-2 py-1 bg-void/70 backdrop-blur-sm">
                <span
                  className="text-mist text-[9px] tracking-[0.3em] font-mono"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  ZOOM
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(i)}
                    className={`relative shrink-0 w-20 h-24 border transition-all duration-200 overflow-hidden ${
                      i === selectedImage
                        ? "border-bone"
                        : "border-ash hover:border-ash/80 opacity-50 hover:opacity-75"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col">
            {/* Categories */}
            <div className="flex gap-2 mb-4">
              {product.categories.map((cat) => (
                <span
                  key={cat.id}
                  className="text-digital text-[9px] tracking-[0.4em] font-mono uppercase bg-digital/10 px-2 py-0.5"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  [{cat.name}]
                </span>
              ))}
            </div>

            {/* Name */}
            <h1
              className="text-bone font-mono font-bold text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-4"
              style={{ fontFamily: "var(--font-space-mono)" }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span
                className="text-bone text-2xl font-mono"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                ${currentPrice}
              </span>
              {product.on_sale && product.regular_price && (
                <span
                  className="text-mist line-through text-sm font-mono"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  ${product.regular_price}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-ash mb-8" />

            {/* Color Selector */}
            {colorAttribute && colorAttribute.options.length > 0 && (
              <div className="mb-6">
                <p
                  className="text-mist text-[10px] tracking-[0.4em] font-mono mb-3"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  COLOR{selectedColor ? `: ${selectedColor.toUpperCase()}` : ""}
                </p>
                <div className="flex flex-wrap gap-2">
                  {colorAttribute.options.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border text-xs font-mono tracking-wider transition-all duration-200 ${
                        selectedColor === color
                          ? "border-digital bg-digital text-bone shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                          : "border-ash text-mist hover:border-digital hover:text-digital"
                      }`}
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {sizeAttribute && sizeAttribute.options.length > 0 && (
              <div className="mb-8">
                <p
                  className="text-mist text-[10px] tracking-[0.4em] font-mono mb-3"
                  style={{ fontFamily: "var(--font-space-mono)" }}
                >
                  SIZE{selectedSize ? `: ${selectedSize}` : ""}
                </p>
                <div className="flex flex-wrap gap-2">
                  {sizeAttribute.options.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-11 border text-xs font-mono tracking-wider transition-all duration-200 ${
                        selectedSize === size
                          ? "border-digital bg-digital text-bone shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                          : "border-ash text-mist hover:border-digital hover:text-digital"
                      }`}
                      style={{ fontFamily: "var(--font-space-mono)" }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton item={cartItem} disabled={!canAddToCart} />

            {/* Helper text */}
            {!canAddToCart && (sizeAttribute || colorAttribute) && (
              <p
                className="text-mist text-[10px] tracking-[0.3em] font-mono text-center mt-3"
                style={{ fontFamily: "var(--font-space-mono)" }}
              >
                {!selectedSize && sizeAttribute ? "SELECT A SIZE" : "SELECT ALL OPTIONS"}
              </p>
            )}

            {/* Details */}
            <div className="mt-10 pt-8 border-t border-ash space-y-4">
              {[
                { label: "SKU", value: product.sku || "N/A" },
                { label: "STATUS", value: product.stock_status === "instock" ? "IN STOCK" : "SOLD OUT" },
                { label: "TYPE", value: "MADE TO ORDER" },
              ].map((detail) => (
                <div key={detail.label} className="flex justify-between items-center">
                  <span
                    className="text-mist text-[9px] tracking-[0.4em] font-mono"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {detail.label}
                  </span>
                  <span
                    className="text-bone text-[10px] tracking-[0.3em] font-mono"
                    style={{ fontFamily: "var(--font-space-mono)" }}
                  >
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            {product.short_description && (
              <div
                className="mt-8 prose-sm text-mist font-mono text-xs leading-7 tracking-wide [&_p]:mb-3"
                style={{ fontFamily: "var(--font-space-mono)" }}
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && product.images[selectedImage] && (
          <motion.div
            className="fixed inset-0 z-[100] bg-void/95 flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              className="relative w-full max-w-2xl aspect-[3/4]"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].alt}
                fill
                sizes="800px"
                className="object-contain"
              />
            </motion.div>
            <button
              className="absolute top-6 right-6 text-mist hover:text-bone transition-colors"
              aria-label="Close lightbox"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 1l18 18M19 1L1 19" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
