import Icon from "@heroicons/react/24/solid/MagnifyingGlassIcon";

const SearchInput = () => {
  return (
    <div className="z-10 flex items-center bg-skin-base h-14">
      <div className="relative w-full h-12">
        <div className="absolute inset-y-0 left-0 flex items-center pl-6 pointer-events-none">
          <Icon className="w-5 h-5 text-skin-accent" />
        </div>
        <input
          autoComplete="off"
          type="text"
          id="default-search"
          className="w-full h-full pl-14 text-sm text-skin-base bg-skin-accent bg-opacity-80 border-none rounded-full outline-none placeholder:select-none focus:border-transparent focus:ring-2 focus:ring-skin-base focus:ring-offset-0 md:text-base"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
