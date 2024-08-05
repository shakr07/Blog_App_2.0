const express = require("express");
const router = express.Router();
const cors = require("cors");

// Importing the controller
const {
  test,
  registerUser,
  loginUser,
  getjwt,
  createBlog,
  Allblogs,
  deleteblogs,
  updateblogs,
  singleblogs,
  likeblogs,
  Account,
} = require("../controllers/authControllers");

// Middleware of the sites
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3006",
  })
);

// Defining the route
router.get("/", test);
router.post("/register",registerUser); 
router.post("/login",loginUser); 
router.get("/jwt_check",getjwt);
router.post("/create",createBlog);
router.get("/blogs",Allblogs);
router.delete("/delete/:id", deleteblogs);
router.put("/update/:id", updateblogs);
router.get("/single/:id",singleblogs);
router.post("/like/:id/:username", likeblogs);
router.get("/account", Account);

module.exports = router;
