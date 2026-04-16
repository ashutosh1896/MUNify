const mongoose = require('mongoose');
const initData = require('./data.js');
const User = require("../models/user.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/munify"
main().then(()=>{
    console.log("Connected successfully");
}).catch(err => console.log(err));
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async ()=>{
    await User.deleteMany({});
    await User.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();