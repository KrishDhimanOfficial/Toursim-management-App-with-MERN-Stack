import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import paris from '../../assets/images/paris.webp'

const Tour = ({ imgPath, location, slug, price }) => {
    console.log('Tour  Render')
    return (
        <motion.div className="col-md-4 col-sm-6 fh5co-tours"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'linear' }}
        >
            <div style={{ height: '100%' }}>
                <img
                    src={imgPath || paris} alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div className="desc">
                    <h3>{location}</h3>
                    <span className='price'>$ {price}</span>
                    <Link className="btn btn-primary btn-outline" to={`/tour/${slug}`}>
                        Book Now
                        <i className="icon-arrow-right22"></i>
                    </Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Tour
