export const tabs = (username: string) => [
  { name: 'Tweets', url: `/${username}` },
  { name: 'Replies', url: `/${username}/replies` },
  { name: 'Highlights', url: `/${username}/highlights` },
  { name: 'Media', url: `/${username}/media` },
  { name: 'Likes', url: `/${username}/likes` },
];
