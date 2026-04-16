const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const User = require("./models/user.js");
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const bcrypt = require("bcrypt");
const session = require("express-session");

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(session({
  secret: "mysupersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, 
    maxAge: 1000 * 60 * 60 * 24 
  }
}));
const MONGO_URL = "mongodb://127.0.0.1:27017/munify"
main().then(()=>{
    console.log("Connected successfully");
}).catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}
//root route
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

//signup route
app.get("/signup", (req, res) => {
  res.render("users/signup.ejs");
});

app.post("/signup",  async (req, res) => {
  try {
    const {name,age,email,password,institute,experienceMun,experienceSpeaking} = req.body;
    
    if (!name ||!age ||!email ||!password ||experienceMun === undefined ||experienceSpeaking === undefined) {
      return res.status(400).send("All required fields must be filled");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists with this email");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name : name,
      age : age,
      email : email,
      password : hashedPassword,
      institute : institute,
      experienceMun : experienceMun,
      experienceSpeaking : experienceSpeaking,
      // role will default to "delegate"
    });
    let resu = await newUser.save();
    res.status(201).send("data added");

  } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
  }
});


//login route
app.get("/login", (req, res) => {
  res.render("users/login.ejs");
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid email or password");
    }

    req.session.userId = user._id;
    req.session.role = user.role;
    res.send("Login successful");

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(port,()=>{
    console.log("server running on port 3000");
});

