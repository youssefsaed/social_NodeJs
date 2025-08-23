import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    commentCaption: String,
    commentImage: String,
    postId: {
        type: mongoose.Types.ObjectId,
        ref: 'post'
    },
    commentBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },


}, { timestamps: true })

commentSchema.post('init', function (doc) {
    if (doc.commentImage) {
        doc.commentImage = `${process.env.BaseUrl}/social/uploads/` + doc.commentImage
    }
})
export const commentModel = mongoose.model('comment', commentSchema)