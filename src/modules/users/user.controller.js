import { userModel } from "../../../db/models/user.model.js";
import AppError from "../../utils/AppError.js";
import { errorHanddling } from "../../utils/errorHandling.js";
import bcrypt from 'bcryptjs'
/////////////////////////////////////////////////////////////////////////get loged user
export const getUser = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    const user = await userModel.findById(_id).select('-password')
    return res.json({ message: "success", user })
})
//////////////////////////////////////////////////////////////////////////update user
export const updateUser = errorHanddling(async (req, res, next) => {
    const { FirstName, LastName, Username } = req.body
    const { _id } = req.user
    await userModel.updateOne({ _id }, { FirstName, LastName, Username })
    return res.json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////////update FirstName only
export const updateFname = errorHanddling(async (req, res, next) => {
    const { FirstName } = req.body
    const { _id } = req.user
    await userModel.updateOne({ _id }, { FirstName })
    return res.json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////////update LastName only
export const updateLname = errorHanddling(async (req, res, next) => {
    const { LastName } = req.body
    const { _id } = req.user
    await userModel.updateOne({ _id }, { LastName })
    return res.json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////////update Username only
export const updateUname = errorHanddling(async (req, res, next) => {
    const { Username } = req.body
    const { _id } = req.user
    await userModel.updateOne({ _id }, { Username })
    return res.json({ message: "success" })
})
/////////////////////////////////////////////////////////////////////////update password only
export const updatepassword = errorHanddling(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body
    const { _id } = req.user
    const user = await userModel.findById(_id)
    
    const check = bcrypt.compareSync(oldPassword,user.password)
    if (!check) return next(new AppError("incorect password", 400))
    const npassword = bcrypt.hashSync(newPassword, +process.env.SALT_ROUNDS)
    await userModel.updateOne({ _id }, { password: npassword })
    return res.json({ message: "success" })

})
/////////////////////////////////////////////////////////////////////////delete
export const deleteUser = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    await userModel.findOneAndDelete(_id)
    return res.json({ message: "success" })
})
/////////////////////////////////////////////////////////////////////////profilPicture
export const profilPicture = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    if (!req.file) return next(new AppError("please upload your picture", 400))
    await userModel.findByIdAndUpdate({ _id }, { profilPicture: req.file.filename })
    return res.status(201).json({ message: "success" })
})
//////////////////////////////////////////////////////////////////////////profilPictureCover
export const profilPictureCover = errorHanddling(async (req, res, next) => {
    const { _id } = req.user
    if (!req.file) return next(new AppError("please upload your picture", 400))
    await userModel.findByIdAndUpdate({ _id }, { profilPictureCover: req.file.filename })
    return res.status(201).json({ message: "success" })
})