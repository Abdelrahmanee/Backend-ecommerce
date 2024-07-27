import Joi from 'joi'


export const addSubCategorySchema = Joi.object({
    body: {
        name: Joi.string().trim().min(2).max(200).required(),
        category: Joi.string().hex().length(24).required()
    },
    // created_by: Joi.string().hex().length(24).required(),
    query: {},
    params: {}
})
export const getSingleSubCategorySchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const paramsIdSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const updateSubCategorySchema = Joi.object({
    body: {
        name: Joi.string().trim().min(2).max(200),
        category: Joi.string().hex().length(24)
     },

    params: { id: Joi.string().hex().length(24).required() },
    query: {}
})