// models/User.js

import mongoose from "mongoose"

// Define the User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
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

// Create the User model
const User = mongoose.model('User', UserSchema);

// Export the User model
module.exports = User;
