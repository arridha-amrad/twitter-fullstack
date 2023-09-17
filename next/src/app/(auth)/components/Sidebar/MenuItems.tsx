import { Menu } from "@headlessui/react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";

const MenuItems = () => {
  return (
    <>
      {createPortal(
        <AnimatePresence initial={false}>
          {open && (
            <>
              <div className="fixed inset-0" />
              <Menu.Items
                static
                style={styles.popper}
                {...attributes.popper}
                ref={setPopperElement}
                className="relative z-20 outline-none"
              >
                <div className="absolute inset-0 -z-10 bg-slate-300 blur dark:bg-slate-500" />
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{
                    opacity: 0,
                    height: 0,
                  }}
                  className="overflow-y-hidden"
                >
                  <div
                    style={{
                      minWidth: width < 228 ? "max-content" : width,
                    }}
                    className="p2 overflow-hidden rounded-lg border-slate-300 bg-white dark:border-slate-700 dark:bg-red-500"
                  >
                    {menu.map((item, i) => (
                      <Menu.Item key={i}>
                        {({ active }) => (
                          <button
                            className={`flex h-14 min-w-full cursor-pointer items-center justify-start gap-3 px-5 ${
                              active
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-neutral-900 dark:text-white text-black"
                            }`}
                            onClick={() => {
                              item.fn();
                            }}
                          >
                            {item.label.includes("Logout") && (
                              <LogoutIcon className="h-5 w-5" />
                            )}
                            {item.label === "Switch Theme" && (
                              <>
                                <SunIcon className="hidden h-5 w-5 dark:block" />
                                <MoonIcon className="block h-5 w-5 dark:hidden" />
                              </>
                            )}
                            <p className="font-semibold">{item.label}</p>
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <div
                    ref={setArrowElement}
                    className={`absolute -bottom-2 -z-10 h-5 w-5 rotate-45 bg-white shadow-sm shadow-gray-300 dark:bg-black dark:shadow-gray-500 ${
                      width < 228 ? "left-5" : "left-1/2 -translate-x-1/2"
                    }`}
                  />
                </motion.div>
              </Menu.Items>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default MenuItems;
