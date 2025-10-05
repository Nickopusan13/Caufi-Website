"use client";

import { motion, AnimatePresence } from "framer-motion";
import { userProfile, userOrder, formatAddress } from "./components/Item";
import Image from "next/image";
import { useState } from "react";
import { DialogTitle } from "@headlessui/react";
import { MdShoppingCart } from "react-icons/md";
import { IoIosCloseCircle } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import { TbTruckLoading } from "react-icons/tb";
import AppDialog from "../ui/AppDialog";

const OrderActionButton = ({
  status,
  orderId,
}: {
  status: userOrder["status"];
  orderId: string;
}) => {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const handleCancel = () => {
    console.log(`Cancelling order ${orderId}`);
    setConfirm(false);
  };
  const actions: Record<
    userOrder["status"],
    { label: string; variant: string; action: () => void }[] | undefined
  > = {
    Processing: [
      {
        label: "Cancel Order",
        variant: "bg-red-500",
        action: () => setConfirm(true),
      },
    ],
    "Pending Payment": [
      {
        label: "Pay Now",
        variant: "bg-blue-500",
        action: () => router.push(`/orders/${orderId}/payment`),
      },
      {
        label: "Cancel Order",
        variant: "bg-red-500",
        action: () => setConfirm(true),
      },
    ],
    Shipped: [
      {
        label: "Track Order",
        variant: "bg-blue-500",
        action: () => router.push(`/shipped/${orderId}/track`),
      },
    ],
    Delivered: [
      {
        label: "Give Review",
        variant: "bg-blue-500",
        action: () => router.push(`/delivered/${orderId}/review`),
      },
    ],
  };
  const config = actions[status];
  if (!config) return null;
  return (
    <div className="flex flex-col gap-2">
      {!confirm ? (
        <div className="flex gap-2">
          {config.map((btn, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={btn.action}
              className={`px-4 py-2 rounded-xl font-medium transition ${btn.variant}`}
            >
              {btn.label}
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="flex justify-between gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            className="px-3 py-2 rounded-lg bg-red-500 text-white"
          >
            Yes, Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setConfirm(false)}
            className="px-3 py-2 rounded-lg bg-gray-300 text-black"
          >
            No
          </motion.button>
        </div>
      )}
    </div>
  );
};

const sortedOrders = [...userProfile.orderHistory].sort((a, b) => {
  const statusPriority: Record<string, number> = {
    "Pending Payment": 1,
    Processing: 2,
    Shipped: 3,
    Delivered: 4,
    Cancelled: 5,
  };
  return statusPriority[a.status] - statusPriority[b.status];
});

const FilterButton = ({
  selectedFilter,
  setSelectedFilter,
}: {
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) => {
  return (
    <div className="flex overflow-x-auto overflow-y-hidden md:overflow-hidden lg:overflow-hidden gap-2 items-center justify-start">
      {[
        "All",
        "Pending Payment",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ].map((item, index) => {
        const isActive = selectedFilter === item;
        return (
          <div key={index} className="">
            <motion.button
              className={`py-2 px-2 md:px-4 lg:px-5 text-sm bg-zinc-200 dark:bg-zinc-700 rounded md:rounded-3xl lg:rounded-3xl whitespace-nowrap ${
                isActive ? "bg-zinc-300 dark:bg-zinc-900" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFilter(item)}
            >
              {item}
            </motion.button>
          </div>
        );
      })}
    </div>
  );
};

export default function OrderHistoryPage() {
  const [openOrder, setOpenOrder] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<userOrder | null>(null);
  const [selectFilter, setSelectedFilter] = useState<string>("Pending Payment");
  const [visibleCount, setVisibleCount] = useState(12);
  const filteredOrders = sortedOrders.filter((order) => {
    if (selectFilter === "All") return true;
    return order.status === selectFilter;
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bold">Order History</h1>
      <FilterButton
        selectedFilter={selectFilter}
        setSelectedFilter={setSelectedFilter}
      />
      <div
        id="scrollableDiv"
        className="overflow-x-hidden overflow-y-auto max-h-150 md:max-h-200 scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-zinc-300 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-700"
      >
        <InfiniteScroll
          className="flex flex-col gap-5 md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-y-2 md:gap-x-4"
          dataLength={visibleCount}
          next={() => setVisibleCount((prev) => prev + 6)}
          hasMore={visibleCount < filteredOrders.length}
          loader={
            <div className="col-span-full flex justify-center py-6">
              <TbTruckLoading className="text-zinc-500 text-4xl animate-bounce" />
            </div>
          }
          scrollableTarget="scrollableDiv"
        >
          {filteredOrders.slice(0, visibleCount).map((item, index) => {
            const total = item.products.reduce(
              (sum, p) => sum + p.price * (p.quantity || 1),
              0
            );
            return (
              <motion.button
                layout
                onClick={() => {
                  setSelectedOrder(item);
                  setOpenOrder(true);
                }}
                className="shadow dark:shadow-white/5 rounded-2xl py-2 px-4 mb-3 flex flex-col w-full gap-2 hover:shadow-2xl dark:hover:shadow-2xl transition-shadow duration-200 outline-none"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <div className="opacity-40 font-bold text-xs">
                    {item.orderId}
                  </div>
                  <div
                    className={`font-bold text-xs ${
                      item.status === "Delivered"
                        ? "text-green-700 bg-gradient-to-br from-green-500/20 to-green-500/40"
                        : item.status === "Processing"
                        ? "text-blue-500 bg-gradient-to-br from-blue-500/20 to-blue-500/40"
                        : item.status === "Shipped"
                        ? "text-yellow-700 bg-gradient-to-br from-yellow-500/20 to-yellow-500/40"
                        : "text-red-500 bg-gradient-to-br from-red-500/20 to-red-500/40"
                    } py-1 px-3 rounded-2xl`}
                  >
                    {item.status}
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory scrollbar-thin scrollbar-track-zinc-200 scrollbar-thumb-gray-400 dark:scrollbar-track-zinc-900">
                  {item.products.map((product, index) => (
                    <div className="flex flex-col items-center" key={index}>
                      <div className="relative w-24 h-24 flex rounded-md bg-gradient-to-br from-purple-100 to-purple-200 shadow-md dark:from-zinc-700 dark:to-zinc-900">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                        ></Image>
                      </div>
                      <span className="text-sm opacity-70 mt-1">
                        {product.name}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <div className="before:content-['Rp.'] opacity-70 font-semibold text-red-800 dark:text-red-500">
                    {total.toLocaleString("ID")}
                  </div>
                  <div className="font-bold">{item.date}</div>
                </div>
              </motion.button>
            );
          })}
        </InfiniteScroll>
      </div>
      <AnimatePresence>
        {openOrder && selectedOrder && (
          <AppDialog open={openOrder} onClose={() => setOpenOrder(false)}>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-sm font-semibold text-blue-800 dark:text-blue-500">
                <span className="opacity-60">Order ID : </span>
                <span>#{selectedOrder.orderId}</span>
              </DialogTitle>
              <button
                className="text-[30px] text-zinc-500 hover:text-zinc-700 dark:text-zinc-200 dark:hover:text-zinc-400 transition-colors"
                onClick={() => setOpenOrder(false)}
              >
                <IoIosCloseCircle />
              </button>
            </div>
            <div className="flex gap-2 font-semibold text-sm text-yellow-800 dark:text-yellow-500">
              <span className="opacity-60 whitespace-nowrap">Address :</span>
              <span className="break-words overflow-x-hidden">
                {formatAddress(selectedOrder.address)}
              </span>
            </div>
            <div className="border border-black opacity-50 my-2"></div>
            <div className="flex flex-col">
              <span className="font-bold">Order Summary:</span>
              <div className="flex flex-col overflow-y-auto overflow-x-hidden max-h-90 scrollbar-thin scrollbar-thumb-zinc-400 scrollbar-track-zinc-200 scroll-smooth py-3 px-2 dark:scrollbar-track-zinc-800 dark:scrollbar-thumb-zinc-600 gap-3 will-change-scroll">
                {selectedOrder.products.map((item, index) => {
                  return (
                    <Link
                      className="flex items-center justify-between shadow-md dark:shadow dark:shadow-white/5 hover:scale-102 active:scale-95 transition-all duration-300"
                      key={index}
                      href="/product"
                    >
                      <div className="flex">
                        <div className="relative w-20 h-20">
                          <Image
                            alt={item.name}
                            src={item.image}
                            className="object-cover"
                            fill
                          ></Image>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col items-center">
                            <span className="font-medium">{item.name}</span>
                            <span className="text-sm text-red-700 dark:text-red-500 font-medium">
                              Rp.{item.price.toLocaleString("ID")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-blue-700 dark:text-blue-500 pr-5">
                        <span className="text-[20px]">x{item.quantity}</span>
                        <MdShoppingCart className="text-[25px]" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-center pt-4 text-white">
              <OrderActionButton
                orderId={selectedOrder.orderId}
                status={selectedOrder.status}
              />
            </div>
          </AppDialog>
        )}
      </AnimatePresence>
    </div>
  );
}
