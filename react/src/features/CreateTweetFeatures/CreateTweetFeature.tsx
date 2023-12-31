import { ElementRef, FC, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import useMeasure from 'react-use-measure';
import Avatar from '../../components/Avatar';
import ButtonFilesPickers from '../../components/Buttons/ButtonFilesPickers';
import ButtonTweetComposer from '../../components/Buttons/ButtonTweetComposer';
import useFormData from '../../hooks/useFormData';
import { useCreateTweetMutation } from '../../redux/tweet-slice';
import { useMeQuery } from '../../redux/user-slice';
import ButtonAudience from './components/ButtonAudience';
import ButtonRepliers from './components/ButtonRepliers';
import Divider from './components/Divider';
import ImageView from './components/ImageView';
import Indicator from './components/Indicator';
import TextArea from './components/TextArea';

type Props = {
  closeModal?: VoidFunction;
};

const CreateTweetFeature: FC<Props> = ({ closeModal }) => {
  const [createMutation, { isLoading }] = useCreateTweetMutation();
  const { data: auth } = useMeQuery();

  const create = async () => {
    formData.append('description', state.tweet);
    if (filesToUpload) {
      for (let i = 0; i < filesToUpload.length; i++) {
        formData.append('files', filesToUpload[i]);
      }
    }
    try {
      await createMutation(formData).unwrap();
      resetForm();
      closeModal && closeModal();
    } catch (error) {
      toast.error('failed to create your tweet');
    }
  };

  const {
    filesToPreview,
    filesToUpload,
    onChange,
    onSubmit,
    onFileChange,
    resetForm,
    formData,
    state,
    removeFiles
  } = useFormData({ initialData: { tweet: '' }, submitFn: create });

  const [ref, { height }] = useMeasure();

  const btnFormRef = useRef<HTMLButtonElement>(null);

  const [show, setShow] = useState(false);

  const textAreaRef = useRef<ElementRef<typeof TextArea>>(null);

  return (
    <div
      onClick={() => {
        textAreaRef.current?.getFocus();
      }}
      className="relative flex w-full gap-4 border-b px-2 pt-4 dark:border-gray-700 xl:px-4"
    >
      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
        <Avatar src={auth?.imageURL} />
      </div>
      <div className="w-full">
        {show && (
          <div className="w-max" onClick={(e) => e.stopPropagation()}>
            <ButtonAudience />
          </div>
        )}
        <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
          <TextArea
            ref={textAreaRef}
            onFocus={() => setShow(true)}
            name="tweet"
            value={state.tweet}
            placeholder="What's happening?!"
            onChange={onChange}
          />
          <button ref={btnFormRef} type="submit" className="hidden"></button>
        </form>
        <ImageView urls={filesToPreview} remove={removeFiles} />
        <div className="sticky bottom-0 bg-white py-2 dark:bg-black">
          {show && (
            <div
              className="w-max"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <ButtonRepliers />
            </div>
          )}
          {show && <hr className="my-2 border-gray-300 dark:border-gray-700" />}
          <div ref={ref} className="-ml-2 flex h-10 w-full items-center">
            <ButtonFilesPickers onFileChange={onFileChange} />
            <Indicator
              text={state.tweet}
              size={height / 1.5}
              progress={(state.tweet.length / 200) * 100}
            />
            <Divider text={state.tweet} />
            <ButtonTweetComposer
              isLoading={isLoading}
              state={state.tweet}
              submitFn={() => btnFormRef.current?.click()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTweetFeature;
