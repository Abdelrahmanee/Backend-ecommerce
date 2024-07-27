import mongoose from "mongoose";

const schema = new mongoose.Schema({
    comment: {
        type: String,
        trim: true,
        minLength: [2, 'too short review text']
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product',
        required: true
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    }
}, { timestamps: true })

schema.pre(/^find/, function () {
    this.populate('user' , 'profilePicture userName'  )
})

export const reviewModel = mongoose.model('review', schema)



