import {
    hot_tours_model,
    top_destination_model,
    recent_post_model
} from '../models/site_setting.model.js'
import tourModel from '../models/product.model.js'
import config from '../config/config.js'

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
    }
}

export default siteControllers