import Link from "next/link";
import AdminMain from "../AdminMain";
import { IoMdAdd } from "react-icons/io";
import { FaFileExport } from "react-icons/fa6";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ProductTable from "./components/ProductTable";

export default function ProductAdmin() {
  return (
    <AdminMain>
      <Card>
        <CardContent className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Add a product</CardTitle>
          <div className="flex gap-2">
            <button className="items-center flex justify-center py-1 px-3 hover:underline gap-1">
              <FaFileExport />
              Export
            </button>
            <Link
              className="bg-blue-600 text-white py-1 px-3 rounded font-medium flex items-center justify-center gap-1"
              href="product/add-product"
            >
              <IoMdAdd /> Add product
            </Link>
          </div>
        </CardContent>
      </Card>
      <ProductTable />
    </AdminMain>
  );
}
