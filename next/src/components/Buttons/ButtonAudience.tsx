import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";

const ButtonAudience = () => {
  return (
    <button className="px-4 flex items-center justify-center gap-2 py-0.5 text-sm font-semibold text-skin-fill rounded-full border border-skin-base">
      Everyone{" "}
      <span>
        <ChevronDownIcon className="w-4 h-4" />
      </span>
    </button>
  );
};

export default ButtonAudience;
