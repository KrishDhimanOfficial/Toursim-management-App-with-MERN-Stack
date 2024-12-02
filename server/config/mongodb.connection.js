import mongoose from 'mongoose'
import config from './config.js'

const connectDB = async () => {
    try {
        mongoose.connect(`${config.mongodb_url}`)
        console.log('mongodb conntected!')
    } catch (error) {
        console.log('mongodb not conntected!')
        process.exit(1)
    }
}
export default connectDB