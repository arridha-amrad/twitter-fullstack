'use client';

import { Dialog } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import DefaultAvatar from '@/images/default.png';
import { CheckBadgeIcon, CheckIcon } from '@heroicons/react/24/solid';
import { backgrounds, colors } from '@/components/Modals/DisplayModal/colors';
import { useReadTheme } from '@/components/Modals/DisplayModal/useReadTheme';

const DisplayModal = () => {
  let [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
    // eslint-disable-next-line
  }, [isOpen]);

  const { activeColorIndex, bgIndex, setBackgroundColor, setColor } =
    useReadTheme();

  return (
    <Dialog
      className="relative z-50"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center">
        <Dialog.Panel className="w-full max-w-xl rounded-xl border border-skin-base bg-skin-base px-8 py-6">
          <div className="space-y-1">
            <Dialog.Title className="text-center text-2xl font-bold text-skin-base">
              Customize your view
            </Dialog.Title>
            <Dialog.Description className="text-center text-sm text-skin-accent">
              These settings affect all the X accounts on this browser.
            </Dialog.Description>
          </div>

          <div className="mx-auto my-6 flex max-w-md items-start gap-2 rounded-lg border border-skin-base p-4">
            <Image
              src={DefaultAvatar}
              alt="avatar"
              className="aspect-square w-12 rounded-full border border-skin-base object-cover"
            />
            <div className="">
              <div className="flex items-center gap-1">
                <h1 className="text-sm font-semibold">Default User</h1>
                <CheckBadgeIcon className="aspect-square w-5 text-blue-500" />
                <span className=" text-sm text-skin-base">@user · 39m</span>
              </div>
              <p className="text-sm text-skin-accent">
                At the heart of X are short messages called posts — just like
                this one — which can include photos, videos, links, text,
                hashtags, and mentions like
                <span className="text-skin-fill"> @X</span>.
              </p>
            </div>
          </div>

          <div>
            <h1 className="text-sm font-semibold leading-10 text-skin-accent">
              Color
            </h1>
            <div className="flex h-16 w-full items-center justify-evenly rounded-lg bg-skin-accent">
              {colors.map((color, i) => (
                <button
                  onClick={() => setColor(i)}
                  style={{ backgroundColor: color.color }}
                  key={color.color}
                  className={`flex h-10 w-10 items-center justify-center rounded-full`}
                >
                  {i === activeColorIndex && (
                    <CheckIcon className="h-7 w-7 text-white" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-sm font-semibold leading-10 text-neutral-500">
              Background
            </h1>
            <div className="flex h-16 w-full items-center justify-evenly gap-4 rounded-lg bg-skin-accent px-3 py-1">
              {backgrounds.map((bg, i) => (
                <button
                  onClick={() => setBackgroundColor(i)}
                  key={bg.bg}
                  style={{ backgroundColor: bg.bg }}
                  className={`w-full ${
                    bg.name === 'Default' ? 'text-skin-base' : 'text-white'
                  } flex h-full items-center justify-center gap-3 rounded-lg text-skin-base`}
                >
                  {i === bgIndex ? (
                    <span
                      className={`h-5 w-5 rounded-full border border-none bg-blue-500`}
                    >
                      <CheckIcon className="h-full w-full p-[2px] text-white" />
                    </span>
                  ) : (
                    <span
                      className={`h-5 w-5 rounded-full border-2 border-skin-base`}
                    />
                  )}
                  <span
                    className={`text-sm font-semibold ${
                      bg.name === 'Default' ? 'text-black' : 'text-white'
                    }`}
                  >
                    {bg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex w-full items-center">
            <button
              onClick={() => setIsOpen(false)}
              className="mx-auto mt-8 inline-flex justify-center rounded-full bg-skin-fill px-4 py-2 font-bold text-white"
            >
              Done
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DisplayModal;
