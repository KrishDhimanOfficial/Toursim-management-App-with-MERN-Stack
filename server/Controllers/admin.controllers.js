import mongoose from 'mongoose'
import postModel from '../models/post.model.js'
import tourModel from '../models/product.model.js'
import authenticateModel from '../models/authenticate.model.js'
import tour_locationModel from '../models/tour_location.model.js'
import general_settingModel from '../models/general_setting.model.js'
import tour_booking_model from '../models/order.model.js'
import banner_setting_model from '../models/banner_setting.js'
import { hot_tours_model, top_destination_model, recent_post_model } from '../models/site_setting.model.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import deleteImage from '../services/deleteImg.js'
const ObjectId = mongoose.Types.ObjectId;

const admincontrollers = {
    getAdminDashboard: async (req, res) => {
        try {
            const Toursdata = await tourModel.find({}, { _id: 1 })
            const bookings = await tour_booking_model.find({}, { _id: 1 })
            const posts = await postModel.find({}, { _id: 1 })

            return res.render('index', { Toursdata, bookings, posts })
        } catch (error) {
            console.log('getAdminDashboard : ' + error.message)
        }
    },
    getTourLocations: async (req, res) => {
        try {
            return res.render('product/tour_location')
        } catch (error) {
            console.log('getTourLocations : ' + error.message)
        }
    },
    getAdminDetails: async (req, res) => {
        try {
            const admin = await authenticateModel.findOne({ role: 'admin' })
            return res.render('settings/profile-setting', { admin })
        } catch (error) {
            console.log('getAdminDetails : ' + error.message)
        }
    },
    changeAdminDetails: async (req, res) => {
        try {
            const { id, email, username, name } = req.body;
            const response = await authenticateModel.findByIdAndUpdate(
                { _id: new ObjectId(id) },
                {
                    name,
                    email: email.toLowerCase(),
                    username: username.toLowerCase()
                },
                { new: true }
            )
            if (!response) return res.redirect('/admin/profile-settings')
            return res.redirect('/admin/profile-settings')
        } catch (error) {
            console.log('changeAdminDetails : ' + error.message)
        }
    },
    setAdminPassword: async (req, res) => {
        try {
            const { id, oldpassword, newpassword } = req.body;
            const admin = await authenticateModel.findById({ _id: id })
            const isMatch = await bcrypt.compare(oldpassword, admin.password)

            if (!isMatch) {
                return res.json({ error: 'Failed!' })
            } else {
                // Hashing New Password
                const hashedpassword = await bcrypt.hash(newpassword, await bcrypt.genSalt(10))
                const response = await authenticateModel.findByIdAndUpdate(
                    { _id: id },
                    { password: hashedpassword },
                    { new: true }
                )
                if (!response) return res.json({ error: 'Failed!' })
                return res.json({ message: true })
            }
        } catch (error) {
            console.log('setAdminPassword : ' + error.message)
        }
    },
    adminDetails: async (req, res) => {
        try {
            const general_setting = await general_settingModel.findOne({}, { company_name: 1, company_copyright: 1, logo: 1 })
            const admin = await authenticateModel.findOne({ role: 'admin' }, { name: 1, role: 1 })
            return res.json({
                admin, general_setting,
                logo_img_url: config.server_company_logo_img_url
            })
        } catch (error) {
            console.log('adminDetails : ' + error.message)
        }
    },
    setGeneralSetting: async (req, res) => {
        try {
            if (!req.body) return res.redirect('/admin/general-settings')
            const { id, company_name, company_address, company_copyright,
                email, company_phone, company_description } = req.body;

            // Find previous Image And Remove
            const previmage = await general_settingModel.findById({ _id: id })
            const response = await general_settingModel.findByIdAndUpdate(
                { _id: id },
                {
                    company_name, company_address, company_copyright,
                    email, company_phone,
                    company_description: company_description.trim(),
                    logo: req.file?.filename
                }
            )
            if (req.file?.filename) deleteImage(`logo/${previmage.logo}`)
            if (!response) return res.redirect('/admin/general-settings')
            return res.redirect('/admin/general-settings')
        } catch (error) {
            await deleteImage(`logo/${req.file?.filename}`)
            console.log('setGeneralSetting : ' + error.message)
        }
    },
    renderGeneralSetting: async (req, res) => {
        try {
            const generalSetting = await general_settingModel.find({})
            return res.render('settings/general-setting', {
                setting: generalSetting[0],
                logo_url: config.server_company_logo_img_url
            })
        } catch (error) {
            console.log('renderGeneralSetting : ' + error.message)
        }
    },
    renderSiteSetting: async (req, res) => {
        try {
            const tours = await hot_tours_model.find({})
            const destinations = await top_destination_model.find({})
            const post = await recent_post_model.find({})
            const locations = await tour_locationModel.find({ status: true }, { location_name: 1, _id: 1 })
            const hottours = await tourModel.find({ status: true }, { title: 1, _id: 1 })

            const posts = await postModel.aggregate([
                {
                    $lookup: {
                        from: 'postcategories', localField: 'post_category_id',
                        foreignField: '_id', as: 'category'
                    }
                },
                {
                    $match: {
                        'category.status': true,
                        status: true
                    }
                },
                { $project: { title: 1 } }
            ])

            return res.render('settings/site-setting', {
                hottours,
                locations,
                HotTours: tours[0],
                top_destination: destinations[0],
                posts,
                recents_posts: post[0]
            })
        } catch (error) {
            console.log('renderSiteSetting : ' + error.message)
        }
    },
    setHotTours: async (req, res) => {
        try {
            const { id, hottours } = req.body;
            const response = await hot_tours_model.findByIdAndUpdate(
                { _id: id },
                {
                    tours_id: Array.isArray(hottours)
                        ? hottours.map(id => new Object(id))
                        : hottours ? [new Object(hottours)] : []
                }
            )
            if (!response) return res.redirect('/admin/site-settings')
            return res.redirect('/admin/site-settings')
        } catch (error) {
            console.log('setHotTours : ' + error.message)
        }
    },
    setDestinations: async (req, res) => {
        try {
            const { id, destinations } = req.body;
            const response = await top_destination_model.findByIdAndUpdate(
                { _id: id },
                {
                    destinations_id: Array.isArray(destinations)
                        ? destinations.map(id => new Object(id))
                        : destinations ? [new Object(destinations)] : []
                }
            )
            if (!response) return res.redirect('/admin/site-settings')
            return res.redirect('/admin/site-settings')
        } catch (error) {
            console.log('setDestinations : ' + error.message)
        }
    },
    setRecentPosts: async (req, res) => {
        try {
            const response = await recent_post_model.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    posts_id: Array.isArray(req.body.recent_posts)
                        ? req.body.recent_posts.map(id => new Object(id))
                        : req.body.recent_posts ? [new Object(req.body.recent_posts)] : []
                }
            )
            if (!response) return res.redirect('/admin/site-settings')
            return res.redirect('/admin/site-settings')
        } catch (error) {
            console.log('setRecentPosts : ' + error.message)
        }
    },
    renderTourBooking: async (req, res) => {
        try {
            const tour_bookings = await tour_booking_model.aggregate([
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userId',
                        foreignField: '_id',
                        as: 'user'
                    }
                },
                { $unwind: '$user' },
                {
                    $lookup: {
                        from: 'tourplans',
                        localField: 'tour_id',
                        foreignField: '_id',
                        as: 'tour'
                    }
                },
                { $unwind: '$tour' },
                {
                    $lookup: {
                        from: 'tour-locations',
                        localField: 'tour.product_location_id',
                        foreignField: '_id',
                        as: 'location'
                    }
                },
                { $unwind: '$location' },
                {
                    $addFields: {
                        formattedDate: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$createdAt"
                            }
                        }
                    }
                },
                {
                    $project: {
                        total_seats: 1,
                        totalAmount: 1,
                        'location.location_name': 1,
                        'tour.title': 1,
                        'tour.featured_image': 1,
                        formattedDate: 1
                    }
                }
            ])
            return res.render('booking/bookings', {
                tour_bookings,
                tour_img_url: config.server_tour_img_url
            })
        } catch (error) {
            console.log('renderTourBooking : ' + error.message)
        }
    },
    getBannerSetting: async (req, res) => {
        try {
            const bannerSetting = await banner_setting_model.findOne({})
            const tours = await tourModel.find({}, { title: 1, })
            return res.render('settings/Banner-setting', {
                tours, bannerSetting,
                banner_img_url: config.server_banner_img_url
            })
        } catch (error) {
            console.log('getBannerSetting : ' + error.message)
        }
    },
    setBannerSetting: async (req, res) => {
        try {
            const { banner_link, banner_subtitle, banner_title, id } = req.body;
            const image = await banner_setting_model.findById({ _id: id })
            const response = await banner_setting_model.findByIdAndUpdate(
                { _id: id },
                {
                    banner_link: new Object(banner_link),
                    banner_subtitle, banner_title,
                    banner_image: req.file?.filename
                },
                { new: true }
            )
            if (req.file?.filename) deleteImage(`banner_image/${image.banner_image}`)
            if (!response) res.redirect('/admin/banner-settings')
            return res.redirect('/admin/banner-settings')
        } catch (error) {
            await deleteImage(`banner_image/${req.file?.filename}`)
            console.log('setBannerSetting : ' + error.message)
        }
    }
}

export default admincontrollers