import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short product title'],
        maxLength: [200, 'too long product title']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [2, 'too short product descriotion'],
        maxLength: [1000, 'too long product descriotion']
    },
    imageCover: {
        type : String
    },
    images: [],
    price: {
        type: Number,
        min: 0,
        required: true,
    },
    discounted_price: {
        type: Number,
        min: 0,
        required: true,
        minLength: [0, "can't be less than zero"],
    },
    stock: {
        type: Number,
        min: 0,
        required: true,
        minLength: [0, "can't be less than zero"],
    },
    sold: Number,
    rateAvg: {
        type: Number,
        min: 0,
        max: 5,
    },
    rate_count: {
        type: Number,
        min: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    sub_category: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    },
    created_by: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    features :[
        {
            key : String,
            value: String
        }
    ]
}, { timestamps: true , toJSON  : {virtuals  : true} , toObject :{virtuals : true} , id:false })

schema.virtual('myReviews' , {
    ref : 'review',
    localField : '_id',
    foreignField : 'product'
})

schema.pre('findOne' , function(){
    this.populate('myReviews')
})
schema.post('init', function (doc) {
    doc.imageCover = process.env.UPLOAD_PHOTO_URL + 'products/' + doc.imageCover
    doc.images = doc.images.map(img => process.env.UPLOAD_PHOTO_URL + 'products/' + img)
})

export const productModel = mongoose.model('product', schema)
 


