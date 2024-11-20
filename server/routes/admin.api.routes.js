import express from 'express'
import { checkAdminIsLogged, checkToken } from '../Middleware/CheckAdminAuthentication.js'
import authenticateControllers from '../Controllers/authentication.controllers.js'
import productControllers from '../Controllers/product.contollers.js'
import admincontrollers from '../Controllers/admin.controllers.js'
import postControllers from '../Controllers/post.controllers.js'
import CheckmulterError from '../Middleware/handleMulterError.js'
import { tour_location, tour_category, post_category, post, tour } from '../Middleware/multer.middleware.js'

const router = express.Router()

router.get('/login', checkToken, (req, res) => res.render('login'))
router.get('/logout', authenticateControllers.handleLogout)
router.post('/authenticate', authenticateControllers.getAuthenticate)
router.get('/dashboard', checkAdminIsLogged, admincontrollers.getAdminDashboard)


// Render Routes for Tour Location
router.get('/create/location', checkAdminIsLogged, (req, res) => res.render('product/createLocation'))
router.get('/update/location/:id', checkAdminIsLogged, productControllers.renderUpdateLocation)
router.get('/tour/location', checkAdminIsLogged, productControllers.renderToursLocations)

// API Routes for Tour Location
router.route('/api/tour/location/:id?')
    .post(tour_location.single('featured_img'), CheckmulterError, productControllers.createLoaction)
    .put(tour_location.single('featured_img'), CheckmulterError, productControllers.updateTourLocation)
    .delete(productControllers.deleteTourLocation)

// Render Routes For Tour Category
router.get('/tour/category', checkAdminIsLogged, productControllers.renderTourCategories)
router.get('/create/tour/category', checkAdminIsLogged, (req, res) => res.render('product/createcategory'))
router.get('/update/tour/category/:id', checkAdminIsLogged, productControllers.renderUpdateCategory)

//  API Routes for Tour Category
router.route('/api/tour/category/:id?')
    .post(tour_category.single('featured_image'), CheckmulterError, productControllers.createTourCategory)
    .put(tour_category.single('featured_image'), CheckmulterError, productControllers.updateTourCategory)
    .delete(productControllers.deleteTourCategory)

// Render Routes Post Category
router.get('/post/category', checkAdminIsLogged, postControllers.renderPostCategories)
router.get('/create/category', checkAdminIsLogged, (req, res) => res.render('post/createcategory'))
router.get('/post/category/:id', checkAdminIsLogged, postControllers.renderUpdatePostCategory)

// API Routes for Post Category
router.route('/api/posts/category/:id?')
    .post(post_category.single('featured_image'), CheckmulterError, postControllers.createPostCategory)
    .get(postControllers.getSinglePostCategory)
    .put(post_category.single('featured_image'), CheckmulterError, postControllers.updatePostCategory)
    .delete(postControllers.deletePostCategory)

// Render Routes for Posts
router.get('/posts', checkAdminIsLogged, postControllers.renderPostPage)
router.get('/create/post', checkAdminIsLogged, postControllers.renderCreatePost)
router.get('/update/post/:id', checkAdminIsLogged, postControllers.renderUpdatePostPage)

// API Routes for Posts
router.route('/api/post/:id?')
    .post(post.single('post_image'), CheckmulterError, postControllers.createPost)
    .put(post.single('post_image'), CheckmulterError, postControllers.updatePost)
    .delete(postControllers.deletePost)

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
    .delete(productControllers.deleteTour)

export default router