import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router';
import config from '../config/config';
import { BookTour, SingleTourSection } from '../components/componets'

const SingleTour = () => {
    const [loading, setloading] = useState(false)
    const [singletour, settour] = useState({})
    const { tour_slug } = useParams()
    const navigate = useNavigate()
    



    const fetchSingleTour = async () => {
        setloading(true)
        const response = await axios.get(`${config.server_url}/tour/${tour_slug}`)
        if (response.data.error) return navigate(`/`)
        settour(response.data)
        setloading(false)
    }
    useEffect(() => { fetchSingleTour() }, [])
    return (
        <div id="fh5co-blog-section" className="fh5co-section-gray">
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
