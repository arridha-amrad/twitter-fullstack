"use client";

import { Dialog, Disclosure } from "@headlessui/react";
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon";
import { useRouter } from "next/navigation";

import React, { FC, useState } from "react";

type Props = {
  close: VoidFunction;
};

const DisplayMenu: FC<Props> = ({ close }) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const triggerModal = () => {
    router.push("/display");
    close();
  };

  return (
    <>
      <Disclosure.Panel
        onClick={triggerModal}
        className="flex h-[50px] hover:bg-skin-hover cursor-pointer items-center px-4 space-x-2"
      >
        <PencilSquareIcon className="w-5 h-5" />
        <span className="font-semibold">Display</span>
      </Disclosure.Panel>
    </>
  );
};

export default DisplayMenu;
