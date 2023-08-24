import GetAllMyRepliesFeature from '../../features/GetAllMyRepliesFeature';
import UserTweetsLayout from './UserTweetLayout';

const UserRepliesPage = () => {
  return (
    <UserTweetsLayout>
      <GetAllMyRepliesFeature />
    </UserTweetsLayout>
  );
};

export default UserRepliesPage;
