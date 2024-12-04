import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import config from '../config/config';
import { BookTour, SingleTourSection, NoTFound } from '../components/componets'

const SingleTour = () => {
    const [loading, setloading] = useState(false)
    const [singletour, settour] = useState({})
    const { tour_slug } = useParams()
    const [error, seterror] = useState(false)

    const fetchSingleTour = async () => {
        setloading(true)
        const response = await axios.get(`${config.server_url}/tour/${tour_slug}`)
        if (response.data.error) seterror(true)
        settour(response.data)
        setloading(false)
    }

    useEffect(() => { fetchSingleTour() }, [])
    return (
        error
            ? <NoTFound />
            : <div id="fh5co-blog-section" className="fh5co-section-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <SingleTourSection
                                singletour={singletour}
                            />
                        </div>
                        <div className="col-md-4">
                            <BookTour
                                singletour={singletour}
                            />
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SingleTour
