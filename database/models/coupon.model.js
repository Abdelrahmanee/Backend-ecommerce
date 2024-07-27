import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        trim: true,
        unique : true,
        minLength: [2, 'too short coupon text']
    },
   
    expires : {
        type :Date , 
    },
    discount :{
        type :Number,
        min :0,
        required : true
    },
    user :{
        type :mongoose.Types.ObjectId,
        ref : 'user'
    }
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)



