import React from 'react'
import { Link } from 'react-router-dom'

const Destination = ({ location, imgPath,slug }) => {
    return (
        <li className="one-forth text-center" style={{
            backgroundImage: `url(${imgPath})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <Link to={`${slug.toLowerCase()}`}>
                <div className="case-studies-summary">
                    <h2>{location}</h2>
                </div>
            </Link>
        </li>
    )
}

export default Destination
