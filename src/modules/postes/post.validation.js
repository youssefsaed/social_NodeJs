import Joi from "joi";
/////////////////////////////////////validation add post
export const addPostSchema = Joi.object().required().keys({
    caption: Joi.string().required()
})

/////////////////////////////////////validation update post status
export const updateStatusSchema = {
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}
/////////////////////////////////////validation update post 
export const updatePostSchema = {
    body: Joi.object().keys({
        caption: Joi.string()
    }),
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}
////////////////////////////////////////validation delete post
export const deletePostSchema = {
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}
////////////////////////////////////////validation like and unlike
export const likeAunlikeSchema = {
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}