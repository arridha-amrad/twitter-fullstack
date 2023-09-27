import Avatar from '../Avatar';

const YouMightLike = () => {
  const users = [
    {
      name: 'Victor Lindelof',
      username: 'victor_2',
      avatar:
        'https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238876/PlayerProfile_Thumbnail_Mens_Lindelof1691780003409.jpg',
    },
    {
      name: 'Lisandro Martinez',
      username: 'lichaaaa',
      avatar:
        'https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238877/PlayerProfile_Thumbnail_Mens_Martinez1691779331299.jpg',
    },
    {
      name: 'Mason Mount',
      username: 'mount7',
      avatar:
        'https://assets.manutd.com/AssetPicker/images/0/0/18/231/1238855/PlayerProfile_Thumbnail_Mens_Mount1691779507521.jpg',
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-skin-accent">
      <h1 className="px-5 pt-3 text-xl font-bold">You might like</h1>

      {users.map((user) => (
        <div
          key={user.username}
          className="flex cursor-pointer items-center gap-2 px-5 py-2 hover:bg-skin-hover"
        >
          <Avatar height={40} width={40} src={user.avatar} />
          <div className="flex-1 overflow-hidden">
            <h1 className="overflow-hidden text-ellipsis whitespace-nowrap font-bold hover:underline">
              {user.name}
            </h1>
            <p className="text-sm text-skin-accent">@{user.username}</p>
          </div>
          <button className="rounded-full bg-skin-fill px-5 py-2 text-sm font-semibold text-white">
            Follow
          </button>
        </div>
      ))}

      <button className="px-6 py-3 text-start text-skin-fill hover:bg-skin-hover">
        Show more
      </button>
    </div>
  );
};

export default YouMightLike;
