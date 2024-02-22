import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async () => {
    await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          navigate("/");
        } else {
          navigate("/register");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="" style={{ height: "100vh" }}>
      <div className="d-flex h-100 justify-content-center align-items-center">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Email input */}
          <div className="form-outline mb-4">
            <p className="text-xl text-bold text-center">Register</p>
          </div>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form2Example1"
              className="form-control"
              placeholder="Name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
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
            onClick={handleSubmit}
          >
            Sign up
          </button>
          {/* Register buttons */}
        </form>
      </div>
    </div>
  );
};

export default Register;
