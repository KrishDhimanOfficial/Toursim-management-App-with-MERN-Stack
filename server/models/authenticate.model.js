import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        match: [/^[a-z0-9]+@gmail.com$/],
        required: true,
        unique: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    },
    role: {
        type: mongoose.Schema.Types.String,
        required: true,
        default: 'user',
        enum: ['admin', 'user']
    }
})

export default mongoose.model('user', usersSchema)