import Avatar from "@/components/Avatar";

const UserToFollowCard = () => {
  const users = [
    { name: "Andre Onana", username: "andre_onana" },
    { name: "Lisandro Martinez", username: "lichaaaa" },
  ];

  return (
    <div className="flex w-full flex-col gap-2 overflow-hidden rounded-2xl bg-skin-accent">
      <h1 className="px-5 pt-3 text-xl font-bold">Who to follow</h1>

      {users.map((user) => (
        <div
          key={user.username}
          className="flex cursor-pointer items-center gap-2 px-5 py-2 hover:bg-skin-hover"
        >
          <Avatar />
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

export default UserToFollowCard;
