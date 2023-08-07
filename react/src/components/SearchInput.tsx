import Icon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

const SearchInput = () => {
  return (
    <div className="z-10 flex items-center bg-white dark:bg-black h-14">
      <div className="relative w-full h-10">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          autoComplete="off"
          type="text"
          id="default-search"
          className="w-full h-full pl-10 text-sm text-gray-900 bg-gray-100 border-none rounded-full outline-none placeholder:select-none dark:placeholder:text-gray-400 focus:border-transparent focus:ring-4 focus:ring-blue-500 focus:ring-offset-0 dark:text-gray-200 md:text-base dark:bg-slate-800 "
          placeholder="search user..."
        />
      </div>
    </div>
  );
};

export default SearchInput;
