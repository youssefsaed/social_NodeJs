import Joi from "joi";

////////////////////////////////////////////////////////////validation update user
export const updateUserSchema = {
    body: Joi.object().required().keys({
        FirstName: Joi.string().min(3).max(20),
        LastName: Joi.string().min(3).max(20),  
        Username: Joi.string().min(3).max(20)
    })
}
////////////////////////////////////////////////////////////validation update frist name
export const updateFnameSchema = {
    body: Joi.object().required().keys({  
        FirstName: Joi.string().min(3).max(20).required(),  
    })
}
////////////////////////////////////////////////////////////validation update last name
export const updateLnameSchema = {
    body: Joi.object().required().keys({
        LastName: Joi.string().min(3).max(20).required(),
    })
}
////////////////////////////////////////////////////////////validation update username
export const updateUnameSchema = {
    body: Joi.object().required().keys({
        Username: Joi.string().min(3).max(20).required(),
    })
}
////////////////////////////////////////////////////////////validation update password
export const updatepasswordSchema = {
    body: Joi.object().required().keys({
        oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
        newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required()
    })
}

