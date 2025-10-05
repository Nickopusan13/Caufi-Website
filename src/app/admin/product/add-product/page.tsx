import AddProduct from "@/components/admin/product/add/AddProduct";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Caufi",
  description: "Add product page admin",
};

export default function AddProductPage() {
  return <AddProduct />;
}
