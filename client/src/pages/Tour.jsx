import React, { useEffect, useState } from 'react'
import config from '../config/config'
import { Sec_Heading, Tours, ErrorBoundary } from '../components/componets'
import axios from 'axios'


const Tour = () => {
    const [tours, setTours] = useState({})
    // console.log(tours);

    const fetchTours = async () => {
        const response = await axios.get(`${config.server_url}/all/tours`)
        console.log(response);
        setTours(response.data)
    }
    useEffect(() => { fetchTours() }, [])
    return (
        <div id="fh5co-tours" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'All Tours'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <ErrorBoundary>
                        {
                            tours.response?.map((tour, i) => (
                                <Tours
                                    key={i}
                                    location={tour.location.location_name}
                                    imgPath={`${tours.location_img_url}/${tour.location.featured_img}`}
                                    slug={`/tour/${tour.slug}`}
                                    price={tour.price}
                                />
                            ))
                        }
                    </ErrorBoundary>
                </div>
            </div>
        </div>
    )
}

export default Tour
