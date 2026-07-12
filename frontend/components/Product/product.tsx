"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingCart, ArrowLeft, Package, Tag, Star,
  Heart, Share2, Truck, RefreshCw, Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductData {
  image: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
}

const SIZES = ["XS", "S", "M", "L", "XL"];

const TRUST = [
  { icon: Truck, text: "Free shipping on orders $50+" },
  { icon: RefreshCw, text: "Free 30-day returns" },
  { icon: Shield, text: "2-year warranty included" },
];

const Product: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`http://localhost/api/products/product/${productId}`);
        const data = await res.json();
        setProduct(data.product ?? data);
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [productId]);

  if (loading) return (
    <main className="max-w-5xl mx-auto px-4 py-12 bg-background">
      <Skeleton className="h-4 w-28 mb-10 rounded-lg bg-muted" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
        <Skeleton className="w-full aspect-square rounded-3xl bg-muted" />
        <div className="flex flex-col gap-4 py-2">
          <Skeleton className="h-3 w-1/4 rounded bg-muted" />
          <Skeleton className="h-10 w-3/4 rounded bg-muted" />
          <Skeleton className="h-4 w-full rounded bg-muted" />
          <Skeleton className="h-4 w-5/6 rounded bg-muted" />
          <Skeleton className="h-12 w-full mt-6 rounded-xl bg-muted" />
        </div>
      </div>
    </main>
  );

  if (!product) return (
    <main className="max-w-5xl mx-auto px-4 py-12 text-center flex flex-col items-center gap-4 bg-background">
      <p className="text-red-400 text-lg font-bold">Product not found.</p>
      <Button variant="outline" className="rounded-full border-border bg-transparent text-muted-foreground hover:bg-accent hover:text-foreground" asChild>
        <Link href="/">? Back to homepage</Link>
      </Button>
    </main>
  );

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 bg-background min-h-screen">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-[#8b5cf6] transition-colors mb-10 group"
      >
        <ArrowLeft className="size-3.5 group-hover:-translate-x-0.5 transition-transform" /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

        {/* -- Image -- */}
        <div className="relative rounded-3xl overflow-hidden bg-card border border-border aspect-square">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=80"
            alt={product.name}
            className="w-full h-full object-cover opacity-90"
          />
          <button
            onClick={() => setLiked(!liked)}
            aria-label="Add to wishlist"
            className="absolute top-4 right-4 size-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:scale-110 hover:border-[#8b5cf6]/40 transition-all duration-200"
          >
            <Heart className={`size-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
          </button>
          <button
            aria-label="Share product"
            className="absolute top-[60px] right-4 size-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center hover:scale-110 hover:border-[#8b5cf6]/40 transition-all duration-200"
          >
            <Share2 className="size-4 text-muted-foreground" />
          </button>
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-card border border-border text-muted-foreground font-bold px-6 py-2 rounded-full">Sold Out</span>
            </div>
          )}
        </div>

        {/* -- Details -- */}
        <div className="flex flex-col gap-5 py-1">
          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            {product.category && (
              <Badge className="rounded-full gap-1.5 text-xs font-semibold px-3 py-1 bg-[#8b5cf6]/10 text-[#8b5cf6] border border-[#8b5cf6]/20 hover:bg-[#8b5cf6]/10">
                <Tag className="size-3" /> {product.category}
              </Badge>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <Badge className="rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold hover:bg-amber-500/10 px-3 py-1">
                Only {product.stock} left!
              </Badge>
            )}
          </div>

          {/* Title + stars */}
          <div>
            <h1 className="text-3xl font-black text-foreground leading-tight tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-2.5 mt-2.5">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`size-3.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-[#333] fill-[#333]"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">4.8 · 128 reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-[#8b5cf6]">${product.price}</span>
            <span className="text-lg text-muted-foreground line-through">${(product.price * 1.25).toFixed(0)}</span>
            <Badge className="bg-green-500/10 text-green-400 border border-green-500/20 rounded-full font-bold text-xs hover:bg-green-500/10 px-2.5">
              20% OFF
            </Badge>
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">{product.description}</p>

          <Separator className="bg-[#222]" />

          {/* Size selector */}
          <div>
            <p className="text-sm font-bold text-foreground mb-3">Select Size</p>
            <div className="flex gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-10 rounded-lg text-sm font-bold border transition-all duration-150 ${
                    selectedSize === size
                      ? "bg-[#8b5cf6] text-foreground border-[#8b5cf6]"
                      : "text-muted-foreground border-border bg-transparent hover:border-[#8b5cf6]/50 hover:text-[#8b5cf6]"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <Package className={`size-3.5 ${product.stock > 0 ? "text-green-400" : "text-red-400"}`} />
            {product.stock > 0 ? (
              <span className="text-sm text-green-400 font-semibold">{product.stock} in stock</span>
            ) : (
              <span className="text-sm text-red-400 font-semibold">Out of stock</span>
            )}
          </div>

          {/* Quantity + CTA */}
          {product.stock > 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-11 flex items-center justify-center text-lg font-black text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  -
                </button>
                <span className="w-11 h-11 flex items-center justify-center text-sm font-black border-x border-border text-foreground">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  aria-label="Increase quantity"
                  className="w-10 h-11 flex items-center justify-center text-lg font-black text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  +
                </button>
              </div>
              <Button
                className="flex-1 h-11 rounded-xl bg-[#8b5cf6] hover:bg-[#7c3aed] text-foreground font-bold text-base transition-colors duration-150 shadow-lg shadow-[#8b5cf6]/20"
                size="lg"
              >
                <ShoppingCart className="size-4 mr-2" /> Add to Cart
              </Button>
            </div>
          ) : (
            <Button disabled className="w-full h-11 rounded-xl font-bold text-base bg-muted text-muted-foreground border-0" size="lg">
              Out of Stock
            </Button>
          )}

          {/* Trust badges */}
          <div className="rounded-xl bg-card border border-border p-4 flex flex-col gap-3">
            {TRUST.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-sm">
                <div className="size-7 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center shrink-0">
                  <Icon className="size-3.5 text-[#8b5cf6]" />
                </div>
                <span className="text-muted-foreground font-medium">{text}</span>
              </div>
            ))}
          </div>

          <Link
            href="/category"
            className="text-sm font-semibold text-muted-foreground hover:text-[#8b5cf6] transition-colors flex items-center gap-1"
          >
            Browse more products ?
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Product;

