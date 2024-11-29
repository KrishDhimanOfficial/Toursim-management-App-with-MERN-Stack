import React, { useState, useEffect } from 'react'
import axios from 'axios'
import config from '../../config/config'
import { motion } from "motion/react"
import { Sec_Heading, Tours, NaviagteUser, ErrorBoundary } from '../componets'

const Tour_row = () => {
    const [Tour, setTopTours] = useState([])
    console.log('Tour row Render');


    const fetchHotToursAPI = async () => {
        const response = await axios.get(`${config.server_url}/get/tours`)
        setTopTours(response.data)
    }
    useEffect(() => { fetchHotToursAPI() }, [])
    return (
        <div id="fh5co-tours" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Hot Tours'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <ErrorBoundary>
                        {
                            Tour.hottours?.map((tour, i) => (
                                <Tours
                                    key={i}
                                    location={tour.location.location_name}
                                    imgPath={`${Tour.location_img_url}/${tour.location.featured_img}`}
                                    slug={`${tour.tourplan.slug}`}
                                    price={tour.tourplan.price}
                                />
                            ))
                        }
                    </ErrorBoundary>
                </div>
                <NaviagteUser url={'/tours'} text={'See All Offers'} />
            </div>
        </div>
    )
}

export default Tour_row
