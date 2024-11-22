import config from '../config/config.js'
import deleteImage from '../services/deleteImg.js'
import postcategoryModel from '../models/post.category.model.js'
import postModel from '../models/post.model.js'
import mongoose from 'mongoose'
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

            const data = await postModel.findByIdAndDelete({ _id: req.params.id })
            if (!data) return res.status(204).json({ error: 'failed' })
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
    // API's For Frontend Site
    getPostapiData: async (req, res) => {
        try {
            const posts = await postModel.aggregate([
                {
                    $match: { status: true }
                },
                {
                    $addFields: {
                        formattedDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$created_At"
                            }
                        }
                    }
                },
                {
                    $project: { formattedDate: 1, title: 1, post_slug: 1, post_image: 1 }
                }
            ])
            return res.status(200).json({
                posts,
                post_img_url: config.server_post_img_url
            })
        } catch (error) {
            console.log('getPostapiData : ' + error.message)
        }
    }
}
export default postControllers