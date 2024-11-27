import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config/config'
import { ErrorBoundary, Destination } from '../componets'


const Destinations_row = () => {
    const [destinations, setdestination] = useState({})

    const fetchTopDestination = async () => {
        const response = await axios.get(`${config.server_url}/top/destination`)
        setdestination(response.data)
    }

    useEffect(() => { fetchTopDestination() }, [])
    return (
        <div id="fh5co-destination">
            <div className="tour-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ul id="fh5co-destination-list" className="animate-box">
                            <ErrorBoundary>
                                {
                                    destinations.array?.map((location, i) => {
                                        if (i < 5) {
                                            return <Destination
                                                key={i}
                                                slug={`/destination/${location.location_name}`}
                                                location={location.location_name}
                                                imgPath={`${destinations.location_img_url}/${location.featured_img}`}
                                            />
                                        }
                                    })
                                }
                            </ErrorBoundary>
                            <li className="one-half text-center">
                                <div className="title-bg">
                                    <div className="case-studies-summary">
                                        <h2>Most Popular Destinations</h2>
                                        <span><Link to={`/tour/destinations`}>View All Destinations</Link></span>
                                    </div>
                                </div>
                            </li>
                            <ErrorBoundary>
                                {
                                    destinations.array?.map((location, i) => {
                                        if (i >= 5 && i < 10) {
                                            return <Destination
                                                key={i}
                                                slug={`/destination/${location.location_name}`}
                                                location={location.location_name}
                                                imgPath={`${destinations.location_img_url}/${location.featured_img}`}
                                            />
                                        }
                                    })
                                }
                            </ErrorBoundary>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Destinations_row
