import React from 'react'
import { Footer, Header, } from './components/componets'
import { Outlet } from 'react-router'
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const Layout = () => {

    return (
        <>
            <ToastContainer />
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
