const jwt = require('jsonwebtoken')
const config = require('../config/config')

function setUser(user) {
    return jwt.sign(user, config.private_key)
}
function getUser(token) {
    if (!token) { return null }
    return jwt.verify(token, config.private_key)
}
module.exports = { setUser, getUser }