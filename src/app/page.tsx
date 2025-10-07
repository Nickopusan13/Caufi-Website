import type { Metadata } from "next";
import NavBar from "@/components/navbar/NavBar";
import ImageScroller from "@/components/home/ImageScroller";
import MenSection from "@/components/home/MenSec";
import WomenSection from "@/components/home/WomenSec";
import Quotes from "@/components/home/Quotes";
import Promo from "@/components/home/Promo";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Caufi",
  description: "Welcome to Caufi — Fashion for Everyone",
};

export default async function HomePage() {
  return (
    <>
      <NavBar />
      <main className="bg-white grow dark:bg-zinc-900 min-h-screen w-full h-full pt-19 lg:pt-20 sm:pt-12 transition-all duration-300 overflow-x-clip">
        <ImageScroller />
        <MenSection />
        <div className="border-1 my-3 lg:my-8 border-[#ABABAB]"></div>
        <WomenSection />
        <Quotes />
        <Promo />
      </main>
      <Footer />
    </>
  );
}
