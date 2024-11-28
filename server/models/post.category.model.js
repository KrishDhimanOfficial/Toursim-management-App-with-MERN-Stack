import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const postcategory = new mongoose.Schema({
    featured_image: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
    slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    category_name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        trim: true
    }
})

postcategory.plugin(aggregatePaginate)
export default mongoose.model('postcategory', postcategory)