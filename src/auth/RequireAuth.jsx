import { Navigate, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";

const RequireAuth = ({ children }) => {
  let cookie = new Cookies();
  let auth = cookie.get("token");
  let location = useLocation();

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
