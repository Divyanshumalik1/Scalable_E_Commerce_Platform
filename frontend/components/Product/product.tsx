"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Product {
  image: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
}

const Product: React.FC<{ productId: string }> = ({ productId }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost/api/products/product/${productId}`);
        const data = await response.json();
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
    <div className="flex items-center justify-center h-48">
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );

  if (!product) return (
    <div className="flex items-center justify-center h-48">
      <p className="text-destructive">Product not found</p>
    </div>
  );

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <Link href="/" className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-block">
        ← Back to products
      </Link>
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <img src="https://images.unsplash.com/photo-1778352890441-6f0aa52003e0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={product.name} className="w-full h-72 object-cover" />
        <div className="p-6 flex flex-col gap-3">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</span>
          <h1 className="text-2xl font-bold text-foreground">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <div className="flex items-center justify-between mt-4">
            <span className="text-3xl font-bold text-primary">${product.price}</span>
            <span className="text-sm text-muted-foreground">{product.stock} in stock</span>
          </div>
          <button className="mt-4 w-full bg-primary text-primary-foreground rounded-lg py-3 text-sm font-medium hover:bg-primary/90 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </main>
  );
};

export default Product;