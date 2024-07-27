import { AppError } from "../utils/error.handel.js"



export const validate = (schema) => {
    return (req, res, next) => {
        const validationObject = {
            body: req.body,
            query: req.query,
            params: req.params,
            ...(req.file && { file: req.file }),
        };

        // Only add imageCover and images if they exist
        if (req.files && req.files.imageCover) {
            validationObject.imageCover = req.files.imageCover[0];
        }

        if (req.files && req.files.images) {
            validationObject.images = req.files.images;
        }

        const { error } = schema.validate(validationObject, { abortEarly: false });
        if (error) {
            throw new AppError(error.details.map(d => d.message.split('"').join('')), 400);
        }

        next();
    }
}
