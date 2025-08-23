import { userModel } from "../db/models/user.model.js"
import Jwt from "jsonwebtoken";

export const Auth = () => {
    return async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization) return res.json({ message: "token must be provided" })
            if (!authorization.startsWith('djkl__')) return res.json({ message: "bearer must be provided" })
            const token = authorization.split('__')[1]
            const decoded =Jwt.verify(token,process.env.SIGNTURE)
            if (!decoded?.id) return res.json({ message: "invalid token payload " })
            const user = await userModel.findById(decoded.id)
            if (!user) res.json({ message: "user Not Found" })
            req.user = user
            next()
        } catch (error) {
            return res.json({ message: error.message })
        }
    }
}
