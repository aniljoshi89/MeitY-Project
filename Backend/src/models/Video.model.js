import mongoose from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"

const videoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  videoURL: { 
    type: String, 
    required: true 
  },
  description: {
    type: String, 
    required: true
  },
  duration: {
    type: Number, 
    required: true
  },
  views: {
    type: Number,
    default: 0
  }
},{timestamps:true});
//for advance level mongoDB query we use plugin hook
videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video', videoSchema)