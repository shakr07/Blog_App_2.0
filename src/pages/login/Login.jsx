import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    username: "", 
  });

  const { isAuth, login } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password, username } = data;

    try {
      const response = await axios.post("/login", {
        email,
        password,
        username, 
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        login(true);
        console.log(isAuth);
         localStorage.setItem("name",username);
        setData({});
        navigate("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed, please try again.");
    }
  };

  const Register = () => {
    navigate("/register");
  };

  const handleUsername = (e) => {
    setData({ ...data, username: e.target.value }); 
  };

  return (
    <section className="login">
      <div className="container">
        <div className="text">
          <h3>Welcome Back</h3>
          <h1>Login</h1>
        </div>
        <form onSubmit={loginUser}>
          <span>Username *</span>
          <input type="text" required onChange={handleUsername} />
          <span>Email address *</span>
          <input
            type="email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <span>Password *</span>
          <input
            type="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <button className="button" onClick={Register}>
            New User? Please Register
          </button>
          <br />
          <button className="button">Log in</button>
        </form>
      </div>
    </section>
  );
};