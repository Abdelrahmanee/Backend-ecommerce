import mongoose from "mongoose";



const photoSchema = new mongoose.Schema({
    photoURL: String,
    photosURL: [String]
},
    { timestamps: true }
)

photoSchema.post('init', function (doc) {
    if (this.photoURL) {
        doc.photoURL = process.env.UPLOAD_PHOTO_URL + doc.photoURL
    }

    if (this.photosURL && this.photosURL.length) {
        doc.photosURL = this.photosURL.map(photo => process.env.UPLOAD_PHOTO_URL + photo);
    }
})


export const photoModel = mongoose.model('Photo', photoSchema)