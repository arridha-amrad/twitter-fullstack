import { Fragment, useEffect, useRef, useState } from "react";
import Spinner from "./Spinner";
import { useMeQuery } from "../redux/user-slice";
import EllipsisHorizontalIcon from "@heroicons/react/24/solid/EllipsisHorizontalIcon";
import { AnimatePresence, motion } from "framer-motion";
import LogoutFeature from "../features/LogoutFeature";
import LogoutIcon from "@heroicons/react/24/solid/ArrowLeftOnRectangleIcon";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import MoonIcon from "@heroicons/react/24/solid/MoonIcon";
import switchTheme from "../features/ChangeThemeFeature/switchTheme";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

const LoginInfoCard = () => {
  const { data, isLoading } = useMeQuery();
  const [openModal, setOpenModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [referenceElement, setReferenceElement] =
    useState<HTMLDivElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "top",
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const menu = [
    {
      label: "Logout",
      fn: () => setOpenModal(true),
    },
    {
      label: "Switch Theme",
      fn: () => switchTheme(),
    },
  ];

  const loading = (
    <div className="flex items-center justify-center">
      <Spinner className="w-8 h-8" />
    </div>
  );

  const refPopper = useRef<HTMLDivElement | null>(null);

  const click = (e: MouseEvent) => {
    if (!refPopper?.current?.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const root = document.getElementById("root")!;
    if (!root) return;
    if (isOpen) {
      root.classList.add("relative", "-z-10");
    } else {
      root.classList.remove("relative", "-z-10");
    }
    document.addEventListener("mousedown", click);
    return () => document.removeEventListener("mousedown", click);
  }, [isOpen]);

  const content = (
    <div className="flex items-center w-full h-full p-2 overflow-hidden">
      <div className="flex items-center flex-1 gap-2">
        <div className="overflow-hidden rounded-full w-11 h-11">
          <img
            className="object-cover object-center w-full h-full"
            src={
              data?.imageURL === "default"
                ? `${import.meta.env.VITE_CLIENT_BASE_URL}/default.png`
                : data?.imageURL
            }
            alt=""
          />
        </div>
        <div className="overflow-hidden w-[140px] xl:block hidden">
          <p className="overflow-hidden font-bold whitespace-nowrap text-ellipsis text-start">
            {data?.fullname}
          </p>
          <p className="overflow-hidden text-sm whitespace-nowrap text-ellipsis text-start">
            @{data?.username}
          </p>
        </div>
      </div>

      <button className="hidden w-5 h-5 xl:block">
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <div className="pl-2 select-none xl:w-full w-fit">
      <div
        ref={setReferenceElement}
        tabIndex={1}
        onClick={() => setIsOpen(true)}
        className={`overflow-hidden hover:dark:bg-slate-800 hover:bg-slate-200 rounded-full cursor-pointer outline-none focus:ring-4 focus:ring-blue-500`}
      >
        {isLoading ? loading : content}
      </div>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <motion.div
                initial={{ height: 0.5, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: { duration: 2 },
                }}
                exit={{ height: 0.8, opacity: 0 }}
                className="z-10 overflow-hidden border rounded-lg outline-none w-max dark:border-slate-700 border-slate-300"
              >
                <div ref={refPopper}>
                  {menu.map((item, i) => (
                    <Fragment key={i}>
                      <button
                        className={`h-10 flex dark:bg-slate-800 bg-slate-200  items-center justify-start gap-3 cursor-pointer hover:dark:bg-slate-700 hover:bg-slate-300 w-full px-5 overflow-hidden`}
                        onClick={() => {
                          item.fn();
                        }}
                      >
                        {item.label === "Logout" && (
                          <LogoutIcon className="w-5 h-5" />
                        )}
                        {item.label === "Switch Theme" && (
                          <>
                            <SunIcon className="hidden w-5 h-5 dark:block" />
                            <MoonIcon className="block w-5 h-5 dark:hidden" />
                          </>
                        )}
                        <p className="text-sm font-bold">{item.label}</p>
                      </button>
                      {i !== menu.length - 1 && (
                        <hr className="border dark:border-slate-700 border-slate-300" />
                      )}
                    </Fragment>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
      <LogoutFeature isModalOpen={openModal} setModalOpen={setOpenModal} />
    </div>
  );
};

export default LoginInfoCard;
