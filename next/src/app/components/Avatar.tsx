import Image from "next/image";
import { FC } from "react";
import Default from "@/images/default.png";

type Props = {
  src?: string | null;
};

const Avatar: FC<Props> = ({ src }) => {
  const imgSrc = src ? src : Default;
  return (
    <div className="h-10 w-10 overflow-hidden rounded-full border border-skin-base">
      <Image className="h-full w-full object-cover" src={imgSrc} alt="avatar" />
    </div>
  );
};

export default Avatar;
