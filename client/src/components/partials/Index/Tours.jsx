import React from 'react'
import { Link } from 'react-router-dom'
import paris from '../../../assets/images/paris.webp'

const Tours = ({ imgPath, location, price }) => {
    return (
        <div className="col-md-4 col-sm-6 fh5co-tours animate-box" data-animate-effect="fadeIn">
            <div>
                <img src={imgPath || paris} alt=""
                    className="img-responsive" />
                <div className="desc">
                    <span></span>
                    <h3>{location}</h3>
                    {/* <span>3 nights + Flight 5*Hotel</span> */}
                    <span className="price">${price}</span>
                    <Link className="btn btn-primary btn-outline" to="">
                        Book Now
                        <i className="icon-arrow-right22"></i>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Tours
