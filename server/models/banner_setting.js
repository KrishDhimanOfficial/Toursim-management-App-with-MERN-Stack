import mongoose from "mongoose"

const sitebannerSchema = new mongoose.Schema({
    banner_image: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    banner_title: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    banner_subtitle: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    banner_link: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
})

export default mongoose.model('banner-settings', sitebannerSchema)