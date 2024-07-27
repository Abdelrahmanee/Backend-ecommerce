import Joi from 'joi'

export const addReviewSchema = Joi.object({

    body: {
        comment: Joi.string().trim().min(4).max(100).messages({
            'string.empty': 'comment cannot be empty',
            'string.min': 'comment should have a minimum length of 4',
            'string.max': 'comment should have a maximum length of 100'
        }),
        rate: Joi.number().min(0).max(5).required(),
        product: Joi.string().hex().length(24).required()
    },
    query: {},
    params: {},
})

export const getSingleReviewSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const paramsIdSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const updateReviewSchema = Joi.object({
    body: {
        comment: Joi.string().trim().min(4).max(100).messages({
            'string.empty': 'comment cannot be empty',
            'string.min': 'comment should have a minimum length of 4',
            'string.max': 'comment should have a maximum length of 100'
        }),
        rate: Joi.number().min(0).max(5)
    },

    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})