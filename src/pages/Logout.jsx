import { useEffect } from "react";

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

  localStorage.removeItem("token");
  window.location.href = "/login";

  useEffect(() => {
    dataLogout();
  });

  return <div></div>;
};

export default Logout;
