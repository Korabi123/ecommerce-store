"use client";

import Button from "@/components/ui/button";
import IconButton from "@/components/ui/icon-button";
import { Color, Size } from "@/types";
import Filter from "./filter";

import { Plus, X } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  sizes,
  colors
}) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
        Filters
        <Plus />
      </Button>

      <Transition show={open} appear as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={onClose}>
            <div className="fixed inset-0 bg-black bg-opacity-50" />

            <div className="">
              <div className="fixed inset-0 z-40 flex">

                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >

                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">

                    {/* Close button */}
                    <div className="flex items-center justify-end px-4">
                      <IconButton icon={<X size={15} onClick={onClose} />} />
                    </div>

                    {/* Render the filters */}
                    <div className="p-4">
                      <Filter 
                        valueKey="sizeId"
                        name="Sizes"
                        data={sizes}
                      />
                      <Filter 
                        valueKey="colorId"
                        name="Colors"
                        data={colors}
                      />
                    </div>
                  </Dialog.Panel>

                </Transition.Child>

              </div>
            </div>
          </Dialog>
      </Transition>
    </>
  );
}
 
export default MobileFilters;