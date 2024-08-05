const User = require("../model/user");
const Blog=require("../model/Blog")
const {hashPassword,comparePassword}=require('../routes/authbycrpt')
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv').config();
const Like=require("../model/Like")
const test = (req, res) => {
  res.json("test is working");
};
let currentUsername = null;
//registratin controllers
const registerUser = async (req, res) => {
 try {
   const { name, email, password } = req.body;
   if (!name) {
     return res.json({
       error: "Name is required",
     });
   }
   //  if the password is good
   if (!password || password.length < 6) {
     return res.json({
       error: "Password is required and should be at least 6 characters long",
     });
   }
   //  if the email already exists
   const exist = await User.findOne({ email });
   if (exist) {
     return res.json({
       error: "Email is already taken",
     });
   }
   const hashedPassword = await hashPassword(password);
   // Creating a new user
   const user = await User.create({ name, email, password: hashedPassword });
   res.json(user);
 } catch (error) {
   console.error(error);
   res.status(500).json({ error: "Server error" });
 }
};


//login controllers
const loginUser=async(req,res)=>{
try {
  const { email, password, username } = req.body; // Include username in the request body

  //  if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      error: "Make an account. Do not hurry, bruh!",
    });
  }

  //  if the username matches
  if (user.name !== username) {
    return res.json({
      error: "Username does not match the email provided.",
    });
  }

  //  if the password matches
  const check = await comparePassword(password, user.password);
  if (check) {
    // Password matches, proceed with JWT
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name },
      process.env.jwt_secret,
      {}
    );
    console.log(token);

    res.cookie("token", token).json(user);
  } else {
    res.json({
      error: "Password does not match. Calm down, bruh!",
    });
  }
} catch (error) {
  console.log(error);
  res.status(500).json({ error: "An error occurred. Please try again." });
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


//like endpoint
const likeblogs=async(req,res)=>{
   try {
     const blogId = req.params.id;
     const username = req.params.username;

     if (!blogId || !username) {
       console.error("Blog ID or Username is missing");
       return res
         .status(400)
         .json({
           success: false,
           message: "Blog ID and Username are required",
         });
     }

     // Find or create like entry
     let like = await Like.findOne({ blogId });

     if (!like) {
       like = new Like({
         blogId,
         likedBy: [username],
         likesCount: 1,
       });
       await like.save();
     } else {
       //  if the user has already liked the blog
       if (like.likedBy.includes(username)) {
         // Unlike the blog
         like.likedBy = like.likedBy.filter((user) => user !== username);
         like.likesCount -= 1;
       } else {
         // Like the blog
         like.likedBy.push(username);
         like.likesCount += 1;
       }
       await like.save();
     }

     // Update the blog with the number of likes
     await Blog.findByIdAndUpdate(blogId, { likesCount: like.likesCount });

     res.status(200).json({ success: true, likesCount: like.likesCount });
   } catch (error) {
     console.error("Error handling like:", error);
     res.status(500).json({ success: false, message: error.message });
   }
}



//all the account

const Account=async(req,res)=>{
      try {
        const user=await Blog.find({});
        res.json({user})
      } catch (error) {
        res.json({
          message:error
        })
      }
}


module.exports = { test, registerUser, loginUser, getjwt, createBlog ,Allblogs,deleteblogs,updateblogs,singleblogs,likeblogs,Account};
