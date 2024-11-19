import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cluster from 'cluster'
import numCPUs from 'os'
import connectDB from './config/mongodb.connection.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import adminRoutes from './routes/admin.api.routes.js'
import siteRoutes from './routes/site.api.routes.js'

dotenv.config()
const app = express()

if (cluster.isPrimary) {
    for (let i = 0; i < numCPUs.availableParallelism(); ++i) { cluster.fork() }
    console.log(`Primary ${process.pid} is running`)
    cluster.fork().on('online', () => console.log(`worker online`))
    cluster.on('exit', (worker, code, signal) => console.log(`worker ${worker.process.pid} died`))
} else {
    connectDB() // connection to mongoDB

    // middlewares
    app.use(cors(
        {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        }
    ))
    app.use(cookieParser())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    app.use('/uploads', express.static('uploads'))
    app.use('/assets', express.static('assets'))

    // view Engine
    app.set('views', app.use('/views', express.static('views')))
    app.set('view engine', 'ejs')
    app.set('views', 'views')

    // Routes
    app.use('/api', siteRoutes)
    app.use('/admin', adminRoutes)
    app.use('/*', (req, res) => {
        return res.render('partials/404')
    })

    app.listen(config.port, () => {
        try {
            console.log(`Running on http://localhost:${config.port}`)
        } catch (error) {
            console.log('Server crash : ' + error.message)
        }
    })
}