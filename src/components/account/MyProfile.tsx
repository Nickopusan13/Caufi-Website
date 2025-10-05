import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { userProfile } from "./components/Item";
import OrderHistory from "./OrderHistory";
import Settings from "./Settings";
import { EditProfile } from "./Edit/EditProfile";
import { EditAddress } from "./Edit/EditAddress";
import { AddressInfo, ProfileInfo } from "./AccountInfo";
import AppDialog from "../ui/AppDialog";
import Discard from "../ui/Discard";
import { TbPhotoEdit } from "react-icons/tb";
import EditAvatar from "./Edit/EditAvatar";

export default function MyProfile() {
  const [tab, setTab] = useState<string>("My Profile");
  const [editProfile, setEditProfile] = useState<string | null>(null);
  const [showDiscard, setShowDiscard] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  return (
    <div className="py-5 lg:py-10 lg:px-30">
      <div className="shadow-sm rounded-md px-4 py-3 flex flex-col lg:flex-row md:flex-row w-full justify-between bg-gradient-to-br from-gray-100 dark:from-zinc-800 dark:to-zinc-900 gap-4 lg:gap-0 md:gap-0">
        <div className="flex flex-col items-center lg:items-start md:items-start lg:text-start md:text-start text-center">
          <div className="relative w-30 h-30">
            <Image
              src="/assets/Avatar.png"
              alt="User avatar"
              className="w-full h-full rounded-full object-cover border-2 border-white shadow-sm"
              fill
            />
            <TbPhotoEdit
              className="absolute bottom-1 right-1 w-8 h-8 p-1 cursor-pointer hover:bg-blue-500 hover:text-white transition duration-200 text-gray-700 bg-white rounded-full"
              onClick={() => {
                setIsDirty(false);
                setEditProfile("Edit Avatar");
              }}
            />
          </div>
          <div className="py-3">
            <h1 className="text-lg font-bold">{userProfile.fullName}</h1>
            <p className="text-sm text-gray-500">@{userProfile.username}</p>
          </div>
          <div className="flex bg-zinc-100 dark:bg-zinc-800 py-2 px-2 lg:px-5 lg:gap-2 md:gap-2 gap-1 rounded-lg items-center">
            {["My Profile", "My Address", "Order History", "Settings"].map(
              (item) => {
                const isActive = tab === item;
                return (
                  <motion.button
                    className={`py-1 px-2 lg:px-3 rounded-lg text-sm ${
                      isActive
                        ? "bg-white dark:bg-zinc-900 shadow-sm"
                        : "text-zinc-600 dark:text-zinc-300"
                    }`}
                    key={item}
                    onClick={() => setTab(item)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {item}
                  </motion.button>
                );
              }
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {["Edit Profile", "Edit Address"].map((item) => (
            <motion.button
              key={item}
              className="bg-zinc-100 py-1 px-4 rounded text-black dark:text-white dark:bg-zinc-800 outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsDirty(false);
                setEditProfile(item);
              }}
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
      <div className="shadow-md mt-5 px-4 py-3 rounded-md bg-gradient-to-b from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900">
        {tab === "My Profile" && <ProfileInfo />}
        {tab === "My Address" && <AddressInfo />}
        {tab === "Order History" && <OrderHistory />}
        {tab === "Settings" && <Settings />}
      </div>
      <AnimatePresence mode="wait">
        {editProfile && (
          <AppDialog
            onClose={() =>
              isDirty ? setShowDiscard(true) : setEditProfile(null)
            }
            open={!!editProfile}
          >
            {editProfile === "Edit Profile" && (
              <EditProfile
                isDirty={isDirty}
                setIsDirty={setIsDirty}
                onClose={() => {
                  setEditProfile(null);
                }}
              />
            )}
            {editProfile === "Edit Address" && (
              <EditAddress
                isDirty={isDirty}
                setIsDirty={setIsDirty}
                onClose={() => {
                  setEditProfile(null);
                }}
              />
            )}
            {editProfile === "Edit Avatar" && (
              <EditAvatar
                onClose={() => {
                  setEditProfile(null);
                }}
              />
            )}
          </AppDialog>
        )}
        {showDiscard && (
          <Discard
            open={showDiscard}
            onClose={() => setShowDiscard(false)}
            onDiscard={() => {
              setShowDiscard(false);
              setEditProfile(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
