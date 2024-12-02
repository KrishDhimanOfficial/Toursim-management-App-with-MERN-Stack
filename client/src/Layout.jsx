import React, { useEffect } from 'react'
import { Footer, Header, } from './components/componets'
import { Outlet } from 'react-router'
import verifyToken from './Hooks/verifyToken'
import { saveUser } from './features/Auth.slice'
import { useDispatch } from 'react-redux'


const Layout = () => {
    const dispatch = useDispatch()
    const authenicateUser = async () => {
        const res = await verifyToken()
        dispatch(saveUser(res))
    }
    useEffect(() => { authenicateUser() }, [])
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
