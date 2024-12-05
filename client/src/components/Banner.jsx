import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { SearchForm } from '../components/componets'
import config from '../config/config'


function Banner() {
    const [setting, setsetting] = useState({})

    const fetch = async () => {
        const response = await axios.get(`${config.server_url}/get/banner/setting`)
        if (response) setsetting(response.data)
    }
    useEffect(() => { fetch() }, [])
    return (
        <div className="fh5co-hero">
            <div className="fh5co-overlay">
            </div>
            <div className="fh5co-cover" data-stellar-background-ratio="0.5" style={
                {
                    backgroundImage: `url(${setting.banner_img_url}/${setting.response?.banner_image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }
            }>
                <div className="desc">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 col-md-5">
                                <div className="tabulation animate-box">
                                    <SearchForm />
                                </div>
                            </div>
                            <div className="desc2 animate-box">
                                <div className="col-sm-7 col-sm-push-1 col-md-7 col-md-push-1">
                                    <h2>{setting.response?.banner_title}</h2>
                                    <h3>{setting.response?.banner_subtitle}</h3>
                                    <span className="price">
                                        ${setting.tour?.price}
                                    </span>
                                    <p>
                                        <Link to={`/tour/${setting.tour?.slug}`} className="btn btn-primary btn-lg">Get Started</Link>
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
