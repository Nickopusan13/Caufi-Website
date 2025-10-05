import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer";
import ProductDescription from "@/components/product/Description";
import { Breadcrumb } from "@/components/Breadcrumb";
import ProductInfo from "@/components/product/ProductInfo";
import RelatedProduct from "@/components/product/RelatedProduct";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

export default function ProductPage() {
  return (
    <>
      <NavBar />
      <main className="w-full pt-21 min-h-screen grow h-full px-3 lg:px-20 bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <Breadcrumb />
        <ProductInfo />
        <ProductDescription
          careGuide={`##Stand out with style that speaks for itself**\n\n- Super comfy\n- Durable`}
          productDetails={`##Stand out with style that speaks for itself**\n\n- Super comfy\n- Durable`}
        />
        <RelatedProduct />
      </main>
      <Footer />
    </>
  );
}
