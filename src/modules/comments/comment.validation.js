import Joi from "joi";

//////////////////////////////////////////validation add comment
export const addCommentSchema = {
    body: Joi.object().required().keys({
        commentCaption: Joi.string().required()
    }),
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}
/////////////////////////////////////////validation update comment
export const updateCommentSchema = {
    body: Joi.object().keys({
        commentCaption: Joi.string()
    }),
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}
/////////////////////////////////////////validation delete comment
export const deleteCommentSchema = {
    query: Joi.object().required().keys({
        id: Joi.string().hex().length(24).required()
    })
}