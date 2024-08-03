const User = require("../model/user");
const {hashPassword,comparePassword}=require('../routes/authbycrpt')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();

const test = (req, res) => {
  res.json("test is working");
};


//registratin controllers
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if name was entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }

    // Check if the password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and should be at least 6 characters long",
      });
    }

    // Check if the email already exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "Email is already taken",
      });
    }
   
     const hashedPassword=await hashPassword(password)
    // Creating a new user
    const user = await User.create({ name, email,password: hashedPassword});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


//login controllers
const loginUser=async(req,res)=>{
try {
  const { email, password } = req.body;

  //check user exist or not
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: "Make a account Do not hurry bruh!!!",
    });
  }

  //if password match or not
  const check = await comparePassword(password, user.password);
  if(check){
    
     //password match so its time  for jwt

     jwt.sign({email:user.email,id:user._id,name:user.name},process.env.jwt_secret,{},(err,token)=>{
      if(err) throw err;
      console.log(token);
      
      res.cookie('token',token).json(user)
     })
      

  }else{
    res.json({
      error: "password Do not match calm bruh!!!",
    });
  }
} catch (error) {
  console.log(error);
  
}


}
const getjwt=(req,res)=>{
const {token}=req.cookies;
if(token){
  jwt.verify(token,process.env.jwt_secret,{},(err,user)=>{
   if(err) throw err;
   res.json(user)
  })
}
else{
  res.json(null);
}
}

module.exports = { test, registerUser, loginUser,getjwt };
