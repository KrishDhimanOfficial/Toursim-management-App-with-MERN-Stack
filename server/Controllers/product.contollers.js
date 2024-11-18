import config from '../config/config.js'
import tourLocationModel from '../models/tour_location.model.js'
import tourCategoryModel from '../models/product_category.model.js'
import tourModel from '../models/product.model.js'
import deleteImage from '../services/deleteImg.js'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

const productControllers = {
    renderTourPage: async (req, res) => {
        try {
            const tour_locations = await tourLocationModel.find({}, { location_name: 1 })
            const tour_categories = await tourCategoryModel.find({}, { category_name: 1 })
            return res.render('product/tour', { tour_locations, tour_categories })
        } catch (error) {
            console.log('renderTourPage : ' + error.message)
        }
    },
    createLoaction: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })
            const checkTourLocationExists = await tourLocationModel.findOne(
                { location_name: { $regex: `^${req.body.location_name}$`, $options: 'i' } }
            )
            if (checkTourLocationExists) {
                await deleteImage(`tour_location_images/${req.file.filename}`)
                return res.status(200).json({ message: 'value Exists' });
            } else {
                const data = await tourLocationModel.create({
                    featured_img: req.file.filename,
                    location_name: req.body.location_name
                })
                if (!data) {
                    await deleteImage(`tour_location_images/${req.file.filename}`)
                    return res.status(204).json({ message: 'failed' })
                }
                return res.status(200).json({ message: 'successfully created' })
            }
        } catch (error) {
            deleteImage(`tour_location_images/${req.file.filename}`)
            console.log('createLoaction : ' + error.message)
        }
    },
    getTourLocations: async (req, res) => {
        try {
            const locations = await tourLocationModel.find({})
            if (locations) return res.status(200).json({ locations, tour_location_img_url: config.server_tour_location_img_url })
        } catch (error) {
            console.log('getAllTourLoactions : ' + error.message)
        }
    },
    getsingleTourLocation: async (req, res) => {
        try {
            const data = await tourLocationModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, tour_location_img_url: config.server_tour_location_img_url })
        } catch (error) {
            console.log('getsingleTourLocation : ' + error.message)
        }
    },
    updateTourLocation: async (req, res) => {
        try {
            const image = req.file?.filename;
            const previousimg = await tourLocationModel.findOne({ _id: req.params.id })
            if (image) deleteImage(`tour_location_images/${previousimg.featured_img}`)

            const data = await tourLocationModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    featured_img: req.file?.filename,
                    location_name: req.body.location_name,
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ message: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updateTourLocation : ' + error.message)
        }
    },
    deleteTourLocation: async (req, res) => {
        try {
            const data = await tourLocationModel.findOne({ _id: req.params.id })
            const response = await tourLocationModel.findByIdAndDelete({ _id: req.params.id })
            if (response) {
                deleteImage(`tour_location_images/${data.featured_img}`)
                return res.status(200).json({ message: 'successfully deleted' })
            }
        } catch (error) {
            console.log('deleteTourLocation : ' + error.message)
        }
    },
    createTourCategory: async (req, res) => {
        try {
            if (!req.file) return res.status(400).json({ error: 'Please upload a image' })
            const checkTourCategoryExists = await tourCategoryModel.findOne({
                category_name: { $regex: `^${req.body.category_name}$`, $options: 'i' }
            })
            if (checkTourCategoryExists) {
                await deleteImage(`tour_category_images/${req.file.filename}`)
                return res.status(200).json({ message: 'value Exists' });
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
    getTourCategories: async (req, res) => {
        try {
            const categories = await tourCategoryModel.find({})
            if (categories) return res.status(200).json({ categories, tour_category_img_url: config.server_tour_category_img_url })
        } catch (error) {
            console.log('getTourCategories : ' + error.message)
        }
    },
    getsingleTourCategory: async (req, res) => {
        try {
            const data = await tourCategoryModel.findOne({ _id: req.params.id })
            return res.status(200).json({ data, tour_category_img_url: config.server_tour_category_img_url })
        } catch (error) {
            console.log('getsingleTourCategory : ' + error.message)
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
    getAllTours: async (req, res) => {
        try {
            const tours = await tourModel.aggregate([
                {
                    $lookup: {
                        from: 'tourcategories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $lookup: {
                        from: 'tour-locations',
                        localField: 'product_location_id',
                        foreignField: '_id',
                        as: 'location'
                    }
                },
                { $unwind: '$location' },
                {
                    $project: {
                        title: 1, featured_image: 1, status: 1,
                        'category.category_name': 1,
                        'location.location_name': 1,
                        formattedDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        }
                    }
                }
            ])
            if (tours) return res.status(200).json({ tours, tour_img_url: config.server_tour_img_url })
        } catch (error) {
            console.log('getAllTours : ' + error.message)
        }
    },
    createTour: async (req, res) => {
        try {
            if (!req.body || !req.files['featured_image'] || !req.files['product_images']) {
                return res.status(400).json({ error: 'All Fields Are Required' })
            }
            const { title, slug, product_category_id, product_location_id,
                deperature_date, return_date, status, price, total_Seats, description,
                travelling_plan, product_excluded, product_included } = req.body;
            const data = await tourModel.create({
                title, status, return_date, deperature_date,
                featured_image: req.files['featured_image'][0].filename,
                product_images: req.files['product_images'].map(file => file.filename),
                slug: slug[1], price, total_Seats, travelling_plan, description,
                product_location_id: new Object(product_location_id),
                product_category_id: new Object(product_category_id),
                product_excluded: product_excluded.length == 0
                    ? []
                    : product_excluded.split(','),
                product_included: product_included.length == 0
                    ? []
                    : product_included.split(','),
                createdAt: new Date()
            })
            if (!data) return res.status(204).json({ error: 'failed' })
            return res.status(200).json({ message: 'successfully created' })
        } catch (error) {
            console.log('createTour : ' + error.message)
        }
    },
    getSingleTour: async (req, res) => {
        try {
            const data = await tourModel.aggregate([
                {
                    $match: { _id: new ObjectId(req.params.id) }
                },
                {
                    $lookup: {
                        from: 'tourcategories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                { $unwind: '$category' },
                {
                    $lookup: {
                        from: 'tour-locations',
                        localField: 'product_location_id',
                        foreignField: '_id',
                        as: 'location'
                    }
                },
                { $unwind: '$location' },
                {
                    $addFields: {
                        formattedReturnDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$return_date"
                            }
                        }
                    }
                },
                {
                    $addFields: {
                        formattedDeperatureDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$deperature_date"
                            }
                        }
                    }
                }
            ])
            return res.status(200).json({ tour: data[0], tour_img_url: config.server_tour_img_url })
        } catch (error) {
            console.log('getSingleTour : ' + error.message)
        }
    },
    updateTour: async (req, res) => {
        try {
            if (!req.body) return res.status(400).json({ error: 'All Fields Are Required' })
            const previewImg = await tourModel.findById({ _id: req.params.id })
            const { title, slug, product_category_id, product_location_id, deperature_date,
                return_date, status, price, total_Seats, description, travelling_plan,
                product_excluded, product_included } = req.body;
            const data = await tourModel.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title, status, return_date, deperature_date,
                    slug: slug[1], price, total_Seats, travelling_plan, description,
                    product_location_id: new Object(product_location_id),
                    product_category_id: new Object(product_category_id),
                    featured_image: req.files['featured_image']
                        ? req.files['featured_image'][0].filename
                        : previewImg.featured_image,
                    product_images: req.files['product_images']
                        ? req.files['product_images'].map(file => file.filename)
                        : previewImg.product_images,
                    product_excluded: product_excluded.length == 0
                        ? []
                        : product_excluded.split(','),
                    product_included: product_included.length == 0
                        ? []
                        : product_included.split(','),
                },
                { new: true }
            )
            if (!data) return res.status(204).json({ error: 'failed' })
            return res.status(200).json({ message: 'updated' })
        } catch (error) {
            console.log('updateTour : ' + error.message)
        }
    },
    deleteTour: async (req, res) => {
        try {
            const data = await tourModel.findById({ _id: req.params.id })
            const response = await tourModel.findByIdAndDelete({ _id: req.params.id })
            if (data && response) {
                deleteImage(`tour_images/${data.featured_image}`)
                response.product_images.forEach(async (image) => {
                    await deleteImage(`tour_images/${image}`)
                })
                return res.status(200).json({ message: 'successfully deleted' })
            } else {
                return res.status(204).json({ error: 'failed' })
            }
        } catch (error) {
            console.log('deleteTour : ' + error.message)
        }
    },
}
export default productControllers