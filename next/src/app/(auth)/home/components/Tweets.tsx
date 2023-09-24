"use client";

import { useSearchParams } from "next/navigation";

const Tweets = () => {
  const params = useSearchParams();
  const tab = params.get("tab");
  console.log("tab : ", tab);
  return <div>{tab}</div>;
};

export default Tweets;
