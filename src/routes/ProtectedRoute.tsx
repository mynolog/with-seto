import { useRecoilValue } from "recoil";
import { isLoginSelector } from "../recoil/TokenAtom";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLogin = useRecoilValue(isLoginSelector);

  return isLogin ? <Outlet /> : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoute;
