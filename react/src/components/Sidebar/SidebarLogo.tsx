import { useNavigate } from "react-router-dom";

const SidebarLogo = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center justify-center w-12 h-12 ml-1 transition-all duration-200 ease-linear rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-slate-700"
    >
      <div className="w-10 h-10">
        <img
          className="w-full h-full"
          src={`${import.meta.env.VITE_CLIENT_BASE_URL}/logo-light.svg`}
          alt="logo"
        />
      </div>
    </button>
  );
};

export default SidebarLogo;
