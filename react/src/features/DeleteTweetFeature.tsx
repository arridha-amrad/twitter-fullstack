import { FC } from 'react';
import Button from '../components/Button';
import Modal from '../components/MyDialog';
import Spinner from '../components/Spinner';
import { useDeleteTweetMutation } from '../redux/tweet-slice';
import { toast } from 'react-hot-toast';

const DeleteTweetFeature: FC<{
  isOpen: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  tweet: Tweet;
}> = ({ isOpen, setIsOpenModal, tweet }) => {
  const [deleteMutation, { isLoading }] = useDeleteTweetMutation();

  const deleteTweet = async () => {
    try {
      await deleteMutation(tweet).unwrap();
      setIsOpenModal(false);
      toast.success('one tweet deleted');
    } catch (err) {
      toast.error('failed to delete this tweet');
    }
  };
  return (
    <Modal
      title="Delete Tweet"
      description="Are you sure to delete this tweet?"
      setIsOpen={setIsOpenModal}
      isOpen={isOpen}
    >
      <div className="flex items-center justify-end w-full gap-3">
        <Button
          disabled={isLoading}
          onClick={deleteTweet}
          size="small"
          variant="fill-primary"
        >
          {isLoading ? <Spinner /> : 'Yes'}
        </Button>
        <Button
          disabled={isLoading}
          onClick={() => setIsOpenModal(false)}
          size="small"
          variant="outlined-primary"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteTweetFeature;
