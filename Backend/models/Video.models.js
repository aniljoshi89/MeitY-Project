import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  url: { 
    type: String, 
    required: true 
  },
  // Additional video metadata like duration, description, etc.
});

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;