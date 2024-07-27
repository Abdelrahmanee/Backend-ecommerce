

import Joi from "joi"




export const signInSchema = Joi.object({
    body: {

        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[A-Z]')).required()
    },
    params: {},
    query: {}

})

export const signUpSchema = Joi.object({
    body: {
        userName: Joi.string().alphanum().min(2).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().pattern(new RegExp('^[A-Z]')).required(),
        phone: Joi.string().pattern(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/).required(),
        gender: Joi.string().required(),
        age: Joi.number().min(5).max(100).required(),
    },
    params: {},
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
    }).required()
})
