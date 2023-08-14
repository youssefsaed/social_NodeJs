import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { validation } from "../../../middleware/validation.js";
import * as auth_Controller from './auth.controller.js'
import { logInSchema, signUpSchema, forgetPasswordSchema, resetPasswordSchema } from "./auth.validation.js";
const router=Router()


//////////////////////////////////////////////////////////////////////router signup

router.post('/signUp',validation(signUpSchema),auth_Controller.signUp)

///////////////////////////////////////////////////////////////////router logIn

router.post('/logIn',validation(logInSchema),auth_Controller.logIn)

///////////////////////////////////////////////////////////////router confirm email

router.get('/confirmEmail/:token',auth_Controller.confirmEmail)

//////////////////////////////////////////////////////////////////////////////////////////////router forget password

router.post('/forgetPassword',validation(forgetPasswordSchema),auth_Controller.forgetPassword)

//////////////////////////////////////////////////////////////////////////////////////////////////router reset password

router.post('/resetPassword/:otp',validation(resetPasswordSchema),auth_Controller.resetPassword)

////////////////////////////////////////////////////////////router log out

router.post('/logOut',Auth(),auth_Controller.logOut)






export default router