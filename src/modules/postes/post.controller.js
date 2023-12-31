import { postModel } from "../../../db/models/post.model.js";
import { errorHanddling } from "../../utils/errorHandling.js";

////////////////////////////////////////////////////////////////////////add post
export const addPost = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { caption } = req.body
    const post = await postModel.create({ caption, createdBy: _id, image: req.files })
    return res.status(201).json({ message: "success", post })
})
///////////////////////////////////////////////////////////////////////update post status to private
export const updateStatus = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.query
    const cheackPost = await postModel.findOne({ createdBy: _id, _id: id })
    if (!cheackPost) return next(new Error('fail', { cause: 404 }))
    await postModel.findOneAndUpdate({ createdBy: _id, _id: id }, { status: 'private' })
    return res.status(201).json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////update post
export const updatePost = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { caption } = req.body
    const { id } = req.query
    const cheackPost = await postModel.findOne({ createdBy: _id, _id: id })
    if (!cheackPost) return next(new Error('fail', { cause: 404 }))
    await postModel.findOneAndUpdate({ createdBy: _id, _id: id }, { caption, image: req.files })
    return res.status(201).json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////delete post
export const deletePost = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.query
    const cheackPost = await postModel.findOne({ createdBy: _id, _id: id })
    if (!cheackPost) return next(new Error('fail', { cause: 404 }))
    await postModel.findOneAndDelete({ createdBy: _id, _id: id })
    return res.status(200).json({ message: "success" })
})
/////////////////////////////////////////////////////////////////////get post with user
export const getPostwUser = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const postes = await postModel.find({ createdBy: _id }).populate([
        {
            path: 'createdBy',
            select: 'Username profilPicture',
        },
        {
            path: 'comentes',
            select: 'commentImage commentCaption',
            populate: {
                path: 'commentBy',
                select: 'Username profilPicture'
            }
        },
        {
            path: 'likes',
            select: 'Username profilPicture'
        }
    ])
    return res.status(200).json({ message: "success", postes })
})
//////////////////////////////////////////////////////////////////get all postes
export const getAllPostes = errorHanddling(async (req, res, next) => {
    const postes = await postModel.find().populate([
        {
            path: 'createdBy',
            select: 'Username profilPicture',
        },
        {
            path: 'comentes',
            select: 'commentImage commentCaption',
            populate: {
                path: 'commentBy',
                select: 'Username profilPicture'
            }
        },
        {
            path: 'likes',
            select: 'Username profilPicture'
        }
    ])
    return res.status(200).json({ message: "success", postes })
})
/////////////////////////////////////////////////////////////////////like and unlike in one api
export const likeAunlike = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const { id } = req.query
    const cheackPost = await postModel.findById(id)
    if (!cheackPost) return next(new Error('fail', { cause: 404 }))
    const likeCheck = await postModel.findOne({ likes: { $in: [_id] }, _id: id })
    console.log(likeCheck);
    if (likeCheck) {
        const post = await postModel.findOneAndUpdate({ _id: id }, {
            $pull: { likes: { $in: [_id] } }
        }, { new: true })
        post.totalLikes = post.likes.length
        await post.save()
        return res.json({ message: "unliked" })
    }
    const post = await postModel.findByIdAndUpdate({ _id: id }, {
        $addToSet: {
            likes: _id
        }
    }, { new: true })
    post.totalLikes = post.likes.length
    await post.save()
    return res.status(201).json({ message: "liked" })
})