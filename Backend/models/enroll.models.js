import mongoose from "mongoose"

const enrollmentSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'user', 
    required: true 
  },
  course: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'course', 
    required: true 
  },
  enrolledAt: { 
    type: Date, 
    default: Date.now 
  },
  // Other enrollment details like progress, completion status, etc.
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
module.exports = Enrollment;