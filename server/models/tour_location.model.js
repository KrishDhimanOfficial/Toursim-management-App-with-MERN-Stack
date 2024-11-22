import mongoose from 'mongoose'

const tour_loaction_schema = new mongoose.Schema({
    featured_img: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
        default: true
    },
    location_name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unquie: true
    }
})

export default mongoose.model('tour-location', tour_loaction_schema)