import React from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'

const Footer = () => {
    console.log('Footer Render');

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
                            <div className="col-md-2 col-sm-2 col-xs-12 fh5co-footer-link">
                                <h3>About Travel</h3>
                                <p>Far far away, behind the word mountains, far from the countries Vokalia and
                                    Consonantia, there live the blind texts.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-md-offset-3 text-center">
                                <p className="fh5co-social-icons">
                                    <Link to="#"><i className="icon-twitter2"></i></Link>
                                    <Link to="#"><i className="icon-facebook2"></i></Link>
                                    <Link to="#"><i className="icon-instagram"></i></Link>
                                    <Link to="#"><i className="icon-dribbble2"></i></Link>
                                    <Link to="#"><i className="icon-youtube"></i></Link>
                                </p>
                                <p>Copyright 2016 All Rights Reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </motion.div>
    )
}

export default Footer
