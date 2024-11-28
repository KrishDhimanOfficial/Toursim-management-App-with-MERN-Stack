import tourCategoryModel from '../models/product_category.model.js'
import postcategoryModel from '../models/post.category.model.js'
import tourModel from '../models/product.model.js'
import deleteImage from '../services/deleteImg.js'
import config from '../config/config.js'
import mongoose from 'mongoose'
import postModel from '../models/post.model.js'
const ObjectId = mongoose.Types.ObjectId;

const categorycontrollers = {
    createTourCategory: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })
            const checkTourCategoryExists = await tourCategoryModel.findOne({
                category_name: { $regex: `^${req.body.category_name}$`, $options: 'i' }
            })
            if (checkTourCategoryExists) {
                await deleteImage(`tour_category_images/${req.file.filename}`)
                return res.status(200).json({ idlemessage: 'value Exists' });
            } else {
                const data = await tourCategoryModel.create({
                    featured_image: req.file.filename,
                    category_name: req.body.category_name
                })
                if (!data) {
                    await deleteImage(`tour_category_images/${req.file.filename}`)
                    return res.status(204).json({ message: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            deleteImage(`tour_category_images/${req.file.filename}`)
            console.log('createTourCategory : ' + error.message)
        }
    },
    renderTourCategories: async (req, res) => {
        try {
            const categories = await tourCategoryModel.find({})
            const tours = await tourModel.find({}, { product_category_id: 1 })
            const tourSet = new Set()
            tours.forEach(tour => tourSet.add(tour.product_category_id.toString()))
            return res.render('product/category', {
                categories, tourSet,
                tour_category_img_url: config.server_tour_category_img_url
            })
        } catch (error) {
            console.log('renderTourCategories : ' + error.message)
        }
    },
    renderUpdateCategory: async (req, res) => {
        try {
            const category = await tourCategoryModel.findById({ _id: req.params.id })
            return res.render('product/updatecategory', {
                category,
                tour_category_img_url: config.server_tour_category_img_url
            })
        } catch (error) {
            console.log('renderUpdateCategory : ' + error.message)
        }
    },
    updateTourCategory: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await tourCategoryModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`tour_category_images/${previousimg.featured_image}`)

            const data = await tourCategoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    featured_image: req.file?.filename,
                    category_name: req.body.category_name,
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ message: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updateTourCategory : ' + error.message)
        }
    },
    updateTourCategoryStatus: async (req, res) => {
        try {
            const response = await tourCategoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                { status: req.body.status },
                { new: true }
            )
            if (!response) return res.status(204).json({ message: false })
            return res.status(200).json({ message: true })
        } catch (error) {
            console.log('updateTourCategoryStatus : ' + error.message)
        }
    },
    deleteTourCategory: async (req, res) => {
        try {
            const data = await tourCategoryModel.findOne({ _id: req.params.id })
            const response = await tourCategoryModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                deleteImage(`tour_category_images/${data.featured_image}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deleteTourCategory : ' + error.message)
        }
    },
    // Post Category
    renderPostCategories: async (req, res) => {
        try {
            const posts = await postModel.find({}, { post_category_id: 1, _id: 0 })
            const categories = await postcategoryModel.find({})
            const postSet = new Set()
            posts.forEach(post => postSet.add(post.post_category_id.toString()))
            return res.render('post/categories', {
                categories,
                postSet,
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
                return res.status(200).json({ idlemessage: 'value Exists' });
            } else {
                const data = await postcategoryModel.create({
                    featured_image: req.file.filename,
                    category_name: req.body.category_name,
                    slug: req.body.slug
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
                    slug: req.body.slug
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ error: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updatePostCategory : ' + error.message)
        }
    },
    updatePostCategoryStatus: async (req, res) => {
        try {
            const response = await postcategoryModel.findByIdAndUpdate(
                { _id: req.params.id },
                { status: req.body.status },
                { new: true }
            )
            if (!response) return res.status(204).json({ message: false })
            return res.status(200).json({ message: true })
        } catch (error) {
            console.log('updatePostCategoryStatus : ' + error.message)
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
}
export default categorycontrollers