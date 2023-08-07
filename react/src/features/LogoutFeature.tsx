import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Modal from '../components/MyDialog';
import { useLogoutMutation } from '../redux/user-slice';

type Props = {
  isModalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LogoutFeature: FC<Props> = ({ isModalOpen, setModalOpen }) => {
  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const navigate = useNavigate();
  const logout = async () => {
    await logoutMutation().unwrap();
    navigate('/login', { replace: true });
  };

  return (
    <Modal
      description="This action will clear your session. Are you sure to continue ?"
      title="Logout"
      setIsOpen={setModalOpen}
      isOpen={isModalOpen}
    >
      <div className="flex justify-end mt-4 gap-5">
        <Button
          size="small"
          variant="fill-primary"
          disabled={isLoading}
          onClick={logout}
        >
          {isLoading ? 'Loading...' : 'Yes'}
        </Button>
        <Button
          size="small"
          variant="outlined-primary"
          onClick={() => setModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutFeature;
