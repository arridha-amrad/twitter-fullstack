'use client';

import CreateTweetFeature from './components/CreateTweetFeatures/CreateTweetFeature';
import Tweets from './components/Tweets';
import HomeTab from './components/tab';

const HomePageCompositions = () => {
  return (
    <main className="h-full">
      <div className="sticky top-0 z-10 flex h-28 flex-col backdrop-blur">
        <div className="z-10 flex flex-1 items-center px-5 text-xl font-semibold">
          Home
        </div>
        <HomeTab />
      </div>
      <CreateTweetFeature />
      <Tweets />
    </main>
  );
};

export default HomePageCompositions;
