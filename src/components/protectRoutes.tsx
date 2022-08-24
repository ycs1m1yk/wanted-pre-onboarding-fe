import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getToken } from "src/utils/functions";

const ProtectRoutes = () => {
  const [token, setToken] = useState<string | null>();
  const { pathname } = useLocation();

  useEffect(() => {
    setToken(getToken());
  }, [pathname]);

  if (pathname === "/todo") {
    return token ? <Outlet /> : <Navigate to="/" replace />;
  }
  return token ? <Navigate to="/todo" replace /> : <Outlet />;
};

export default ProtectRoutes;
