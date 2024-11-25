import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HotToursAPI } from '../features/location'
import axios from 'axios'
import config from '../config/config'
import { Sec_Heading, Tours, Post, Destination, NaviagteUser } from '../components/componets'

const Index = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.tourlocations)

    useEffect(() => {
        const fetchHotToursAPI = async () => {
            const response = await axios.get(`${config.server_url}/get/tours`)
            dispatch(HotToursAPI(response.data))
        }
        fetchHotToursAPI()
    }, [])
    return (
        <>
            <div id="fh5co-tours" className="fh5co-section-gray">
                <div className="container">
                    <Sec_Heading
                        heading={'Hot Tours'}
                        description={'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'} />
                    <div className="row" style={{ display: 'flex', alignItems: 'stretch' }}>
                        {
                            state.hottours?.map((tour, i) => (
                                <Tours
                                    key={i}
                                    location={tour.location.location_name}
                                    imgPath={`${state.location_img_url}/${tour.location.featured_img}`}
                                    slug={`${tour.tourplan.slug}`}
                                    price={tour.tourplan.price}
                                />
                            ))
                        }
                    </div>
                    <NaviagteUser url={'/'} text={'See All Offers'} />
                </div>
            </div>
            <div id="fh5co-destination">
                <div className="tour-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <ul id="fh5co-destination-list" className="animate-box">
                                {
                                    state.locations?.map((location, i) => {
                                        if (i < 5) {
                                            return <Destination
                                                key={i}
                                                location={location.location_name}
                                                imgPath={`${state.tour_location_img_url}/${location.featured_img}`}
                                            />
                                        }
                                    })
                                }
                                <li class="one-half text-center">
                                    <div class="title-bg">
                                        <div class="case-studies-summary">
                                            <h2>Most Popular Destinations</h2>
                                            <span><a href="#">View All Destinations</a></span>
                                        </div>
                                    </div>
                                </li>
                                {
                                    state.locations?.map((location, i) => {
                                        if (i >= 5 && i < 10) {
                                            return <Destination
                                                key={i}
                                                location={location.location_name}
                                                imgPath={`${state.tour_location_img_url}/${location.featured_img}`}
                                            />
                                        }
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fh5co-blog-section" className="fh5co-section-gray">
                <div className="container">
                    <Sec_Heading
                        heading={'Recent Form Blog'}
                        description={'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit est facilis maiores, perspiciatis accusamus asperiores sint consequuntur debitis.'} />
                    <div className="row row-bottom-padded-md">
                        <Post
                            title={'30% Discount To Travel All World'}
                            date={'Sep 30'}
                            commentLength={21}
                            url={'#'}
                            description={'Far far away, behind the word mountains, far from the countries Vokalia andConsonantia, there live the blind texts.'}
                        />
                    </div>
                    <NaviagteUser url={'/'} text={'See All Offers'} />
                </div>
            </div>
        </>
    )
}

export default Index