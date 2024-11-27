import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'
const postSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.String,
        required: true,
        uniquie: true,
        trim: true
    },
    post_slug: {
        type: mongoose.Schema.Types.String,
        required: true,
        uniquie: true,
        trim: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    post_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: true,
        required: true,
    },
    post_image: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date
    }
})

postSchema.plugin(aggregatePaginate)
export default mongoose.model('post', postSchema)