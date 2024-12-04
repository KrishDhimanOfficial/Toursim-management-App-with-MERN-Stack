import mongoose from 'mongoose'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

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

tour_loaction_schema.plugin(aggregatePaginate)
export default mongoose.model('tour-location', tour_loaction_schema)