"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export type FormData = {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
};

export const emptyForm: FormData = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
};

export const ProductForm = ({
  mode,
  initial,
  onClose,
  onSave,
}: {
  mode: "add" | "edit";
  initial: FormData;
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
}) => {
  const [form, setForm] = useState<FormData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { setForm(initial); }, [initial]);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.description || !form.price || !form.category || !form.stock) {
      setError("All fields are required.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      await onSave(form);
      onClose();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#8b5cf6]/40 transition-shadow";
  const labelClass = "block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Modal */}
      <div className="max-w-3xs bg-card border border-border rounded-2xl shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in-0 zoom-in-95 duration-150">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border shrink-0">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {mode === "add" ? "Add Product" : "Edit Product"}
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mode === "add" ? "Fill in the details below." : "Update the product details."}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="size-8 flex items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <div className="py-3">
            <label className={labelClass}>Name</label>
            <input className={inputClass} placeholder="e.g. Wireless Headphones" value={form.name} onChange={set("name")} />
          </div>
          <div className="py-3">
            <label className={labelClass}>Description</label>
            <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Short product description..." value={form.description} onChange={set("description")} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="py-3">
              <label className={labelClass}>Price ($)</label>
              <input type="number" min="0" step="0.01" className={inputClass} placeholder="0.00" value={form.price} onChange={set("price")} />
            </div>
            <div className="py-3">
              <label className={labelClass}>Stock</label>
              <input type="number" min="0" className={inputClass} placeholder="0" value={form.stock} onChange={set("stock")} />
            </div>
          </div>
          <div className="py-3">
            <label className={labelClass}>Category</label>
            <input className={inputClass} placeholder="e.g. Electronics" value={form.category} onChange={set("category")} />
          </div>
          {error && <p className="text-xs text-red-500 bg-red-500/10 px-3.5 py-2.5 rounded-lg">{error}</p>}
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-5 border-t border-border shrink-0">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 bg-[#8b5cf6] hover:bg-[#7c3aed] disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
          >
            {saving ? "Saving..." : mode === "add" ? "Create Product" : "Save Changes"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


// export type FormData = {
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   stock: string;
// };

// export const emptyForm: FormData = {
//   name: "",
//   description: "",
//   price: "",
//   category: "",
//   stock: "",
// };

// export const ProductForm = ({
//   mode,
//   initial,
//   onClose,
//   onSave,
// }: {
//   mode: "add" | "edit";
//   initial: FormData;
//   onClose: () => void;
//   onSave: (data: FormData) => Promise<void>;
// }) => {
//   const [form, setForm] = useState<FormData>(initial);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [width, setWidth] = useState(440);
//   const isResizing = useRef(false);

//   useEffect(() => { setForm(initial); }, [initial]);

//   const startResize = (e: React.MouseEvent) => {
//     isResizing.current = true;
//     e.preventDefault();

//     const onMove = (e: MouseEvent) => {
//       if (!isResizing.current) return;
//       // Right-anchored sheet: width = distance from mouse to right edge of viewport
//       const newWidth = Math.min(Math.max(window.innerWidth - e.clientX, 360), window.innerWidth - 60);
//       setWidth(newWidth);
//     };

//     const onUp = () => {
//       isResizing.current = false;
//       window.removeEventListener("mousemove", onMove);
//       window.removeEventListener("mouseup", onUp);
//     };

//     window.addEventListener("mousemove", onMove);
//     window.addEventListener("mouseup", onUp);
//   };

//   const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//     setForm((f) => ({ ...f, [k]: e.target.value }));

//   const handleSubmit = async () => {
//     if (!form.name || !form.description || !form.price || !form.category || !form.stock) {
//       setError("All fields are required.");
//       return;
//     }
//     setSaving(true);
//     setError("");
//     try {
//       await onSave(form);
//       onClose();
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass = "w-full px-3.5 py-2.5 text-sm bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40 transition-shadow";
//   const labelClass = "block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1.5";

//   return (
//     <>
//       {/* Resize handle — fixed outside the sheet at its left edge */}
//       <div
//         onMouseDown={startResize}
//         style={{ right: width }}
//         className="fixed inset-y-0 w-4 z-[60] cursor-col-resize flex items-center justify-center group"
//       >
//         <div className="w-1 h-12 rounded-full bg-muted-foreground/30 group-hover:bg-primary group-active:bg-primary transition-colors" />
//       </div>

//     <Sheet open onOpenChange={(v) => !v && onClose()}>
//       <SheetContent
//         side="right"
//         style={{ width }}
//         className="p-0 flex flex-col max-w-none"
//       >

//         <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
//           <SheetTitle className="text-base font-semibold">
//             {mode === "add" ? "Add Product" : "Edit Product"}
//           </SheetTitle>
//           <SheetDescription className="text-xs text-muted-foreground">
//             {mode === "add" ? "Fill in the details below." : "Update the product details."}
//           </SheetDescription>
//         </SheetHeader>

//         <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
//           <div>
//             <label className={labelClass}>Name</label>
//             <input className={inputClass} placeholder="e.g. Wireless Headphones" value={form.name} onChange={set("name")} />
//           </div>
//           <div>
//             <label className={labelClass}>Description</label>
//             <textarea rows={3} className={`${inputClass} resize-none`} placeholder="Short product description..." value={form.description} onChange={set("description")} />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className={labelClass}>Price ($)</label>
//               <input type="number" min="0" step="0.01" className={inputClass} placeholder="0.00" value={form.price} onChange={set("price")} />
//             </div>
//             <div>
//               <label className={labelClass}>Stock</label>
//               <input type="number" min="0" className={inputClass} placeholder="0" value={form.stock} onChange={set("stock")} />
//             </div>
//           </div>
//           <div>
//             <label className={labelClass}>Category</label>
//             <input className={inputClass} placeholder="e.g. Electronics" value={form.category} onChange={set("category")} />
//           </div>
//           {error && <p className="text-xs text-red-500 bg-red-500/10 px-3.5 py-2.5 rounded-lg">{error}</p>}
//         </div>

//         <SheetFooter className="px-6 py-5 border-t border-border flex gap-3 shrink-0">
//           <button
//             onClick={handleSubmit}
//             disabled={saving}
//             className="flex-1 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground text-sm font-medium py-2.5 rounded-lg transition-colors"
//           >
//             {saving ? "Saving..." : mode === "add" ? "Create Product" : "Save Changes"}
//           </button>
//           <SheetClose asChild>
//             <button className="px-4 py-2.5 text-sm font-medium border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors">
//               Cancel
//             </button>
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//     </>
//   );
// };
