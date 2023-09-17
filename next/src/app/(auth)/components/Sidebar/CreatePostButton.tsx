import PlusIcon from "@heroicons/react/24/solid/PlusIcon";

const CreatePostButton = () => {
  return (
    <div className="flex-1 w-full flex justify-center xl:justify-start my-4">
      <button className="bg-blue-500 xl:w-[90%] aspect-square xl:aspect-auto h-[50px] rounded-full flex items-center justify-center">
        <span className="text-white font-bold xl:block hidden w-full">
          Post
        </span>
        <PlusIcon className="w-6 h-6 text-white xl:hidden block" />
      </button>
    </div>
  );
};

export default CreatePostButton;
