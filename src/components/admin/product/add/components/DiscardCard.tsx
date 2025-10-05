import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function DiscardCard({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) {
  const router = useRouter();
  return (
    <Dialog
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      open={open}
      onClose={setOpen}
    >
      <motion.div
        initial={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        animate={{ backgroundColor: "rgba(0,0,0,0.5)", opacity: 1 }}
        exit={{ backgroundColor: "rgba(0,0,0,0)", opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="rounded-2xl w-[90%] max-w-md"
      >
        <DialogPanel className="flex gap-5 flex-col items-center bg-white rounded-2xl text-black p-2">
          <DialogTitle className="font-bold text-center text-lg">
            Are you sure you want to discard?
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center">
            This action cannot be undone.
          </p>
          <div className="flex gap-4 w-full">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/admin/product")}
              className="w-full bg-red-600 text-white py-2 rounded-xl font-medium shadow-md hover:bg-red-700 transition"
            >
              Yes, Discard
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={setOpen}
              className="w-full bg-gray-100 py-2 rounded-xl font-medium shadow hover:bg-gray-200 transition"
            >
              No, Keep Editing
            </motion.button>
          </div>
        </DialogPanel>
      </motion.div>
    </Dialog>
  );
}
