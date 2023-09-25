import { Switch as Sw } from '@headlessui/react';

type Props = {
  enabled: boolean;
  setEnabled: (checked: boolean) => void;
  srLabel: string;
};

export default function Switch({ enabled, setEnabled, srLabel }: Props) {
  return (
    <Sw
      checked={enabled}
      onChange={setEnabled}
      className={`${enabled ? 'bg-skin-fill' : 'bg-skin-accent'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
    >
      <span className="sr-only">{srLabel}</span>
      <span
        aria-hidden="true"
        className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Sw>
  );
}
