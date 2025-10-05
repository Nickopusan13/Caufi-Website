import ProductSell from "../ProductSell";
import { productCloth } from "./item";

export default function RelatedProduct() {
  return (
    <div className="w-full pb-10 transition-all duration-300">
      <div className="bg-[#ebebeb] rounded-2xl pt-5 pb-10 dark:bg-[#262626]">
        <h1 className="font-bold text-black dark:text-white flex justify-center mb-5 text-2xl">
          Related Product
        </h1>
        <div className="overflow-x-auto px-4 scrollbar scrollbar-thumb-red-500 scrollbar-track-gray-700">
          <div className="flex gap-4 w-max mx-auto ">
            <ProductSell cloths={productCloth} />
          </div>
        </div>
      </div>
    </div>
  );
}
