import {
  ChangeEvent,
  ElementRef,
  FormEvent,
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import ImageView from "../../CreateTweetFeatures/components/ImageView";
import TextArea from "../../CreateTweetFeatures/components/TextArea";
import ButtonAudience from "./ButtonAudience";
import ButtonRepliers from "./ButtonRepliers";
import Avatar from "@/components/Avatar";

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

const CreateForm: ForwardRefRenderFunction<Handler, Props> = (
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
      },
    }),
    []
  );

  return (
    <article
      onClick={() => {
        textAreaRef.current?.getFocus();
      }}
    >
      <div className="flex h-full w-full gap-4">
        <div className="sticky top-0 self-start">
          <Avatar />
        </div>
        <div className="w-full">
          <ButtonAudience />
          <form onClick={(e) => e.stopPropagation()} onSubmit={onSubmit}>
            <TextArea
              rows={4}
              ref={textAreaRef}
              name="reply"
              value={state}
              placeholder="What is happening?!"
              onChange={onChange}
            />
            <button ref={btnFormRef} type="submit" className="hidden"></button>
          </form>
          <div className="h-max overflow-hidden">
            <ImageView urls={filesToPreview} remove={removeFiles} />
          </div>
        </div>
      </div>
      <div className="py-3">
        <ButtonRepliers />
      </div>
    </article>
  );
};

export default forwardRef(CreateForm);
