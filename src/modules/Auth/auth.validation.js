import Joi from 'joi';


////////////////////////////////////////////////////////////validation signUp
export const signUpSchema = Joi.object().required().keys({
    FirstName: Joi.string().min(3).max(20).required(),
    LastName: Joi.string().min(3).max(20).required(),
    Username: Joi.string().min(3).max(20).required(),
    Email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
})

////////////////////////////////////////////////////////////validation logIn
export const logInSchema = Joi.object().required().keys({
    Email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
})

////////////////////////////////////////////////////////////validation forget password
export const forgetPasswordSchema = Joi.object().required().keys({
    Email: Joi.string().email().required(),
})

////////////////////////////////////////////////////////////validation reset password
export const resetPasswordSchema = Joi.object().required().keys({
    code: Joi.string().length(6).required(),
    newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    token:Joi.string().required()
})



