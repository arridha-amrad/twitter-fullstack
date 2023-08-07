import { Navigate, Outlet } from "react-router-dom";
import { useMeQuery } from "../redux/user-slice";

const ProtectedRoute = () => {
  const { data, isLoading } = useMeQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        <div className="w-16 h-16">
          <img
            className="w-full h-full object-contain"
            src={`${import.meta.env.VITE_CLIENT_BASE_URL}/twitter.svg`}
          />
        </div>
      </div>
    );
  }
  if (data) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
