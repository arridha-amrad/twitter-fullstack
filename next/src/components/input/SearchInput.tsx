import Icon from '@heroicons/react/24/solid/MagnifyingGlassIcon';

const SearchInput = () => {
  return (
    <div className="z-10 flex h-14 items-center bg-skin-base">
      <div className="relative h-12 w-full">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6">
          <Icon className="h-5 w-5 text-skin-accent" />
        </div>
        <input
          autoComplete="off"
          type="text"
          id="default-search"
          className="h-full w-full rounded-full border-none bg-skin-accent bg-opacity-80 pl-14 text-sm text-skin-base outline-none placeholder:select-none focus:border-transparent focus:ring-2 focus:ring-skin-base focus:ring-offset-0 md:text-base"
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default SearchInput;
