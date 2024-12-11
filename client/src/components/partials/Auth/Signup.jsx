import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from "react-hook-form"
import { registerUser } from '../../../features/Auth.slice'
import { Button, ErrorAlert } from '../../componets'
import axios from 'axios'
import config from '../../../config/config'

const Signup = () => {
    const btnRef = useRef()
    const dispatch = useDispatch()
    const errorState = useSelector(state => state.auth.errorstate)
    const ErrorMessage = useSelector(state => state.auth.errorMessage)


    const [password, showpassword] = useState(false)
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate()


    // handle user registeration
    const submitForm = async (data) => {
        const response = await axios.post(`${config.server_url}/register`, data)
        if (response.data.error) {
            dispatch(registerUser(response.data.error))
        } else {
            navigate('/login')
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) navigate('/')
    }, [])
    return (
        <div className="container" style={{ height: '100%', alignContent: 'center', }}>
            <div className="row" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="col-md-4">
                    <form className="form" onSubmit={handleSubmit(submitForm)}>
                        <h1>Login</h1>
                        <div className="flex-column">
                            <label>Name </label>
                        </div>
                        <div className="inputForm">
                            <input
                                {...register('name', { pattern: /[a-z]/ })}
                                type="text"
                                className="input"
                                autoComplete='off'
                                placeholder="Enter your Name"
                                required />
                        </div>
                        <div className="flex-column">
                            <label>Username </label>
                        </div>
                        <div className="inputForm">
                            <input
                                {...register('username')}
                                type="text"
                                className="input"
                                autoComplete='off'
                                placeholder="Enter your Username"
                                required />
                        </div>
                        <div className="flex-column">
                            <label>Email </label>
                        </div>
                        <div className="inputForm">
                            <input
                                {...register('email', { pattern: /^[a-z0-9]+@gmail.com$/ })}
                                type="email"
                                className="input"
                                autoComplete='off'
                                placeholder="Enter your Email"
                                required />
                        </div>
                        <div className="flex-column">
                            <label>Password </label>
                        </div>
                        <div className="inputForm">
                            <input
                                {...register('password')}
                                type={password ? 'text' : 'password'}
                                className="input"
                                autoComplete='off'
                                placeholder="Enter your Password"
                                required />
                            <svg style={{ cursor: 'pointer' }}
                                onClick={() => showpassword(prev => !prev)}
                                viewBox="0 0 576 512" height="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path>
                            </svg>
                        </div>
                        {
                            errorState
                                ? <ErrorAlert message={ErrorMessage} />
                                : ''
                        }
                        <Button ref={btnRef} text={'Sign In'} />
                        <Link
                            to='/login'
                            className="p">
                            Have you an Account!
                            <span className="span">Login</span>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Signup
