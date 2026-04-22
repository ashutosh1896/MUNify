const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const conferenceRouter = require('./routes/conference.js');
const wrapAsync = require('./util/wrapAsync.js');
const ExpressError = require('./util/ExpressError.js');

app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
const MONGO_URL = "mongodb://127.0.0.1:27017/munify"
main().then(()=>{
    console.log("Connected successfully");
}).catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}

// root route
app.get("/",(req,res)=>{
    res.render("home.ejs");
});

//router
app.use("/conferences",conferenceRouter);

//middlewares
app.use((req,res,next)=>{
 next(new ExpressError(404,"page not found"));
});

//error handling middleware
app.use((err,req,res,next)=>{
    let {statusCode = 500,message = "something went wrong"} = err;
    console.log(message);
    res.status(statusCode).render("error.ejs",{statusCode,message});
});

app.listen(3000,()=>{
    console.log("server running on port 3000");
});

