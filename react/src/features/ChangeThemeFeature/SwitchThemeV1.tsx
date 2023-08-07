import MoonIcon from "@heroicons/react/24/solid/MoonIcon";
import SunIcon from "@heroicons/react/24/solid/SunIcon";
import switchTheme from "./switchTheme";

const SwitchThemeV1 = () => {
  return (
    <button onClick={switchTheme}>
      <MoonIcon className="block w-6 h-6 dark:hidden" />
      <SunIcon className="hidden w-6 h-6 dark:block" />
    </button>
  );
};

export default SwitchThemeV1;
