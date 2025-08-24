import Joi from "joi";
/////////////////////////////////////validation add post
export const addPostSchema = Joi.object().required().keys({
    caption: Joi.string().trim()
})

/////////////////////////////////////validation update post status
export const updateStatusSchema = Joi.object().required().keys({
    id: Joi.string().hex().length(24).required()
})

/////////////////////////////////////validation update post 
export const updatePostSchema = Joi.object().keys({
    caption: Joi.string(),
    id: Joi.string().hex().length(24).required()
})

////////////////////////////////////////validation delete post
export const postSchema = Joi.object().required().keys({
    id: Joi.string().hex().length(24).required()
})

////////////////////////////////////////validation like and unlike
export const likeAunlikeSchema = Joi.object().required().keys({
    id: Joi.string().hex().length(24).required()
})
