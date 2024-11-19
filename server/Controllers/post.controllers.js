import config from '../config/config.js'
import deleteImage from '../services/deleteImg.js'
import postcategoryModel from '../models/post.category.model.js'
import postModel from '../models/post.model.js'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

const postControllers = {
    renderPostCategories: async (req, res) => {
        try {
            const categories = await postcategoryModel.find({})
            return res.render('post/categories', {
                categories,
                post_category_img_url: config.server_post_category_img_url
            })
        } catch (error) {
            console.log('renderPostCategory : ' + error.message)
        }
    },
    renderUpdatePostCategory: async (req, res) => {
        try {
            const category = await postcategoryModel.findById({ _id: req.params.id })
            return res.render('post/updatePostCategory', {
                category,
                post_category_img_url: config.server_post_category_img_url
            })
        } catch (error) {
            console.log('renderUpdatePostCategory : ' + error.message)
        }
    },
    createPostCategory: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })

            const postCategoryExists = await postcategoryModel.findOne(
                { category_name: { $regex: `^${req.body.category_name}$`, $options: 'i' } }
            )
            if (postCategoryExists) {
                await deleteImage(`post_category_images/${req.file.filename}`)
                return res.status(200).json({ error: 'value Exists' });
            } else {
                const data = await postcategoryModel.create({
                    featured_image: req.file.filename,
                    category_name: req.body.category_name
                })
                if (!data) {
                    await deleteImage(`post_category_images/${req.file.filename}`)
                    return res.status(400).json({ error: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            await deleteImage(`post_category_images/${req.file.filename}`)
            console.log('createPostCategory : ' + error.message)
        }
    },
    getSinglePostCategory: async (req, res) => {
        try {
            const data = await postcategoryModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, post_category_img_url: config.server_post_category_img_url })
        } catch (error) {
            console.log('getSinglePostCategory : ' + error.message)
        }
    },
    updatePostCategory: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await postcategoryModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`post_category_images/${previousimg.featured_image}`)

            const data = await postcategoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    featured_image: req.file?.filename,
                    category_name: req.body.category_name,
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ error: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updatePostCategory : ' + error.message)
        }
    },
    deletePostCategory: async (req, res) => {
        try {
            const data = await postcategoryModel.findOne({ _id: req.params.id })
            const response = await postcategoryModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                await deleteImage(`post_category_images/${data.featured_image}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deletePostCategory : ' + error.message)
        }
    },
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
            // const posts = await postModel.find({})
            console.log(posts)
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
}
export default postControllers