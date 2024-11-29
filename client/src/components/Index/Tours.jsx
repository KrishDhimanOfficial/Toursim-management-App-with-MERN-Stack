import React from 'react'
import { Link } from 'react-router-dom'
import paris from '../../assets/images/paris.webp'

const Tours = ({ imgPath, location, slug, price }) => {
    console.log('Tour  Render')
    return (
        <div className="col-md-4 col-sm-6 fh5co-tours">
                <div style={{height:'100%'}}>
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
        </div>
    )
}

export default Tours
