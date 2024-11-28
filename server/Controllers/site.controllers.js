import {
    hot_tours_model,
    top_destination_model,
    recent_post_model
} from '../models/site_setting.model.js'
import tourModel from '../models/product.model.js'
import postModel from '../models/post.model.js'
import postcategoryModel from '../models/post.category.model.js'
import config from '../config/config.js'
import handleAggregatePagination from '../services/handlepagination.js'

const siteControllers = {
    gethotTours: async (req, res) => {
        try {
            const hottours = await hot_tours_model.aggregate([
                {
                    $lookup: {
                        from: 'tourplans', localField: 'tours_id',
                        foreignField: 'product_location_id', as: 'tourplan'
                    }
                },
                { $unwind: '$tourplan' },
                {
                    $lookup: {
                        from: 'tour-locations', localField: 'tours_id',
                        foreignField: '_id', as: 'tour_location'
                    }
                },
                {
                    $addFields: {
                        location: {
                            $filter: {
                                input: '$tour_location',
                                as: 'location',
                                cond: { $eq: ['$$location._id', '$tourplan.product_location_id'] }
                            }
                        }
                    }
                },
                { $unwind: '$location' },
                {
                    $match: {
                        $and: [
                            { 'tourplan.status': true },
                            { 'location.status': true }
                        ]
                    }
                },
                {
                    $project: {
                        'location.featured_img': 1, 'location.location_name': 1,
                        'tourplan.slug': 1, 'tourplan.price': 1
                    }
                }
            ])
            return res.status(200).json({
                hottours,
                location_img_url: config.server_tour_location_img_url
            })
        } catch (error) {
            console.log('gethotTours : ' + error.message)
        }
    },
    getDestionation: async (req, res) => {
        try {
            const response = await top_destination_model.aggregate([
                {
                    $lookup: {
                        from: 'tour-locations',
                        localField: 'destinations_id',
                        foreignField: '_id',
                        as: 'destinations'
                    }
                },
                {
                    $match: {
                        'destinations.status': true
                    }
                }
            ])
            return res.status(200).json({ array: response[0].destinations, location_img_url: config.server_tour_location_img_url })
        } catch (error) {
            console.log('getDestionation : ' + error.message)
        }
    },
    getAllTOurs: async (req, res) => {
        try {
            const response = await tourModel.aggregate([
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
                        'price': 1,
                        'slug': 1,
                        'location.featured_img': 1,
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
            return res.status(200).json({
                response,
                location_img_url: config.server_tour_location_img_url
            })
        } catch (error) {
            console.log('getAllTOurs : ' + error.message)
        }
    },
    // Post API's For Frontend Site
    getTopPosts: async (req, res) => {
        try {
            const response = await recent_post_model.aggregate([
                {
                    $lookup: {
                        from: 'posts',
                        localField: 'posts_id',
                        foreignField: '_id',
                        as: 'post'
                    }
                },
                {
                    $match: { 'post.status': true }
                }
            ])
            // console.log(response[0])
            return res.status(200).json({
                array: response[0].post,
                post_img_url: config.server_post_img_url
            })
        } catch (error) {
            console.log('getTopPosts : ' + error.message)
        }
    },
    getAllPosts: async (req, res) => {
        try {
            const pipeline = [{ $match: { status: true } }]
            const response = await handleAggregatePagination(postModel, pipeline, req.query)
            return res.status(200).json({
                response,
                post_img_url: config.server_post_img_url
            })
        } catch (error) {
            console.log('getAllPosts : ' + error.message)
        }
    },
    getSinglePost: async (req, res) => {
        try {
            const response = await postModel.findOne({ post_slug: req.params.post_slug })
            if (!response) return res.status(200).json({ error: 'Not Found' })
            return res.status(200).json({ post: response, post_img_url: config.server_post_img_url })
        } catch (error) {
            console.log('getSinglePost : ' + error.message)
        }
    },
    getCategories: async (req, res) => {
        try {
            // find({ status: true }, { category_name: 1, slug: 1 })
            const categories = await postcategoryModel.aggregate([
                {
                    $match: { status: true }
                },
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'post_category_id',
                        as: 'post'
                    }
                },
                {
                    $project: {
                        'post._id': 1, category_name: 1, slug: 1
                    }
                }
            ])
            return res.status(200).json(categories)
        } catch (error) {
            console.log('getCategories : ' + error.message)
        }
    },
    getpostbyCategory: async (req, res) => {
        try {
            const pipeline = [
                { $match: { slug: req.params.slug } },
                {
                    $lookup: {
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'post_category_id',
                        as: 'post'
                    }
                },
                { $unwind: '$post' },
                { $match: { 'post.status': true } },
                {
                    $project: {
                        featured_image: 0, category_name: 0, status: 0, slug: 0
                    }
                }
            ]
            const response = await handleAggregatePagination(postcategoryModel, pipeline, req.query)
            return res.status(200).json({ response, post_img_url: config.server_post_img_url })
        } catch (error) {
            console.log('getpostbyCategory : ' + error.message)
        }
    },
}

export default siteControllers