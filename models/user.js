const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  institute: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "delegate"],
    default: "delegate"
  },
  experienceMun:{
    type: Number,
    required :true,
  },
  experienceSpeaking:{
    type: Number,
    required :true,
  },

});

const User = mongoose.model("User", userSchema);
module.exports = User;