"use client";

import { Dialog } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DefaultAvatar from "@/images/default.png";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/solid";
import { getFromCookie } from "@/utils/getFromCookie";
import Cookies from "js-cookie";

const colors = [
  { name: "fill-blue", color: "rgb(29,155,240)" },
  { name: "fill-yellow", color: "rgb(255,212,0)" },
  { name: "fill-pink", color: "rgb(249,24,128)" },
  { name: "fill-purple", color: "rgb(120,86,255)" },
  { name: "fill-orange", color: "rgb(255,122,0)" },
  { name: "fill-green", color: "rgb(0,186,124)" },
];

const backgrounds = [
  { bg: "#fff", name: "Default", class: "default" },
  { bg: "rgb(21,32,43)", name: "Dim", class: "dim" },
  { bg: "#000", name: "Light out", class: "light-out" },
];

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

  useEffect(() => {
    const bgFromCookie = Cookies.get("background");
    if (bgFromCookie) {
      const index = backgrounds.findIndex((data) =>
        data.class.toLowerCase().includes(bgFromCookie)
      );
      if (index >= 0) {
        setBgIndex(index);
      } else {
        setBgIndex(0);
      }
    }
    const colorFromCookie = Cookies.get("color");

    if (colorFromCookie) {
      const index = colors.findIndex((data) =>
        data.name.includes(colorFromCookie)
      );
      if (index >= 0) {
        setActiveColorIndex(index);
      } else {
        setActiveColorIndex(0);
      }
    }
  }, []);

  const setBackgroundColor = (index: number) => {
    setBgIndex(index);
    document.documentElement.classList.remove("dim", "light-out");
    const bg = backgrounds[index].class;
    Cookies.set("background", bg, { domain: "localhost", path: "/" });
    document.documentElement.classList.add(bg);
  };

  const setColor = (index: number) => {
    setActiveColorIndex(index);
    document.documentElement.classList.remove(
      "fill-yellow",
      "fill-green",
      "fill-orange",
      "fill-purple",
      "fill-pink"
    );
    const color = colors[index].name;
    document.documentElement.classList.add(color);
    Cookies.set("color", color, { domain: "localhost", path: "/" });
  };

  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="max-w-xl w-full bg-skin-base border border-skin-base rounded-xl py-6 px-8">
          <div className="space-y-1">
            <Dialog.Title className="text-2xl text-skin-base font-bold text-center">
              Customize your view
            </Dialog.Title>
            <Dialog.Description className="text-skin-accent text-sm text-center">
              These settings affect all the X accounts on this browser.
            </Dialog.Description>
          </div>

          <div className="border border-skin-base gap-2 my-6 rounded-lg p-4 flex items-start max-w-md mx-auto">
            <Image
              src={DefaultAvatar}
              alt="avatar"
              className="w-12 aspect-square rounded-full object-cover border border-skin-base"
            />
            <div className="">
              <div className="flex items-center gap-1">
                <h1 className="font-semibold text-sm">Default User</h1>
                <CheckBadgeIcon className="w-5 aspect-square text-blue-500" />
                <span className=" text-skin-base text-sm">@user · 39m</span>
              </div>
              <p className="text-skin-accent text-sm">
                At the heart of X are short messages called posts — just like
                this one — which can include photos, videos, links, text,
                hashtags, and mentions like
                <span className="text-skin-fill"> @X</span>.
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-sm leading-10 text-skin-accent">
              Color
            </h1>
            <div className="w-full h-16 rounded-lg flex items-center justify-evenly bg-skin-accent">
              {colors.map((color, i) => (
                <button
                  onClick={() => setColor(i)}
                  style={{ backgroundColor: color.color }}
                  key={color.color}
                  className={`w-10 h-10 flex items-center justify-center rounded-full`}
                >
                  {i === activeColorIndex && (
                    <CheckIcon className="w-7 h-7 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="font-semibold text-sm leading-10 text-neutral-500">
              Background
            </h1>
            <div className="w-full h-16 gap-4 px-3 py-1 rounded-lg flex items-center justify-evenly bg-skin-accent">
              {backgrounds.map((bg, i) => (
                <button
                  onClick={() => setBackgroundColor(i)}
                  key={bg.bg}
                  style={{ backgroundColor: bg.bg }}
                  className={`w-full ${
                    bg.name === "Default" ? "text-skin-base" : "text-white"
                  } rounded-lg text-skin-base h-full flex items-center gap-3 justify-center`}
                >
                  {i === bgIndex ? (
                    <span
                      className={`rounded-full w-5 h-5 border bg-blue-500 border-none`}
                    >
                      <CheckIcon className="w-full p-[2px] h-full text-white" />
                    </span>
                  ) : (
                    <span
                      className={`rounded-full w-5 h-5 border-2 border-skin-base`}
                    />
                  )}
                  <span
                    className={`font-semibold text-sm ${
                      bg.name === "Default" ? "text-black" : "text-white"
                    }`}
                  >
                    {bg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-skin-fill text-white px-4 py-2 rounded-full font-bold mt-8 inline-flex justify-center mx-auto"
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
