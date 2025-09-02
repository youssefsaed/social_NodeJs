import { userModel } from "../../../db/models/user.model.js";
import { sendEmail } from "../../../services/email.js";
import { html } from "../../utils/html.js";
import { htmlR } from "../../utils/htmlReset.js";
import { OtpGenerator } from "../../utils/otp.js";
import AppError from "../../utils/AppError.js";
import Jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'


///////////////////////////////////////////////////////////signUp
export const signUp = async (req, res, next) => {
    const { FirstName, LastName, Username, Email, password } = req.body
    const exist = await userModel.findOne({ Email })
    if (exist) return next(new AppError("Email is exist", 409))
    const newUser = new userModel({ FirstName, LastName, Username, Email, password })
    const token = Jwt.sign({ id: newUser._id }, process.env.SIGNTURE)
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
}

///////////////////////////////////////////////////////////////confirm email
export const confirmEmail = async (req, res, next) => {
    const { token } = req.params
    const decode = Jwt.verify(token, process.env.SIGNTURE)
    const updated = await userModel.findOneAndUpdate({ _id: decode.id, confirmed: false }, { confirmed: true })
    if (!updated) return next(new Error("you already confirme"))
    return res.redirect(`http://localhost:3001/confirmed`)
    // return res.status(200).json({ message: "success" })
}
////////////////////////////////////////////////////////////////logIn
export const logIn = async (req, res, next) => {
    const { Email, password } = req.body
    const user = await userModel.findOne({ Email })
    if (!user || !bcrypt.compareSync(password, user.password))
        return next(new AppError("Invalid Email OR Password ", 401))

    if (!user.confirmed) return next(new AppError("confirm your email", 401))

    await userModel.findOneAndUpdate({ Email: user.Email }, { isLoggedIn: true })
    const token = Jwt.sign({ id: user._id }, process.env.SIGNTURE)
    return res.status(200).json({ message: "success", token })
}
//////////////////////////////////////////////////////////////forgetPassword

export const forgetPassword = async (req, res, next) => {
    const { Email } = req.body
    const user = await userModel.findOne({ Email, confirmed: true })
    if (!user) return next(new AppError('email not exist or not confirmed', 400))
    const otp = OtpGenerator()
    user.otpCode = otp
    await user.save()
    const payloadCode = Jwt.sign({ email: user.Email }, process.env.SIGNTURE, { expiresIn: "15m" })
    const sentEmail = await sendEmail({
        to: Email,
        html: htmlR(otp),
        subject: "reset password"
    })
    if (sentEmail) return res.json({ message: "success", payloadCode })
    return res.json({ message: "fail" })
}
//////////////////////////////////////////////////////////////resetPassword
export const resetPassword = async (req, res, next) => {
    const { token } = req.params
    const { newPassword } = req.body
    const { code } = req.body
    Jwt.verify(token, process.env.SIGNTURE, async (err, decode) => {
        if (decode) {
            const user = await userModel.findOne({ Email: decode.email })
            if (code !== user.otpCode) return next(new AppError("invalid code", 401))
            const hash = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS)
            await userModel.findOneAndUpdate({ Email: decode.email }, { $unset: { otpCode: "" }, password: hash })
            return res.json({ message: "success" })
        }
        if (err.name === "TokenExpiredError") return next(new AppError("Time Expired", 400))
        return next(err)
    })

}
/////////////////////////////////////////////////////////////log out
export const logOut = async (req, res, next) => {
    const { _id } = req.user
    const user = await userModel.findByIdAndUpdate(_id, { isLoggedIn: false })
    if (!user) return next(new Error('fail'))
    return res.json({ message: "logOut" })
}



