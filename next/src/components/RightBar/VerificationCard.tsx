const VerificationCard = () => {
  return (
    <div className="flex flex-col w-full gap-2 px-5 py-3 bg-skin-accent rounded-2xl">
      <h1 className="text-xl font-bold">Subscribe to Premium</h1>
      <p className="text-sm font-semibold">
        Subscribe to unlock new features and if eligible, receive a share of ads
        revenue.
      </p>
      <button className="self-start px-5 py-2 font-semibold text-white bg-skin-fill rounded-full">
        Subscribe
      </button>
    </div>
  );
};

export default VerificationCard;
