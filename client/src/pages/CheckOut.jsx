import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import config from '../config/config'
import { Button, NoTFound } from '../components/componets'

const CheckOut = () => {
    const { tour_slug } = useParams()
    const navigate = useNavigate()
    const [checkout, setcheckout] = useState({})
    const [error, seterror] = useState(false)
    const { seats, id } = JSON.parse(sessionStorage.getItem('details'))

    const dep_date = new Date(checkout.tour?.deperature_date)
    const return_date = new Date(checkout.tour?.return_date)


    const fetch = async () => {
        const response = await axios.get(`${config.server_url}/checkout/${tour_slug}`)
        if (response.data.error) seterror(true)
        setcheckout(response.data)
    }

    // Handle Payment
    const handlePayment = async () => {
        const token = localStorage.getItem('token')
        if (!token) navigate('/login')

        try {
            const response = await axios.post(`${config.server_url}/tour/order`, {
                total_Amount: checkout.tour?.price * seats
            })
            const options = {
                key: config.razorpay_ID,
                amount: response.data.amount,
                currency: 'INR',
                name: 'Travel',
                description: 'Test Transaction',
                order_id: response.data.id,
                handler: (res) => {
                    // Function That validate order and save into the database
                    validateOrder(res, token, seats, id, checkout.tour?.price * seats)
                },
                theme: {
                    color: '#F37254',
                },
            }
            const rzp1 = new window.Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.error('Error creating order  :', error)
        }
    }

    const validateOrder = async (res, token, seats, id, amount) => {
        try {
            const response = await axios.post(`${config.server_url}/validate/order`, {
                order_id: res.razorpay_order_id,
                payment_id: res.razorpay_payment_id,
                seats, id, amount
            },
                {
                    headers: { 'Authorization': `Bearer ${token}` }

                })
            if (!response.ok) navigate('/cancel')
            navigate('/success')
        } catch (error) {
            console.error('validateOrder : ' + error)
        }
    }
    useEffect(() => {
        fetch()

        // create razorpay script to continue payment gateway
        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script)
        return () => { document.body.removeChild(script) }
    }, [])
    return (
        error
            ? <NoTFound />
            : <div id="fh5co-blog-section" className="fh5co-section-gray">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <h2>
                                {checkout.tour?.title}
                            </h2>
                            <div style={{ width: '100%', height: '400px' }}>
                                <img
                                    src={`${checkout.tour_img_url}/${checkout.tour?.featured_image}`}
                                    alt=""
                                    style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <p style={{ margin: '20px 0' }}
                                dangerouslySetInnerHTML={{ __html: checkout.tour?.description }}
                            />
                        </div>
                        <div className="col-md-5">
                            <div >
                                <h2>Plans Details</h2>
                            </div>
                            <table>
                                <tbody>
                                    <tr className='border-b'>
                                        <td className="font-bold">Plan Name</td>
                                        <td>{checkout.tour?.title}</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Category</td>
                                        <td>{checkout.tour?.category.category_name}</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Location</td>
                                        <td>{checkout.tour?.location.location_name}</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Duration</td>
                                        <td>
                                            {return_date.getDate() - dep_date.getDate()} Days
                                        </td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Dates</td>
                                        <td>
                                            {dep_date.toLocaleDateString()}
                                            -
                                            {return_date.toLocaleDateString()}
                                        </td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Price</td>
                                        <td>${checkout.tour?.price}</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Seats</td>
                                        <td>{seats}</td>
                                    </tr>
                                    <tr className='border-b'>
                                        <td className="font-bold">Amount</td>
                                        <td>${checkout.tour?.price * seats}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="footer">
                                <Button
                                    fn={() => handlePayment()}
                                    type={'submit'}
                                    text={'Confirm Booking'}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )
}

export default CheckOut