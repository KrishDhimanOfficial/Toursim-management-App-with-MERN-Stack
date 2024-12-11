import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form"
import { Button, ErrorAlert, SuccessAlert } from '../../componets'
import axios from 'axios'
import { Link } from 'react-router-dom'
import config from '../../../config/config'

const ForgotPassword = () => {
    const btnref = useRef()
    const { register, handleSubmit } = useForm()
    const [error, seterror] = useState(null)
    const [success, setsuccess] = useState(null)


    const submitForm = async (data) => {
        const response = await axios.post(`${config.server_url}/forgot/password`, data)
        if (response.data.error) {
            seterror(response.data.error)
        } else if (response.data.message) {
            setsuccess(response.data.message)
            localStorage.removeItem('token')
        }
    }
    return (
        <div className="container" style={{ height: '100%', alignContent: 'center', }}>
            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-md-4">
                    <form className="form" onSubmit={handleSubmit(submitForm)}>
                        <h1>Reset Password</h1>

                        <div className="flex-column">
                            <label>Email </label>
                        </div>
                        <div className="inputForm">
                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                                <g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g>
                            </svg>
                            <input
                                {...register('email', { pattern: /^[a-z0-9]+@gmail.com$/ })}
                                type="text"
                                className="input"
                                placeholder="Enter your Email"
                                required />
                        </div>

                        <div className="flex-column">
                            <label>Current Password </label>
                        </div>
                        <div className="inputForm">
                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                                <g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g>
                            </svg>
                            <input
                                {...register('oldpassword')}
                                type="password"
                                className="input"
                                placeholder="Enter your Current Password"
                                required />
                        </div>

                        <div className="flex-column">
                            <label>New Password </label>
                        </div>
                        <div className="inputForm">
                            <svg height="20" viewBox="0 0 32 32" width="20" xmlns="http://www.w3.org/2000/svg">
                                <g id="Layer_3" data-name="Layer 3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g>
                            </svg>
                            <input
                                {...register('newpassword')}
                                type="password"
                                className="input"
                                placeholder="Enter your New Password"
                                required />
                        </div>

                        <Button
                            ref={btnref}
                            text={'Reset'}
                        />
                        <Link to='/mybookings' className='btn btn-dark'>Home</Link>

                        {error ? <ErrorAlert message={error} /> : ''}
                        {success ? <SuccessAlert message={success} /> : ''}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
