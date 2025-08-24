import Joi from "joi";

//////////////////////////////////////////validation add comment
export const addCommentSchema = Joi.object().required().keys({
    commentCaption: Joi.string().trim(),
    id: Joi.string().hex().length(24).required()
})


/////////////////////////////////////////validation update comment
export const updateCommentSchema =Joi.object().keys({
        commentCaption: Joi.string(),
        id: Joi.string().hex().length(24).required()
    })




/////////////////////////////////////////validation delete comment
export const deleteCommentSchema = Joi.object().required().keys({
    id: Joi.string().hex().length(24).required()
})

export const getCommentSchema = Joi.object().required().keys({
    postid: Joi.string().hex().length(24).required()
})
