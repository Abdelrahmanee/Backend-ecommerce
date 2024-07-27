


import Joi from "joi";
import joiObjectId from 'joi-objectid';

Joi.objectId = joiObjectId(Joi);


export const updatePasswordSchema = Joi.object({
    body: {
        oldPassword: Joi.string().pattern(new RegExp('^[A-Z]')).required(),
        newPassword: Joi.string().pattern(new RegExp('^[A-Z]')).required(),
        rePassword: Joi.string().valid(Joi.ref('newPassword')).required(),
    },
    params: {},
    query: {}

})

export const updateUserSchema = Joi.object({
    body: {
        userName: Joi.string().min(2).max(50).required(),
        phone: Joi.string().pattern(/^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/).required(),
        age: Joi.number().required(),
    },
    params: {},
    query: {}
})
export const getUserSchema = Joi.object({
    body: {},
    params: {
        id: Joi.objectId().required()
    },
    query: {}
})


export const softDeletefuncSchema = Joi.object({
    soft_delete: Joi.boolean().required()
})
export const logOutSchema = Joi.object({
    logOut: Joi.boolean().required()
})

export const requestPasswordResetSchema = Joi.object({
    body: {
        email: Joi.string().email().required()
    },
    params: {},
    query: {}

})
export const verifyOTPAndResetPasswordSchema = Joi.object({
    body: {
        newPassword: Joi.string().pattern(new RegExp('^[A-Z]')).required(),
        email: Joi.string().email().required(),
        OTP: Joi.string().length(6).required(),
    },
    params: {},
    query: {}
})
