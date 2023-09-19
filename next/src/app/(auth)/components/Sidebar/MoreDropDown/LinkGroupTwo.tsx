import {
  ArrowDownRightIcon,
  ChartBarSquareIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

export const className = "w-5 h-5";

export const LinkGroupTwo = [
  {
    name: "Creator Studio",
    links: [
      {
        name: "Analytics",
        url: "/analytics",
        icon: <ChartBarSquareIcon className={className} />,
      },
    ],
  },
  {
    name: "Professional Tools",
    links: [
      {
        name: "Ads",
        url: "/ads",
        icon: <ArrowDownRightIcon className={className} />,
      },
    ],
  },
  {
    name: "Settings and Support",
    links: [
      {
        name: "Settings and Privacy",
        url: "/home",
        icon: <Cog6ToothIcon className={className} />,
      },
      {
        name: "Help Center",
        url: "/home",
        icon: <QuestionMarkCircleIcon className={className} />,
      },
      {
        name: "Display",
        url: "/i/display",
        icon: <PencilSquareIcon className={className} />,
      },
      {
        name: "Keyboard Shortcuts",
        url: "/home",
        icon: <UserCircleIcon className={className} />,
      },
    ],
  },
];
