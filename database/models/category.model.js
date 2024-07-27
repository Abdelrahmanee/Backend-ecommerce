import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short category name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    image: String,
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

schema.post('init', function (doc) {
    console.log(doc);
    doc.image = process.env.UPLOAD_PHOTO_URL + 'categories/' + doc.image
})

export const categoryModel = mongoose.model('category', schema)



