"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import {
  ShoppingCart, ArrowRight, ChevronLeft, ChevronRight,
  Heart, Star, Truck, RefreshCw, Shield, Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
}

const LIMIT = 3;

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

const TRUST_FEATURES = [
  { icon: Truck, label: "Free Shipping", sub: "On orders over $50" },
  { icon: RefreshCw, label: "Easy Returns", sub: "30-day policy" },
  { icon: Shield, label: "Secure Payment", sub: "100% protected" },
  { icon: Package, label: "Fast Delivery", sub: "2â€“5 business days" },
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [liked, setLiked] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost/api/products/product/list?page=${page}&limit=${LIMIT}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products ?? data);
        setTotalPages(data.totalPages ?? 1);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const toggleLike = (id: string) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-background">

      {/* â”€â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="relative overflow-hidden bg-background">
        {/* Ambient glow blobs */}
        <div className="absolute -top-40 -right-20 w-[600px] h-[600px] rounded-full bg-[#8b5cf6]/10 blur-3xl pointer-events-none" />
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-80 h-80 rounded-full bg-[#7c3aed]/8 blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left copy */}
          <div className="flex flex-col gap-7">
            <div className="flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 text-[#8b5cf6] text-xs font-semibold tracking-widest uppercase">
              <span className="size-1.5 rounded-full bg-[#8b5cf6] inline-block animate-pulse" />
              New Season 2026
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[0.92] tracking-tight">
              Style<br />
              <span className="text-[#8b5cf6]">Redefined.</span>
            </h1>

            <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
              Curated fashion, electronics & more. Discover your next favourite thing all in one place.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Button
                size="lg"
                className="rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground font-bold px-8 shadow-lg shadow-[#8b5cf6]/20 transition-all duration-150"
                asChild
              >
                <Link href="/category">Shop Now <ArrowRight className="size-4 ml-1" /></Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground hover:border-[#444] px-8 transition-all duration-150"
                asChild
              >
                <Link href="/category">Browse All</Link>
              </Button>
            </div>

            {/* Stats row */}
            <div className="flex gap-8 pt-4 border-t border-border">
              {[["10k+", "Products"], ["4.9â˜…", "Avg Rating"], ["50k+", "Customers"]].map(([val, lbl]) => (
                <div key={lbl}>
                  <p className="text-foreground font-black text-xl">{val}</p>
                  <p className="text-muted-foreground text-xs mt-0.5">{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image card */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-[340px] h-[380px]">
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-border">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80"
                  alt="Fashion store"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-5 -left-10 bg-card border border-border rounded-2xl shadow-2xl px-4 py-3 flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#8b5cf6]/15 flex items-center justify-center">
                  <ShoppingCart className="size-4 text-[#8b5cf6]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">Free Shipping</p>
                  <p className="text-xs text-muted-foreground">Orders over $50</p>
                </div>
              </div>
              {/* Floating reviews card */}
              <div className="absolute -top-4 -right-6 bg-card border border-border rounded-2xl shadow-2xl px-4 py-3">
                <div className="flex gap-0.5 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-foreground">50k+ happy buyers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€â”€ Trust strip â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="border-y border-border bg-background">
        <div className="max-w-6xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          {TRUST_FEATURES.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="size-8 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                <Icon className="size-3.5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* â”€â”€â”€ Featured Products â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#8b5cf6] mb-1.5">Handpicked for you</p>
            <h2 className="text-3xl font-black text-foreground tracking-tight leading-tight">Featured Products</h2>
          </div>
          <Link
            href="/category"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-[#8b5cf6] transition-colors"
          >
            View All <ArrowRight className="size-4" />
          </Link>
        </div>

        {error && (
          <div className="flex items-center justify-center h-56 rounded-2xl border border-dashed border-red-500/20 bg-red-500/5">
            <p className="text-red-400 text-sm font-medium">{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <Skeleton className="w-full aspect-[4/5] rounded-2xl bg-muted" />
                <Skeleton className="h-3 w-1/3 rounded bg-muted" />
                <Skeleton className="h-4 w-3/4 rounded bg-muted" />
                <Skeleton className="h-3 w-1/2 rounded bg-muted" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, idx) => (
              <div key={product.id} className="group flex flex-col">
                {/* Image wrapper */}
                <div className="relative rounded-2xl overflow-hidden bg-card border border-border group-hover:border-[#8b5cf6]/40 aspect-[4/5] transition-colors duration-300">
                  <Link href={`/products/${product.id}`}>
                    <img
                      src={PRODUCT_IMAGES[idx % PRODUCT_IMAGES.length]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out opacity-80 group-hover:opacity-100"
                    />
                  </Link>

                  {/* Hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  {/* Wishlist button */}
                  <button
                    onClick={() => toggleLike(product.id)}
                    aria-label="Add to wishlist"
                    className="absolute top-3 right-3 size-8 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-200"
                  >
                    <Heart className={`size-3.5 transition-colors ${liked.has(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  </button>

                  {/* Stock badge */}
                  {product.stock > 0 && product.stock <= 5 && (
                    <Badge className="absolute top-3 left-3 bg-[#8b5cf6]/20 text-[#8b5cf6] border border-[#8b5cf6]/30 text-[10px] font-bold hover:bg-[#8b5cf6]/20 shadow-none">
                      Only {product.stock} left
                    </Badge>
                  )}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl">
                      <span className="bg-card border border-border text-muted-foreground text-xs font-bold px-4 py-1.5 rounded-full">Sold Out</span>
                    </div>
                  )}

                  {/* Add to cart â€” slides up on hover */}
                  {product.stock > 0 && (
                    <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out p-3">
                      <button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground text-xs font-bold py-2.5 rounded-xl transition-colors duration-150 flex items-center justify-center gap-2 shadow-lg">
                        <ShoppingCart className="size-3.5" /> Add to Cart
                      </button>
                    </div>
                  )}
                </div>

                {/* Card info */}
                <div className="mt-3 flex flex-col gap-1 px-0.5">
                  {product.category && (
                    <span className="text-[11px] uppercase tracking-widest font-semibold text-muted-foreground">
                      {product.category}
                    </span>
                  )}
                  <Link
                    href={`/products/${product.id}`}
                    className="text-sm font-bold text-foreground hover:text-[#8b5cf6] transition-colors line-clamp-1"
                  >
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
      </section>

      {/* â”€â”€â”€ Promo banner â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-card border border-border p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Purple glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#8b5cf6]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-[#7c3aed]/10 blur-3xl pointer-events-none" />
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative text-foreground text-center md:text-left">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-semibold">Limited time</p>
            <h3 className="text-4xl md:text-5xl font-black leading-tight text-foreground">
              Get 20% off<br />your first order
            </h3>
            <p className="text-muted-foreground text-sm mt-2">
              Use code <span className="font-bold text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/20 px-2 py-0.5 rounded">WELCOME20</span> at checkout
            </p>
          </div>
          <Button
            size="lg"
            className="relative rounded-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground font-black px-12 text-base shadow-lg shadow-[#8b5cf6]/25 shrink-0 transition-all duration-150"
            asChild
          >
            <Link href="/category">Claim Offer <ArrowRight className="size-4 ml-1" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
