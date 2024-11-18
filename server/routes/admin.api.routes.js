import express from 'express'
import authenticateControllers from '../Controllers/authentication.controllers.js'
import productControllers from '../Controllers/product.contollers.js'
import admincontrollers from '../Controllers/admin.controllers.js'
import postControllers from '../Controllers/post.controllers.js'
import CheckmulterError from '../Middleware/handleMulterError.js'
import { tour_location, tour_category, post_category, post, tour } from '../Middleware/multer.middleware.js'

const router = express.Router()

router.get('/login', (req, res) => res.render('login'))
router.post('/authenticate', authenticateControllers.getAuthenticate)
router.get('/dashboard', admincontrollers.getAdminDashboard)


router.get('/tour/location', (req, res) => res.render('product/tour_location'))
router.get('/tour/category', (req, res) => res.render('product/category'))
router.get('/tour', productControllers.renderTourPage)

router.get('/post/category', (req, res) => res.render('post/category'))
router.get('/posts', postControllers.renderPostPage)

// API Routes for Tour Location
router.get('/api/tour/location', productControllers.getTourLocations)
router.route('/api/tour/location/:id?')
    .post(tour_location.single('featured_img'), CheckmulterError, productControllers.createLoaction)
    .get(productControllers.getsingleTourLocation)
    .put(tour_location.single('featured_img'), CheckmulterError, productControllers.updateTourLocation)
    .delete(productControllers.deleteTourLocation)


//  API Routes for Tour Category
router.get('/api/tour/category', productControllers.getTourCategories)
router.route('/api/tour/category/:id?')
    .post(tour_category.single('featured_image'), CheckmulterError, productControllers.createTourCategory)
    .get(productControllers.getsingleTourCategory)
    .put(tour_category.single('featured_image'), CheckmulterError, productControllers.updateTourCategory)
    .delete(productControllers.deleteTourCategory)


// API Routes for Post Category
router.get('/api/post/categories', postControllers.getPostCategories)
router.route('/api/posts/category/:id?')
    .post(post_category.single('featured_image'), CheckmulterError, postControllers.createPostCategory)
    .get(postControllers.getSinglePostCategory)
    .put(post_category.single('featured_image'), CheckmulterError, postControllers.updatePostCategory)
    .delete(postControllers.deletePostCategory)


// API Routes for Posts
router.get('/api/posts', postControllers.getPosts)
router.route('/api/post/:id?')
    .post(post.single('post_image'), CheckmulterError, postControllers.createPost)
    .get(postControllers.getSinglePost)
    .put(post.single('post_image'), CheckmulterError, postControllers.updatePost)
    .delete(postControllers.deletePost)


// API Routes for Tours
router.get('/api/tours', productControllers.getAllTours)
router.route('/api/tour/:id?')
    .post(tour.fields([
        { name: 'product_images', maxCount: 4 },
        { name: 'featured_image', maxCount: 1 },
    ]), productControllers.createTour)
    .get(productControllers.getSingleTour)
    .put(tour.fields([
        { name: 'product_images', maxCount: 4 },
        { name: 'featured_image', maxCount: 1 },
    ]), productControllers.updateTour)
    .delete(productControllers.deleteTour)
export default router