import { getUser } from "../services/createToken.js"

export const checkAdminIsLogged = async (req, res, next) => {
    try {
        const token = await req.cookies?.authtoken;
        const user = getUser(token)
        if (!token || !user) return res.redirect('/admin/login')
        next()
    } catch (error) {
        console.log('checkAdminIsLogged : ' + error.message)
        return res.redirect('/admin/login')
    }
}
export const checkToken = (req, res, next) => {
    try {
        const token = req.cookies?.authtoken;
        if (token) return res.redirect('/admin/dashboard')
        next()
    } catch (error) {
        console.log('checkToken : ' + error.message)
        return res.redirect('/admin/login')
    }
}