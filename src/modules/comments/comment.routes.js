import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { fileUpload, fileValidation } from "../../utils/fileUpload.js";
import * as comment_Controller from './comment.controller.js'
import { validation } from "../../../middleware/validation.js";
import { addCommentSchema, deleteCommentSchema, getCommentSchema, updateCommentSchema } from "./comment.validation.js";
const commentRouter = Router({mergeParams:true})




commentRouter.get('/',validation(getCommentSchema),comment_Controller.getPostWithComments)
///////////////////////////////////////////////////////////////////////router add comment
commentRouter.post(
    '/addComment/:id',
    Auth(),
    fileUpload(fileValidation.image).single('commentImage'),
    validation(addCommentSchema),
    comment_Controller.addComment
)
///////////////////////////////////////////////////////////////////////router update comment
commentRouter.put(
    '/updateComment/:id',
    Auth(),
    fileUpload(fileValidation.image).single('commentImage'),
    validation(updateCommentSchema),
    comment_Controller.updateComment
)
///////////////////////////////////////////////////////////////////////router delete comment

commentRouter.delete('/deleteComment/:id',validation(deleteCommentSchema),Auth(),comment_Controller.deleteComment)











export default commentRouter