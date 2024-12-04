import React, { useEffect } from 'react'
import { Sec_Heading, Tours, ErrorBoundary, Pagination } from '../components/componets'
import { useDispatch, useSelector } from 'react-redux'
import { alltours } from '../features/tour.slice'
import { useParams } from 'react-router'
import axios from 'axios'
import config from '../config/config'

const LocationTours = () => {
    const { location } = useParams()
    const dispatch = useDispatch()
    const locationToursstate = useSelector(state => state.tours)
    const apiURL = `${config.server_url}/destination/${location}`;
    const paginationURL = `/destination/${location}`;

    console.log(locationToursstate);


    const fetch = async () => {
        const response = await axios.get(apiURL)
        dispatch(alltours(response.data))
    }
    useEffect(() => { fetch() }, [])
    return (
        <div id="fh5co-tours" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={`${location.toUpperCase()} TOURS`}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
                    <ErrorBoundary>
                        {
                            locationToursstate.response?.collectionData.length == 0
                                ? <h1 style={{ textAlign: 'center', width: '100%' }}>
                                    {location.toUpperCase()} Tours Unavailable
                                </h1>
                                : locationToursstate.response?.collectionData?.map((tour, i) => (
                                    <Tours
                                        key={i}
                                        location={location.toUpperCase()}
                                        imgPath={`${locationToursstate.tour_img_url}/${tour.featured_image}`}
                                        slug={tour.slug}
                                        price={tour.price}
                                    />
                                ))
                        }
                    </ErrorBoundary>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <ErrorBoundary>
                                <Pagination url={apiURL} paginateurl={paginationURL} slug={location} />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LocationTours
