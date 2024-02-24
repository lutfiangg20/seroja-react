import { useEffect } from "react";
import Cookies from "universal-cookie";

const Logout = () => {
  const dataLogout = () => {
    fetch("http://localhost:3000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      /* body: JSON.stringify({}), */
    });
  };
  let cookie = new Cookies();
  cookie.remove("token", { path: "/" });
  localStorage.removeItem("token");
  window.location.href = "/login";

  useEffect(() => {
    dataLogout();
  });

  return <div></div>;
};

export default Logout;
