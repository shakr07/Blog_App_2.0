const User = require("../model/user");
const Blog=require("../model/Blog")
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

//creating endpoimt for creating the bog
const createBlog=async (req,res)=>{
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({  message: error.message });
  }

}


//getting all the 
const Allblogs=async(req,res)=>{
  try {
     const blogs=await Blog.find({});
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({  message: "Server Error" });
  }
 
}


//deleting the blog

const deleteblogs=async(req,res)=>{
     
  try {
    const id = req.params.id;
     const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
          return res.status(404).json({ message: "not found" });
        }

        res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
        console.error( error);
        res.status(500).json({ message: "Error deleting blog post" });
  }
 
}


//updating the blogs
const updateblogs=async(req,res)=>{
 try {
   const blogId = req.params.id;
   const updatedBlog = await Blog.findByIdAndUpdate(blogId, req.body, {
     new: true,
     runValidators: true,
   });

   if (!updatedBlog) {
     return res.status(404).json({ message: "not found" });
   }

   res.status(200).json({ message: "updated successfully", data: updatedBlog });
 } catch (error) {
   console.error( error);
   res.status(500).json({ message: "Error updating blog post" });
 }
}

//getting single blog

const singleblogs = async (req, res) => {
  try {
    const blogId = req.params.id;
    console.log(blogId);
    
    const blog = await Blog.findById(blogId);
    console.log(blog);
    
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};




module.exports = { test, registerUser, loginUser, getjwt, createBlog ,Allblogs,deleteblogs,updateblogs,singleblogs};
