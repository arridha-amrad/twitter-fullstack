import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  ForwardRefRenderFunction,
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef
} from 'react';
import Avatar from '../../../components/Avatar';
import ImageView from '../../CreateTweetFeatures/components/ImageView';
import TextArea from '../../CreateTweetFeatures/components/TextArea';
import { useMeQuery } from '../../../redux/user-slice';

type Props = {
  onSubmit: (e: FormEvent) => void;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  state: string;
  filesToPreview: string[];
  removeFiles: (url: string) => void;
};

type Handler = {
  submit: () => void;
};

const ReplyForm: ForwardRefRenderFunction<Handler, Props> = (
  { filesToPreview, onChange, onSubmit, removeFiles, state },
  ref
) => {
  const btnFormRef = useRef<HTMLButtonElement>(null);
  const textAreaRef = useRef<ElementRef<typeof TextArea>>(null);
  useImperativeHandle(
    ref,
    () => ({
      submit: () => {
        btnFormRef.current?.click();
      }
    }),
    []
  );
  const { data } = useMeQuery();

  return (
    <Fragment>
      <div
        onClick={() => {
          textAreaRef.current?.getFocus();
        }}
        className="flex h-full w-full gap-4"
      >
        <div className="sticky top-0 self-start">
          <Avatar src={data?.imageURL} />
        </div>
        <div className="w-full">
          <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
            <TextArea
              rows={2}
              ref={textAreaRef}
              name="reply"
              value={state}
              placeholder="Tweet your Reply!"
              onChange={onChange}
            />
            <button ref={btnFormRef} type="submit" className="hidden"></button>
          </form>
          <div className="h-max overflow-hidden">
            <ImageView urls={filesToPreview} remove={removeFiles} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default forwardRef(ReplyForm);
