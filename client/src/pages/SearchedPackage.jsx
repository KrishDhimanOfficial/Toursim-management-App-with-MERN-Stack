import React, { useEffect } from 'react'
import config from '../config/config'
import { Sec_Heading, Tour, Pagination } from '../components/componets'
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { alltours } from '../features/tour.slice'
import axios from 'axios'

const SearchedPackage = () => {
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams()
    const tours = useSelector(state => state.tours)

    const loc = searchParams.get('loc')
    const dep_date = searchParams.get('dep_date')
    const re_date = searchParams.get('re_date')

    const apiURL = `${config.server_url}/search?loc=${loc}&dep_date=${dep_date}&re_date=${re_date}&page`;
    const paginateurl = `/search?loc=${loc}&dep_date=${dep_date}&re_date=${re_date}&page`;

    const fetch = async () => {
        const response = await axios.get(apiURL)
        if (response && response.status === 200) dispatch(alltours(response.data))
    }
    useEffect(() => { fetch() }, [])
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
            <div className="container">
                <Sec_Heading
                    heading={'Search Results'}
                    description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'}
                />
                <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
                    {
                        tours?.response?.length == 0
                            ? <div className="col-md-12 text-center">
                                <h1>No Packages Available</h1>
                            </div>
                            : tours.response?.collectionData?.map((tour, i) => (
                                <Tour
                                    key={i}
                                    location={tour.location?.location_name}
                                    imgPath={`${tours.tour_img_url}/${tour.featured_image}`}
                                    price={tour.price}
                                    slug={tour.slug}
                                />
                            ))
                    }
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="text-center">
                            <Pagination
                                api={apiURL}
                                paginateurl={paginateurl}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchedPackage
