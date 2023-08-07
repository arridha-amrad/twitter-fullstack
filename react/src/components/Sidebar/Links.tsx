import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import FilledHomeIcon from "@heroicons/react/24/solid/HomeIcon";
import ProfileIcon from "@heroicons/react/24/outline/UserIcon";
import FilledProfileIcon from "@heroicons/react/24/solid/UserIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";
import Bell from "@heroicons/react/24/outline/BellIcon";
import BellFilled from "@heroicons/react/24/solid/BellIcon";
import Envelope from "@heroicons/react/24/outline/EnvelopeIcon";
import EnvelopeFilled from "@heroicons/react/24/solid/EnvelopeIcon";
import CheckBadge from "@heroicons/react/24/outline/CheckBadgeIcon";
import CheckBadgeFilled from "@heroicons/react/24/solid/CheckBadgeIcon";

import ListBullet from "@heroicons/react/24/outline/ListBulletIcon";
import ListBulletFilled from "@heroicons/react/24/solid/ListBulletIcon";

import Bookmark from "@heroicons/react/24/outline/BookmarkIcon";
import BookmarkFilled from "@heroicons/react/24/solid/BookmarkIcon";

export const sidebarLinks = [
	{
		name: "Home",
		link: "/",
		icon: <HomeIcon className="w-full h-full" />,
		filledIcon: <FilledHomeIcon className="w-full h-full" />,
	},
	{
		name: "Explore",
		link: "/explore",
		icon: <MagnifyingGlassIcon className="w-full h-full" />,
		filledIcon: <MagnifyingGlassIcon className="w-full h-full stroke-[3px]" />,
	},
	{
		name: "Notifications",
		link: "/notifications",
		icon: <Bell className="w-full h-full" />,
		filledIcon: <BellFilled className="w-full h-full" />,
	},
	{
		name: "Messages",
		link: "/messages",
		icon: <Envelope className="w-full h-full" />,
		filledIcon: <EnvelopeFilled className="w-full h-full" />,
	},
	{
		name: "Lists",
		link: "/lists",
		icon: <ListBullet className="w-full h-full" />,
		filledIcon: <ListBulletFilled className="w-full h-full" />,
	},
	{
		name: "Bookmarks",
		link: "/bookmarks",
		icon: <Bookmark className="w-full h-full" />,
		filledIcon: <BookmarkFilled className="w-full h-full" />,
	},
	{
		name: "Verified",
		link: "/verified",
		icon: <CheckBadge className="w-full h-full" />,
		filledIcon: <CheckBadgeFilled className="w-full h-full" />,
	},
	{
		name: "Profile",
		link: "/:username",
		icon: <ProfileIcon className="w-full h-full" />,
		filledIcon: <FilledProfileIcon className="w-full h-full" />,
	},
];
