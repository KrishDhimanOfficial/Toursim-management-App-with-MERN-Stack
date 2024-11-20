import express from 'express'
import postcontrollers from '../Controllers/post.controllers.js'
import productControllers from '../Controllers/product.contollers.js'
const router = express.Router()

router.get('/get/all/locations', productControllers.getTourLocations)
router.get('/get/posts',postcontrollers.getPostapiData)

export default router