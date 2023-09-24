import { Metadata } from "next";
import HomeTab from "./components/tab";
import CreateTweetFeature from "./components/CreateTweetFeatures/CreateTweetFeature";
import Tweets from "./components/Tweets";

export const metadata: Metadata = {
  title: "Home / X",
};

const HomePage = () => {
  return (
    <main className="h-full">
      <div className="h-28 sticky top-0 backdrop-blur flex flex-col z-10">
        <div className="flex flex-1 items-center px-5 text-xl font-semibold z-10">
          Home
        </div>
        <HomeTab />
      </div>
      <CreateTweetFeature />
      <Tweets />
    </main>
  );
};

export default HomePage;
