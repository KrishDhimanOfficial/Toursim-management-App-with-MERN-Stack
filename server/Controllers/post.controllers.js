import config from '../config/config.js'
import deleteImage from '../services/deleteImg.js'
import userModel from '../models/authenticate.model.js'
import postcategoryModel from '../models/post.category.model.js'
import postCommentModel from '../models/post.comment.model.js'
import postModel from '../models/post.model.js'
import mongoose from 'mongoose'
import { getUser } from '../services/createToken.js'
const ObjectId = mongoose.Types.ObjectId;

const postControllers = {
    createPost: async (req, res) => {
        try {
            if (!req.file || !req.body) return res.status(400).json({ error: 'All Field Are Required' })
            const { title, post_slug, status, description, post_category_id } = req.body;
            const data = await postModel.create({
                title, description, status,
                post_slug: post_slug[1],
                post_image: req.file.filename,
                createdAt: new Date(),
                post_category_id: new Object(post_category_id)
            })
            if (!data) {
                await deleteImage(`post_images/${req.file?.filename}`)
                return res.status(204).json({ error: 'failed' })
            }
            return res.status(200).json({ message: 'successfully created!' })
        } catch (error) {
            await deleteImage(`post_images/${req.file?.filename}`)
            console.log('createPost : ' + error.message)
        }
    },
    updatePost: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await postModel.findById({ _id: req.params.id })
            if (image) deleteImage(`post_images/${previousimg.featured_image}`)
            const { title, post_slug, status, description, post_category_id } = req.body;
            const data = await postModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, description, status,
                    post_slug: post_slug[1],
                    post_image: req.file?.filename,
                    post_category_id: new Object(post_category_id)
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ error: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updatePost : ' + error.message)
        }
    },
    updatePostStatus: async (req, res) => {
        try {
            const response = await postModel.findByIdAndUpdate(
                { _id: req.params.id },
                { status: req.body.status },
                { new: true }
            )
            if (!response) return res.status(204).json({ message: false })
            return res.status(200).json({ message: true })
        } catch (error) {
            console.log('updatePostStatus : ' + error.message)
        }
    },
    deletePost: async (req, res) => {
        try {
            const previewImg = await postModel.findById({ _id: req.params.id })
            if (previewImg) await deleteImage(`post_images/${previewImg.post_image}`)

            const response = await postModel.findByIdAndDelete({ _id: req.params.id })
            if (!response) return res.json({ error: 'failed' })
            return res.status(200).json({ message: 'successfully deleted' })
        } catch (error) {
            console.log('deletePost : ' + error.message)
        }
    },
    renderPostPage: async (req, res) => {
        try {
            const posts = await postModel.aggregate([
                {
                    $lookup: {
                        from: 'postcategories',
                        localField: 'post_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $project: {
                        post_slug: 1, title: 1, post_image: 1, description: 1,
                        status: 1,
                        'category.category_name': 1,
                        formattedDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        }
                    }
                }
            ])
            return res.render('post/post', {
                posts,
                post_img_url: config.server_post_img_url
            })
        } catch (error) {
            console.log('renderPostPage : ' + error.message)
        }
    },
    renderCreatePost: async (req, res) => {
        try {
            const categories = await postcategoryModel.find({}, { category_name: 1 })
            return res.render('post/createPost', { categories })
        } catch (error) {
            console.log('renderCreatePost : ' + error.message)
        }
    },
    renderUpdatePostPage: async (req, res) => {
        try {
            const categories = await postcategoryModel.find({}, { category_name: 1 })
            const post = await postModel.aggregate([
                {
                    $match: {
                        _id: new ObjectId(req.params.id)
                    }
                },
                {
                    $lookup: {
                        from: 'postcategories',
                        localField: 'post_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' }
            ])
            return res.render('post/updatePost', {
                post: post[0],
                categories,
                post_img_url: config.server_post_img_url
            })
        } catch (error) {
            console.log('renderUpdatePostPage : ' + error.message)
        }
    },
    renderPostComments: async (req, res) => {
        try {
            const comments = await postCommentModel.aggregate([
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'post_id',
                        foreignField: '_id',
                        as: 'post'
                    }
                },
                {
                    $unwind: {
                        path: '$post',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $project: {
                        status: 1,
                        username: 1,
                        'post.title': 1,
                        formattedDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        }
                    }
                }
            ])
            return res.render('post/postcomments', { comments })
        } catch (error) {
            console.log('renderPostComments : ' + error.message)
        }
    },
    updateCommentStatus: async (req, res) => {
        try {
            const response = await postCommentModel.findByIdAndUpdate(
                { _id: req.params.id },
                { status: req.body.status },
                { new: true }
            )

            // update post comment
            if (req.body.status) {
                await postModel.findByIdAndUpdate(
                    { _id: response.post_id },
                    { $inc: { comment_count: 1 } },
                    { new: true }
                )
            } else {
                await postModel.findByIdAndUpdate(
                    { _id: response.post_id },
                    { $inc: { comment_count: -1 } },
                    { new: true }
                )
            }

            if (!response) return res.status(204).json({ message: false })
            return res.status(200).json({ message: true })
        } catch (error) {
            console.log('updateCommentStatus : ' + error.message)
        }
    },
    renderSingleComment: async (req, res) => {
        try {
            const comment = await postCommentModel.findById({ _id: req.params.id })
            return res.render('post/ViewSingleComment', { comment })
        } catch (error) {
            console.log('renderSingleComment : ' + error.message)
        }
    },
    deleteComment: async (req, res) => {
        try {
            const response = await postCommentModel.findByIdAndDelete({ _id: req.params.id })

            if (!response) {
                return res.status(200).json({ error: false })
            } else {
                const post = await postModel.findById({ _id: response.post_id }, { comment_count: 1 })
                if (post.comment_count > 0) await postModel.findByIdAndUpdate(
                    { _id: response.post_id },
                    { $inc: { comment_count: -1 } },
                    { new: true }
                )
                return res.status(200).json({ message: true })
            }
        } catch (error) {
            console.log('deleteComment : ' + error.message)
        }
    }
}
export default postControllers