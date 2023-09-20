import { Metadata } from "next";
import HomeTab from "./components/tab";

export const metadata: Metadata = {
  title: "Home / X",
};

const HomePage = () => {
  return (
    <section className="sticky top-0 z-20 flex h-full w-full flex-col bg-skin-base bg-opacity-30 backdrop-blur">
      <div className="flex h-14 items-center px-5 text-xl font-semibold">
        Home
      </div>
      <HomeTab />
    </section>
  );
};

export default HomePage;
