const express = require("express");
const router = express.Router();
const cors = require("cors");

// Importing the controller
const {
  test,
  registerUser,
  loginUser,
} = require("../controllers/authControllers");

// Middleware of the sites
router.use(
  cors({
    credentials: true,
    origin: "http://localhost:3006",
  })
);

// Define the route
router.get("/", test);
router.post("/register",registerUser); 
router.post("/login",loginUser); 

module.exports = router;
