import axios from 'axios'
import config from '../config/config'

const verifyToken = async () => {
    const token = localStorage.getItem('token')
    const response = await axios.post(`${config.server_url}/verify/token`, { token })
    if (!response) return false
    return response.data
}

export default verifyToken