import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentCaption: String,
    commentImage: {
        type: String,
        default: ''
    },
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    commentBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
  

}, { timestamps: true })


export const commentModel = mongoose.model('comment', commentSchema)