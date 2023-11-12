"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Fragment, useState } from "react";

import { Category } from "@/types";
import { Menu, X } from "lucide-react";
import { Dialog, Transition } from "@headlessui/react";
import IconButton from "./ui/icon-button";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({
  data
}) => {
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
  }));

  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>

      {/* Desktop */}
      <nav
        className="hidden lg:mx-6 lg:flex lg:items-center lg:space-x-4"
      >
        {routes.map((route) => (
          <Link 
            href={route.href}
            key={route.href}
            className={cn(
              "text-lg font-medium transition-colors hover:text-black",
              route.active ? 'text-black' : 'text-neutral-500'
            )} 
          >
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Mobile */}
      <nav className="lg:hidden ml-3">
        <Menu onClick={onOpen} size={25} />
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

                    {/* Render the routes */}
                    <div className="p-4">
                      <h3 className="font-semibold text-dark text-2xl">Categories</h3>
                      <hr className="my-4" />
                      {routes.map((route) => (
                        <Link 
                          href={route.href}
                          key={route.href}
                          className={cn(
                            "text-lg font-medium transition-colors hover:text-black",
                            route.active ? 'text-black' : 'text-neutral-500'
                          )} 
                        >
                          <div>
                            {route.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </Dialog.Panel>

                </Transition.Child>

              </div>
            </div>
          </Dialog>
        </Transition>
      </nav>
    </>
  )
};

export default MainNav;
