"use client";

import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, Search, Plus, Package, X } from "lucide-react";
import { ProductForm, emptyForm } from "./product_form";


type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string | null;
  stock: number;
  createdAt: string;
  updatedAt: string;
};


// ── Page ───────────────────────────────────────────────────────────
const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [panel, setPanel] = useState<{ mode: "add" | "edit"; product?: Product } | null>(null);

  const API = `http://localhost/api/products`;

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API}/product/list`);
      const data = await res.json();
      setProducts(data.products ?? data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Handlers ──────────────────────────────────────────────────
  const handleAdd = async (form: FormData) => {
    const res = await fetch(`${API}/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        stock: parseInt(form.stock),
      }),
    });
    if (!res.ok) throw new Error("Failed to create");
    await fetchProducts();
  };

  const handleEdit = async (form: FormData) => {
    const res = await fetch(`${API}/product/${panel?.product?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price),
        category: form.category,
        stock: parseInt(form.stock),
      }),
    });
    if (!res.ok) throw new Error("Failed to update");
    await fetchProducts();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`${API}/product/${id}`, { method: "DELETE" });
    await fetchProducts();
  };

  // ── Filtered list ─────────────────────────────────────────────
  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const stockBadge = (stock: number) => {
    if (stock === 0)
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-500/10 text-red-500">Out of stock</span>;
    if (stock < 10)
      return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-amber-500">{stock} low</span>;
    return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{stock} in stock</span>;
  };

  return (
    <>
      <div className="space-y-8 px-1">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">Products</h1>
            <p className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${products.length} products in your catalog`}
            </p>
          </div>
          <button
            onClick={() => setPanel({ mode: "add" })}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
          >
            <Plus className="size-4" />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm p-4">
          
          <input
            type="text"
            placeholder="🔍︎ Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow text-center"
          />
        </div>

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground text-sm gap-3">
              <span className="size-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
              Loading products...
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3">
              <Package className="size-10 text-muted-foreground/25" />
              <p className="text-sm text-muted-foreground">No products found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <colgroup>
                  <col className="w-[35%]" />
                  <col className="w-[18%]" />
                  <col className="w-[14%]" />
                  <col className="w-[16%]" />
                  <col className="w-[17%]" />
                </colgroup>
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-center px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Product</th>
                    <th className="text-center px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Category</th>
                    <th className="text-center px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Price</th>
                    <th className="text-center px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Stock</th>
                    <th className="text-center px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filtered.map((product) => (
                    <tr key={product.id}
                        className="border-b border-border transition-colors group cursor-pointer"
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.08)")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
                      <td className="px-6 py-4 text-center align-middle">
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{product.description}</p>
                      </td>
                      <td className="px-6 py-4 text-center align-middle">
                        {product.category ? (
                          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary capitalize">
                            {product.category}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center align-middle">
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          ${product.price.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center align-middle">{stockBadge(product.stock)}</td>
                      <td className="px-6 py-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setPanel({ mode: "edit", product })}
                            className="size-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Pencil className="size-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "rgb(239,68,68)";
                              e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.12)";
                              e.currentTarget.style.borderColor = "rgb(239,68,68)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "";
                              e.currentTarget.style.backgroundColor = "";
                              e.currentTarget.style.borderColor = "";
                            }}
                            className="size-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filtered.length > 0 && (
            <div className="px-6 py-5 border-t border-border bg-muted/20">
              <p className="text-xs text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
                <span className="font-medium text-foreground">{products.length}</span> products
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Slide-over panel */}
      {panel && (
        <ProductForm
          mode={panel.mode}
          initial={
            panel.product
              ? {
                  name: panel.product.name,
                  description: panel.product.description,
                  price: String(panel.product.price),
                  category: panel.product.category ?? "",
                  stock: String(panel.product.stock),
                }
              : emptyForm
          }
          onClose={() => setPanel(null)}
          onSave={panel.mode === "add" ? handleAdd : handleEdit}
        />
      )}
    </>
  );
};

export default ProductsPage;