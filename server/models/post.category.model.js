import mongoose from 'mongoose'

const postcategory = new mongoose.Schema({
    featured_image: {
        type: mongoose.Schema.Types.String,
        required: true,
        trim:true
    },
    category_name: {
        type: mongoose.Schema.Types.String,
        required: true,
        uniquie: true,
        trim: true
    }
})

export default mongoose.model('postcategory', postcategory)