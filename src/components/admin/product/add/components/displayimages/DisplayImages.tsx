"use client";

import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Reorder, motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { LuImagePlus } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import ToasterProvider from "@/components/ui/Toaster";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaQuestionCircle } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";
import { useEffect, memo } from "react";
import { ProductImage, deleteImage } from "@/utils/api";

const MotionImage = motion(Image);
type DisplayImagesProps = {
  images: ProductImage[];
  setImages: (files: ProductImage[]) => void;
  maxImages?: number;
};

export default memo(function DisplayImages({
  images,
  setImages,
  maxImages = 5,
}: DisplayImagesProps) {
  const handleDelete = async (image: ProductImage) => {
    try {
      if (image.file) {
        URL.revokeObjectURL(image.imageUrl);
        setImages(
          images.filter((img: ProductImage) => img.imageUrl !== image.imageUrl)
        );
      } else if (image.id != null) {
        await deleteImage(image.id);
        setImages(images.filter((img: ProductImage) => img.id !== image.id));
        toast.success("Image deleted successfully");
      } else {
        console.warn("Image has no id and is not local:", image);
      }
    } catch (err) {
      toast.error("Failed to delete image");
      console.error(err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    onDrop: (acceptedFiles) => {
      const remainingSlots = maxImages - images.length;
      if (remainingSlots <= 0) {
        toast.error(`Maximum ${maxImages} images allowed!`);
        return;
      }
      const filesToAdd = acceptedFiles.slice(0, remainingSlots);
      if (acceptedFiles.length > remainingSlots) {
        toast("Some images were not added because max is 5", {
          icon: <CiWarning className="text-yellow-400" />,
        });
      }
      const newImages: ProductImage[] = filesToAdd.map((file) => ({
        imageUrl: URL.createObjectURL(file),
        imageName: file.name,
        imageSize: file.size,
        file,
      }));
      setImages([...images, ...newImages]);
    },
  });
  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.imageUrl));
    };
  }, [images]);
  const formatSize = (bytes: number) => (bytes / 1024).toFixed(2) + " KB";
  return (
    <Card className="w-full">
      <ToasterProvider />
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Display Images</CardTitle>
        <Tooltip>
          <TooltipTrigger type="button">
            <FaQuestionCircle />
          </TooltipTrigger>
          <TooltipContent>
            <p>{`The first image will be displayes as thumbnail. So please order your image.`}</p>
          </TooltipContent>
        </Tooltip>
      </CardHeader>
      <CardContent>
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={setImages}
          className="flex gap-3 overflow-x-auto py-2 px-2"
        >
          {images.map((item, index) => (
            <Reorder.Item key={index} value={item}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-sm cursor-grab flex-shrink-0"
                  >
                    <MotionImage
                      key={item.imageUrl}
                      src={item.imageUrl}
                      alt={item.imageUrl || item.imageName}
                      width={96}
                      height={96}
                      draggable={false}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center">
                      {index + 1}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                    >
                      <IoMdClose />
                    </button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm font-medium truncate">
                    {item.imageName}
                  </p>
                  <p className="text-xs opacity-60">
                    {formatSize(item.imageSize)}
                  </p>
                </TooltipContent>
              </Tooltip>
            </Reorder.Item>
          ))}
        </Reorder.Group>
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 p-10 text-center rounded-lg hover:border-blue-500 transition cursor-pointer bg-gray-50 flex flex-col items-center justify-center gap-3 mt-4"
        >
          <input {...getInputProps()} />
          <LuImagePlus className="text-[80px] text-blue-300 opacity-60" />
          <p className="text-sm text-gray-700">
            Drag your images or{" "}
            <span className="text-blue-500 hover:underline">
              browse from device
            </span>
          </p>
          <p className="text-xs text-gray-400">Max 5 images, PNG/JPG only</p>
        </div>
      </CardContent>
    </Card>
  );
});
