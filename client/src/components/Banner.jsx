import React from 'react'
import { Link } from 'react-router-dom'
import { SeachForm } from './componets'

function Banner() {
    return (
        <div className="fh5co-hero">
            <div className="fh5co-overlay"></div>
            <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={
                { backgroundImage: '' }
            }>
                <div className="desc">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 col-md-5">
                                <div className="tabulation animate-box">

                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation" className="active">
                                            <Link to='' aria-controls="flights" role="tab" data-toggle="tab">
                                                Tours</Link>
                                        </li>
                                    </ul>
                                    <SeachForm />
                                </div>
                            </div>
                            <div className="desc2 animate-box">
                                <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                                    <h2>Exclusive Limited Time Offer</h2>
                                    <h3>Fly to Hong Kong via Los Angeles, USA</h3>
                                    <span className="price">$599</span>
                                    <p>
                                        <Link to="#" className="btn btn-primary btn-lg">Get Started</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Banner
