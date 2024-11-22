import mongoose from 'mongoose'
import authenticateModel from '../models/authenticate.model.js'
import tourModel from '../models/product.model.js'
import general_settingModel from '../models/general_setting.model.js'
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
    }
}
export default admincontrollers