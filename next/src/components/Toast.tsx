import Image from "next/image";
import { Toaster } from "react-hot-toast";
import Logo from "@/images/logo.svg";

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          icon: <Image className="w-6 h-6" src={Logo} alt="logo" />,
        },
        position: "bottom-center",
        className: "bg-skin-fill text-sm font-semibold text-skin-base",
      }}
    />
  );
};

export default Toast;
