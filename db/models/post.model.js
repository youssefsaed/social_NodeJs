import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    caption: String,
    image: String,
    status: {
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }],
    totalLikes: {
        type: Number,
        default: 0
    },
    comentes: [{
        type: mongoose.Types.ObjectId,
        ref: 'comment'
    }],
    totalComentes: {
        type: Number,
        default: 0
    },

}, { timestamps: true })

postSchema.pre('init', function (doc) {
    if (doc.image) {
        doc.image = `${process.env.BaseUrl}/social/uploads/` + doc.image
    }
})
export const postModel = mongoose.model('post', postSchema)