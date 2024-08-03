const User = require("../model/user");
const {hashPassword,comparePassword}=require('../routes/authbycrpt')
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
    res.json('password match')
  }else{
    res.json({
      error: "password Do not match calm bruh!!!",
    });
  }
} catch (error) {
  console.log(error);
  
}


}

module.exports = { test, registerUser, loginUser };
