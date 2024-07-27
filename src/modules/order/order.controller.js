import slugify from "slugify";
import { AppError, catchAsyncError } from "../../utils/error.handel.js";
import { clearCart, deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/apiFeatures.js";
import orderModel from "../../../database/models/order.model.js";
import cartModel from "../../../database/models/cart.model.js";
import { productModel } from "../../../database/models/product.model.js";


export const getUserOrders = catchAsyncError(async (req, res, next) => {

    const apiFeatures = new ApiFeatures(orderModel.find({ user: req.user._id }), req.query).pagination().fields().filter().search().sort()
    const orders = await apiFeatures.mongooseQuery

    res.status(200).json({ message: "success", page: apiFeatures.pageNumber, orders })
})

export const makeCashOrder = catchAsyncError(async (req, res, next) => {

    const { shippingAddress } = req.body
    const cart = await cartModel.findOne({ user: req.user._id })
    if (cart.products.length === 0)
        throw new AppError("add products first", 400)

    const insufficientStockProducts = [];
    // Iterate through each product in the cart
    cart.products.forEach((product) => {
        // Check if the product's stock is less than the required quantity
        if (product.product.stock < product.quantity) {
            // Add the product to the insufficient stock array
            insufficientStockProducts.push({
                id: product.id,
                title: product.product.title,
                requestedQuantity: product.quantity,
                availableStock: product.product.stock
            });
        }
    });

    // Check if there are any products with insufficient stock
    if (insufficientStockProducts.length > 0) {
        // Throw an error with the list of products that have insufficient stock
        return res.status(400).json({
            message: "Insuffeint stock", insufficientStockProducts, options: [
                "Adjust quantities",
                "Remove items"
            ]
        })
    }

    const { products, coupon } = cart
    const order = await orderModel.create({
        user: req.user._id,
        coupon: {
            discount: coupon?.discount || 0
        },
        products: products.map(({ product: { title, price, discounted_price }, quantity }) => ({
            quantity,
            product: {
                title,
                price,
                discounted_price
            },
            shippingAddress: {
                details: shippingAddress.details,
                phone: shippingAddress.phone,
                city: shippingAddress.city,
            },
        })
        )
    })

    if (!order) throw new AppError("Order failed", 400)

    const bulkWriteOptions = cart.products.map(
        ({ product: { _id }, quantity }) => ({
            updateOne: {
                filter: { _id },
                update: {
                    $inc: { stock: -quantity }
                }
            }
        })
    )
    await productModel.bulkWrite(bulkWriteOptions)
    await clearCart(cartModel, req.user._id)
    res.status(201).json({ message: "success", order })
})




// export const deleteBrand = deleteOne(brandModel , "brand")
