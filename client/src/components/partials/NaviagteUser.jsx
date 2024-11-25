import React from 'react'
import { Link } from 'react-router-dom'

const NaviagteUser = ({ url, text }) => {
    return (
        <div className="row">
            <div className="col-md-12 text-center animate-box">
            <p>
                <Link to={url} className="btn btn-primary btn-outline btn-lg" >
                    {text}
                    <i className="icon-arrow-right22"></i>
                </Link>
            </p>
        </div>
        </div>
    )
}

export default NaviagteUser
