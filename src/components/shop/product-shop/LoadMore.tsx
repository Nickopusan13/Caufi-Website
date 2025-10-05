"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { productCloth } from "./Item";
import ProductSell from "../../ProductSell";

export default function LoadMore() {
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setVisible((prev) => Math.min(prev + 10, productCloth.length));
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="block lg:hidden md:hidden">
      <div className="py-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 lg:py-12">
        <ProductSell cloths={productCloth.slice(0, visible)} />
      </div>
      {visible < productCloth.length && (
        <div className="py-4 flex justify-center items-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className={`font-bold py-2 px-4 rounded 
              ${
                loading
                  ? "bg-gray-500 cursor-not-allowed dark:bg-gray-700 text-gray-300"
                  : "bg-[#8f2e2e] dark:bg-[#640000] text-black dark:text-white hover:bg-[#a33c3c] dark:hover:bg-[#7a0000]"
              } flex items-center gap-2`}
          >
            {loading ? (
              <>
                <motion.div
                  className="w-5 h-5 border-4 border-t-white border-gray-300 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </button>
        </div>
      )}
    </div>
  );
}
