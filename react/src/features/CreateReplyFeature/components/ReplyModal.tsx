import { Dispatch, ElementRef, SetStateAction, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import useMeasure from 'react-use-measure';
import ButtonClose from '../../../components/Buttons/ButtonClose';
import ButtonFilesPickers from '../../../components/Buttons/ButtonFilesPickers';
import ButtonTweetComposer from '../../../components/Buttons/ButtonTweetComposer';
import ModalContainer from '../../../components/Modal/ModalContainer';
import ModalRoot from '../../../components/Modal/ModalRoot';
import ModalTitle from '../../../components/Modal/ModalTitle';
import useCreateReply from '../../../hooks/tweet/useCreateReply';
import useFormData from '../../../hooks/useFormData';
import Divider from '../../CreateTweetFeatures/components/Divider';
import Indicator from '../../CreateTweetFeatures/components/Indicator';
import ReplyCard from './ReplyCard';
import ReplyForm from './ReplyForm';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  tweet: Tweet;
};

export default function ReplyModal({ open, setOpen, tweet }: Props) {
  const sendReply = async () => {
    await execute();
  };

  const {
    filesToPreview,
    filesToUpload,
    onChange,
    onFileChange,
    onSubmit,
    removeFiles,
    resetForm,
    state
  } = useFormData({
    initialData: { reply: '' },
    submitFn: sendReply
  });

  const { isCreateReplyLoading, execute } = useCreateReply({
    description: state.reply,
    files: filesToUpload,
    resetForm,
    tweet,
    closeModal: () => setOpen(false),
    tst: toast
  });

  const [ref, { height }] = useMeasure();

  const btnFormRef = useRef<ElementRef<typeof ReplyForm>>(null);

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <ModalRoot open={open} setOpen={setOpen}>
      <ModalContainer>
        <ModalTitle>
          <ButtonClose closeFn={() => setOpen(false)} />
        </ModalTitle>
        <div
          id="modal-content"
          className="h-max max-h-[calc(100vh-53px-3rem-80px)] overflow-y-auto px-4"
        >
          <ReplyCard tweet={tweet} />
          <ReplyForm
            filesToPreview={filesToPreview}
            onChange={onChange}
            onSubmit={onSubmit}
            removeFiles={removeFiles}
            state={state.reply}
            ref={btnFormRef}
          />
        </div>
        <div
          ref={ref}
          className="mx-4 mb-1 flex h-10 items-center overflow-hidden"
        >
          <ButtonFilesPickers onFileChange={onFileChange} />
          <Indicator
            text={state.reply}
            size={height / 1.5}
            progress={(state.reply.length / 200) * 100}
          />
          <Divider text={state.reply} />
          <ButtonTweetComposer
            isLoading={isCreateReplyLoading}
            state={state.reply}
            submitFn={() => btnFormRef.current?.submit()}
          />
        </div>
      </ModalContainer>
    </ModalRoot>
  );
}
