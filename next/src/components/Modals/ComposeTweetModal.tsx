'use client';

import ButtonClose from '@/components/Buttons/ButtonClose';
import { Dialog } from '@headlessui/react';
import { ElementRef, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import CreateForm from '../Forms/CreateTweetForm/CreateForm';
import useFormData from '@/hooks/useFormData';
import useMeasure from 'react-use-measure';
import ButtonFilesPickers from '../Buttons/ButtonFilesPickers';
import CircleTextLengthIndicator from '../CircleTextLengthIndicator';
import Divider from '../Divider';
import ButtonTweetComposer from '../Buttons/ButtonTweetComposer';

export default function ComposeTweetModal() {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      router.back();
    }
  }, [isOpen]);

  const sendReply = async () => {};

  const {
    filesToPreview,
    filesToUpload,
    onChange,
    onFileChange,
    onSubmit,
    removeFiles,
    resetForm,
    state,
  } = useFormData({
    initialData: { reply: '' },
    submitFn: sendReply,
  });

  const [ref, { height }] = useMeasure();

  const btnFormRef = useRef<ElementRef<typeof CreateForm>>(null);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={closeModal}
        as="div"
        className="relative z-10"
      >
        <div className="fixed inset-0 bg-skin-base bg-opacity-50" />

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 bg-skin-shadow blur" />
              <Dialog.Panel className="relative h-full w-full rounded-2xl bg-skin-base p-4 text-left">
                <div className="mb-8 flex items-center gap-4">
                  <ButtonClose closeFn={closeModal} />
                  <Dialog.Title as="h3" className="text-xl font-bold leading-6">
                    Create new tweet
                  </Dialog.Title>
                </div>
                <div className="h-max max-h-[calc(100vh-53px-3rem-80px)] overflow-y-auto px-4">
                  <CreateForm
                    filesToPreview={filesToPreview}
                    onChange={onChange}
                    onSubmit={onSubmit}
                    removeFiles={removeFiles}
                    state={state.reply}
                    ref={btnFormRef}
                  />
                </div>
                <hr className="mx-4 my-1 border-t border-skin-base" />
                <div
                  ref={ref}
                  className="mx-4 mb-1 flex h-10 items-center overflow-hidden "
                >
                  <ButtonFilesPickers onFileChange={onFileChange} />
                  <CircleTextLengthIndicator
                    text={state.reply}
                    size={height / 1.5}
                    progress={(state.reply.length / 200) * 100}
                  />
                  <Divider text={state.reply} />
                  <ButtonTweetComposer
                    label="Post"
                    isLoading={false}
                    state={state.reply}
                    submitFn={() => btnFormRef.current?.submit()}
                  />
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
