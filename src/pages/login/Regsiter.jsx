import React from "react"
import {useState} from "react"
import "./login.css"
import back from "../../assets/images/my-account.jpg"
import axios from "axios";

export const Regsiter = (e) => {

const[data,setData]=useState({
  name:'',
  email:'',
  password:'',
})




  const registerUser=async(e)=>{
  e.preventDefault(); //stopped automatic loading

  const {name,email,password}=data
    try {
      const {data}=await axios.post('/register',{
        name,email,password
      })
    } catch (error) {
      
    }
  
}
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="backImg">
            <img src={back} alt="" />
            <div className="text">
              <h3>Register</h3>
              <h1>My account</h1>
            </div>
          </div>

          <form onSubmit={registerUser}>
            <span>Username *</span>
            <input type="text" required value={data.name} onChange={(e)=>setData({...data,name:e.target.value})} />
            <span>Email address *</span>
            <input type="text" required value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
            <span>Password *</span>
            <input type="password" required value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
            <span>Conform Password *</span>
            <input type="password" required />
            <button className="button">Register</button>
          </form>
        </div>
      </section>
    </>
  );
}
