import ProductAdmin from "@/components/admin/product/ProductAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caufi",
  description: "Caufi Product Admin Page",
};

export default function ProductAdminPage() {
  return <ProductAdmin />;
}
