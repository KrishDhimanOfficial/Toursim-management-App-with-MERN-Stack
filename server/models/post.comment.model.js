import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    comment: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    },
    replies: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "comment"
            }
        ],
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',  
        default: null
    },
    status: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: new Date()
    }
})

export default mongoose.model('comment', commentSchema)