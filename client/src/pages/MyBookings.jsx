import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import config from '../config/config'

const MyBookings = () => {
    console.log('MyBookings Render');

    const naviagte = useNavigate()
    const [booking, setBooking] = useState({})
    const token = localStorage.getItem('token')
    const apiURL = `${config.server_url}/bookings`;
    const paginationURL = '/mybookings';

    const fetch = async () => {
        const response = await axios.get(apiURL, {
            headers: { 'authorization': `Bearer ${token}` }
        })
        if (response) setBooking(response.data)
    }
    useEffect(() => {
        !token ? naviagte('/login') : fetch()
    }, [])
    return (
        <div id="fh5co-tours" className="fh5co-section-gray">
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <Link to='/forgot/password'>Reset Password</Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center">
                            <h2>Bookings</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Booking ID</th>
                                        <th>Package</th>
                                        <th>Destination</th>
                                        <th>Dep Date</th>
                                        <th>Return Date</th>
                                        <th>Price</th>
                                        <th>Persons</th>
                                        <th>Booking Date</th>
                                    </tr>
                                </thead>
                                <tbody style={{ marginBottom: '20px' }}>
                                    {
                                        booking.response?.collectionData?.map((tour, i) => (
                                            <tr key={i}>
                                                <td className='p-0'>{tour._id}</td>
                                                <td className='p-0'>{tour.tours.title}</td>
                                                <td className='p-0'>
                                                    <p>{tour.location.location_name}</p>
                                                </td>
                                                <td className='p-0'>
                                                    {new Date(tour.tours.deperature_date).toLocaleDateString()}
                                                </td>
                                                <td className='p-0'>
                                                    {new Date(tour.tours.return_date).toLocaleDateString()}
                                                </td>
                                                <td className='p-0'>
                                                    ${tour.tours.price}
                                                </td>
                                                <td className='p-0'>
                                                    {tour.total_seats}
                                                </td>
                                                <td>
                                                    {tour.formattedDate}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookings
