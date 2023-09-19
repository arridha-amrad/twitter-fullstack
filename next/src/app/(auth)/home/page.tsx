import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home / X",
};

const HomePage = () => {
  return <div className={className.container}>HomePage</div>;
};

export default HomePage;

const className = {
  container: "text-3xl text-red-500 font-bold",
};
