import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const schema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true,
    },
    phone: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isLoggedOut: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false
    },
    profilePicture: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Manger'],
        default: 'User'
    },
    passwordChangedAt: Date,
    wishlist: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
    addresses: [{
        city: { type: String, min: 2 },
        phone: { type: String },
        street: { type: String },
    }]

}
    , { timestamps: true })


schema.post('init', function (doc) {
    doc.profilePicture = process.env.UPLOAD_PHOTO_URL + 'users/' + doc.profilePicture
})
schema.post('save', function (doc) {
    doc.profilePicture = process.env.UPLOAD_PHOTO_URL + 'users/' + doc.profilePicture
})

schema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, +process.env.HASH_SALT_ROUNDS)
});
schema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, +process.env.HASH_SALT_ROUNDS)
});

export const userModel = mongoose.model('User', schema)

