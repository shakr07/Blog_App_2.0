import React from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import { useState } from "react";
import axios from "axios";

export const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  });



  const loginUser = (e) => {
    e.preventDefault(); //stopped automatic loading
  };
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Login</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={loginUser}>
            <span>Username or email address *</span>
            <input type="text" required value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
            <span>Password *</span>
            <input type="password" required value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
            <button className="button">Log in</button>
          </form>
        </div>
      </section>
    </>
  );
}
