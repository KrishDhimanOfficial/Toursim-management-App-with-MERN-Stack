import {
    hot_tours_model,
    top_destination_model,
    recent_post_model
} from '../models/site_setting.model.js'
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
            return res.status(200).json(
                {
                    hottours,
                    location_img_url: config.server_tour_location_img_url
                })
        } catch (error) {
            console.log('gethotTours : ' + error.message)
        }
    },
    // Post API's For Frontend Site
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

export default siteControllers