import express from 'express'
import { checkAdminIsLogged, checkToken } from '../Middleware/CheckAdminAuthentication.js'
import authenticateControllers from '../Controllers/authentication.controllers.js'
import productControllers from '../Controllers/product.contollers.js'
import admincontrollers from '../Controllers/admin.controllers.js'
import postControllers from '../Controllers/post.controllers.js'
import CheckmulterError from '../Middleware/handleMulterError.js'
import categorycontrollers from '../Controllers/category.contollers.js'
import { tour_location, tour_category, post_category, post, tour, logo, banner_image } from '../Middleware/multer.middleware.js'

const router = express.Router()

router.get('/login', checkToken, (req, res) => res.render('login'))
router.get('/logout', authenticateControllers.handleLogout)
router.post('/authenticate', authenticateControllers.getAuthenticate)
router.get('/dashboard', checkAdminIsLogged, admincontrollers.getAdminDashboard)
router.get('/get/admin/details', admincontrollers.adminDetails)
router.get('/tour/bookings', admincontrollers.renderTourBooking)


// Render Routes for Tour Location
router.get('/create/location', checkAdminIsLogged, (req, res) => res.render('product/createLocation'))
router.get('/update/location/:id', checkAdminIsLogged, productControllers.renderUpdateLocation)
router.get('/tour/location', checkAdminIsLogged, productControllers.renderToursLocations)

// API Routes for Tour Location
router.route('/api/tour/location/:id?')
    .post(tour_location.single('featured_img'), CheckmulterError, productControllers.createLoaction)
    .put(tour_location.single('featured_img'), CheckmulterError, productControllers.updateTourLocation)
    .patch(productControllers.updateLocationStatus)
    .delete(productControllers.deleteTourLocation)

// Render Routes For Tour Category
router.get('/tour/category', checkAdminIsLogged, categorycontrollers.renderTourCategories)
router.get('/create/tour/category', checkAdminIsLogged, (req, res) => res.render('product/createcategory'))
router.get('/update/tour/category/:id', checkAdminIsLogged, categorycontrollers.renderUpdateCategory)

//  API Routes for Tour Category
router.route('/api/tour/category/:id?')
    .post(tour_category.single('featured_image'), CheckmulterError, categorycontrollers.createTourCategory)
    .put(tour_category.single('featured_image'), CheckmulterError, categorycontrollers.updateTourCategory)
    .patch(categorycontrollers.updateTourCategoryStatus)
    .delete(categorycontrollers.deleteTourCategory)

// Render Routes Post Category
router.get('/post/category', checkAdminIsLogged, categorycontrollers.renderPostCategories)
router.get('/create/category', checkAdminIsLogged, (req, res) => res.render('post/createcategory'))
router.get('/post/category/:id', checkAdminIsLogged, categorycontrollers.renderUpdatePostCategory)

// API Routes for Post Category
router.route('/api/posts/category/:id?')
    .post(post_category.single('featured_image'), CheckmulterError, categorycontrollers.createPostCategory)
    .get(categorycontrollers.getSinglePostCategory)
    .put(post_category.single('featured_image'), CheckmulterError, categorycontrollers.updatePostCategory)
    .patch(categorycontrollers.updatePostCategoryStatus)
    .delete(categorycontrollers.deletePostCategory)

// Render Routes for Posts
router.get('/posts', checkAdminIsLogged, postControllers.renderPostPage)
router.get('/create/post', checkAdminIsLogged, postControllers.renderCreatePost)
router.get('/update/post/:id', checkAdminIsLogged, postControllers.renderUpdatePostPage)

// API Routes for Posts
router.route('/api/post/:id?')
    .post(post.single('post_image'), CheckmulterError, postControllers.createPost)
    .put(post.single('post_image'), CheckmulterError, postControllers.updatePost)
    .patch(postControllers.updatePostStatus)
    .delete(postControllers.deletePost)

// Render Routes for Post Comments
router.get('/post/comments', checkAdminIsLogged, postControllers.renderPostComments)
router.route('/post/comment/:id?')
    .patch(postControllers.updateCommentStatus)
    .get(postControllers.renderSingleComment)
    .delete(postControllers.deleteComment)

// Render Routes For Tour
router.get('/tour', checkAdminIsLogged, productControllers.renderTourPage)
router.get('/create/tour', checkAdminIsLogged, productControllers.renderCreateTour)
router.get('/update/tour/:id', checkAdminIsLogged, productControllers.renderUpdateTour)

// API Routes for Tours
router.get('/api/tours', productControllers.getAllTours)
router.put('/api/tour/image/:id?', productControllers.setPreviewImages)
router.route('/api/tour/:id?')
    .post(tour.fields([
        { name: 'product_images', maxCount: 4 },
        { name: 'featured_image', maxCount: 1 },
    ]), productControllers.createTour)
    .put(tour.fields([
        { name: 'product_images', maxCount: 4 },
        { name: 'featured_image', maxCount: 1 },
    ]), productControllers.updateTour)
    .patch(productControllers.updateTourStatus)
    .delete(productControllers.deleteTour)


// Profile Setting Routes
router.get('/profile-settings', checkAdminIsLogged, admincontrollers.getAdminDetails)
router.post('/set/details', admincontrollers.changeAdminDetails)
router.put('/set/password', admincontrollers.setAdminPassword)

// Admin General Setting
router.post('/set/general/setting', logo.single('logo'), admincontrollers.setGeneralSetting)
router.get('/general-settings', checkAdminIsLogged, admincontrollers.renderGeneralSetting)

// Site Setting
router.get('/site-settings', checkAdminIsLogged, admincontrollers.renderSiteSetting)
router.post('/set/hot/tours', admincontrollers.setHotTours)
router.post('/set/destinations', admincontrollers.setDestinations)
router.post('/set/recent_posts', admincontrollers.setRecentPosts)

// Banner Setting
router.get('/banner-settings', checkAdminIsLogged, admincontrollers.getBannerSetting)
router.post('/set/banner/setting', banner_image.single('banner_image'), admincontrollers.setBannerSetting)


export default router