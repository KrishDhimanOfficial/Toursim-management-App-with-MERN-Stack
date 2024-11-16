import mongoose from 'mongoose'

const tourSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        uniquie: true,
        trim: true
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    price: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0
    },
    rating: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0
    },
    deperature_date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    return_date: {
        type: mongoose.Schema.Types.Date,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
    total_Seats: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0
    },
    featured_image:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    product_images: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    product_included: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    product_excluded: {
        type: mongoose.Schema.Types.Array,
        required: true
    },
    product_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    product_location_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    travelling_plan: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        required: true
    }
})
export default mongoose.model('tourplan', tourSchema)