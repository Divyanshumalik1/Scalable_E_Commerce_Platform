"use client";

import { useState, useEffect } from "react";
import {
  Pencil,
  Package,
  RotateCcw,
  XCircle,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────
type Order = {
  id: number;
  userId: number;
  productId: number;
  quantity: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "returned" | "failed";
  paymentStatus: "unpaid" | "paid" | "refunded" | "failed";
  paymentMethodId: string;
  paymentIntentId: string | null;
  cancelReason: string | null;
  returnReason: string | null;
  createdAt: string;
  updatedAt: string;
};

const ORDER_STATUSES = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "returned", "failed"] as const;

// ── Badge helpers ──────────────────────────────────────────────────────────────
const orderStatusBadge = (status: Order["status"]) => {
  const map: Record<Order["status"], { label: string; className: string; icon: React.ReactNode }> = {
    pending:    { label: "Pending",    className: "bg-amber-500/10 text-amber-500",                            icon: <Clock className="size-3" /> },
    confirmed:  { label: "Confirmed",  className: "bg-blue-500/10 text-blue-500",                              icon: <CheckCircle2 className="size-3" /> },
    processing: { label: "Processing", className: "bg-indigo-500/10 text-indigo-500",                          icon: <RotateCcw className="size-3" /> },
    shipped:    { label: "Shipped",    className: "bg-violet-500/10 text-violet-500",                          icon: <Truck className="size-3" /> },
    delivered:  { label: "Delivered",  className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",  icon: <CheckCircle2 className="size-3" /> },
    cancelled:  { label: "Cancelled",  className: "bg-red-500/10 text-red-500",                                icon: <XCircle className="size-3" /> },
    returned:   { label: "Returned",   className: "bg-orange-500/10 text-orange-500",                          icon: <RotateCcw className="size-3" /> },
    failed:     { label: "Failed",     className: "bg-rose-500/10 text-rose-500",                              icon: <AlertCircle className="size-3" /> },
  };
  const { label, className, icon } = map[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${className}`}>
      {icon}{label}
    </span>
  );
};

const paymentStatusBadge = (status: Order["paymentStatus"]) => {
  const map: Record<Order["paymentStatus"], string> = {
    paid:     "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    unpaid:   "bg-amber-500/10 text-amber-500",
    refunded: "bg-blue-500/10 text-blue-500",
    failed:   "bg-red-500/10 text-red-500",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${map[status]}`}>
      {status}
    </span>
  );
};

