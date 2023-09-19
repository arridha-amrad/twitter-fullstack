"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoTwitter from "@/images/logo.svg";

const Logo = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/home")}
      className="flex items-center justify-center w-12 h-12 xl:ml-2 rounded-full cursor-pointer"
    >
      <div className="w-12 h-12 p-[5px] hover:bg-skin-hover rounded-full">
        <Image
          alt="logo"
          src={LogoTwitter}
          className="w-full h-full object-cover"
        />
      </div>
    </button>
  );
};

export default Logo;
