import Joi from 'joi'

export const addToWishlistSchema = Joi.object({

    body: {
        product: Joi.string().hex().length(24).required()
    },
    query: {},
    params: {},
})
export const removeProductFromWishlistSchema = Joi.object({

    body: {
    },
    query: {},
    params: {
        id: Joi.string().hex().length(24).required()
    },
})

export const getSingleBrandSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const paramsIdSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const updateBrandSchema = Joi.object({
    body: {
        name: Joi.string().trim().min(4).max(100).optional().messages({
            'string.empty': 'Name cannot be empty',
            'string.min': 'Name should have a minimum length of 4',
            'string.max': 'Name should have a maximum length of 100'
        }),
    },

    params: { id: Joi.string().hex().length(24).required() },
    query: {},
    file: Joi.object({
        fieldname: Joi.string().optional(),
        originalname: Joi.string().required().messages({
            'any.required': 'File is required',
            'string.empty': 'File cannot be empty',
        }),
        encoding: Joi.string().optional(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
            'any.required': 'File type is required',
            'any.only': 'File must be a jpeg or png image'
        }),
        destination: Joi.string().optional(),
        filename: Joi.string().required().messages({
            'any.required': 'File name is required'
        }),
        path: Joi.string().optional(),
        size: Joi.number().max(5 * 1024 * 1024).messages({
            'number.max': 'File size must be less than 5MB'
        })
    }).optional()
})