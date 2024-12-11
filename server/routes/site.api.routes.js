import express from 'express'
import siteControllers from '../Controllers/site.controllers.js'
import authenticateControllers from '../Controllers/authentication.controllers.js'
const router = express.Router()

// Auth API's
router.post('/register', authenticateControllers.register)
router.post('/login', authenticateControllers.LoginUser)
router.post('/forgot/password', authenticateControllers.forgotPassword)
router.post('/verify/token', authenticateControllers.chechUserIsAuthenticated)

// HomePage Setting API's
router.get('/get/tours', siteControllers.gethotTours)
router.get('/top/destination', siteControllers.getDestionation)
router.get('/top/posts', siteControllers.getTopPosts)

// Tour's Pages
router.get('/search', siteControllers.searchTourPackages)
router.get('/all/tours', siteControllers.getAllTOurs)
router.get('/tour/:tour_slug', siteControllers.getTourBySlug)
router.get('/destination/:location', siteControllers.getToursBYLocation)

// Post's Page
router.get('/all/posts', siteControllers.getAllPosts)
router.get('/single/post/:post_slug', siteControllers.getSinglePost)
router.get('/post/categories', siteControllers.getCategories)
router.get('/category/posts/:slug', siteControllers.getpostbyCategory)

// Post Comment API's
router.post('/post/comment', siteControllers.createPostComment)
router.post('/reply/comment', siteControllers.repliesComment)

// Tour Checkout
router.get('/checkout/:slug', siteControllers.gettourONcheckout)
router.post('/tour/order', siteControllers.createBooking)
router.post('/validate/order', siteControllers.validateBooking)

// Site Setting
router.get('/get/site-setting', siteControllers.getSiteSetting)
router.get('/get/banner/setting', siteControllers.getBannerSetting)

// User Account
router.get('/bookings', siteControllers.getUserTourBooking)

export default router