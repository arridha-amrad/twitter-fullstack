import {
  BookmarkIcon,
  AtSymbolIcon,
  CurrencyDollarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

const LinkGroupOne = [
  {
    url: "/bookmarks",
    name: "Bookmarks",
    icon: <BookmarkIcon className="w-full h-full" />,
    type: "link",
  },
  {
    url: "/connect",
    name: "Connect",
    icon: <AtSymbolIcon className="w-full h-full" />,
    type: "link",
  },
  {
    url: "/monetization",
    name: "Monetization",
    icon: <CurrencyDollarIcon className="w-full h-full" />,
    type: "link",
  },
  {
    url: "/follower_requests",
    name: "Follower Requests",
    icon: <UserPlusIcon className="w-full h-full" />,
    type: "link",
  },
];

export default LinkGroupOne;
