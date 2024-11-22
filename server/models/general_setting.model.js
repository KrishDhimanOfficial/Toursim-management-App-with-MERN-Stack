import mongoose from 'mongoose'

const general_setting = new mongoose.Schema({
    logo: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    company_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    company_address: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    company_phone: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    company_copyright: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    company_description: {
        type: mongoose.Schema.Types.String,
        required: true,
        maxLength: 50,
    }
})

export default mongoose.model('general-setting', general_setting)