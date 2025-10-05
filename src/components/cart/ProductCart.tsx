"use client";

import { useEffect, useState } from "react";
import { productCart, availableVouchers, CartItem } from "./Item";
import Image from "next/image";
import VoucherContainer from "./Voucher";
import { motion, AnimatePresence } from "framer-motion";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { PiTrashSimpleFill } from "react-icons/pi";
import { RiArrowRightLine } from "react-icons/ri";
import { LuTicketPercent } from "react-icons/lu";
import { FaChevronRight } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { TbTrashFilled } from "react-icons/tb";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useVoucherStore } from "./Voucher";
import EmptyCart from "./EmptyCart";

const MotionImage = motion.create(Image);

export const OrderSummary = ({
  title,
  price,
}: {
  title: string;
  price: string | number;
}) => {
  return (
    <div className="flex justify-between">
      <span
        className={`text-gray-600 dark:text-gray-400 ${
          title === "Total" ? "font-bold" : ""
        }`}
      >
        {title}
      </span>
      <span className="font-semibold">{price}</span>
    </div>
  );
};

export const InputVouchers = () => {
  const { vouchers, removeVoucher } = useVoucherStore();
  return (
    <div className="flex flex-col gap-3">
      {vouchers.map((item) => (
        <motion.div
          key={item.id}
          className="flex justify-between items-center p-4 rounded-xl shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          <div className="flex items-center gap-3 font-semibold text-base">
            <FiCheckCircle className="text-green-400 w-6 h-6" />
            <span>{item.title}</span>
          </div>
          <button
            className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-600 hover:bg-red-600 transition-colors"
            onClick={() => removeVoucher(item.id)}
            aria-label="Remove voucher"
          >
            <TbTrashFilled className="text-white w-5 h-5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default function ProductCart() {
  const [code, setCode] = useState("");
  const { addVoucher } = useVoucherStore();
  const [error, setError] = useState("");

  const handleApply = () => {
    const voucher = availableVouchers.find(
      (v) => v.code.toUpperCase() === code.toUpperCase()
    );

    if (!voucher) {
      setError("Invalid voucher code");
      return;
    }

    addVoucher(voucher);
    setError("");
    setCode("");
  };
  const { vouchers } = useVoucherStore();
  const [openVoucher, setOpenVoucher] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(productCart ?? []);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const updateQuantity = (index: number, newQty: number) => {
    const stock = cartItems[index]?.stock ?? 0;
    if (newQty > stock) return setErrorIndex(index);
    setErrorIndex(null);
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: Math.min(Math.max(1, newQty), item.stock ?? 0),
            }
          : item
      )
    );
  };
  const originalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  const discount = vouchers.length > 0 ? vouchers[0].discount / 100 : 0;
  const tax = 0.05;
  const totalPrice =
    originalPrice -
    originalPrice * discount +
    (originalPrice - originalPrice * discount) * tax;

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", openVoucher);
    return () => {
      document.documentElement.classList.remove("no-scroll");
    };
  }, [openVoucher]);

  return (
    <div className="w-full items-center justify-center h-full px-2 md:px-30 lg:px-40">
      <div>
        <h1 className="text-center font-bold text-3xl pb-10">Shopping Cart</h1>
      </div>
      <div className="flex flex-col gap-3 max-h-100">
        {!cartItems || cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-sky-100 hover:scrollbar-thumb-blue-600 scrollbar-thumb-rounded-full scrollbar-track-rounded-full dark:scrollbar-thumb-from-zinc-700 dark:scrollbar-thumb-to-zinc-600 dark:hover:scrollbar-thumb-from-blue-500 dark:hover:scrollbar-thumb-to-blue-400 dark:scrollbar-track-zinc-900 border-1 border-blue-500 rounded-2xl lg:border-none md:border-none">
            {cartItems.map((item, index) => {
              const color = item.color ?? "";
              const displayColor =
                color.charAt(0).toUpperCase() + color.slice(1);
              return (
                <div
                  className="grid grid-cols-2 lg:flex md:flex md:flex-row lg:flex-row items-center shadow-md hover:shadow-2xl transition rounded-2xl mt-1 lg:mt-2 p-2"
                  key={index}
                >
                  <a
                    className="shadow-2xl rounded-2xl flex md:m-3 lg:m-3 w-30 h-30"
                    href={item.href ?? "#"}
                  >
                    <div className="relative w-full h-full">
                      <AnimatePresence mode="wait">
                        <MotionImage
                          className="object-cover rounded-lg"
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                          src={
                            hoveredIndex === index
                              ? item.images?.[1] ?? item.images?.[0] ?? ""
                              : item.images?.[0] ?? ""
                          }
                          key={hoveredIndex === index ? "hover" : "default"}
                          alt={item.title ?? ""}
                          transition={{ duration: 0.2 }}
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          quality={100}
                          fill
                        />
                      </AnimatePresence>
                    </div>
                  </a>
                  <div className="flex flex-col lg:flex-row md:flex-row md:justify-between lg:justify-between px-2 lg:px-5 items-center w-full">
                    <div className="flex flex-col items-center md:items-start lg:items-start">
                      <h1 className="font-extrabold lg:text-[20px]">
                        {item.category}
                      </h1>
                      <h2 className="opacity-70">{item.title}</h2>
                      <div className="flex items-center gap-2 w-30 justify-between">
                        <div className="flex items-center gap-1">
                          <span
                            className="rounded-[5px]"
                            style={{
                              backgroundColor: item.color ?? "#000",
                              width: 10,
                              height: 10,
                            }}
                          ></span>
                          <span className="text-[13px] opacity-60">
                            {displayColor}
                          </span>
                        </div>
                        <span>|</span>
                        <div>
                          <span className="text-[13px] opacity-60">
                            {item.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center justify-center">
                      {errorIndex === index && (
                        <p className="text-red-600 text-sm mb-1">
                          Max Stock : {item.stock}
                        </p>
                      )}
                      <div className="flex gap-4 items-center justify-center">
                        <motion.button
                          onClick={() =>
                            updateQuantity(index, (item.quantity ?? 1) - 1)
                          }
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CiCircleMinus size={25} />
                        </motion.button>
                        <input
                          className="bg-transparent flex text-center w-7 outline-none rounded-[5px] text-black dark:text-white"
                          type="text"
                          inputMode="numeric"
                          name="quantity"
                          id={`quantity-${index}`}
                          value={item.quantity ?? 0}
                          onChange={(e) => {
                            const val = e.target.value;
                            const numericalVal =
                              val === ""
                                ? 0
                                : parseInt(val) || (item.quantity ?? 0);
                            const stock = item.stock ?? 0;
                            if (numericalVal > stock)
                              return setErrorIndex(index);
                            setErrorIndex(null);
                            setCartItems((prev) =>
                              prev.map((item, i) =>
                                i === index
                                  ? {
                                      ...item,
                                      quantity: numericalVal,
                                    }
                                  : item
                              )
                            );
                          }}
                          onBlur={() => {
                            const input = document.getElementById(
                              `quantity-${index}`
                            ) as HTMLInputElement;
                            if (!input.value || parseInt(input.value) < 1) {
                              updateQuantity(index, 1);
                            }
                          }}
                        />
                        <motion.button
                          onClick={() =>
                            updateQuantity(index, (item.quantity ?? 0) + 1)
                          }
                          whileHover={{ scale: 1.3 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <CiCirclePlus size={25} />
                        </motion.button>
                      </div>
                    </div>
                    <div>
                      <p className="before:content-['Rp.'] font-medium">
                        {(
                          (item.quantity ?? 0) * (item.price ?? 0)
                        ).toLocaleString("id-ID")}
                      </p>
                    </div>
                    <div>
                      <motion.button
                        whileHover={{ scale: 1.3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PiTrashSimpleFill size={25} />
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="pb-10 lg:pt-10 lg:px-10 pt-5 flex flex-col lg:flex-row w-full gap-10">
          <div className="shadow-lg bg-white dark:bg-zinc-800 py-6 px-6 rounded-3xl lg:w-[50%] md:flex lg:flex lg:flex-col md:flex-col">
            <h1 className="font-extrabold text-2xl text-gray-900 dark:text-sky-200">
              Order Summary
            </h1>
            <div className="flex flex-col mt-6 gap-3 text-lg text-gray-700 dark:text-sky-100">
              <OrderSummary
                title="Original Price"
                price={`Rp.${originalPrice.toLocaleString("id-ID")}`}
              />
              <OrderSummary title="Discount" price={`${discount * 100}%`} />
              <OrderSummary title="Tax" price={`${tax * 100}%`} />
            </div>
            <div className="border-t border-gray-300 w-full my-4"></div>
            <OrderSummary
              title="Total"
              price={`Rp.${totalPrice.toLocaleString("id-ID")}`}
            />
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 transition text-white py-3 px-10 rounded-3xl font-semibold shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Proceed to Checkout
              </motion.button>
              <div className="flex gap-1 text-sm text-gray-600">
                <span>or</span>
                <a
                  className="text-blue-600 underline hover:text-blue-800 flex items-center gap-1"
                  href="#"
                >
                  Continue Shopping <RiArrowRightLine size={18} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-zinc-800 shadow-lg rounded-3xl p-6 lg:w-[40%] flex flex-col gap-4">
            <h1 className="font-semibold text-2xl text-gray-900 dark:text-sky-300 mb-2">
              Voucher
            </h1>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter voucher code"
                value={code}
                name="vouchercode"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApply();
                }}
                onChange={(e) => setCode(e.target.value)}
                className="flex-grow border border-gray-300 rounded-xl px-4 py-2 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <button
                onClick={handleApply}
                type="button"
                className="bg-blue-600 text-white rounded-xl px-6 py-2 font-semibold hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div>
              <InputVouchers />
            </div>
            <div className="flex justify-center">
              <motion.button
                className="border border-gray-300 rounded-xl mx-3 px-5 w-full py-2 flex items-center gap-2 justify-center"
                whileHover={{ scale: 1.1 }}
                onClick={() => setOpenVoucher(true)}
              >
                <LuTicketPercent size={20} />
                <span className="text-[15px] font-medium">
                  See available vouchers
                </span>
                <FaChevronRight size={17} />
              </motion.button>
            </div>
          </div>
        </div>
      )}
      <AnimatePresence mode="wait">
        {openVoucher && (
          <Dialog
            className="fixed inset-0 z-[100] flex justify-center items-center bg-black/50"
            open={openVoucher}
            onClose={() => setOpenVoucher(false)}
          >
            <motion.div
              initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
              animate={{ backgroundColor: "rgba(0,0,0,0.5)", opacity: 1 }}
              exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-black rounded-2xl"
            >
              <DialogPanel>
                <div className="bg-white dark:bg-zinc-800 flex flex-col rounded-2xl shadow-lg px-6 py-4">
                  <div className="flex items-center justify-between mb-5 text-black">
                    <DialogTitle className="font-bold text-[20px]">
                      Your Vouchers
                    </DialogTitle>
                    <button
                      className="hover:text-gray-500"
                      onClick={() => setOpenVoucher(false)}
                    >
                      <IoMdCloseCircleOutline size={30} />
                    </button>
                  </div>
                  <VoucherContainer setOpenVoucher={setOpenVoucher} />
                </div>
              </DialogPanel>
            </motion.div>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}
