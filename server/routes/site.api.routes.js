import express from 'express'
import productControllers from '../Controllers/product.contollers.js'
const router = express.Router()

router.get('/get/all/locations', productControllers.getTourLocations)

export default router