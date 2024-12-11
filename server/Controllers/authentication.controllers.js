import authenticateModel from '../models/authenticate.model.js'
import bcrypt from 'bcrypt'
import { getUser, setUser } from '../services/createToken.js'

const authenticateControllers = {
    getAuthenticate: async (req, res) => {
        try {
            const { email, password } = req.body;
            const admin = await authenticateModel.findOne({ email })
            const isMatch = await bcrypt.compare(password, admin.password)
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
    },
    handleLogout: async (req, res) => {
        try {
            const token = req.cookies?.authtoken;
            if (token) {
                res.clearCookie('authtoken')
                return res.redirect('/admin/login')
            }
        } catch (error) {
            console.log('handleLogout : ' + error.message)
        }
    },
    register: async (req, res) => {
        try {
            const { name, username, email, password } = req.body;
            const checkUserExists = await authenticateModel.findOne({ email })
            if (checkUserExists) {
                res.status(200).json({ error: 'You Already Have An Account.' })
            } else {
                const response = authenticateModel.create(
                    {
                        name, username, email,
                        password: await bcrypt.hash(password, 10)
                    }
                )
                if (!response) res.status(200).json({ error: 'Registration unsuccessful.' })
                return res.status(200).json({ message: true })
            }
        } catch (error) {
            console.log('register : ' + error.message)
        }
    },
    LoginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await authenticateModel.findOne({ email })
            if (!user) return res.status(200).json({ error: 'Input Fields Are Incorrect' })

            // Match that password for login
            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch && user.role === 'user') {
                return res.status(200).json({ error: 'Input Fields Are Incorrect' })
            } else {
                // sending token to front
                const token = setUser(user._id.toString())
                return res.status(200).json({ token, message: 'Login Successfully' })
            }
        } catch (error) {
            console.log('authenicateUser : ' + error.message)
        }
    },
    forgotPassword: async (req, res) => {
        try {
            const { email, oldpassword, newpassword } = req.body;
            // Find User
            const checkUser = await authenticateModel.findOne({ email })

            if (!checkUser) return res.status(200).json({ error: 'User Not Found!' })
            // Find User With Email
            const isMatch = await bcrypt.compare(oldpassword, checkUser.password)

            if (!isMatch && checkUser.role == 'user') {
                return res.status(200).json({ error: 'Check Input Fields' })
            } else {
                // Update the user passsword
                const response = await authenticateModel.findOneAndUpdate(
                    { email },
                    { password: await bcrypt.hash(newpassword, 10) },
                    { new: true }
                )
                if (!response) return res.status(200).json({ error: 'Password Update Unsuccessful' })
                return res.status(200).json({ message: 'Password Updated Successfully' })
            }
        } catch (error) {
            console.log('forgotPassword : ' + error.message)
        }
    },
    chechUserIsAuthenticated: async (req, res) => {
        try {
            const { token } = req.body;
            const user = await authenticateModel.findById(
                { _id: getUser(token) },
                { password: 0, role: 0, }
            )
            if (!user) return res.status(200).json({
                error: 'User Not Found!'
            })
            return res.status(200).json(user)
        } catch (error) {
            console.log('chechUserIsAuthenticated : ' + error.message)
        }
    }
}
export default authenticateControllers