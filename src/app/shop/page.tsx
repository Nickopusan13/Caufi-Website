import NavBar from "@/components/navbar/NavBar";
import { Breadcrumb } from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import FilterProduct from "@/components/shop/filters/Filter";
import { Metadata } from "next";
import Pagination from "@/components/shop/product-shop/Pagination";
import LoadMore from "@/components/shop/product-shop/LoadMore";

export const metadata: Metadata = {
  title: "Shop",
  description: "The best clothes in the world",
};

export default function ShopPage() {
  return (
    <>
      <NavBar />
      <main className="w-full pt-21 min-h-screen grow h-full px-2 lg:px-30 bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <Breadcrumb />
        <FilterProduct />
        <Pagination />
        <LoadMore />
      </main>
      <Footer />
    </>
  );
}
