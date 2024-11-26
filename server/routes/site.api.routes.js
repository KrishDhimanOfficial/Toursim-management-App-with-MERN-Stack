import express from 'express'
import siteControllers from '../Controllers/site.controllers.js'
const router = express.Router()

router.get('/get/tours', siteControllers.gethotTours)
router.get('/top/destination', siteControllers.getDestionation)
router.get('/top/posts', siteControllers.getTopPosts)


router.get('/all/tours', siteControllers.getAllTOurs)
export default router