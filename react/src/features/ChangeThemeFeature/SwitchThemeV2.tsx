import SunIcon from '@heroicons/react/24/solid/SunIcon';
import MoonIcon from '@heroicons/react/24/solid/MoonIcon';
import switchTheme from './switchTheme';

const SwitchThemeV2 = () => {
  return (
    <div
      className="flex items-center justify-center w-full h-full gap-3"
      onClick={switchTheme}
    >
      <SunIcon className="hidden w-5 h-5 dark:block" />
      <MoonIcon className="block w-5 h-5 dark:hidden" />
      <p className="overflow-hidden text-sm font-bold select-none whitespace-nowrap text-ellipsis">
        Change Theme
      </p>
    </div>
  );
};

export default SwitchThemeV2;
