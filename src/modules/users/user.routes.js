import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { validation } from "../../../middleware/validation.js";
import * as user_Controller from './user.controller.js'
import { updateFnameSchema, updateLnameSchema, updatepasswordSchema, updateUnameSchema, updateUserSchema } from "./user.validation.js";
import { fileUpload, fileValidation } from "../../utils/fileUpload.js";
const router = Router()

///////////////////////////////////////////////////////////////////////////////////////////router update user

router.put('/updateUser', validation(updateUserSchema), Auth(), user_Controller.updateUser)

///////////////////////////////////////////////////////////////////////////////////////////router update frist name

router.patch('/updateFname', validation(updateFnameSchema), Auth(), user_Controller.updateFname)

///////////////////////////////////////////////////////////////////////////////////////////router update last name

router.patch('/updateLname', validation(updateLnameSchema), Auth(), user_Controller.updateLname)

///////////////////////////////////////////////////////////////////////////////////////////router update username

router.patch('/updateUname', validation(updateUnameSchema), Auth(), user_Controller.updateUname)

///////////////////////////////////////////////////////////////////////////////////////////router update password

router.patch('/updatepassword', validation(updatepasswordSchema), Auth(), user_Controller.updatepassword)

///////////////////////////////////////////////////////////////////////////////////////////router delete user

router.delete('/deleteUser', Auth(), user_Controller.deleteUser)

///////////////////////////////////////////////////////////////////////////////////////////router upload profil picture
router.patch(
    '/profilPicture',
    Auth(),
    fileUpload(fileValidation.image).single('profilPicture'),
    user_Controller.profilPicture
)
///////////////////////////////////////////////////////////////////////////////////////////router upload profil cover picture
router.patch(
    '/profilPictureCover',
    Auth(),
    fileUpload(fileValidation.image).single('profilPictureCover'),
    user_Controller.profilPictureCover
)



export default router