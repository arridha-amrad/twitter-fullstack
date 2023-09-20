import { Metadata } from "next";
import HomeTab from "./components/tab";
import CreateTweetFeature from "./components/CreateTweetFeatures/CreateTweetFeature";

export const metadata: Metadata = {
  title: "Home / X",
};

const HomePage = () => {
  return (
    <>
      <div className="flex h-14 items-center px-5 text-xl font-semibold backdrop-blur sticky top-0 z-10">
        Home
      </div>
      <HomeTab>
        <CreateTweetFeature />
      </HomeTab>
    </>
  );
};

export default HomePage;
