import authenticateModel from '../models/authenticate.model.js'
import { setUser } from '../services/createToken.js'

const authenticateControllers = {
    getAuthenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await authenticateModel.findOne({ email })
            const isMatch = password === admin.password;
            if (isMatch && admin.role === 'admin') {
                const token = setUser(admin._id.toString())
                res.cookie('authtoken', token)
                return res.redirect('/admin/dashboard')
            } else {
                return res.redirect('/admin/login')
            }
        } catch (error) {
            console.log('getAuthenticate : ' + error.message)
        }
    }
}
export default authenticateControllers