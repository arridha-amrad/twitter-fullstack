import ProfilePage from '../[username]/page';
import ExplorePage from '../explore/page';
import HomePage from '../home/page';
import MessagesPage from '../messages/page';
import NotificationsPage from '../notifications/page';

export const routes = [
  { url: '/**', page: <ProfilePage params={{ username: '' }} /> },
  { url: '/home', page: <HomePage /> },
  { url: '/explore', page: <ExplorePage /> },
  { url: '/notifications', page: <NotificationsPage /> },
  { url: '/messages', page: <MessagesPage /> },
];

export const findPage = (url: string) => {
  const index = routes.findIndex((route) => route.url === url);
  const pageIndex = index >= 0 ? index : 0;
  const page = routes[pageIndex].page;

  return page;
};
