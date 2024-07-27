import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		products: [
			{
				product: {
					title : String ,
					price : Number ,
					discounted_price : Number ,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
		coupon :{
			discount : Number
		},
		address :String,
		phone_number :Number,
		payment_type:{
			type : String,
			enum :['COD' , 'card'],
			default :'COD', 
			required : true,
		},
		is_paid :{
			type : Boolean,
			default : false
		},
		is_deliverd :{
			type : Boolean,
			default : false
		},
	},
	{ timestamps: true  , toJSON : {virtuals : true}  , toObject : {virtuals : true} , id : false }
)

orderSchema.virtual('total_price').get(function () {
	const totalPrice = this.products.reduce((acc, entery) => acc + entery.product.price * entery.quantity, 0)
	return totalPrice 
})
orderSchema.virtual('total_dicounted_price').get(function () {
	const totalPrice = this.products.reduce((acc, entery) => acc + entery.product.discounted_price * entery.quantity, 0)
	return totalPrice - ((this.coupon?.discount || 0) / 100) * totalPrice
})


const orderModel = mongoose.model('order', orderSchema)

export default orderModel
