import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    videoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Video',
        required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    // Other comment details like likes, replies, etc.
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;