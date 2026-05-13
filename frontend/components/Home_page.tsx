"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";


interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  quantity: number;
}

const LIMIT = 2;

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost/api/products/product/list?page=${page}&limit=${LIMIT}`
        );
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products ?? data);
        setTotalPages(data.totalPages ?? 1);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page]);

  if (error) return (
    <div className="flex items-center justify-center h-64">
      <p className="text-destructive">Error: {error}</p>
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="rounded-xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow">
        <img src="/Website_logo.png" alt="Product" className="w-full h-48 object-cover" />
      </div>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="rounded-xl border bg-card shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              )}
              <Link href={`/products/${product.id}`} className="p-4 flex flex-col gap-2">

                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-foreground">{product.name}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    <span className="text-sm text-muted-foreground">{product.quantity} in stock</span>
                  </div>
                  <button className="mt-2 w-full bg-primary text-primary-foreground rounded-lg py-2 text-sm font-medium hover:bg-primary/90 transition-colors" >
                    Add to Cart
                  </button>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-accent transition-colors"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${p === page
                ? 'bg-primary text-primary-foreground border-primary'
                : 'hover:bg-accent'
              }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-accent transition-colors"
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HomePage;

