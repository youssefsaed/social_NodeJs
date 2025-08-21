import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName: String,
    LastName: String,
    Username: String,
    Email: String,
    password: String,
    profilPicture: {
        type: String,
        default: ''
    },
    profilPictureCover: {
        type: String,
        default: ''
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    isLoggedIn: Boolean,
    otpCode: String
}, { timestamps: true })

userSchema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, +process.env.SALT_ROUNDS)
})
userSchema.post('init', (doc) => {
    doc.profilPicture ='https://socialnodejs-production.up.railway.app/social/uploads/'+ doc.profilPicture
})

export const userModel = mongoose.model('user', userSchema)