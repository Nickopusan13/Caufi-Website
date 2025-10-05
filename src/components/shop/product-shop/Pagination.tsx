"use client";

import ReactPaginate from "react-paginate";
import { useRouter, useSearchParams } from "next/navigation";
import ProductSell from "@/components/ProductSell";
import { productCloth } from "./Item";

export default function Pagination() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemsPerPage = 20;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const totalPages = Math.ceil(productCloth.length / itemsPerPage);
  const forcePage = currentPage - 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = productCloth.slice(startIndex, endIndex);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const selectedPage = selectedItem.selected + 1;
    const url = new URL(window.location.href);
    url.searchParams.set("page", selectedPage.toString());
    router.push(url.pathname + url.search);
  };
  return (
    <div className="hidden lg:block md:block">
      <div className="py-10 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-4 lg:py-12">
        <ProductSell cloths={currentItems} />
      </div>
      <div>
        <ReactPaginate
          className="flex gap-5 items-center justify-center py-10"
          pageClassName="cursor-pointer"
          previousClassName="cursor-pointer"
          nextClassName="cursor-pointer"
          breakClassName="cursor-default"
          activeClassName="font-bold underline"
          pageLinkClassName="px-3 py-1 rounded-xl bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors"
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          forcePage={forcePage}
        />
      </div>
    </div>
  );
}
