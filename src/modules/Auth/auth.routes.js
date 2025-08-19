import { Router } from "express";
import { Auth } from "../../../middleware/authorization.js";
import { validation } from "../../../middleware/validation.js";
import * as auth_Controller from './auth.controller.js'
import { logInSchema, signUpSchema, forgetPasswordSchema, resetPasswordSchema } from "./auth.validation.js";
import { errorHanddling } from "../../utils/errorHandling.js";
const router=Router()


//////////////////////////////////////////////////////////////////////router signup

router.post('/signUp',validation(signUpSchema),errorHanddling( auth_Controller.signUp))

///////////////////////////////////////////////////////////////////router logIn

router.post('/logIn',validation(logInSchema),errorHanddling( auth_Controller.logIn))

///////////////////////////////////////////////////////////////router confirm email

router.get('/confirmEmail/:token',errorHanddling( auth_Controller.confirmEmail))

//////////////////////////////////////////////////////////////////////////////////////////////router forget password

router.post('/forgetPassword',validation(forgetPasswordSchema),errorHanddling( auth_Controller.forgetPassword))

//////////////////////////////////////////////////////////////////////////////////////////////////router reset password

router.post('/changepassword/:token',validation(resetPasswordSchema),errorHanddling( auth_Controller.changePassword))

////////////////////////////////////////////////////////////router log out

router.post('/logOut',Auth(),errorHanddling( auth_Controller.logOut))






export default router