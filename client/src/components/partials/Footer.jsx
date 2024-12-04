import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import axios from 'axios';
import config from '../../config/config'

const Footer = () => {
    console.log('Footer Render')
    const [settings, setsetting] = useState({})

    const fetch = async () => {
        const response = await axios.get(`${config.server_url}/get/site-setting`)
        setsetting(response.data)
    }
    useEffect(() => { fetch() }, [])
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "linear" }}
        >
            <footer>
                <div id="footer">
                    <div className="container">
                        <div className="row row-bottom-padded-md">
                            <div className="col-md-3 col-sm-3 col-xs-12 fh5co-footer-link">
                                <h3>About {settings.siteSetting?.company_name}</h3>
                                <p>{settings.siteSetting?.company_description}</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 fh5co-footer-link">
                                <h3>Company Info</h3>
                                <p>Email : {settings.siteSetting?.email}</p>
                                <p>Phone no : {settings.siteSetting?.company_phone}</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 fh5co-footer-link">
                                <h3>Address</h3>
                                <p>{settings.siteSetting?.company_address}</p>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-12 fh5co-footer-link">
                                <h3>Account</h3>
                                <Link to="/account">My Account</Link>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 text-center">
                                <p>{settings.company_copyright}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </motion.div>
    )
}

export default React.memo(Footer)
