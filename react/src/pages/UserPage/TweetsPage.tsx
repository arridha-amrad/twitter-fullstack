import GetAllMyTweetsFeature from '../../features/GetAllMyTweetsFeature';
import UserTweetsLayout from './UserTweetLayout';

const UserTweetsPage = () => {
  return (
    <UserTweetsLayout>
      <GetAllMyTweetsFeature />
    </UserTweetsLayout>
  );
};

export default UserTweetsPage;
