import mongoose from 'mongoose'
import postModel from '../models/post.model.js'
import tourModel from '../models/product.model.js'
import authenticateModel from '../models/authenticate.model.js'
import tour_locationModel from '../models/tour_location.model.js'
import general_settingModel from '../models/general_setting.model.js'
import {
    hot_tours_model,
    top_destination_model,
    recent_post_model
} from '../models/site_setting.model.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
const ObjectId = mongoose.Types.ObjectId;

const admincontrollers = {
    getAdminDashboard: async (req, res) => {
        try {
            const Toursdata = await tourModel.find({}, { _id: 1 })
            return res.render('index', { Toursdata })
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
            const { id, newpassword } = req.body;
            // Hashing New Password
            const hashedpassword = await bcrypt.hash(newpassword, await bcrypt.genSalt(10))
            const response = await authenticateModel.findByIdAndUpdate(
                { _id: id },
                { password: hashedpassword },
                { new: true }
            )
            if (!response) return res.json({ error: 'Failed!' })
            return res.json({ message: true })
        } catch (error) {
            console.log('setAdminPassword : ' + error.message)
        }
    },
    adminDetails: async (req, res) => {
        try {
            const admin = await authenticateModel.findOne({ role: 'admin' }, { name: 1, role: 1 })
            return res.json({ admin })
        } catch (error) {
            console.log('adminDetails : ' + error.message)
        }
    },
    setGeneralSetting: async (req, res) => {
        try {
            if (!req.body) return res.redirect('/admin/general-settings')
            const { id, company_name, company_address, company_copyright,
                email, company_phone, company_description } = req.body;

            const response = await general_settingModel.findByIdAndUpdate(
                { _id: id },
                {
                    company_name, company_address, company_copyright,
                    email, company_phone,
                    company_description: company_description.trim(),
                    logo: req.file?.filename
                }
            )
            if (!response) return res.redirect('/admin/general-settings')
            return res.redirect('/admin/general-settings')
        } catch (error) {
            console.log('setGeneralSetting : ' + error.message)
        }
    },
    renderGeneralSetting: async (req, res) => {
        try {
            const generalSetting = await general_settingModel.find()
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
            const locations = await tour_locationModel.find(
                { status: true },
                { location_name: 1, _id: 1 }
            )
            const posts = await postModel.aggregate([
                {
                    $lookup: {
                        from: 'postcategories', localField: 'post_category_id',
                        foreignField: '_id', as: 'category'
                    }
                },
                { $match: { 'category.status': true } },
                { $match: { status: true } },
                { $project: { title: 1 } }
            ])
            return res.render('settings/site-setting', {
                locations,
                HotTours: tours[0],
                top_destination: destinations[0],
                posts,
                recents_posts :post[0]
            })
        } catch (error) {
            console.log('renderSiteSetting : ' + error.message)
        }
    },
    setHotTours: async (req, res) => {
        try {
            const response = await hot_tours_model.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    tours_id: Array.isArray(req.body.hottours)
                        ? req.body.hottours.map(id => new Object(id))
                        : [new Object(req.body.hottours)]
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
            const response = await top_destination_model.findByIdAndUpdate(
                { _id: req.body.id },
                {
                    destinations_id: Array.isArray(req.body.destinations)
                        ? req.body.destinations.map(id => new Object(id))
                        : [new Object(req.body.destinations)]
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
                        : [new Object(req.body.recent_posts)]
                }
            )
            if (!response) return res.redirect('/admin/site-settings')
            return res.redirect('/admin/site-settings')
        } catch (error) {
            console.log('setRecentPosts : ' + error.message)
        }
    }
}

export default admincontrollers