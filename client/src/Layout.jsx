import React from 'react'
import { Footer, Header, } from './components/componets'
import { Outlet } from 'react-router'


const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
