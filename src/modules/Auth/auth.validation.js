import Joi from 'joi';


////////////////////////////////////////////////////////////validation signUp
export const signUpSchema = {
    body: Joi.object().required().keys({
        FirstName: Joi.string().min(3).max(20).required(),
        LastName: Joi.string().min(3).max(20).required(),
        Username: Joi.string().min(3).max(20).required(),
        Email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
    })
}
////////////////////////////////////////////////////////////validation logIn
export const logInSchema = {
    body: Joi.object().required().keys({
        Email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
    })
}
////////////////////////////////////////////////////////////validation forget password
export const forgetPasswordSchema = {
    body: Joi.object().required().keys({
        Email: Joi.string().email().required(),
    })
}
////////////////////////////////////////////////////////////validation reset password
export const resetPasswordSchema = {
    body: Joi.object().required().keys({
        code: Joi.string().length(6).pattern(new RegExp('^[0-9]{6}$')).required(),
        nPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
    })
}


