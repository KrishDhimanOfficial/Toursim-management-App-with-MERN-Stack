import jwt from 'jsonwebtoken'
import config from '../config/config.js'


export function setUser(user) {
    return jwt.sign(user, config.private_key)
}
export function getUser(token) {
    if (!token) { return null }
    return jwt.verify(token, config.private_key)
}