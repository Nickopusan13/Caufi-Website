"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import AdminSideBar from "../../SideBar";
import AdminHeader from "../../Header";
import BasicInformation from "./components/basicinformation/BasicInformation";
import ProductDescriptionEditor from "./components/description/ProductDescriptionEditor";
import DisplayImages from "./components/displayimages/DisplayImages";
import CareGuide from "./components/careguide/CareGuide";
import Inventory from "./components/inventory/Inventory";
import {
  createImage,
  createProduct,
  updateProduct,
  fetchSingleProduct,
} from "@/utils/api";
import type { ProductCreate } from "@/utils/api";
import toast from "react-hot-toast";
import ToasterProvider from "@/components/ui/Toaster";
import { ProductImage } from "@/utils/api";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import DiscardCard from "./components/DiscardCard";

export default function AddProduct() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [openDiscard, setOpenDiscard] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [images, setImages] = useState<ProductImage[]>([]);
  const [formData, setFormData] = useState<ProductCreate>({
    name: "",
    stock: 0,
    stockType: "In Stock",
    shippingType: "Caufi",
    motif: "",
    material: [],
    regularPrice: 0,
    discountPrice: 0,
    colors: [],
    images: [],
    sizes: [],
    category: "",
    productSummary: "",
    manufacturerName: "",
    description: "",
    careGuide: "",
  });
  useEffect(() => {
    if (id) {
      fetchSingleProduct(Number(id)).then((data) => {
        setFormData(data);
        if (data.images && data.images.length > 0) {
          const formattedImages: ProductImage[] = data.images.map(
            (img: {
              id: number;
              imageUrl: string;
              imageName: string;
              imageSize: number;
            }) => ({
              id: Number(img.id),
              imageUrl: img.imageUrl,
              imageName: img.imageName,
              imageSize: img.imageSize,
              file: null,
            })
          );
          setImages(formattedImages);
        }
      });
    }
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.productSummary ||
      !formData.manufacturerName
    ) {
      toast.error("Please fill basic information field");
      return;
    }
    if (!formData.description) {
      toast.error("Please add a product description.");
      return;
    }
    if (
      formData.sizes.length === 0 ||
      formData.motif.length === 0 ||
      formData.material.length === 0 ||
      formData.colors.length === 0 ||
      formData.category.length === 0
    ) {
      toast.error("Please fill attributes field.");
      return;
    }
    if (formData.stock <= 0) {
      toast.error("Please ensure the stock is set.");
      return;
    }
    if (!formData.shippingType) {
      toast.error("Please select a shipping type.");
      return;
    }
    if (images.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }
    if (formData.regularPrice <= 0) {
      toast.error(
        "Please ensure the price is set and the product has a description."
      );
      return;
    }
    try {
      const payload = {
        ...formData,
        material: formData.material.map((m) =>
          typeof m === "string" ? { material: m } : m
        ),
        sizes: formData.sizes.map((s) =>
          typeof s === "string" ? { size: s } : s
        ),
      };
      let product;
      if (id) {
        product = await updateProduct(Number(id), payload);
        const filesToUpload = images
          .map((img) => img.file)
          .filter((file): file is File => !!file);

        if (filesToUpload.length > 0) {
          await createImage(Number(id), filesToUpload);
        }
        toast.success("Product updated successfully!");
      } else {
        product = await createProduct(payload);
        const filesToUpload = images
          .map((img) => img.file)
          .filter((file): file is File => !!file);

        if (filesToUpload.length > 0) {
          await createImage(product.id, filesToUpload);
        }
        toast.success("Product created successfully!");
      }
      router.push("/admin/product");
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message, { duration: 2000 });
    }
  };
  return (
    <>
      <div className="flex">
        <ToasterProvider />
        <AdminSideBar showMenu={showMenu} />
        <div
          className={`flex flex-1 transition-all duration-300 ${
            showMenu ? "ml-48" : "ml-16"
          }`}
        >
          <AdminHeader setShowMenu={setShowMenu} />
          <main className="pt-18 flex-1 bg-neutral-50 p-4 flex">
            <form
              onSubmit={handleSubmit}
              className="flex-col flex gap-3 w-full"
              noValidate
            >
              <Card>
                <CardContent className="flex justify-between">
                  <div className="flex flex-col">
                    <CardTitle>Add a Product</CardTitle>
                    <CardDescription>
                      Orders placed across your store
                    </CardDescription>
                  </div>
                  <div className="flex gap-3 text-sm">
                    <button
                      type="button"
                      className="border rounded px-2 outline-none"
                      onClick={() => setOpenDiscard(true)}
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-700/50 px-2 rounded text-white"
                    >
                      Publish Product
                    </button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-4">
                <BasicInformation
                  formData={formData}
                  handleChange={(key, value) =>
                    setFormData({ ...formData, [key]: value })
                  }
                />
                <CareGuide
                  value={formData.careGuide}
                  onChange={(value) =>
                    setFormData({ ...formData, careGuide: value })
                  }
                />
              </div>
              <ProductDescriptionEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
              />
              <div className="flex gap-4">
                <DisplayImages
                  images={images}
                  setImages={setImages}
                  maxImages={5}
                />
                <Inventory
                  formData={formData}
                  handleChange={(key, value) =>
                    setFormData({ ...formData, [key]: value })
                  }
                />
              </div>
            </form>
          </main>
        </div>
      </div>
      <AnimatePresence>
        {openDiscard && (
          <DiscardCard
            open={openDiscard}
            setOpen={() => setOpenDiscard(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
