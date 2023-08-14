import { userModel } from "../../../db/models/user.model.js";
import { sendEmail } from "../../../services/email.js";
import { errorHanddling } from "../../utils/errorHandling.js";
import { html } from "../../utils/html.js";
import { htmlR } from "../../utils/htmlReset.js";
import { Jwt } from "../../utils/jwt.js";
import { OTPGenerator } from "../../utils/otp.js";
import { Password } from "../../utils/password.js";



////////////////////////////////////////////////////////////signUp
export const signUp = errorHanddling(async (req, res, next) => {
    const { FirstName, LastName, Username, Email, password } = req.body
    const exist = await userModel.findOne({ Email })
    if (exist) return next(new Error("Email is exist"))
    const hashedPass = new Password(password).hash()
    const newUser = new userModel({ FirstName, LastName, Username, Email, password: hashedPass })
    const token = new Jwt({ payload: { _id: newUser._id } }).sign()
    const linkConfirm = `${req.protocol}://${req.headers.host}/social/confirmEmail/${token}`
    const sentEmail = await sendEmail({
        to: newUser.Email,
        html: html(linkConfirm),
        subject: "confirm email"
    })
    if (sentEmail) {
        await newUser.save()
        return res.status(201).json({ message: "success" })
    }
    return next(new Error("fail to confirm"))
})

///////////////////////////////////////////////////////////////confirm email
export const confirmEmail = errorHanddling(async (req, res, next) => {
    const { token } = req.params
    const tokenVerify = new Jwt().verify(token)
    const user = await userModel.findOneAndUpdate({ _id: tokenVerify._id, confirmed: false }, { confirmed: true })
    if (!user) return next(new Error("you already confirme"))
    return res.redirect(`http://localhost:4200/home`)
    // return res.status(200).json({ message: "success confirmation" })
})
////////////////////////////////////////////////////////////////logIn
export const logIn = errorHanddling(async (req, res, next) => {
    const { Email, password } = req.body
    const user = await userModel.findOne({ Email})
    if (!user) return next(new Error("Email not exist"))
    const confirm = await userModel.findOne({ Email, confirmed: true})
    if(!confirm) return next(new Error("confirm your email"))
    const check = new Password(password).compare(user.password)
    if (!check) return next(new Error("Invalid Password"))
    const token = new Jwt({
        payload: { id: user._id }
    }).sign()
    await userModel.findOneAndUpdate({Email},{isLoggedIn:true})
    return res.status(200).json({ message: "success", token })
})
//////////////////////////////////////////////////////////////forgetPassword

export const forgetPassword = errorHanddling(async (req, res, next) => {
    const { Email } = req.body
    const user = await userModel.findOne({ Email })
    if (!user) return next(new Error('email not exist'))
    const otp = OTPGenerator()
    const payloadCode = new Jwt({ payload: { otp, email: user.Email } }).sign()
    const link = `${req.protocol}://${req.headers.host}/social/resetPassword/${payloadCode}`
    const sentEmail = await sendEmail({
        to: Email,
        html: htmlR(link,otp)
        ,
        subject: "reset password"
    })
    if (sentEmail) return res.json({ message: "success" })
})
//////////////////////////////////////////////////////////////resetPassword
export const resetPassword = errorHanddling(async (req, res, next) => {
    const { otp } = req.params
    const { nPassword } = req.body
    const { code } = req.body
    const codeVerify = new Jwt().verify(otp)
    if (codeVerify.otp != code) return res.json({ message: "invalid code" })
    const hPassword = new Password(nPassword).hash()
    const user = await userModel.findOneAndUpdate({ Email: codeVerify.email }, { password: hPassword })
    return res.json({ message: "resst password succesfull", user })
})
/////////////////////////////////////////////////////////////log out
export const logOut=errorHanddling(async(req,res,next)=>{
    const {_id}=req.user
    const user=await userModel.findByIdAndUpdate(_id,{isLoggedIn:false})
    if(!user) return next(new Error('fail'))
    return res.json({message:"logOut"})
})



