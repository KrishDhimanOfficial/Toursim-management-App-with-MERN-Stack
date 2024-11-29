import axios from 'axios'
import config from '../config/config'

const verifyToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) return false
    const response = await axios.post(`${config.server_url}/verify/token`, { token })
    return response.data
}

export default verifyToken