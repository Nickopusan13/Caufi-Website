"use client";

import { DialogTitle } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";
import { IoIosCloseCircle } from "react-icons/io";
import { EditForm } from "../components/EditForm";
import { useState } from "react";
import MapPickerWrapper from "../components/MapWrapper";
import ProvinceDropDown from "../components/ProvinceDropDown";
import AppDialog from "@/components/ui/AppDialog";
import Discard from "@/components/ui/Discard";

export const EditAddress = ({
  onClose,
  isDirty,
  setIsDirty,
}: {
  onClose: () => void;
  isDirty: boolean;
  setIsDirty: (val: boolean) => void;
}) => {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [address, setAddress] = useState("");
  const [openProvince, setOpenProvince] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [addresslabel, setAddressLabel] = useState("");
  const [notesCourier, setNotesCourier] = useState("");
  return (
    <>
      <div className="flex justify-between">
        <DialogTitle className="text-xl font-bold text-black dark:text-white">
          Edit Address
        </DialogTitle>
        <button
          className="text-[30px] text-zinc-500 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          onClick={() => (isDirty ? setShowDiscard(true) : onClose())}
        >
          <IoIosCloseCircle />
        </button>
      </div>
      <div className="border m-2"></div>
      <form
        className="text-black dark:text-white flex flex-col gap-1"
        action=""
      >
        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
          <div className="col-span-2">
            <EditForm
              id="address-label"
              name="Address Label"
              required={true}
              bottomLabel="Example : Home, Office, etc."
              value={addresslabel}
              setValue={(val) => {
                if (val !== addresslabel) {
                  setAddressLabel(val);
                  setIsDirty(true);
                }
              }}
            />
          </div>
          <h2 className="col-span-2 font-bold text-lg">Recipient</h2>
          <EditForm
            id="recipient-name"
            name="Recipient Name"
            required={true}
            bottomLabel="Please enter recipient name."
            value={recipientName}
            setValue={(val) => {
              if (val !== recipientName) {
                setRecipientName(val);
                setIsDirty(true);
              }
            }}
          />
          <EditForm
            id="Phone Number"
            name="Recipient Phone Number"
            required={true}
            bottomLabel="Please enter recipient phone number."
            value={recipientPhone}
            setValue={(val) => {
              if (val !== recipientPhone) {
                setRecipientPhone(val);
                setIsDirty(true);
              }
            }}
          />
          <h2 className="col-span-2 font-bold text-lg">Address Detail</h2>
          <div className="col-span-2 flex justify-center">
            <MapPickerWrapper
              onSelectLocation={(addr: string) => {
                setSelectedAddress(addr);
                setIsDirty(true);
              }}
            />
          </div>
          <div className="col-span-2">
            <EditForm
              id="address-location"
              name="Province, City, District, Sub District"
              required={true}
              bottomLabel="Please enter address location."
              value={address}
              readOnly={true}
              onClick={() => setOpenProvince(true)}
            />
          </div>
          <div className="col-span-2">
            <EditForm
              id="address-location"
              name="Full Address"
              required={true}
              bottomLabel="Please enter full address."
              value={selectedAddress}
              setValue={(val) => {
                setSelectedAddress(val);
                setIsDirty(true);
              }}
            />
          </div>
          <div className="col-span-2">
            <EditForm
              id="notes"
              name="Notes For Courirer"
              required={false}
              value={notesCourier}
              setValue={(val) => {
                if (val !== notesCourier) {
                  setNotesCourier(val);
                  setIsDirty(true);
                }
              }}
            />
          </div>
        </div>
        <div className="flex justify-around items-center gap-5">
          <motion.button
            className="bg-blue-400 text-black w-full rounded-2xl py-2 font-bold"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Save Address
          </motion.button>
          <motion.button
            className="bg-red-600 w-full rounded-2xl py-2 font-bold"
            type="button"
            onClick={() => (isDirty ? setShowDiscard(true) : onClose())}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancel
          </motion.button>
        </div>
      </form>
      <AnimatePresence>
        {openProvince && (
          <AppDialog open={openProvince} onClose={() => setOpenProvince(false)}>
            <ProvinceDropDown
              onSelectAddress={(addr) => {
                setAddress(addr);
                setIsDirty(true);
              }}
              onClose={() => setOpenProvince(false)}
            />
          </AppDialog>
        )}
        {showDiscard && (
          <Discard
            open={showDiscard}
            onClose={() => setShowDiscard(false)}
            onDiscard={onClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};
