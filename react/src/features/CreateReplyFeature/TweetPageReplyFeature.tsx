import {
  ElementRef,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import useMeasure from 'react-use-measure';
import Avatar from '../../components/Avatar';
import ButtonFilesPickers from '../../components/Buttons/ButtonFilesPickers';
import ButtonTweetComposer from '../../components/Buttons/ButtonTweetComposer';
import useFormData from '../../hooks/useFormData';
import {
  useCreateReplyTweetMutation,
  useGetTweetQuery
} from '../../redux/tweet-slice';
import { useMeQuery } from '../../redux/user-slice';
import Divider from '../CreateTweetFeatures/components/Divider';
import ImageView from '../CreateTweetFeatures/components/ImageView';
import Indicator from '../CreateTweetFeatures/components/Indicator';
import TextArea from '../CreateTweetFeatures/components/TextArea';

const TweetDetailCardReplyFeature = forwardRef<ElementRef<typeof TextArea>>(
  (_, ref) => {
    const btnFormRef = useRef<HTMLButtonElement | null>(null);
    const [cRef, { height }] = useMeasure();
    const { data } = useMeQuery();
    const params = useParams();

    const { data: tweetData } = useGetTweetQuery(params.tweetId as string);

    const textAreaRef = useRef<ElementRef<typeof TextArea>>(null);

    const [show, setShow] = useState(false);

    useImperativeHandle(
      ref,
      () => {
        return {
          getFocus() {
            textAreaRef.current?.getFocus();
          }
        };
      },
      []
    );

    const tweet = tweetData;

    const [replyMutation, { isLoading }] = useCreateReplyTweetMutation();

    const reply = async () => {
      if (!tweet) return;
      formData.append('description', state.text);
      formData.append('postId', tweet?.postId);
      if (filesToUpload) {
        for (let i = 0; i < filesToUpload.length; i++) {
          formData.append('files', filesToUpload[i]);
        }
      }
      try {
        await replyMutation({ body: formData, tweet }).unwrap();
        resetForm();
        toast.success('Reply sent');
      } catch (err) {
        toast.error('failed to sent your reply');
      }
    };

    const {
      filesToPreview,
      filesToUpload,
      formData,
      onChange,
      onFileChange,
      onSubmit,
      resetForm,
      state,
      removeFiles
    } = useFormData({ initialData: { text: '' }, submitFn: reply });
    return (
      <div className="py-2">
        {show && (
          <span className="pl-12 font-light text-gray-400 xl:pl-14">
            Replying to
            <span className="pl-1 text-blue-500">
              @{tweet?.post.author.username}
            </span>
          </span>
        )}
        <div className="mt-2 flex gap-2 xl:gap-4">
          <div>
            <Avatar src={data?.imageURL} />
          </div>
          <div className="-mt-2 flex-1">
            <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
              <TextArea
                onFocus={() => setShow(true)}
                ref={textAreaRef}
                name="text"
                value={state.text}
                placeholder="Tweet your reply!"
                onChange={onChange}
              />
              <button
                ref={btnFormRef}
                type="submit"
                className="hidden"
              ></button>
            </form>
            <ImageView urls={filesToPreview} remove={removeFiles} />
            <div className="bg-white pt-2 dark:bg-black">
              <div ref={cRef} className="-ml-2 flex h-10 w-full items-center">
                <ButtonFilesPickers onFileChange={onFileChange} />
                <Indicator
                  text={state.text}
                  size={height / 1.5}
                  progress={(state.text.length / 200) * 100}
                />
                <Divider text={state.text} />
                <ButtonTweetComposer
                  isLoading={isLoading}
                  state={state.text}
                  submitFn={() => btnFormRef.current?.click()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

TweetDetailCardReplyFeature.displayName = 'TweetDetailCardReplyFeature';

export default TweetDetailCardReplyFeature;
