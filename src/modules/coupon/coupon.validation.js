import Joi from 'joi'

export const addCouponSchema = Joi.object({

    body: {
        code: Joi.string().trim().min(2).max(100).required().messages({
            'any.required': 'Code is required',
            'string.empty': 'Code cannot be empty',
            'string.min': 'Code should have a minimum length of 4',
            'string.max': 'Code should have a maximum length of 100'
        }),
        expires: Joi.date().required(),
        discount: Joi.number().min(0).required(),
    },
    query: {},
    params: {},
})

export const getSingleCouponSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const paramsIdSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const updateCouponSchema = Joi.object({
    body: {
        code: Joi.string().trim().min(2).max(100).messages({
            'any.required': 'Code is required',
            'string.empty': 'Code cannot be empty',
            'string.min': 'Code should have a minimum length of 4',
            'string.max': 'Code should have a maximum length of 100'
        }),
        expires: Joi.date(),
        discount: Joi.number().min(0),
    },
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})