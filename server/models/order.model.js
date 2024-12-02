import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    razorpay_order_id: {
        type: mongoose.Schema.Types.String
    },
    razorpay_payment_id: {
        type: mongoose.Schema.Types.String
    },
    totalAmount: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})