import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";

const ButtonAudience = () => {
  return (
    <button className="px-4 flex items-center justify-center gap-2 py-0.5 text-sm font-semibold text-blue-500 rounded-full border dark:border-gray-700 border-gray-300">
      Everyone{" "}
      <span>
        <ChevronDownIcon className="w-4 h-4" />
      </span>
    </button>
  );
};

export default ButtonAudience;
