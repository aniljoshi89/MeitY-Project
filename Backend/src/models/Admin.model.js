import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
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
    courseDuration: {
        type: String, // You can use String to represent the duration (e.g., "3 months", "6 weeks")
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

export const Course = mongoose.model('Course', courseSchema);