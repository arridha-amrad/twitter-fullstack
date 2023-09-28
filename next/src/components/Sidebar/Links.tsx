import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import FilledHomeIcon from '@heroicons/react/24/solid/HomeIcon';
import ProfileIcon from '@heroicons/react/24/outline/UserIcon';
import FilledProfileIcon from '@heroicons/react/24/solid/UserIcon';
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon';
import Bell from '@heroicons/react/24/outline/BellIcon';
import BellFilled from '@heroicons/react/24/solid/BellIcon';
import Envelope from '@heroicons/react/24/outline/EnvelopeIcon';
import EnvelopeFilled from '@heroicons/react/24/solid/EnvelopeIcon';
import CheckBadge from '@heroicons/react/24/outline/CheckBadgeIcon';
import CheckBadgeFilled from '@heroicons/react/24/solid/CheckBadgeIcon';
import ListBullet from '@heroicons/react/24/outline/ListBulletIcon';
import ListBulletFilled from '@heroicons/react/24/solid/ListBulletIcon';

import UserGroupFilledIcon from '@heroicons/react/24/solid/UserGroupIcon';
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon';

export const sidebarLinks = [
  {
    name: 'Home',
    link: '/home',
    icon: <HomeIcon className="h-full w-full" />,
    filledIcon: <FilledHomeIcon className="h-full w-full" />,
  },
  {
    name: 'Explore',
    link: '/explore',
    icon: <MagnifyingGlassIcon className="h-full w-full" />,
    filledIcon: <MagnifyingGlassIcon className="h-full w-full stroke-[3px]" />,
  },
  {
    name: 'Notifications',
    link: '/notifications',
    icon: <Bell className="h-full w-full" />,
    filledIcon: <BellFilled className="h-full w-full" />,
  },
  {
    name: 'Messages',
    link: '/messages',
    icon: <Envelope className="h-full w-full" />,
    filledIcon: <EnvelopeFilled className="h-full w-full" />,
  },
  {
    name: 'Lists',
    link: '/lists',
    icon: <ListBullet className="h-full w-full" />,
    filledIcon: <ListBulletFilled className="h-full w-full" />,
  },
  {
    name: 'Communities',
    link: '/communities',
    icon: <UserGroupIcon className="h-full w-full" />,
    filledIcon: <UserGroupFilledIcon className="h-full w-full" />,
  },
  {
    name: 'Verified',
    link: '/verified',
    icon: <CheckBadge className="h-full w-full" />,
    filledIcon: <CheckBadgeFilled className="h-full w-full" />,
  },
  {
    name: 'Profile',
    link: '/arridhaamrad',
    icon: <ProfileIcon className="h-full w-full" />,
    filledIcon: <FilledProfileIcon className="h-full w-full" />,
  },
];
