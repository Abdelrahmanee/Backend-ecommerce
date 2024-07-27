import cartModel from "../../../database/models/cart.model.js";
import { couponModel } from "../../../database/models/coupon.model.js";
import { productModel } from "../../../database/models/product.model.js";
import { AppError, catchAsyncError } from "../../utils/error.handel.js";


export const getLoggedUserCart = catchAsyncError(async (req, res, next) => {

    const cart = await cartModel.findOne({ user: req.user._id })

    res.status(201).json({ cart })
})

export const getAllUsersCarts = catchAsyncError(async (req, res, next) => {

    const cart = await cartModel.create({ user: req.user._id })

    res.status(201).json({ cart })
})

export const addToCart = catchAsyncError(async (req, res, next) => {

    req.body.quantity ? '' : req.body.quantity = 1
    let cart = await cartModel.findOne({ user: req.user._id })
    const product = await productModel.findById(req.body.product)
    if (!product)
        throw new AppError("product not found", 404)

    if (product.stock < req.body.quantity)
        throw new AppError(`now available ${product.stock}`, 498)
    const productEntery = cart.products.find((entery) => entery.product._id == req.body.product)

    if (!productEntery) {
        cart.products.push(req.body);
    } else if (req.body.quantity + productEntery.quantity > product.stock) {
        throw new AppError(`Only ${product.stock} available`, 498);
    } else {
        productEntery.quantity += req.body.quantity || 1;
    }

    await cart.save()
    cart = await cart.populate({
        path: 'products',
        populate: {
            path: 'product',
            model: 'product'
        }
    });
    res.status(201).json({ message: 'Added successfully', cart })
})

export const removeFromCart = catchAsyncError(async (req, res, next) => {

    const cart = await cartModel.findOne({ user: req.user._id })
    const productEntery = cart.products.find((entery) => entery.product._id == req.params.id)
    if (!productEntery)
        throw new AppError('product not found', 404)

    cart.products.remove(productEntery)
    await cart.save()
    res.status(201).json({ cart })
})

export const updateProductQuantity = catchAsyncError(async (req, res, next) => {

    const cart = await cartModel.findOne({ user: req.user._id })
    let product = cart.products.find(prod => prod.product._id == req.params.id)
    if (!product) throw new AppError('product not found', 404)
    product.quantity = req.body.quantity
    await cart.save()
    res.status(201).json({ message: "success", cart })
})

export const clearUserCart = catchAsyncError(async (req, res, next) => {
    await clearCart(cartModel, req.user._id)
    res.status(201).json({ message: "cart is cleared", cart })
})


export const applyCoupon = catchAsyncError(async (req, res, next) => {
    const { code } = req.body
    const cart = await cartModel.findOne({ user: req.user._id })
    if (!code) {
        cart.coupon = null
        await cart.save()
    }
    const coupon = await couponModel.findOne({ code, expires: { $gte: Date.now() } })
    !coupon && next(new AppError('Invalid Coupon', 400))

    cart.coupon = coupon._id
    await cart.save()
    res.status(201).json({ message: "Coupon added successfully" })
})