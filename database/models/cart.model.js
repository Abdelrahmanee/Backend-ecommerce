import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'user',
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'product'
				},
				quantity: {
					type: Number,
					default: 1
				},
				price: Number
			}
		],
		coupon: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'coupon'

		},
		discount: Number,
		totalCartPriceAfterDiscount: Number
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
		id: false
	}
)

cartSchema.post('save', async function (doc, next) {
    await doc.populate({
        path: 'products',
        populate: {
            path: 'product',
            model: 'product'
        }
    });
    next();
});


cartSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'products',
		populate: {
			path: "product",
			model: "product"
		}
	})
	this.populate('coupon')
	next()
})



cartSchema.virtual('total_price').get(function () {
	const totalPrice = this.products.reduce((acc, entery) => acc + entery.product.discounted_price * entery.quantity, 0)
	return totalPrice - ((this.coupon?.discount || 0) / 100) * totalPrice
})


const cartModel = mongoose.model('cart', cartSchema)

export default cartModel