// ── Status Update Dropdown ─────────────────────────────────────────────────────
const StatusDropdown = ({
  orderId,
  current,
  onUpdate,
}: {
  orderId: number;
  current: Order["status"];
  onUpdate: (id: number, status: Order["status"]) => void;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={(e) => { e.stopPropagation(); setOpen((v) => !v); }}
        className="size-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors opacity-0 group-hover:opacity-100"
      >
        <Pencil className="size-3.5" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-9 z-50 bg-card border border-border rounded-xl shadow-xl py-1 min-w-[140px]"
          onMouseLeave={() => setOpen(false)}
        >
          {ORDER_STATUSES.map((s) => (
            <button
              key={s}
              onClick={(e) => { e.stopPropagation(); onUpdate(orderId, s); setOpen(false); }}
              className={`w-full text-left px-3.5 py-2 text-xs capitalize transition-colors hover:bg-accent ${s === current ? "text-primary font-semibold" : "text-foreground"}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Expand Row ─────────────────────────────────────────────────────────────────
const OrderExpandRow = ({ order }: { order: Order }) => (
  <tr>
    <td colSpan={7} className="px-6 py-4 bg-muted/30 border-b border-border">
      <div className="flex items-center gap-8 text-sm flex-wrap">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Product ID</p>
          <p className="text-foreground font-medium">#{order.productId}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Quantity</p>
          <p className="text-foreground font-medium">{order.quantity}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Payment Method</p>
          <p className="text-foreground font-mono text-xs">{order.paymentMethodId}</p>
        </div>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Payment Intent</p>
          <p className="text-foreground font-mono text-xs">{order.paymentIntentId ?? "—"}</p>
        </div>
        {order.cancelReason && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Cancel Reason</p>
            <p className="text-red-500 text-xs">{order.cancelReason}</p>
          </div>
        )}
        {order.returnReason && (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Return Reason</p>
            <p className="text-orange-500 text-xs">{order.returnReason}</p>
          </div>
        )}
        <div className="ml-auto">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">Total</p>
          <p className="text-foreground font-semibold tabular-nums">${order.totalPrice.toFixed(2)}</p>
        </div>
      </div>
    </td>
  </tr>
);

// ── Main Page ──────────────────────────────────────────────────────────────────
const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Order["status"] | "all">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const API = `http://localhost/api/order`;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost/api/order/orders?page=1&limit=20`);
      const data = await res.json();
      setOrders(data.data ?? []);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, [page]);

  const handleStatusUpdate = async (id: number, status: Order["status"]) => {
    try {
      await fetch(`${API}/order/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status } : o));
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleCancel = async (id: number) => {
    if (!confirm("Cancel this order?")) return;
    try {
      await fetch(`${API}/order/${id}/cancel`, { method: "POST" });
      setOrders((prev) => prev.map((o) => o.id === id ? { ...o, status: "cancelled" } : o));
    } catch (err) {
      console.error("Failed to cancel order:", err);
    }
  };

  const filtered = orders.filter((o) => {
    const matchSearch =
      String(o.id).includes(search) ||
      String(o.userId).includes(search) ||
      String(o.productId).includes(search);
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="space-y-8 px-1">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Orders</h1>
          <p className="text-sm text-muted-foreground">
            {loading ? "Loading..." : `${total} total orders`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <input
          type="text"
          placeholder="🔍︎ Search by order ID, user ID, product ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2.5 text-sm bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow"
        />

        {/* Status filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {(["all", ...ORDER_STATUSES] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold capitalize transition-colors ${
                statusFilter === s
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              {s === "all"
                ? `All (${total})`
                : `${s} (${orders.filter((o) => o.status === s).length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-muted-foreground text-sm gap-3">
            <span className="size-4 border-2 border-muted-foreground/30 border-t-primary rounded-full animate-spin" />
            Loading orders...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Package className="size-10 text-muted-foreground/25" />
            <p className="text-sm text-muted-foreground">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Order</th>
                  <th className="text-left px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">User</th>
                  <th className="text-left px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Product</th>
                  <th className="text-right px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Total</th>
                  <th className="text-left px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Payment</th>
                  <th className="text-left px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Status</th>
                  <th className="text-right px-6 py-5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filtered.map((order) => (
                  <>
                    <tr
                      key={order.id}
                      className="border-b border-border transition-colors group cursor-pointer"
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(139, 92, 246, 0.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                      onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                    >
                      {/* Order ID + date */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-semibold text-foreground">#{order.id}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{formatDate(order.createdAt)}</p>
                      </td>

                      {/* User */}
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-foreground">User #{order.userId}</p>
                      </td>

                      {/* Product + qty */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-foreground">Product #{order.productId}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Qty {order.quantity}</p>
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-foreground tabular-nums">
                          ${order.totalPrice.toFixed(2)}
                        </span>
                      </td>

                      {/* Payment status */}
                      <td className="px-6 py-4">{paymentStatusBadge(order.paymentStatus)}</td>

                      {/* Order status */}
                      <td className="px-6 py-4">{orderStatusBadge(order.status)}</td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                          <StatusDropdown orderId={order.id} current={order.status} onUpdate={handleStatusUpdate} />
                          {order.status !== "cancelled" && order.status !== "returned" && order.status !== "failed" && (
                            <button
                              onClick={() => handleCancel(order.id)}
                              className="size-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-colors opacity-0 group-hover:opacity-100"
                            >
                              <XCircle className="size-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Expanded row */}
                    {expandedId === order.id && <OrderExpandRow key={`expand-${order.id}`} order={order} />}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer — count + pagination */}
        {!loading && filtered.length > 0 && (
          <div className="px-6 py-3.5 border-t border-border bg-muted/20 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> of{" "}
              <span className="font-medium text-foreground">{total}</span> orders
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="size-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <span className="text-xs text-muted-foreground tabular-nums">
                Page <span className="font-medium text-foreground">{page}</span> of{" "}
                <span className="font-medium text-foreground">{totalPages}</span>
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="size-7 flex items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;