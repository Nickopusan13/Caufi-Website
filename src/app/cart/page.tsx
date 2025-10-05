import { Breadcrumb } from "@/components/Breadcrumb";
import ProductCart from "@/components/cart/ProductCart";
import Footer from "@/components/Footer";
import NavBar from "@/components/navbar/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your Shopping Cart",
};

export default function CartPage() {
  return (
    <>
      <NavBar />
      <main className="w-full pt-21 pb-10 grow h-full px-3 lg:px-20 bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <Breadcrumb />
        <ProductCart />
      </main>
      <Footer />
    </>
  );
}
