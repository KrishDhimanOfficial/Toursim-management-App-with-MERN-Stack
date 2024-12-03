import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    razorpay_order_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    razorpay_payment_id: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    tour_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    total_seats: {
        type: mongoose.Schema.Types.Number,
        required: true
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

export default mongoose.model('booking', bookingSchema)