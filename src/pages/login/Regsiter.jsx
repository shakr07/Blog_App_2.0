import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const Regsiter = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;

    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Registration Successful! Welcome!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed, please try again.");
    }
  };
  const alreadyRegister=()=>{
    navigate('/login')
  }
  return (
    <section className="login">
      <div className="container">
        <div className="text">
          <h3>Welcome to Blog_App_2.0</h3>
          <h1>Register Please</h1>
        </div>
        <form onSubmit={registerUser}>
          <span>Username *</span>
          <input
            type="text"
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
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
          <button className="button" onClick={alreadyRegister}>
            Already Registered
          </button>
          <br />
          <button className="button">Register</button>
        </form>
      </div>
    </section>
  );
};
