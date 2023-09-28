'use client';

import Avatar from '@/components/Avatar';
import ButtonClose from '@/components/Buttons/ButtonClose';
import ButtonIcon from '@/components/Buttons/ButtonIcon';
import FloatingLabelInput from '@/components/input/FloatingLabelInput';
import FloatingLabelTextArea from '@/components/input/FloatingLabelTextArea';
import { Dialog } from '@headlessui/react';
import {
  CameraIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SettingsProfileModal() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
  }, [isOpen]);
  return (
    <Dialog
      onClose={closeModal}
      open={isOpen}
      as="div"
      className="relative z-10"
    >
      <div className="fixed inset-0 bg-skin-base bg-opacity-30 backdrop-blur" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex h-full items-center justify-center p-4 text-center">
          <div className="relative h-[80%] w-full max-w-xl">
            <div className="absolute inset-0 bg-skin-shadow blur" />
            <Dialog.Panel className="relative h-full w-full overflow-y-auto rounded-2xl bg-skin-base pb-10 text-left">
              <div className="sticky top-0 z-20 flex h-16 items-center gap-4 bg-skin-base px-4">
                <ButtonClose closeFn={closeModal} />
                <Dialog.Title
                  as="h3"
                  className="flex-1 text-lg font-bold leading-6"
                >
                  Edit Profile
                </Dialog.Title>
                <button className="rounded-xl bg-skin-fill px-4 py-2 font-bold focus:ring-2 focus:ring-skin-base focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-transparent">
                  Save
                </button>
              </div>

              <div className="relative flex h-[200px] w-full items-center justify-center border-y border-skin-base">
                <Image
                  alt="wallpaper"
                  width={600}
                  height={200}
                  src="https://pbs.twimg.com/media/FmqVSe4acAEN5qB.jpg"
                  className="absolute inset-0 h-full w-full overflow-hidden object-cover opacity-80"
                />
                <div className="z-10 flex gap-4">
                  <div className="h-11 w-11 rounded-full bg-skin-accent/30">
                    <ButtonIcon
                      className="hover:bg-skin-base/20"
                      tooltip="Add"
                      icon={
                        <CameraIcon className="h-5 w-5 stroke-2 text-skin-base text-opacity-50" />
                      }
                    />
                  </div>
                  <div className="h-11 w-11 rounded-full bg-skin-accent/30">
                    <ButtonIcon
                      className="hover:bg-skin-base/20"
                      tooltip="delete"
                      icon={
                        <XMarkIcon className="h-5 w-5 stroke-2 text-skin-base text-opacity-50" />
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="relative h-[60px] w-full">
                <div className="absolute left-4 top-1/2 aspect-square h-[120px] -translate-y-[75%] rounded-full bg-skin-base p-1">
                  <Avatar
                    height={150}
                    width={150}
                    src="https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238876/PlayerProfile_Thumbnail_Mens_Lindelof1691780003409.jpg"
                    className="h-full w-full border-none"
                  />
                </div>
              </div>
              <div className="my-4 flex flex-col gap-6 px-4 ">
                <FloatingLabelInput
                  defaultValue="Arridha Amrad"
                  labelText="Name"
                />
                <FloatingLabelTextArea
                  defaultValue="I'm Billionaire"
                  labelText="Bio"
                />
                <FloatingLabelInput
                  defaultValue="Pekanbaru"
                  labelText="Location"
                />
                <FloatingLabelInput
                  defaultValue="arridhaamrad.com"
                  labelText="Website"
                />
                <div>
                  <h3 className="text-skin-accent">
                    Birth Date ·{' '}
                    <Link href="/" className="text-skin-fill">
                      Edit
                    </Link>
                  </h3>
                  <p className="text-lg font-medium">Autgust 17, 1998</p>
                </div>
              </div>
              <button className="flex w-full items-center justify-between px-4 py-2 text-lg hover:bg-skin-hover ">
                <span>Switch to professional</span>
                <ChevronRightIcon className="h-4 w-4 text-skin-base" />
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
