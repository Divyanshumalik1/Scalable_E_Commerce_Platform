import { use } from "react";
import Product from "../../../components/Product/product";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
  <div className="w-7xl mx-auto px-4 py-12">
    <Product productId={id} />
  </div>
);
}
