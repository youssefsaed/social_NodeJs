import { commentModel } from "../../../db/models/comment.model.js";
import { postModel } from "../../../db/models/post.model.js";
import AppError from "../../utils/AppError.js";
import { errorHanddling } from "../../utils/errorHandling.js";

///////////////////////////////////////////////////////////////////////add comment
export const addComment = errorHanddling(async (req, res, next) => {
    const { commentCaption } = req.body
    const { id } = req.params
    const { _id } = req.user
    const cheackPost = await postModel.findById(id)
    if (!cheackPost) return next(new AppError('fail', 404))
    const comment = await commentModel.create({
        commentCaption,
        postId: id,
        commentBy: _id,
        commentImage: req.file
    })
    const post = await postModel.findOneAndUpdate({ _id: id }, {
        $push: {
            comentes: comment._id
        }
    }, { new: true })
    post.totalComentes = post.comentes.length
    await post.save()
    return res.status(201).json({ message: "success" })
})
///////////////////////////////////////////////////////////////////////update comment
export const getPostWithComments = errorHanddling(async (req, res, next) => {
    if (!await postModel.findById(req.params.postid)) return next(new AppError('post not found', 404))
    const comments = await commentModel.find({ postId: req.params.postid }).populate('commentBy','Username profilPicture')
    res.json({ message: 'success', comments })
})

///////////////////////////////////////////////////////////
export const updateComment = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.params
    const { commentCaption } = req.body
    const cheackComment = await commentModel.findOne({ _id: id, commentBy: _id })
    if (!cheackComment) return next(new AppError('comment not found', 404))
    const comment = await commentModel.findOneAndUpdate({ _id: id, commentBy: _id }, {
        commentCaption,
        commentImage: req.file?.filename
    })
    if (!comment) return next(new AppError('fail', 400))
    return res.status(201).json({ message: "success" })
})
///////////////////////////////////////////////////////////////////////delete comment
export const deleteComment = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.params
    const comment = await commentModel.findOneAndDelete({ _id: id, commentBy: _id })
    if (!comment) return next(new AppError('comment not found', 404))
    const post = await postModel.findOneAndUpdate({ comentes: { $in: [id] } }, {
        $pull: {
            comentes: { $in: [id] }
        }
    }, { new: true })
    post.totalComentes = post.comentes.length
    await post.save()
    return res.status(201).json({ message: "success" })
})