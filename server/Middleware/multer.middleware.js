import multer from 'multer'
import path from 'path'

const MAX_SIZE = 1 * 1024 * 1024;

const createStorage = (dir) => multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `./uploads/${dir}`)
    },
    filename: (req, file, cb) => {
        const randomNo = Math.round(Math.random() * 10)
        const newFileName = `${Date.now()}${randomNo}${path.extname(file.originalname)}`;
        cb(null, newFileName)
    }
})
const fileFilter = (req, file, cb) => {
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    const ext = path.extname(file.originalname).toLowerCase()

    // Check file extension
    if (!allowedExtensions.includes(ext)) {
        return cb(new Error('only jpg, png, webp are allowed'), false)
    }
    cb(null, true)
}


export const tour_location = multer({
    storage: createStorage('tour_location_images'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})
export const tour_category = multer({
    storage: createStorage('tour_category_images'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})
export const post_category = multer({
    storage: createStorage('post_category_images'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})
export const post = multer({
    storage: createStorage('post_images'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})
export const tour = multer({
    storage: createStorage('tour_images'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})
export const logo = multer({
    storage: createStorage('logo'),
    limits: { fileSize: MAX_SIZE },
    fileFilter: fileFilter
})