// models/User.js

import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    index:true
  },
  email: {
    type: String,
    required: true,
    lowercase:true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    match: [/(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/, 'Password must contain at least one uppercase letter, one digit, and one special character']
  }
  
},{timestamps:true});

//encrypting password before password is saved to database
UserSchema.pre("save",async function(next){
  if(this.isModified("password")) return next();
  
  this.password= await bcrypt.hash(this.password,10)
  next()
})
//for checking password is matched or not
UserSchema.methods.isPasswordCorrect=async function(password){
  return  await bcrypt.compare(password,this.password)
}
//generating access token
UserSchema.methods.generateAccessToken=function(){
  return jwt.sign({
    _id:this._id,
    email:this.email,
    username:this.username
  },
   process.env.ACCESS_TOKEN_SECRET,
   {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
   }
)
}
//generating refresh token
UserSchema.methods.generateRefreshToken=function(){
  return jwt.sign({
    _id:this._id
  },
   process.env.REFRESH_TOKEN_SECRET,
   {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
   }
)
}

// Create the User model
export const User = mongoose.model('User', UserSchema)
