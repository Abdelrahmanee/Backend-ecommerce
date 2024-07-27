
import Stripe from 'stripe';
import { catchAsyncError } from './error.handel.js';
import cartModel from '../../database/models/cart.model.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export const makePaymentSession = catchAsyncError(async (req, res, next) => {
    const cart = await cartModel.findOne({ user: req.user._id });

    // Ensure the total price is correctly calculated and formatted
    const totalPriceInCents = cart.total_price * 100;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'EGP',
                    unit_amount: totalPriceInCents,
                    product_data: {
                        name: `Cart of ${req.user.name}`,
                    }
                },
                quantity: 1,
            }
        ],
        mode: 'payment',
        success_url: `${process.env.BASE_URL}orders`,
        cancel_url: `${process.env.BASE_URL}cart`,
        client_reference_id: cart._id.toString(), // Ensuring _id is a string
        customer_email: req.user.email
    });

    res.status(201).json({ session });
});