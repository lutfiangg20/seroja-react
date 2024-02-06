/* import { useState } from "react"; */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../stores/authSlice";
import { useNavigate } from "react-router-dom";
/* import { NavLink } from "react-router-dom"; */

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  /* const token = useSelector((state) => state.auth.token); */
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault;
    await fetch("http://seroja.test/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch(setToken(data));
        navigate("/pembelian/ecer");
      });
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
          {/* Register buttons */}
          {/* <div className="text-center">
            <p>
              Not a member?
              <NavLink to="/register">Register</NavLink>
            </p>
            <p>or sign up with:</p>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-facebook-f" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-google" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-twitter" />
            </button>
            <button type="button" className="btn btn-link btn-floating mx-1">
              <i className="fab fa-github" />
            </button>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
