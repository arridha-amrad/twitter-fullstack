'use client';

import ButtonClose from '@/components/Buttons/ButtonClose';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useState } from 'react';
import Logo from "@/images/logo.svg"
import FloatingLabelInput from '@/components/input/FloatingLabelInput';

export default function MyModal() {
  const [isOpen, setIsOpen] = useState(true);
  const params = useSearchParams()
  const pathName = usePathname();
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
    setTimeout(() => {
      router.back()
    }, 500);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog onClose={() => {}} as="div" className="relative z-10">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-skin-base bg-opacity-30 backdrop-blur" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className='relative w-full max-w-lg'>
                  <div className="absolute inset-0 bg-skin-shadow blur"/>
                  <Dialog.Panel className="relative rounded-2xl bg-skin-base text-left w-full h-full p-6">
                    <div className='flex relative gap-4 items-center mb-6'>
                      <ButtonClose closeFn={closeModal} />
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold leading-6"
                    >
                      Login to Twitter
                    </Dialog.Title>
                    <Image width={40} height={40} src={Logo} alt="logo" />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <FloatingLabelInput labelText='Username or email'  />
                      <FloatingLabelInput isPassword labelText='Password'  />
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Got it!
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
