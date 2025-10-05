"use client";

import { DialogTitle } from "@headlessui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaCalendarAlt } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { EditForm } from "../components/EditForm";
import Discard from "@/components/ui/Discard";

export const EditProfile = ({
  onClose,
  isDirty,
  setIsDirty,
}: {
  onClose: () => void;
  isDirty: boolean;
  setIsDirty: (val: boolean) => void;
}) => {
  const [showDiscard, setShowDiscard] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  return (
    <>
      <div className="flex justify-between">
        <DialogTitle className="text-xl font-bold text-black dark:text-white">
          Personal Info
        </DialogTitle>
        <motion.button
          className="text-[30px] text-zinc-500 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
          onClick={() => (isDirty ? setShowDiscard(true) : onClose())}
        >
          <IoIosCloseCircle />
        </motion.button>
      </div>
      <div className="border m-2"></div>
      <form
        className="text-black dark:text-white flex flex-col gap-5"
        action=""
      >
        <div className="flex flex-col gap-2">
          <RadioGroup.Root
            className="flex flex-col gap-1 items-center"
            defaultValue="Other"
            aria-label="Other"
          >
            <span>Select Gender</span>
            <div className="flex gap-2">
              {["Male", "Female", "Other"].map((item) => {
                return (
                  <motion.label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-700 p-2 rounded-md transition-colors duration-200 hover:shadow-md"
                  >
                    <RadioGroup.Item
                      value={item}
                      id={item}
                      className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center"
                    >
                      <RadioGroup.Indicator className="w-3 h-3 rounded-full bg-blue-500" />
                    </RadioGroup.Item>
                    {item}
                  </motion.label>
                );
              })}
            </div>
          </RadioGroup.Root>
          <div className="flex flex-col gap-1 md:grid md:grid-cols-3 md:gap-3 md:items-center">
            <EditForm
              name="First Name"
              id="first-name"
              required={true}
              bottomLabel="Please enter your first name."
              value={firstName}
              setValue={(val) => {
                if (val !== firstName) {
                  setIsDirty(true);
                  setFirstName(val);
                }
              }}
            />
            <EditForm
              name="Middle name"
              id="middle-name"
              required={false}
              value={middleName}
              setValue={(val) => {
                if (val !== middleName) {
                  setIsDirty(true);
                  setMiddleName(val);
                }
              }}
            />
            <EditForm
              name="Last Name"
              id="last-name"
              required={true}
              bottomLabel="Please enter your last name."
              value={lastName}
              setValue={(val) => {
                if (val !== lastName) {
                  setIsDirty(true);
                  setLastName(val);
                }
              }}
            />
            <div className="md:col-span-full flex w-full md:justify-center md:items-center">
              <div className="md:w-[50%] w-full">
                <EditForm
                  name="Phone Number"
                  id="phone-number"
                  required={true}
                  bottomLabel="Example : 08736229164"
                  value={phoneNumber}
                  setValue={(val) => {
                    if (val !== phoneNumber) {
                      setIsDirty(true);
                      setPhoneNumber(val);
                    }
                  }}
                />
              </div>
            </div>
          </div>
          <CalendarForm />
        </div>
        <div className="flex justify-around items-center gap-5 mt-5 md:mt-10">
          <motion.button
            className="bg-blue-400 text-black w-full rounded-2xl py-2 font-bold"
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Save
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
      {showDiscard && (
        <Discard
          open={showDiscard}
          onClose={() => setShowDiscard(false)}
          onDiscard={onClose}
        />
      )}
    </>
  );
};

export const CalendarForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="relative col-span-full flex flex-col items-center pt-5 justify-center">
      <Label
        className={`absolute pointer-events-none ${date ? "top-0" : "top-8"}`}
        htmlFor="date"
      >
        Date of Birth
        <FaCalendarAlt />
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            className="w-[50%] flex justify-center items-center"
            id="date"
            variant="outline"
          >
            {date ? date.toLocaleDateString() : ""}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="overflow-hidden p-0 z-101 h-85 w-min"
          align="center"
          side="top"
        >
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
