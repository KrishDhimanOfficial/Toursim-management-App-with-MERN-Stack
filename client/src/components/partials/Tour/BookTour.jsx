import React, { useRef, useState } from 'react'
import { Button } from '../../componets'
import { useNavigate } from 'react-router'

const BookTour = ({ singletour }) => {
    const [seats, setseats] = useState(1)
    const btnref = useRef()
    const navigate = useNavigate()


    const dep_date = new Date(singletour.tour?.deperature_date)
    const return_date = new Date(singletour.tour?.return_date)

    const bookTour = async () => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        } else {
            // Navigate the User if it verify
            sessionStorage.setItem('details', JSON.stringify({ seats, id: singletour.tour._id }))
            navigate(`/checkout/${singletour.tour.slug}`)
        }
    }

    return (
        <div className="bg-white border border-gray-300 rounded-lg p-6 w-full">
            <h1 className="font-bold text-orange-600 text-center">
                Book the Tour
            </h1>
            <p className="text-center font-semibold text-gray-800 mt-2">
                Basic Price $ {singletour.tour?.price}
            </p>
            <div className="mt-4">
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Departure Date:</span>
                    <span className="text-gray-800">{dep_date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Return Date:</span>
                    <span className="text-gray-800">{return_date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Capacity:</span>
                    <span className="text-gray-800">
                        {singletour.tour?.total_Seats}
                    </span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Available:</span>
                    <span className="text-gray-800">
                        {singletour.tour?.total_Seats - singletour.bookedSeats}
                    </span>
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Persons</span>
                    <input
                        onChange={(e) => {
                            setseats(() => {
                                if (e.target.value < 0) {
                                    return 0
                                } else if (e.target.value > singletour.tour?.total_Seats - singletour.bookedSeats) {
                                    return singletour.tour?.total_Seats - singletour.bookedSeats
                                } else {
                                    return e.target.value
                                }
                            })
                        }}
                        value={seats}
                        type="number"
                        className="text-center border border-gray-300 rounded-md"
                    />
                </div>
                <div className="flex justify-between py-3 border-t border-gray-200">
                    <span className="font-bold text-gray-800">Total Amount:</span>
                    <span className="text-gray-800">
                        {singletour.tour?.price * seats}
                    </span>
                </div>
            </div>
            <Button
                ref={btnref}
                fn={() => bookTour()}
                classes={'btn'}
                type={'button'}
                text={'BOOK NOW'}
            />
        </div>
    )
}

export default React.memo(BookTour)
