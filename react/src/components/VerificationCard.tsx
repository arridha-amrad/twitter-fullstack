const VerificationCard = () => {
  return (
    <div className="flex flex-col w-full gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-900 rounded-2xl">
      <h1 className="text-xl font-bold">Get Verified</h1>
      <p className="text-sm font-semibold">Subscribe to unlock new features.</p>
      <button className="self-start px-5 py-2 font-semibold text-white bg-black rounded-full dark:bg-blue-500">
        Get Verified
      </button>
    </div>
  );
};

export default VerificationCard;
