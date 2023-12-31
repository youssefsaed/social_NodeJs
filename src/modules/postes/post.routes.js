import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { fileUpload, fileValidation } from "../../utils/fileUpload.js";
import { validation } from "../../../middleware/validation.js";
import { addPostSchema, deletePostSchema, likeAunlikeSchema, updatePostSchema, updateStatusSchema } from "./post.validation.js";
import * as post_Controller from './post.controller.js'


const router = Router()




///////////////////////////////////////////////////////////////////router add post
router.post(
    '/addPost',
    Auth(),
    fileUpload(fileValidation.image).array('imageCaption', 5),
    validation(addPostSchema),
    post_Controller.addPost
)
///////////////////////////////////////////////////////////////////router update post status

router.patch('/updateStatus', validation(updateStatusSchema), Auth(), post_Controller.updateStatus)

///////////////////////////////////////////////////////////////////router update post
router.put(
    '/updatePost',
    Auth(),
    fileUpload(fileValidation.image).array('imageCaption', 5),
    validation(updatePostSchema),
    post_Controller.updatePost
)
//////////////////////////////////////////////////////////////////////router delet post

router.delete('/deletePost', validation(deletePostSchema), Auth(), post_Controller.deletePost)

//////////////////////////////////////////////////////////////////////get post with user

router.get('/getPostwUser', Auth(), post_Controller.getPostwUser)

//////////////////////////////////////////////////////////////////////get all post 

router.get('/getAllPostes', post_Controller.getAllPostes)

//////////////////////////////////////////////////////////////////////like and unlike in one api

router.post('/likeAunlike',validation(likeAunlikeSchema),Auth(), post_Controller.likeAunlike)











export default router