"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DefaultAvatar from "@/images/default.png";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/solid";

const DisplayPage = () => {
  let [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);

  const colors = [
    "bg-blue-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-red-500",
  ];

  const backgrounds = [
    { bg: "bg-white", name: "Default" },
    { bg: "bg-slate-600", name: "Dim" },
    { bg: "bg-black", name: "Light out" },
  ];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-slate-700 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <Dialog.Panel className="max-w-xl w-full dark:bg-black rounded-xl py-6 px-8">
          <div className="space-y-1">
            <Dialog.Title className="text-2xl text-neutral-300 font-bold text-center">
              Customize your view
            </Dialog.Title>
            <Dialog.Description className="text-neutral-500 text-center">
              These settings affect all the X accounts on this browser.
            </Dialog.Description>
          </div>

          <div className="border gap-2 my-6 border-neutral-600 rounded-lg p-4 flex items-start max-w-md mx-auto">
            <Image
              src={DefaultAvatar}
              alt="avatar"
              className="w-12 aspect-square rounded-full object-cover"
            />
            <div className="">
              <div className="flex items-center gap-1">
                <h1 className="font-semibold">Default User</h1>
                <CheckBadgeIcon className="w-5 aspect-square text-blue-500" />
                <span className=" text-neutral-500">@user · 39m</span>
              </div>
              <p className="text-neutral-200">
                At the heart of X are short messages called posts — just like
                this one — which can include photos, videos, links, text,
                hashtags, and mentions like
                <span className="text-blue-500"> @X</span>.
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-sm leading-10 text-neutral-500">
              Color
            </h1>
            <div className="w-full h-16 rounded-lg flex items-center justify-evenly bg-slate-800">
              {colors.map((color, i) => (
                <button
                  onClick={() => setActiveColorIndex(i)}
                  key={color}
                  className={`w-10 h-10 flex items-center justify-center ${color} rounded-full`}
                >
                  {i === activeColorIndex && <CheckIcon className="w-7 h-7" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-sm leading-10 text-neutral-500">
              Background
            </h1>
            <div className="w-full h-16 gap-4 px-3 py-1 rounded-lg flex items-center justify-evenly bg-slate-800">
              {backgrounds.map((bg, i) => (
                <button
                  onClick={() => setBgIndex(i)}
                  key={bg.bg}
                  className={`w-full h-full flex items-center gap-3 justify-center ${
                    bg.bg
                  } ${bg.name === "Default" ? "text-black" : ""} rounded-lg`}
                >
                  {i === bgIndex ? (
                    <span
                      className={`rounded-full w-5 h-5 border bg-blue-500 border-none`}
                    >
                      <CheckIcon className="w-full p-[2px] h-full text-white" />
                    </span>
                  ) : (
                    <span
                      className={`rounded-full w-5 h-5 border-2 ${
                        bg.name === "Default" ? "border-neutral-500" : ""
                      }`}
                    />
                  )}
                  <span className="font-semibold text-sm">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-blue-500 px-4 py-2 rounded-full font-bold mt-8 inline-flex justify-center mx-auto"
            >
              Done
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DisplayPage;
