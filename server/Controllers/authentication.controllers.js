import authenticateModel from '../models/authenticate.model.js'
import config from '../config/config.js'

const authenticateControllers = {
    getAuthenticate: async (req, res) => {
        try {
            console.log(req.body)
            authenticateModel.create(req.body)
        } catch (error) {
            console.log('getAuthenticate : ' + error.message)
        }
    }
}
export default authenticateControllers