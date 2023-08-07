import { useState } from "react";

export const useRelative = () => {
  const [relative, setRelative] = useState(false);
  return {
    relative,
    setRelative,
  };
};
