import mongoose from 'mongoose'
import config from './config.js'

const options = {
    serverSelectionTimeoutMS: 5000,
    dbName: 'tourism_management_app'
}

const connectDB = async () => {
    try {
        await mongoose.connect(`${config.mongodb_url}`, options)
        console.log('mongodb conntected!')
    } catch (error) {
        console.log('mongodb not conntected!')
        console.log(error.message)
        process.exit(1)
    }
}
export default connectDB