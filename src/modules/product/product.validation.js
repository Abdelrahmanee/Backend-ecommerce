import Joi from 'joi'


export const addProductSchema = Joi.object({
    body: {
        title: Joi.string().trim().min(2).max(200).required(),
        description: Joi.string().trim().min(2).max(1000).required(),
        price: Joi.number().min(0).required(),
        discounted_price: Joi.number().min(0).optional(),
        stock: Joi.number().min(0).optional(),
        category: Joi.string().hex().length(24).required(),
        brand: Joi.string().hex().length(24).required(),
        features: Joi.array().items(
            Joi.object({
                key: Joi.string().required(),
                value: Joi.string().required(),
            })
        )
    },
    query: {},
    params: {},
    imageCover: Joi.object({
        fieldname: Joi.string().valid('imageCover').required().messages({
            'any.required': 'ImageCover fieldname is required',
            'any.only': 'ImageCover fieldname must be "imageCover"'
        }),
        originalname: Joi.string().required().messages({
            'any.required': 'Original file name for ImageCover is required',
            'string.empty': 'Original file name for ImageCover cannot be empty',
        }),
        encoding: Joi.string().required().messages({
            'any.required': 'File encoding for ImageCover is required',
            'string.empty': 'File encoding for ImageCover cannot be empty',
        }),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
            'any.required': 'File type for ImageCover is required',
            'any.only': 'File must be a JPEG or PNG image'
        }),
        destination: Joi.string().required().messages({
            'any.required': 'File destination for ImageCover is required',
            'string.empty': 'File destination for ImageCover cannot be empty',
        }),
        filename: Joi.string().required().messages({
            'any.required': 'Saved file name for ImageCover is required',
            'string.empty': 'Saved file name for ImageCover cannot be empty',
        }),
        path: Joi.string().required().messages({
            'any.required': 'File path for ImageCover is required',
            'string.empty': 'File path for ImageCover cannot be empty',
        }),
        size: Joi.number().max(5 * 1024 * 1024).required().messages({
            'any.required': 'File size for ImageCover is required',
            'number.max': 'File size for ImageCover must be less than 5MB'
        })
    }).required(),
    images: Joi.array().items(
        Joi.object({
            fieldname: Joi.string().valid('images').required().messages({
                'any.required': 'Images fieldname is required',
                'any.only': 'Images fieldname must be "images"'
            }),
            originalname: Joi.string().required().messages({
                'any.required': 'Original file name for Images is required',
                'string.empty': 'Original file name for Images cannot be empty',
            }),
            encoding: Joi.string().required().messages({
                'any.required': 'File encoding for Images is required',
                'string.empty': 'File encoding for Images cannot be empty',
            }),
            mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
                'any.required': 'File type for Images is required',
                'any.only': 'File must be a JPEG or PNG image'
            }),
            destination: Joi.string().required().messages({
                'any.required': 'File destination for Images is required',
                'string.empty': 'File destination for Images cannot be empty',
            }),
            filename: Joi.string().required().messages({
                'any.required': 'Saved file name for Images is required',
                'string.empty': 'Saved file name for Images cannot be empty',
            }),
            path: Joi.string().required().messages({
                'any.required': 'File path for Images is required',
                'string.empty': 'File path for Images cannot be empty',
            }),
            size: Joi.number().max(5 * 1024 * 1024).required().messages({
                'any.required': 'File size for Images is required',
                'number.max': 'File size for Images must be less than 5MB'
            })
        })
    ).required()
}

)
export const getSingleProductSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const paramsIdSchema = Joi.object({
    body: {},
    params: { id: Joi.string().hex().length(24).required() },
    query: {},
})
export const updateProductSchema = Joi.object({
    body: {
        title: Joi.string().trim().min(2).max(200),
        description: Joi.string().trim().min(2).max(1000),
        price: Joi.number().min(0),
        discounted_price: Joi.number().min(0).optional(),
        stock: Joi.number().min(0).optional(),
        category: Joi.string().hex().length(24),
        brand: Joi.string().hex().length(24),
        features: Joi.array().items(
            Joi.object({
                key: Joi.string(),
                value: Joi.string()
            })
        ).optional()
    },

    params: { id: Joi.string().hex().length(24) },
    query: {},
    imageCover: Joi.object({
        fieldname: Joi.string().valid('imageCover').required().messages({
            'any.required': 'ImageCover fieldname is required',
            'any.only': 'ImageCover fieldname must be "imageCover"'
        }),
        originalname: Joi.string().required().messages({
            'any.required': 'Original file name for ImageCover is required',
            'string.empty': 'Original file name for ImageCover cannot be empty',
        }),
        encoding: Joi.string().required().messages({
            'any.required': 'File encoding for ImageCover is required',
            'string.empty': 'File encoding for ImageCover cannot be empty',
        }),
        mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
            'any.required': 'File type for ImageCover is required',
            'any.only': 'File must be a JPEG or PNG image'
        }),
        destination: Joi.string().required().messages({
            'any.required': 'File destination for ImageCover is required',
            'string.empty': 'File destination for ImageCover cannot be empty',
        }),
        filename: Joi.string().required().messages({
            'any.required': 'Saved file name for ImageCover is required',
            'string.empty': 'Saved file name for ImageCover cannot be empty',
        }),
        path: Joi.string().required().messages({
            'any.required': 'File path for ImageCover is required',
            'string.empty': 'File path for ImageCover cannot be empty',
        }),
        size: Joi.number().max(5 * 1024 * 1024).required().messages({
            'any.required': 'File size for ImageCover is required',
            'number.max': 'File size for ImageCover must be less than 5MB'
        })
    }).optional(),
    images: Joi.array().items(
        Joi.object({
            fieldname: Joi.string().valid('images').required().messages({
                'any.required': 'Images fieldname is required',
                'any.only': 'Images fieldname must be "images"'
            }),
            originalname: Joi.string().required().messages({
                'any.required': 'Original file name for Images is required',
                'string.empty': 'Original file name for Images cannot be empty',
            }),
            encoding: Joi.string().required().messages({
                'any.required': 'File encoding for Images is required',
                'string.empty': 'File encoding for Images cannot be empty',
            }),
            mimetype: Joi.string().valid('image/jpeg', 'image/png').required().messages({
                'any.required': 'File type for Images is required',
                'any.only': 'File must be a JPEG or PNG image'
            }),
            destination: Joi.string().required().messages({
                'any.required': 'File destination for Images is required',
                'string.empty': 'File destination for Images cannot be empty',
            }),
            filename: Joi.string().required().messages({
                'any.required': 'Saved file name for Images is required',
                'string.empty': 'Saved file name for Images cannot be empty',
            }),
            path: Joi.string().required().messages({
                'any.required': 'File path for Images is required',
                'string.empty': 'File path for Images cannot be empty',
            }),
            size: Joi.number().max(5 * 1024 * 1024).required().messages({
                'any.required': 'File size for Images is required',
                'number.max': 'File size for Images must be less than 5MB'
            })
        })
    ).optional()
})