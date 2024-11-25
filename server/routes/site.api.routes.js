import express from 'express'
import siteControllers from '../Controllers/site.controllers.js'
const router = express.Router()

router.get('/get/tours', siteControllers.gethotTours)
router.get('/get/posts', siteControllers.getPostapiData)

export default router