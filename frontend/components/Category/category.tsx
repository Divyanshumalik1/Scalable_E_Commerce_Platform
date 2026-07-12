"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart, SlidersHorizontal, X, ChevronLeft, ChevronRight,
  Heart, Star, ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
}

const LIMIT = 3;
const CATEGORIES = ["All", "Men's", "Women's", "Kids'", "Accessories", "Electronics", "Sale"];

const PRODUCT_IMAGES = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
  "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&q=80",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80",
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
  "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
  "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80",
];

export const Category: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(1000);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: String(LIMIT),
          ...(selectedCategory ? { category: selectedCategory } : {}),
          maxPrice: String(appliedMaxPrice),
        });
        const res = await fetch(`http://localhost/api/products/product/list?${params}`);
        const data = await res.json();
        setProducts(data.products ?? data);
        setTotalPages(data.totalPages ?? 1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, selectedCategory, appliedMaxPrice]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat === "All" ? "" : cat);
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setMaxPrice(1000);
    setAppliedMaxPrice(1000);
    setPage(1);
  };

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const hasActiveFilters = selectedCategory !== "" || appliedMaxPrice < 1000;

  return (
    <main className="bg-background min-h-screen">
      {/* --- Page header ----------------------------------------------- */}
      <div className="border-b border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6] mb-1">
                {selectedCategory || "All Categories"}
              </p>
              <h1 className="text-3xl font-black text-foreground tracking-tight">Shop</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-border bg-transparent text-sm font-medium text-muted-foreground hover:border-border hover:text-foreground transition-colors">
                Sort: Featured <ChevronDown className="size-3.5" />
              </button>
              <Button
                variant="outline"
                size="sm"
                className="md:hidden gap-2 rounded-lg border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-label="Toggle filters"
              >
                <SlidersHorizontal className="size-3.5" /> Filters
                {hasActiveFilters && <span className="size-1.5 rounded-full bg-[#8b5cf6]" />}
              </Button>
            </div>
          </div>

          {/* Horizontal category pill tabs */}
          <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat || (cat === "All" && !selectedCategory);
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? "bg-[#8b5cf6] text-foreground shadow-lg shadow-[#8b5cf6]/20"
                      : "bg-card border border-border text-muted-foreground hover:border-[#8b5cf6]/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-8">

          {/* --- Sidebar ------------------------------------------------ */}
          <aside className={`w-52 shrink-0 flex-col gap-6 ${sidebarOpen ? "flex" : "hidden"} md:flex`}>

            {/* Price range */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Price Range</h3>
              <label htmlFor="price-range" className="sr-only">Max Price</label>
              <input
                id="price-range"
                type="range"
                min="10"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#8b5cf6] cursor-pointer"
              />
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs font-medium bg-muted border border-border text-muted-foreground rounded-lg px-2.5 py-1">$0</span>
                <span className="text-xs font-bold bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] rounded-lg px-2.5 py-1">${maxPrice}</span>
              </div>
              <Button
                size="sm"
                className="mt-4 w-full rounded-lg bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground font-bold transition-colors duration-150"
                onClick={() => { setAppliedMaxPrice(maxPrice); setPage(1); }}
              >
                Apply Price
              </Button>
            </div>

            {/* Active filters */}
            {hasActiveFilters && (
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Active Filters</h3>
                  <button onClick={clearFilters} className="text-[11px] font-bold text-[#8b5cf6] hover:underline">
                    Clear all
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  {selectedCategory && (
                    <span className="flex items-center justify-between text-xs bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 font-bold rounded-full px-3 py-1.5">
                      {selectedCategory}
                      <button onClick={() => handleCategoryChange("All")} aria-label={`Remove ${selectedCategory}`}>
                        <X className="size-3 ml-1" />
                      </button>
                    </span>
                  )}
                  {appliedMaxPrice < 1000 && (
                    <span className="flex items-center justify-between text-xs bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 font-bold rounded-full px-3 py-1.5">
                      = ${appliedMaxPrice}
                      <button onClick={() => { setMaxPrice(1000); setAppliedMaxPrice(1000); }} aria-label="Remove price filter">
                        <X className="size-3 ml-1" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </aside>

          {/* --- Product Grid ------------------------------------------- */}
          <div className="flex-1 min-w-0">
            {!loading && (
              <p className="text-sm text-muted-foreground mb-6">
                Showing <span className="font-bold text-foreground">{products.length}</span> products
                {selectedCategory && (
                  <> in <span className="font-bold text-[#8b5cf6]">{selectedCategory}</span></>
                )}
              </p>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <Skeleton className="w-full aspect-[4/5] rounded-2xl bg-muted" />
                    <Skeleton className="h-3 w-1/3 bg-muted" />
                    <Skeleton className="h-4 w-3/4 bg-muted" />
                    <Skeleton className="h-3 w-1/2 bg-muted" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 gap-4 rounded-2xl border border-dashed border-border">
                <p className="text-muted-foreground text-sm font-medium">No products match your filters.</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                  onClick={clearFilters}
                >
                  Clear all filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product, idx) => (
                  <div key={product.id} className="group flex flex-col">
                    <div className="relative rounded-2xl overflow-hidden bg-card border border-border group-hover:border-[#8b5cf6]/40 aspect-[4/5] transition-colors duration-300">
                      <Link href={`/products/${product.id}`}>
                        <img
                          src={PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                        />
                      </Link>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <button
                        onClick={() => toggleLike(product.id)}
                        aria-label="Add to wishlist"
                        className="absolute top-3 right-3 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200"
                      >
                        <Heart className={`size-3.5 ${liked.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                      </button>

                      {product.stock > 0 && product.stock <= 5 && (
                        <Badge className="absolute top-3 left-3 bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 text-[10px] font-bold hover:bg-[#8b5cf6]/20">
                          Only {product.stock} left
                        </Badge>
                      )}
                      {product.stock === 0 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="bg-card border border-border text-muted-foreground text-xs font-bold px-4 py-1.5 rounded-full">Sold Out</span>
                        </div>
                      )}
                      {product.stock > 0 && (
                        <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
                          <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground text-xs font-bold py-2.5 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 shadow-lg">
                            <ShoppingCart className="size-3.5" /> Add to Cart
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex flex-col gap-1 px-0.5">
                      {product.category && (
                        <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">{product.category}</span>
                      )}
                      <Link href={`/products/${product.id}`} className="text-sm font-bold text-foreground hover:text-[#8b5cf6] transition-colors line-clamp-1">
                        {product.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-2.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-[#333] fill-[#333]"}`} />
                        ))}
                        <span className="text-[11px] text-muted-foreground ml-1">(128)</span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-base font-black text-[#8b5cf6]">${product.price}</span>
                        <span className="text-xs text-muted-foreground line-through">${(product.price * 1.25).toFixed(0)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="rounded-xl border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    aria-label={`Page ${p}`}
                    className={`size-9 rounded-xl text-sm font-bold border transition-colors duration-150 ${
                      p === page
                        ? "bg-[#8b5cf6] text-foreground border-[#8b5cf6]"
                        : "bg-transparent text-muted-foreground border-border hover:border-[#8b5cf6]/50 hover:text-[#8b5cf6]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="rounded-xl border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
