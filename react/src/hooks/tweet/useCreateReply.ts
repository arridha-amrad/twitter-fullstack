import { toast } from 'react-hot-toast';
import {
  useCreateReplyTweetMutation,
  useCreateTweetMutation
} from '../../redux/tweet-slice';

type Props = {
  description: string;
  files: File[];
  tst: typeof toast;
  tweet?: Tweet;
  closeModal?: () => void;
  resetForm: () => void;
};

export default function useCreateReply({
  description,
  files,
  tst,
  tweet,
  closeModal,
  resetForm
}: Props) {
  const [createReplyMutation, { isLoading: isCreateReplyLoading }] =
    useCreateReplyTweetMutation();
  const [createTweetMutation, { isLoading: isCreateTweetLoading }] =
    useCreateTweetMutation();

  const formData = new FormData();

  const execute = async () => {
    formData.append('description', description);
    if (tweet) {
      formData.append('postId', tweet.postId);
    }
    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }
    }
    try {
      if (tweet) {
        await createReplyMutation({ body: formData, tweet });
      } else {
        await createTweetMutation(formData);
      }
      resetForm();
      closeModal && closeModal();
      tst.success('Reply sent!');
    } catch (err) {
      console.log('reply error : ', err);
      tst.error('failed to sent your reply');
    }
  };

  return {
    execute,
    isCreateReplyLoading,
    isCreateTweetLoading
  };
}
