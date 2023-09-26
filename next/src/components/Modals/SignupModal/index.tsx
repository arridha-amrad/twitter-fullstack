'use client';

import ButtonClose from '@/components/Buttons/ButtonClose';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import Logo from '@/images/logo.svg';
import SignUpForm from '@/components/Forms/SignupForm';

export default function SignUpModal() {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button onClick={openModal} className="h-[45px] w-full rounded-full bg-blue-500 font-bold text-white">
        Create Account
      </button>
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
                <div className="relative w-full max-w-lg">
                  <div className="absolute inset-0 bg-skin-shadow blur" />
                  <Dialog.Panel className="relative h-full w-full rounded-2xl bg-skin-base p-6 text-left">
                    <div className="relative mb-6 flex items-center gap-4">
                      <ButtonClose closeFn={closeModal} />
                      <Dialog.Title
                        as="h3"
                        className="text-2xl font-bold leading-6"
                      >
                        Create An Account
                      </Dialog.Title>
                      <Image width={40} height={40} src={Logo} alt="logo" />
                    </div>
                    <SignUpForm />
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
