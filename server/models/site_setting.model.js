import mongoose from 'mongoose'

const hot_tours_schema = new mongoose.Schema({
    tours_id: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
})

const top_destination_schema = new mongoose.Schema({
    destinations_id: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
})

const recent_post_schema = new mongoose.Schema({
    posts_id: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    }
})

export const hot_tours_model = mongoose.model('hot_tours', hot_tours_schema)
export const top_destination_model = mongoose.model('top_destination', top_destination_schema)
export const recent_post_model = mongoose.model('recent_post', recent_post_schema)
