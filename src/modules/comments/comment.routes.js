import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { fileUpload, fileValidation } from "../../utils/fileUpload.js";
import * as comment_Controller from './comment.controller.js'
import { validation } from "../../../middleware/validation.js";
import { addCommentSchema, deleteCommentSchema, updateCommentSchema } from "./comment.validation.js";
const router = Router()





///////////////////////////////////////////////////////////////////////router add comment
router.post(
    '/addComment:/id',
    Auth(),
    fileUpload(fileValidation.image).single('commentImage'),
    validation(addCommentSchema),
    comment_Controller.addComment
)
///////////////////////////////////////////////////////////////////////router update comment
router.put(
    '/updateComment',
    Auth(),
    fileUpload(fileValidation.image).single('commentImage'),
    validation(updateCommentSchema),
    comment_Controller.updateComment
)
///////////////////////////////////////////////////////////////////////router delete comment

router.delete('/deleteComment',validation(deleteCommentSchema),Auth(),comment_Controller.deleteComment)











export default router