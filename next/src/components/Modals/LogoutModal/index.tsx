'use client';

import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Icon from '@/app/icon.png';

export default function LogoutModal() {
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function logout() {
    closeModal();
    console.log('Logout...');
  }
  const router = useRouter();
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        router.back();
      }, 500);
    }
    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-skin-base" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="relative h-full w-full max-w-[300px]">
                  <div className="absolute inset-0 -z-10 bg-skin-shadow blur" />
                  <Dialog.Panel className="rounded-2xl border border-skin-base bg-skin-base p-6 text-left">
                    <Image
                      className="mx-auto mb-2"
                      src={Icon}
                      alt="App Icon"
                      height={60}
                      width={60}
                    />
                    <Dialog.Title
                      as="h3"
                      className="mt-4 text-xl font-bold leading-6 text-gray-900"
                    >
                      Log out of Twitter?
                    </Dialog.Title>
                    <Dialog.Description className="my-2 text-skin-accent">
                      You can always log back in at any time. If you just want
                      to switch accounts, you can do that by adding an existing
                      account.
                    </Dialog.Description>

                    <div className="mt-4 flex flex-col gap-4">
                      <button
                        onClick={logout}
                        className="focus:ring-offset-skin-base rounded-xl bg-skin-fill py-2 font-bold text-white outline-none focus:ring-2 focus:ring-skin-base/50 focus:ring-offset-2"
                      >
                        Logout
                      </button>
                      <button
                        onClick={closeModal}
                        className="focus:ring-offset-skin-base rounded-xl border border-skin-base bg-skin-base py-2 font-bold text-black focus:ring-2 focus:ring-skin-base/50 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
