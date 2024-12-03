import {
    hot_tours_model,
    top_destination_model,
    recent_post_model
} from '../models/site_setting.model.js'
import tourModel from '../models/product.model.js'
import postModel from '../models/post.model.js'
import userModel from '../models/authenticate.model.js'
import postcategoryModel from '../models/post.category.model.js'
import postCommentModel from '../models/post.comment.model.js'
import tour_booking_model from '../models/order.model.js'
import Razorpay from 'razorpay'
import config from '../config/config.js'
import handleAggregatePagination from '../services/handlepagination.js'
import { getUser } from '../services/createToken.js'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId;

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
            const pipeline = [
                { $match: { status: true } },
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
            ]
            const response = await handleAggregatePagination(tourModel, pipeline, req.query)
            console.log(response);

            return res.status(200).json({
                response,
                location_img_url: config.server_tour_location_img_url
            })
        } catch (error) {
            console.log('getAllTOurs : ' + error.message)
        }
    },
    getTourBySlug: async (req, res) => {
        try {
            const response = await tourModel.aggregate([
                {
                    $match: { slug: req.params.tour_slug, status: true }
                },
                {
                    $lookup: {
                        from: 'bookings',
                        localField: '_id',
                        foreignField: 'tour_id',
                        as: 'booking'
                    }
                },
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
                    $lookup: {
                        from: 'tourcategories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $project: {
                        'booking.totalAmount': 0,
                        'booking.createdAt': 0,
                        'booking.razorpay_payment_id': 0,
                        'booking.razorpay_order_id': 0,
                        'booking.userId': 0,
                        'booking. tour_id': 0,
                    }
                }
            ])
            let bookedSeats = 0;
            response[0].booking?.map(item => bookedSeats += item.total_seats)

            if (response.length == 0) return res.status(200).json({ error: 'Not Found' })
            return res.status(200).json({
                bookedSeats,
                tour: response[0],
                tour_img_url: config.server_tour_img_url
            })
        } catch (error) {
            console.log('getTourBySlug : ' + error.message)
        }
    },
    gettourONcheckout: async (req, res) => {
        try {
            const response = await tourModel.aggregate([
                {
                    $match: { slug: req.params.slug, status: true }
                },
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
                    $lookup: {
                        from: 'tourcategories',
                        localField: 'product_category_id',
                        foreignField: '_id',
                        as: 'category'
                    }
                },
                {
                    $unwind: '$category'
                },
                {
                    $project: {
                        travelling_plan: 0,
                        product_location_id: 0,
                        product_category_id: 0,
                        travelling_plan: 0,
                        product_images: 0,
                        product_included: 0,
                        product_excluded: 0,
                        status: 0
                    }
                }
            ])
            if (response.length == 0) return res.status(200).json({ error: 'Not Found' })
            return res.status(200).json({
                tour: response[0],
                tour_img_url: config.server_tour_img_url
            })
        } catch (error) {
            console.log('gettourONcheckout : ' + error.message)
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
            const postresponse = await postModel.aggregate([{ $match: { post_slug: req.params.post_slug } }])
            const commentresponse = await postCommentModel.aggregate([
                {
                    $match: { post_id: postresponse[0]._id }
                },
                {
                    $graphLookup: {
                        from: 'comments',
                        startWith: '$_id',
                        connectFromField: '_id',
                        connectToField: 'parentId',
                        as: 'nestedComments',
                        depthField: 'depth',
                        restrictSearchWithMatch: {
                            parentId: { $ne: null }
                        }
                    }
                }
            ])
            console.log(commentresponse);
            console.log(commentresponse[0].nestedComments);

            if (postresponse.length == 0) return res.status(200).json({ error: 'Not Found' })
            return res.status(200).json({
                post: postresponse[0],
                comments: commentresponse,
                post_img_url: config.server_post_img_url
            })
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
    createPostComment: async (req, res) => {
        try {
            const { post_id, token, comment } = req.body;
            const user = await userModel.findById({ _id: getUser(token) }, { username: 1 })
            const response = await postCommentModel.create({
                username: user.username,
                post_id: new Object(post_id),
                comment: comment.comment
            })
            if (!response) res.status(200).json({ error: 'Failed' })
            return res.status(200).json({ message: 'Your Comment Has Been Under Approval!' })
        } catch (error) {
            console.log('createPostComment : ' + error.message)
        }
    },
    repliesComment: async (req, res) => {
        try {
            const { parentId, token, data, } = req.body;
            const user = await userModel.findById({ _id: getUser(token) }, { username: 1 })
            const createcomment = await postCommentModel.create({
                username: user.username,
                parentId: new Object(parentId),
                comment: data.comment
            })
            if (!createcomment) return res.status(200).json({ error: 'Failed' })
            return res.status(200).json({ message: 'Your comment under Approval.' })
        } catch (error) {
            console.log('repliesComment : ' + error.message)
        }
    },
    // Orders API's
    createBooking: async (req, res) => {
        try {
            const razorpay = new Razorpay({
                key_id: `${config.razorpay_ID}`,
                key_secret: `${config.razorpay_key}`,
            })
            const { total_Amount } = req.body;
            const options = {
                amount: total_Amount * 100, // Amount in USD
                currency: "USD",
                receipt: "qwsaq1",
            }
            const order = await razorpay.orders.create(options)
            return res.status(200).json(order)
        } catch (error) {
            console.log('createOrder : ' + error.message)
        }
    },
    validateBooking: async (req, res) => {
        try {
            const token = req.headers['authorization'].split(' ')[1]
            const { order_id, payment_id, seats, id, amount } = req.body;

            const user = await userModel.findOne({ _id: getUser(token) })
            const response = await tour_booking_model.create({
                razorpay_order_id: order_id,
                razorpay_payment_id: payment_id,
                tour_id: new Object(id),
                total_seats: parseInt(seats),
                userId: user._id,
                totalAmount: amount,
            })
            if (!response) return res.status(200).json({ error: 'Failed' })
            return res.status(200).json({ message: 'Order Created Successfully' })
        } catch (error) {
            console.log('validateOrder : ' + error.message)
        }
    }
}

export default siteControllers