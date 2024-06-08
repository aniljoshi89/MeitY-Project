import mongoose from "mongoose"

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video'
    }],
    // Other course details like duration, syllabus, etc.
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;