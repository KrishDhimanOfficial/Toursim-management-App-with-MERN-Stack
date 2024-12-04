import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../componets'
import axios from 'axios'
import config from '../../config/config'


const Header = () => {
    console.log("Header Render")
    const btnRef = useRef()
    const navigate = useNavigate()
    const [settings, setsetting] = useState({})
    const [token, settoken] = useState(true)

    const fetch = async () => {
        const response = await axios.get(`${config.server_url}/get/site-setting`)
        setsetting(response.data)
    }

    const handleloginsystem = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) settoken(false)
        fetch()
    }, [])
    return (
        <header id="fh5co-header-section" className="sticky-banner">
            <div className="container">
                <div className="nav-header">
                    <Link to='/' className="js-fh5co-nav-toggle fh5co-nav-toggle dark">
                        <i></i>
                    </Link>
                    <h1 id="fh5co-logo">
                        <Link to='/'>
                            <img
                                src={`${settings.logo_img_url}/${settings.siteSetting?.logo}`}
                                alt=""
                                style={{ width: '40px', height: '40px', marginRight: '10px' }} />
                            {settings.siteSetting?.company_name}
                        </Link>
                    </h1>
                    <nav id="fh5co-menu-wrap" role="navigation">
                        <ul className="sf-menu" id="fh5co-primary-menu">
                            <li>
                                <NavLink to='/'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/tours'
                                    className={({ isActive }) => `${isActive ? 'active' : ''}`}>
                                    Tours
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/posts'>Blogs</NavLink>
                            </li>
                            <li>
                                <Button
                                    ref={btnRef}
                                    fn={() => handleloginsystem()}
                                    type={'button'}
                                    text={
                                        token ? 'Logout' : 'Login'
                                    }
                                />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header >
    )
}

export default React.memo(Header)
