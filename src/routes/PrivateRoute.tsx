import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import type { ReactNode } from "react";

import { selectIsLoggedIn } from "../redux/auth/selectors";

const PrivateRoute = ({
  component,
  redirectTo,
}: {
  component: ReactNode;
  redirectTo: string;
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
