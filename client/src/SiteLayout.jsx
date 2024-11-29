import React, { useEffect } from 'react'
import { Footer, Header, Banner } from './components/componets'
import { Outlet } from 'react-router'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import verifyToken from './Hooks/verifyToken'
import { saveUser } from './features/Auth.slice'

const SiteLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const a = verifyToken()
    }, [])
    return (
        <div id="fh5co-wrapper">
            <div id="fh5co-page">
                <Header />
                <Banner />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default SiteLayout