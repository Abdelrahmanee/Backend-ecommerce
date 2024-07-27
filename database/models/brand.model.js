import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'name is used'],
        trim: true,
        required: true,
        minLength: [2, 'too short brand name']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    logo: {
        type : String,
        required:true
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

schema.post('init', function (doc) {
    doc.logo = process.env.UPLOAD_PHOTO_URL + 'brands/' + doc.logo
})

export const brandModel = mongoose.model('brand', schema)



