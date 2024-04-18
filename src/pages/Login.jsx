/* import { useState } from "react"; */
/* import { invoke } from "@tauri-apps/api"; */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
/* import { NavLink } from "react-router-dom"; */

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState("");

  /* const dispatch = useDispatch(); */
  /* const token = useSelector((state) => state.auth.token); */
  const navigate = useNavigate();

  /*   const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 1);
  const expires = expirationDate.toUTCString(); */

  const cookie = new Cookies();

  const handleSubmit = async (e) => {
    e.preventDefault;
    await fetch("http://localhost:3000/api/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          cookie.set("token", data.token, {
            path: "/",
            maxAge: 60 * 60 * 24,
          });

          navigate("/kasir/ecer");
        } else {
          navigate("/login");
          setAlert("Username atau Password anda salah");
        }
      })
      .catch((err) => console.log(err));
    /*  console.log(formData.username); */
    /* invoke("login", {
      username: formData.username,
      password: formData.password,
    })
      .then((res) => {
        console.log(res);
        invoke("token", { username: formData.username }).then((res) => {
          res = JSON.parse(res);
          console.log(res);
          cookie.set("token", res.token, {
            path: "/",
            maxAge: 60 * 60 * 24,
          });
          navigate("/kasir/ecer");
        });
      })
      .catch((err) => {
        console.log(err);
        setAlert("Username atau Password anda salah");
      }); */
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      <div className="d-flex h-100 justify-content-center align-items-center">
        <form onSubmit={(e) => e.preventDefault()} style={{ width: "400px" }}>
          {/* Email input */}

          <div className="form-outline mb-4">
            <p className="text-xl text-bold text-center">Login</p>
          </div>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              placeholder="Username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          {/* Password input */}
          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          {/* 2 column grid layout for inline styling */}

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary btn-block mb-4"
            onClick={(e) => handleSubmit(e)}
          >
            Sign in
          </button>
          {alert && <div className="alert alert-danger">{alert}</div>}
        </form>
      </div>
    </div>
  );
};

export default Login;
