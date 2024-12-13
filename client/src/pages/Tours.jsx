import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { alltours } from '../features/tour.slice'
import { Sec_Heading, Tour, ErrorBoundary, Pagination } from '../components/componets'
import axios from 'axios'
import config from '../config/config'


const Tours = () => {
    const dispatch = useDispatch()
    const toursState = useSelector(state => state.tours)
    const apiURL = `${config.server_url}/all/tours?page`;
    const paginationURL = '/tours?page';

    const fetchTours = async () => {
        const response = await axios.get(apiURL)
        if (response) dispatch(alltours(response.data))
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
                            toursState.response && toursState.response.collectionData?.map((tour, i) => (
                                <Tour
                                    key={i}
                                    location={tour.location?.location_name}
                                    imgPath={`${toursState.tour_img_url}/${tour.featured_image}`}
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
                            <ErrorBoundary >
                                <Pagination
                                    api={apiURL}
                                    paginateurl={paginationURL}
                                />
                            </ErrorBoundary>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tours
